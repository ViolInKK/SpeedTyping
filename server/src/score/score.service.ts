import { Injectable } from '@nestjs/common';
import { Score } from './score.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoreService {

    constructor(@InjectModel(Score) private scoreRepository: typeof Score){}

    async getScoreByUserId(id: number) {
        const user = await this.scoreRepository.findAll({where: {user_id: id}})
        return user
    }

    async createScore(dto: CreateScoreDto){
        const score = await this.scoreRepository.create(dto)
        return score
    }

    async getAllScores(){
        const scores = await this.scoreRepository.findAll()
        console.log(scores)
        return scores
    }
}
