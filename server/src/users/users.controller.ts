import { UsersService } from './users.service';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    create(@Body() userDTO: CreateUserDto){
        return this.usersService.createUser(userDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }
}
