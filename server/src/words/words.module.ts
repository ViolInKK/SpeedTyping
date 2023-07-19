import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { Words } from './words.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [
    SequelizeModule.forFeature([Words])
  ],
})
export class WordsModule {}
