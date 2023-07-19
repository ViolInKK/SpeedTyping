import { AuthService } from './auth.service';
import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto, @Req() request: Request, @Res({passthrough:true}) response: Response){
        console.log(request.headers)
        // response.cookie('test2', 'brrr')
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
