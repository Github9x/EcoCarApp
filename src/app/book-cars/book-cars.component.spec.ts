import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCarsComponent } from './book-cars.component';

describe('BookCarsComponent', () => {
  let component: BookCarsComponent;
  let fixture: ComponentFixture<BookCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCarsComponent]
    });
    fixture = TestBed.createComponent(BookCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
