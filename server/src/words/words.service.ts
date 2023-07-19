import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Words } from './words.model';
import { addWordDto } from './dto/add-word.dto';
import sequelize, { Sequelize } from 'sequelize';

@Injectable()
export class WordsService {

    constructor(@InjectModel(Words) private wordsRepository: typeof Words){}

    async getWords(){
        let result: string[] = []
        const words = await this.wordsRepository.findAll({attributes: ["word"], limit: 50, order: [Sequelize.literal("RANDOM()")]})
        words.map((el) => {result.push(el.word)})
        return result
        return words
    }

    async getAllWords(){
        const words = await this.wordsRepository.findAll()
        return words
    }

    async getWordById(id: number){
        const word = await this.wordsRepository.findOne({where: {id}})
        return word
    }
    
    async addWord(data: addWordDto){
        return Promise.all(
            data.word.map(async(el: string) => {
                let word = await this.wordsRepository.create({word: el})
                return word
            })
        )
    }
}

