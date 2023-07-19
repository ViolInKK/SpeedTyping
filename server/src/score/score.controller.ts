import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreService } from './score.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('score')
export class ScoreController {

    constructor(private scoreService: ScoreService){}

    @Get()
    getAllScores(){
        return this.scoreService.getAllScores()
    }

    @Get('/:id')
    getScoreByUserId(@Param("id") id: number){
        return this.scoreService.getScoreByUserId(id)
    }

    @Post()
    createScore(@Body() scoreDTO: CreateScoreDto){
        return this.scoreService.createScore(scoreDTO)
    }

    

    // @Post()
    // create(@Body() userDTO: CreateUserDto){
    //     return this.usersService.createUser(userDTO)
    // }

  }
