import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        finished: false,
        finishedDate: null,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async toggleFinishedStatus(id: string, update: ReadingListItem) {
    this.storage.update(list => {
      const index = list.findIndex((item: ReadingListItem) => item.bookId === id);

      if (index !== -1) {
        list[index].finished = update.finished;
        list[index].finishedDate = update.finishedDate;
      }

      return list;
    });
  }
}
