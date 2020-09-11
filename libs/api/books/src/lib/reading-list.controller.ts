import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';
import { identity } from 'rxjs';

@Controller()
export class ReadingListController {
  constructor(private readonly readingList: ReadingListService) {}

  @Get('/reading-list/')
  async getReadingList() {
    return await this.readingList.getList();
  }

  @Post('/reading-list/')
  async addToReadingList(@Body() item: Book) {
    return await this.readingList.addBook(item);
  }

  @Delete('/reading-list/:id')
  async removeFromReadingList(@Param() params) {
    return await this.readingList.removeBook(params.id);
  }

  @Put('/reading-list/:id/finished')
  async toggleFinishedBookOnReadingList(@Param('id') id: string, @Body() update: ReadingListItem) {
    return await this.readingList.toggleFinishedStatus(id, update);
  }
}
