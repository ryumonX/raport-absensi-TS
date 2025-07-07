import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleSheetService } from './google-sheet.service';
import { GoogleSheetController } from './google-sheet.controller';

@Module({
  imports: [HttpModule],
  controllers: [GoogleSheetController],
  providers: [GoogleSheetService],
})
export class GoogleSheetModule {}
