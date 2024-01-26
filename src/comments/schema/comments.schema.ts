import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Article } from 'src/articles/schema/articles.schema';
import { User } from 'src/users/user.schema';

@Table({ tableName: 'comments' })
export class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  text: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER })
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;
}
