import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({ tableName: 'feedback' })
export class Feedback extends Model<Feedback> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  theme: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  message: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isFixed: boolean;
}
