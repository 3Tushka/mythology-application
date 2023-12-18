import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.schema';
import { Article } from './schema/articles.schema';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [SequelizeModule.forFeature([User, Article]), FilesModule],
})
export class ArticlesModule {}
