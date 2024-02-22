import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user', description: 'Username' })
  @IsString({ message: 'Should be string' })
  username: string;

  @ApiProperty({ example: 'user@mail.com', description: 'Email' })
  @IsEmail({}, { message: 'Not correct Email' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @IsString({ message: 'Should be string' })
  @Length(4, 20, { message: 'Min: 4     Max: 20' })
  password: string;
}
