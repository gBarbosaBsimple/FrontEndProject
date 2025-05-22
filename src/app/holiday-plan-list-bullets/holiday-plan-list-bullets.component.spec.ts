import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayPlanListBulletsComponent } from './holiday-plan-list-bullets.component';

describe('HolidayPlanListBulletsComponent', () => {
  let component: HolidayPlanListBulletsComponent;
  let fixture: ComponentFixture<HolidayPlanListBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayPlanListBulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolidayPlanListBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
