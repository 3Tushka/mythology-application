import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.schema';
import { RolesModule } from './roles/roles.module';
import { Role } from './schemas/roles.schema';
import { UserRoles } from './schemas/user-roles.schema';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/schema/articles.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Article],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ArticlesModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
