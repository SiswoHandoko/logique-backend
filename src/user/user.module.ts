import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { CreditCard } from './models/credit-card.model';
import { Photo } from './models/photo.model';

@Module({
  imports: [SequelizeModule.forFeature([User,CreditCard,Photo])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
