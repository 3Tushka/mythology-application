import { Body, Post, Controller, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Roles } from 'src/auth/decorator/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
