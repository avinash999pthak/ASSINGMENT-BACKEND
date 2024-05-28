import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('download')
  async downloadPdf(@Res() res: Response) {
    const buffer = await this.pdfService.generatePdf();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="dummy.pdf"',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
