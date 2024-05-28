import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';
import { PdfModule } from './pdf/pdf.module';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [MessageModule, PdfModule,],
  controllers: [AppController, MessageController,PdfController],
  providers: [AppService, MessageService,PdfService],
})
export class AppModule {}
