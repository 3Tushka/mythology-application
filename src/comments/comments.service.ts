import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './schema/comments.schema';
import { CreateCommentDto } from './dto/create.comments.dto';
import { UpdateCommentDto } from './dto/update.comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async createComment(id: string, dto: CreateCommentDto) {
    const comment = await this.commentRepository.create({
      text: dto.text,
      articleId: id,
      userId: dto.userId,
    });
    return comment;
  }

  async updateComment(
    articleId: string,
    commentId: string,
    dto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        articleId: articleId,
      },
    });
    comment.text = dto.text;
    await comment.save();
    return comment;
  }

  async deleteComment(articleId: string, commentId: string) {
    return this.commentRepository.destroy({
      where: { id: commentId, articleId: articleId },
    });
  }
}
