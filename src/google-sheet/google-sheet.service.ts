import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
// import { CreateGoogleSheetDto } from './dto/create-google-sheet.dto';
// import { UpdateGoogleSheetDto } from './dto/update-google-sheet.dto';

@Injectable()
export class GoogleSheetService {
   constructor(private readonly httpService: HttpService) {}

  async getSpreadsheetData(): Promise<any> {
    const url = 'https://script.google.com/macros/s/AKfycbzJh_SjFJjb7Oq5bfomdf_DIpLxUFdPCdoFFrj40Ek32cxYbMVaNyrAKD4F8F8wVTYXmw/exec';
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

}
