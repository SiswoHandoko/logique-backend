import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class User extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'name'
	})
  name: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'address'
	})
  address: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'email',
	})
  email: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'password',
	})
  password: string;
  
  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    field: 'created_at'
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
    field: 'updated_at'
  })
  updatedAt: Date;

  // Custom property to format updatedAt as a string
  get formattedUpdatedAt(): string {
    return this.updatedAt.toISOString(); // or use your preferred date formatting method
  }

  static associate(models) {
    this.hasOne(models.CreditCard, { foreignKey: 'user_id', as: 'creditcard' });
    this.hasMany(models.Photo, { foreignKey: 'user_id', as: 'photos' });
  }
}
