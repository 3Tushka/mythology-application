import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

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

  @Get()
  getAll() {
    return this.articleService.getAllArticles();
  }
}
