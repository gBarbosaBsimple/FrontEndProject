import { Component , Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';
import { HolidayPlanService } from '../Services/holidayPlanService';

@Component({
  selector: 'app-holiday-plan-list-bullets',
  imports: [CommonModule],
  templateUrl: './holiday-plan-list-bullets.component.html',
  styleUrl: './holiday-plan-list-bullets.component.css'
})
export class HolidayPlanListBulletsComponent {
  holidayPlanList: Signal<HolidayPlan[]>;

  constructor(private holidayPlanService: HolidayPlanService) {
    this.holidayPlanList = this.holidayPlanService.getHolidayPlans();
  }

  Details(holidayPlan:HolidayPlan){
    this.holidayPlanService.selectHolidayPlan(holidayPlan); // Atualiza o Signal
  }
}
