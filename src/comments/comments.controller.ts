import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentInterface } from './comments.interface';
import { CreateCommentDto } from './dto/create.comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
}
