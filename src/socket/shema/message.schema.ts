import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/users/user.schema';

@Table
export class Message extends Model<Message> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
