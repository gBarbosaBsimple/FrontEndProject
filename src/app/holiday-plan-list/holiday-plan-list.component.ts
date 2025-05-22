import { Component, effect, signal,Signal } from '@angular/core';
import { HolidayPlanService } from '../Services/holidayPlanService';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-plan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday-plan-list.component.html',
  styleUrls: ['./holiday-plan-list.component.css'],
})
export class HolidayPlanListComponent {
  holidayPlanList: Signal<HolidayPlan[]>;

  constructor(private holidayPlanService: HolidayPlanService) {
    this.holidayPlanList= this.holidayPlanService.getHolidayPlans();
  }

  Details(holidayPlan: HolidayPlan) {
    this.holidayPlanService.selectHolidayPlan(holidayPlan);
  }
}
