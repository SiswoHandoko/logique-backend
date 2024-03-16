import { Injectable } from '@nestjs/common';
import { InjectModel,SequelizeModule } from '@nestjs/sequelize';
import { RegisterUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { CreditCard } from './models/credit-card.model';
import { Photo } from './models/photo.model';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript'
import { ListUserDto } from './dto/list-user.dto';
import { Op } from 'sequelize';
import { PatchUserDto } from './dto/patch-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(CreditCard) private readonly creditCardModel: typeof CreditCard,
    @InjectModel(Photo) private readonly photoModel: typeof Photo,
    private readonly sequelize: Sequelize,
  ) {}

  async create(registerData: RegisterUserDto): Promise<any> {
    const trx = await this.sequelize.transaction();
    try {
      const user = {
        name: registerData.name,
        address: registerData.address,
        email: registerData.email,
        password: await bcrypt.hash(registerData.password, 10),
      };

      const resUser = await this.userModel.create(user, { transaction: trx });
      const userId = resUser.dataValues.id;

      const creditCard = {
        userId,
        type: registerData.creditcard_type,
        number: registerData.creditcard_number,
        name: registerData.creditcard_name,
        expired: registerData.creditcard_expired,
        cvv: registerData.creditcard_cvv,
      };

      await this.creditCardModel.create(creditCard, { transaction: trx });

      const transformedPhoto = registerData.photos.map(url => {
        return { userId, url };
      });

      await this.photoModel.bulkCreate(transformedPhoto, { transaction: trx });

      await trx.commit();
      return {
        user_id:userId
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async findAll(query:ListUserDto): Promise<any> {
    const search = query.q ? query.q: '';
    const limit = query.lt ? parseInt(query.lt) : 30;
    const offset = query.of ? parseInt(query.of) : 0;
    const orderBy = query.ob ? query.ob : 'email';
    const sortBy = query.sb ? query.sb : 'desc';
    const modelInclude = [{
      model: Photo,
      as: 'photos',
      attributes: ['url'],
    },
    {
      model: CreditCard,
      as: 'creditcard',
      attributes: ['type','number','name','expired'],
    }];

    const [data, total] = await Promise.all([
      this.userModel.findAll({
          where:{
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
          limit, 
          offset,
          include:modelInclude,
          order: [[orderBy, sortBy]]
      }),
      this.userModel.count()
    ]);

    const convertedUsers = data.map(user => ({
      "user_id": user.id,
      "name": user.name,
      "address": user.address,
      "email": user.email,
      "photos": user.dataValues.photos.map(photo => photo.dataValues.url),
      "creditcard": user.creditcard
  }));

    return {count:total,rows:convertedUsers};
  }

  async findOne(id: string): Promise<any> {
    const modelInclude = [{
      model: Photo,
      as: 'photos',
      attributes: ['url'],
    },
    {
      model: CreditCard,
      as: 'creditcard',
      attributes: ['type','number','name','expired'],
    }];

    const user = await this.userModel.findOne({
      where: {
        id,
      },
      include:modelInclude,
    });

    const res = {
      "user_id": user.dataValues.id,
      "name": user.dataValues.name,
      "address": user.dataValues.address,
      "email": user.dataValues.email,
      "photos": user.dataValues.photos.map(photo => photo.dataValues.url),
      "creditcard": {
          "type": user.dataValues.creditcard.type,
          "number": user.dataValues.creditcard.number,
          "name": user.dataValues.creditcard.name,
          "expired": user.dataValues.creditcard.expired
      }
    }
    return res
  }

   async patch(data: PatchUserDto): Promise<any> {
    const trx = await this.sequelize.transaction();
    try {
      let user;
      if (data.name) user.name = data.name;
      if (data.address) user.address = data.address;
      if (data.email) user.email = data.email;
      if (data.password) user.password = await bcrypt.hash(data.password, 10);
      
      const [updatedRowsUser] = await User.update(
        user,
        { where: { id: data.user_id }, transaction:trx }
      );

      let creditcard;
      if (data.creditcard_type) creditcard.type = data.creditcard_type;
      if (data.creditcard_number) creditcard.number = data.creditcard_number;
      if (data.creditcard_name) creditcard.name = data.creditcard_name;
      if (data.creditcard_expired) creditcard.expired = data.creditcard_expired;
      if (data.creditcard_cvv) creditcard.cvv = data.creditcard_cvv;
      
      const [updatedRowsCC] = await CreditCard.update(
        creditcard,
        { where: { userId: data.user_id }, transaction:trx }
      );

      await trx.commit();
      return {
        user_id:1
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
