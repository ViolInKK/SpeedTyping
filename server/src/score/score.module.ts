import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Score } from './score.model';

@Module({
  providers: [ScoreService],
  controllers: [ScoreController],
  imports: [
    SequelizeModule.forFeature([Score])
  ],
})
export class ScoreModule {}
