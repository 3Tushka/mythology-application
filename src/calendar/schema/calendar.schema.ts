import { Column, DataType, Table, Model } from 'sequelize-typescript';
import { CalendarCreationAttr } from '../calendar.interface';

@Table({ tableName: 'calendar' })
export class Calendar extends Model<Calendar, CalendarCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  day: number;

  @Column({ type: DataType.STRING, allowNull: false })
  month: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;
}
