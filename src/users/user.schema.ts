import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/schemas/roles.schema';
import { UserRoles } from 'src/roles/schemas/user-roles.schema';
import { Message } from 'src/socket/shema/message.schema';
import { Comment } from 'src/comments/schema/comments.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserDto> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user', description: 'Username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'Is banned?' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBanned: boolean;

  @ApiProperty({ example: 'Racism', description: 'Banned for' })
  @Column({ type: DataType.STRING, defaultValue: false })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  role: Role[];

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => Comment)
  comments: Comment[];
}
