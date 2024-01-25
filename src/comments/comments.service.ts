import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/createComment.dto';
import { Comment } from './schema/comments.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentService: typeof Comment) {}

  async createComment(dto: CreateCommentDto) {
    const comment = await this.commentService.create({
      ...dto,
    });
    return comment;
  }

  async getAllComments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  async getCommentById(id: string): Promise<Comment> {
    return this.commentService.findByPk(id);
  }

  async deleteComment(id: string): Promise<void> {
    const comment = await this.getCommentById(id);
    await comment.destroy();
  }
}
