import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [MessageModule, PdfModule],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService],
})
export class AppModule {}
