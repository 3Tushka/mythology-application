import { Injectable } from '@nestjs/common';
import { Article } from './schema/articles.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private articleRepository: typeof Article,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateArticleDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.articleRepository.create({
      ...dto,
      image: fileName,
    });
    return post;
  }

  async getArticleById(id: string) {
    const article = await this.articleRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return article;
  }

  async getAllArticles() {
    const article = await this.articleRepository.findAll({
      include: { all: true },
    });
    return article;
  }
}
