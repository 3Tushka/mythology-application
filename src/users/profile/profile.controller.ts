import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.schema';
import { UsersService } from '../users.service';
import { UserGuard } from '../user.Guard';

@Controller('profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  @UseGuards(UserGuard)
  async getUser(@Request() req) {
    return this.usersService.getUserById(req.params.id);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  @UseGuards(UserGuard)
  updateUser(
    @Param('id') id: string,
    @Body() dto: CreateUserDto,
    @Req() req: any,
  ) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    return this.usersService.updateUser(id, dto, token);
  }
}
