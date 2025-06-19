import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  constructor(private readonly prisma: PrismaService) {}

  async generateBase64(id: number): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const qrString = user.qrcode;
    return QRCode.toDataURL(qrString);
  }

  async generateBuffer(id: number): Promise<Buffer> {
    const base64 = await this.generateBase64(id);
    const base64Data = base64.replace(/^data:image\/png;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }
}
