import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotmComponent } from './motm.component';

describe('MotmComponent', () => {
  let component: MotmComponent;
  let fixture: ComponentFixture<MotmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotmComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
