import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoReadingListActionsComponent } from './undo-reading-list-actions.component';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SharedTestingModule } from '@tmo/shared/testing';

describe('UndoReadingListActionsComponent', () => {
  let component: UndoReadingListActionsComponent;
  let fixture: ComponentFixture<UndoReadingListActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndoReadingListActionsComponent ],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: {}
        }
      ],
      imports: [SharedTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoReadingListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
