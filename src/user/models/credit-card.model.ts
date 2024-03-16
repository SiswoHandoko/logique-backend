import { Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'credit_card' })
export class CreditCard extends Model {
  @Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true
	})
  id: number;

  @Column({
		type: DataType.INTEGER,
		allowNull: false,
		field: 'user_id',
    unique: true
	})
  userId: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'type'
	})
  type: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'number',
	})
  number: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'name',
	})
  name: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'expired',
	})
  expired: string;

  @Column({
		type: DataType.STRING,
		allowNull: false,
		field: 'cvv',
	})
  cvv: string;
  
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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
