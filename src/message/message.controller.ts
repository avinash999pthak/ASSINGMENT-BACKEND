import { Body, Controller,Get, Post, Query,Delete, Param, Put } from '@nestjs/common';
import { MessageService } from './message.service';
@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}
    @Get()
    async getMessage(@Query() obj: any): Promise<string> {
      return this.messageService.getdata(obj);
    }
  @Post()
  async sendMessage(@Body() message: any): Promise<string> {
    return this.messageService.insert_data(message);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: any): Promise<any> {
    try {
        return  this.messageService.deleteItem(id);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }

  @Put(':id')
  async updateMessage(@Param('id') id: string, @Body() obj: any): Promise<any> {
    obj.id = id;
    try {
      return await this.messageService.update(obj);
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  }


}
