import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MessageModule], // Import MessageModule to access MessageService
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
