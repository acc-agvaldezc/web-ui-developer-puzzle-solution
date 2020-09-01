import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book, GoogleBookItem } from '@tmo/shared/models';
import { formatGoogleBookItem } from '@tmo/shared/utils';

@Injectable()
export class BooksService {
  constructor(private readonly http: HttpService) {}

  search(term: string): Observable<Book[]> {
    if (!term) {
      throw new Error('Missing serach term');
    }

    return this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
      .pipe(
        map(resp => {
          return resp.data.items.map((item: GoogleBookItem) => formatGoogleBookItem(item));
        })
      );
  }
}
