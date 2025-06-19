import { Controller, Get, Param, Res } from '@nestjs/common';
// import { QrService } from './qr.service';
import { QrService } from './qr.service';
import { Response } from 'express';

@Controller('qrcode')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Get(':id')
  async getQrImage(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.qrService.generateBuffer(Number(id));
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  }
}
