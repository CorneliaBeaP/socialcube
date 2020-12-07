import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardsComponent } from './activity-cards.component';

describe('ActivityCardsComponent', () => {
  let component: ActivityCardsComponent;
  let fixture: ComponentFixture<ActivityCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
