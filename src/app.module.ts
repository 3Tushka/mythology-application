import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.schema';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/schemas/roles.schema';
import { UserRoles } from './roles/schemas/user-roles.schema';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/schema/articles.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarModule } from './calendar/calendar.module';
import { SocketGateway } from './socket/socket.gateway';
import { Message } from './socket/shema/message.schema';
import { SocketModule } from './socket/socket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/schema/comments.schema';
import * as path from 'path';
import { Calendar } from './calendar/schema/calendar.schema';
import { FeedbackPostModule } from './feedback/feedback-post/feedback-post.module';
import { Feedback } from './feedback/schema/feedback.schema';
import { FeedbackAdminModule } from './feedback/feedback-admin/feedback-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'src/static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Article,
        Calendar,
        Message,
        Comment,
        Feedback,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ArticlesModule,
    SocketModule,
    CommentsModule,
    CalendarModule,
    FeedbackPostModule,
    FeedbackAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
