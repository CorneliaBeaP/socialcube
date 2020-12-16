import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartredirecterComponent } from './startredirecter.component';

describe('StartredirecterComponent', () => {
  let component: StartredirecterComponent;
  let fixture: ComponentFixture<StartredirecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartredirecterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartredirecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
