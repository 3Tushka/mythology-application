import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  @IsNotEmpty()
  articleId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  content: string;
}
