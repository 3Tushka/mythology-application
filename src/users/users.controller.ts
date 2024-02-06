import {
  Body,
  Post,
  Controller,
  Get,
  UseGuards,
  UsePipes,
  Param,
  Put,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Roles } from 'src/auth/decorator/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, type: [User] })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Give Role' })
  @ApiResponse({ status: 200 })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Delete Role' })
  @ApiResponse({ status: 200 })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('/role/delete')
  deleteRole(@Body() dto: AddRoleDto) {
    return this.usersService.deleteRole(dto);
  }

  @ApiOperation({ summary: 'Ban User' })
  @ApiResponse({ status: 200 })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }

  @ApiOperation({ summary: 'Ban User' })
  @ApiResponse({ status: 200 })
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Post('/unban')
  unBan(@Body() dto: BanUserDto) {
    return this.usersService.unBan(dto);
  }

  // @ApiOperation({ summary: 'Update User' })
  // @ApiResponse({ status: 200, type: User })
  // @Put(':id/update')
  // updateUser(
  //   @Param('id') id: string,
  //   @Body() dto: CreateUserDto,
  //   @Req() req: any,
  // ) {
  //   const authHeader = req.headers.authorization;
  //   const token = authHeader && authHeader.split(' ')[1];
  //   return this.usersService.updateUser(id, dto, token);
  // }
}
