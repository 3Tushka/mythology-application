import {
  Body,
  Controller,
  Get,
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

  @Get()
  getAll() {
    return this.articleService.getAllArticles();
  }
}
