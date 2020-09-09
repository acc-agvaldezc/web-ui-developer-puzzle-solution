import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';
import { Store } from '@ngrx/store';
import { getReadingListPreviousOperation, undoAddToReadingList, undoRemoveFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-undo-reading-list-actions',
  templateUrl: './undo-reading-list-actions.component.html',
  styleUrls: ['./undo-reading-list-actions.component.scss']
})
export class UndoReadingListActionsComponent implements OnInit {

  readingListPreviousAction$ = this.store.select(getReadingListPreviousOperation)

  constructor(
    private readonly snackbarRef: MatSnackBarRef<UndoReadingListActionsComponent>,
    private readonly store: Store
  ) {}

  ngOnInit(): void {}

  undoAddedBookToReadingList(book: Book): void {
    this.store.dispatch(undoAddToReadingList({ item: { bookId: book.id, ...book } }));
    this.snackbarRef.dismiss();
  }

  undoRemovedBookToReadingList(book: Book): void {
    this.store.dispatch(undoRemoveFromReadingList({ book }));
    this.snackbarRef.dismiss();
  }
}
