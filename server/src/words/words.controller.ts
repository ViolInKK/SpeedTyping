import { addWordDto } from './dto/add-word.dto';
import { WordsService } from './words.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('words')
export class WordsController {

    constructor(private wordsService: WordsService){}

    @Get()
    getWords(){
        return this.wordsService.getWords()
    }

    @Get('/all')
    getAllWords() {
        return this.wordsService.getAllWords()
    }

    @Get('/:id')
    getWordById(@Param('id') id: number){
        return this.wordsService.getWordById(id)
    }

    @Post()
    addWord(@Body() data: addWordDto){
        return this.wordsService.addWord(data)
    }

    
}
