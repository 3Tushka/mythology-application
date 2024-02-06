import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.schema';
import { Role } from 'src/roles/schemas/roles.schema';
import { UserRoles } from 'src/roles/schemas/user-roles.schema';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Article } from 'src/articles/schema/articles.schema';
import { ProfileController } from './profile/profile.controller';

@Module({
  controllers: [UsersController, ProfileController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Article]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
