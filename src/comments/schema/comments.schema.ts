import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Article } from '../../articles/schema/articles.schema';
import { User } from 'src/users/user.schema';

interface CommentsCreationAttributes {
  articleId: number;
  userId: number;
  content: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentsCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;
}
