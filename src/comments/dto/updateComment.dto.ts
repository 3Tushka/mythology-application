import { IsInt } from 'class-validator';

export class UpdateCommentDto {
  @IsInt()
  articleId?: number;

  @IsInt()
  userId?: number;

  content?: string;
}
