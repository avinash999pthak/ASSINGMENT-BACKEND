import { Module } from '@nestjs/common';
import { MessageService } from './message.service';

@Module({
    providers: [MessageService],
    exports: [MessageService], // Export MessageService to make it available in other modules
  })
export class MessageModule {}
