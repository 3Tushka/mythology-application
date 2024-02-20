import { HasMany } from 'sequelize-typescript';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { User } from 'src/users/user.schema';
import { Comment } from 'src/comments/schema/comments.schema';

interface ArticlesCreationAttributes {
  userId: number;
  title: string;
  content: string;
  image: string;
  category: string;
}

@Table({ tableName: 'articles' })
export class Article extends Model<Article, ArticlesCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING(10000), allowNull: false })
  content: string;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @Column({ type: DataType.STRING, allowNull: true })
  category: string;

  @Column({ type: DataType.STRING, allowNull: true })
  temper: string;

  @Column({ type: DataType.STRING, allowNull: true })
  location: string;

  @Column({ type: DataType.STRING, allowNull: true })
  appointment: string;

  @Column({ type: DataType.STRING, allowNull: true })
  amulet: string;

  @Column({ type: DataType.STRING, allowNull: true })
  fairing: string;

  @Column({ type: DataType.STRING, allowNull: true })
  magicaItem: string;

  @Column({ type: DataType.STRING, allowNull: true })
  origin: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => Comment)
  comments: Comment[];
}
