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
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorator/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Roles('admin')
  @UseGuards(RolesGuard)
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
}
