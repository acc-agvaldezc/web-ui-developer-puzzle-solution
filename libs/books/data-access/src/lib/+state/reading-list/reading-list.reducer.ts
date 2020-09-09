import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem, Book } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
  previousAction: 'ADD' | 'REMOVE' | null;
  previousActionData: Book | ReadingListItem | null;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null,
  previousAction: null,
  previousActionData: null
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null,
      previousAction: null,
      previousActionData: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.addToReadingList, (state, action) =>
    readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  on(ReadingListActions.confirmedAddToReadingList, (state, action) => {
    return {
      ...state,
      previousAction: 'ADD',
      previousActionData: action.book
    }
  }),
  on(ReadingListActions.confirmedRemoveFromReadingList, (state, action) => {
    return {
      ...state,
      previousActionData: action.item,
      previousAction: 'REMOVE'
    }
  }),
  on(ReadingListActions.failedAddToReadingList, (state, action) => {
    return {
      ...state,
      error: `Failed to add ${action.book.title} to reading list.`
    }
  }),
  on(ReadingListActions.undoAddToReadingList, (state, action) => 
    readingListAdapter.removeOne(action.item.bookId, state)
  ),
  on(ReadingListActions.undoRemoveFromReadingList, (state, action) => 
    readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  on(ReadingListActions.removeFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.item.bookId, state)
  ),
  on(ReadingListActions.failedRemoveFromReadingList, (state, action) => {
    return {
      ...state,
      error: `Failed to remove ${action.item.title} from reading list.`
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
