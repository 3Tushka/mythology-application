import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('user');
    await user.$set('role', [role.id]);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });

    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto, token: string) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const decodeToken = this.jwtService.decode(token) as any;

    console.log(decodeToken);
    if (!user.id) {
      throw new HttpException(
        'You are not allowed to edit this user',
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordCrypted = await bcrypt.genSalt(8);
    dto.password = await bcrypt.hash(dto.password, passwordCrypted);

    await user.update(dto);
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('No user or role found', HttpStatus.NOT_FOUND);
  }

  async deleteRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$remove('role', role.id);
      return dto;
    }

    throw new HttpException('No user or role found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    user.isBanned = true;
    user.banReason = dto.banReason;

    await user.save();
    return user;
  }

  async unBan(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    user.isBanned = false;
    user.banReason = dto.banReason;

    await user.save();
    return user;
  }
}
