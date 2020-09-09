import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  confirmedAddToReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UndoReadingListActionsComponent } from '../undo-reading-list-actions/undo-reading-list-actions.component';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: ''
  });

  instantSearchSubscription: Subscription;

  instantSearchDelay = 500;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly snackbarRef: MatSnackBar,
  ) {
    this.instantSearchSubscription = this.searchForm.get('term').valueChanges.pipe(
      debounceTime(this.instantSearchDelay)
    ).subscribe(
      () => this.searchBooksOnSubmit()
    );
  }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }))
    this.showSnackbar();
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooksOnSubmit();
  }

  searchBooksOnSubmit() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    if (this.instantSearchSubscription) {
      this.instantSearchSubscription.unsubscribe();
    }
  }

  showSnackbar(): void {
    this.snackbarRef.openFromComponent(UndoReadingListActionsComponent);
  }
}
