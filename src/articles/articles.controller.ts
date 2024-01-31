import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorator/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create.comments.dto';
import { UpdateCommentDto } from 'src/comments/dto/update.comments.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    private articleService: ArticlesService,
    private commentService: CommentsService,
  ) {}

  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createArticle(@Body() dto: CreateArticleDto, @UploadedFile() image) {
    return this.articleService.create(dto, image);
  }

  @Get(':id')
  async getArticle(
    @Param('id')
    id: string,
  ) {
    return this.articleService.getArticleById(id);
  }

  // @Get()
  // getAll() {
  //   return this.articleService.getAllArticles();
  // }

  @Get()
  async filterArticles(@Query('title') query: string) {
    return this.articleService.searchArticle(query);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Put(':id')
  updateArticle(@Param('id') id: number, @Body() updateDTO: UpdateArticleDto) {
    return this.articleService.updateArticle(id, updateDTO);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteArticle(@Param('id') id: number) {
    return this.articleService.deleteArticle(+id);
  }

  //comments
  @Get(':id/comments')
  async getCommentsByArticleId(@Param('id') id: string) {
    return this.commentService.getCommentsByArticleId(id);
  }

  @Post(':id/comments')
  async createComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    return this.commentService.createComment(id, dto);
  }

  @Put(':id/comments/:commentId/update')
  async updateComment(
    @Param('id')
    id: string,
    @Param('commentId')
    commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(id, commentId, dto);
  }

  @Delete(':id/comments/:commentId')
  async deleteComment(
    @Param('id')
    id: string,
    @Param('commentId')
    commentId: string,
  ) {
    return this.commentService.deleteComment(id, commentId);
  }
}
