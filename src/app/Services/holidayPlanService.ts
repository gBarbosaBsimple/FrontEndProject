import { Injectable } from '@angular/core';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';
import { HolidayPeriod } from '../Interfaces/holidayPeriodInterface';

@Injectable({
  providedIn: 'root',
})
export class HolidayPlanService {
  private holidayPlanList: HolidayPlan[] = [
    {
      id: 1,
      collaboratorId: 101,
      holidayPeriod: [
        { initDate: new Date('2025-06-01'),
          finalDate: new Date('2025-06-10') },
        { initDate: new Date('2025-08-15'),
          finalDate: new Date('2025-08-22') },
      ],
    },
    {
      id: 2,
      collaboratorId: 102,
      holidayPeriod: [
        { initDate: new Date('2025-07-01'),
          finalDate: new Date('2025-07-10') },
      ],
    },
  ];

  getHolidayPlans(): HolidayPlan[] {
    return this.holidayPlanList;
  }
}