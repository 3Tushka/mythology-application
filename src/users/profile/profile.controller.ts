import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.schema';
import { UsersService } from '../users.service';

@Controller('profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
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
