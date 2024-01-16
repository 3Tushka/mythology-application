import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './schema/articles.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'sequelize-typescript';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private articleRepository: Repository<Article>,
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

  async updateArticle(id: number, dto: UpdateArticleDto): Promise<any> {
    const article = await this.articleRepository.findByPk(id);

    if (!article) {
      throw new NotFoundException();
    }

    article.title = dto.title;
    article.category = dto.category;
    article.content = dto.content;

    await article.save();

    return article.toJSON();
  }

  async deleteArticle(id: number): Promise<void> {
    await this.articleRepository.destroy({
      where: { id },
    });
    console.log('Article was Deleted');
  }
}
