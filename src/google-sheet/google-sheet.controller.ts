import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoogleSheetService } from './google-sheet.service';


@Controller('google-sheet')
export class GoogleSheetController {
  constructor(private readonly googleSheetService: GoogleSheetService) { }

  @Get()
  async getData() {
    return await this.googleSheetService.getSpreadsheetData();
  }

@Get(':sheetName/:number')
async getByNumber(
  @Param('sheetName') sheetName: string,
  @Param('number') number: string,
) {
  const allData = await this.googleSheetService.getSpreadsheetData();

  // Temukan sheet yang dimaksud (tanpa spasi dan case-insensitive)
  const sheetEntry = Object.entries(allData).find(
    ([key]) =>
      key.toLowerCase().replace(/\s/g, '') === sheetName.toLowerCase().replace(/\s/g, '')
  );

  if (!sheetEntry) {
    return { error: `Sheet '${sheetName}' not found` };
  }

  const sheetData = sheetEntry[1] as { candidates?: any[]; progress?: any[] };
  const candidates = sheetData.candidates;
  const progress = sheetData.progress;

  if (!Array.isArray(candidates) || !Array.isArray(progress)) {
    return { error: `Sheet '${sheetName}' must contain 'candidates' and 'progress' arrays` };
  }
  
  const candidate = candidates.find((row) => String(row['No.']) === number);

  if (!candidate) {
    return { error: `No candidate found with number ${number}` };
  }

  const progressEntry = progress.find((row) => String(row['No.']) === number);

  const result = {
    ...candidate,
    ...(progressEntry || {}),
  };
  return result;
}

}
