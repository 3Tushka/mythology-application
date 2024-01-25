import { Injectable, NotFoundException } from '@nestjs/common';
import { Article } from './schema/articles.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'sequelize-typescript';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Op } from 'sequelize';

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

  async updateArticle(
    id: number,
    updateDTO: UpdateArticleDto,
  ): Promise<Article> {
    const record = await this.articleRepository.findOne({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    Object.assign(record, updateDTO);

    return await record.save();
  }

  async deleteArticle(id: number): Promise<void> {
    await this.articleRepository.destroy({
      where: { id },
    });
    console.log('Article was Deleted');
  }

  async searchArticle(query: string): Promise<Article[]> {
    return this.articleRepository.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`,
        },
      },
    });
  }
}
