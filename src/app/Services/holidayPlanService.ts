import { Injectable, signal } from '@angular/core';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';

@Injectable({
  providedIn: 'root',
})
export class HolidayPlanService {
  private holidayPlanListSignal = signal<HolidayPlan[]>([
    {
      id: 1,
      collaboratorId: 101,
      holidayPeriod: [
        { initDate: new Date('2025-06-01'), finalDate: new Date('2025-06-10') },
        { initDate: new Date('2025-08-15'), finalDate: new Date('2025-08-22') },
      ],
    },
    {
      id: 2,
      collaboratorId: 102,
      holidayPeriod: [
        { initDate: new Date('2025-07-01'), finalDate: new Date('2025-07-10') },
      ],
    },
  ]);

  private selectedHolidayPlanSignal = signal<HolidayPlan | null>(null);

  getHolidayPlans() {
    return this.holidayPlanListSignal.asReadonly();
  }

  getSelectedHolidayPlan() {
    return this.selectedHolidayPlanSignal.asReadonly();
  }

  selectHolidayPlan(holidayPlan: HolidayPlan) {
    this.selectedHolidayPlanSignal.set(holidayPlan);//emit do output
  }

  updateHolidayPlan(updatedPlan: HolidayPlan) {
    const updatedList = this.holidayPlanListSignal().map(p =>
      p.id === updatedPlan.id ? updatedPlan : p
    );
    this.holidayPlanListSignal.set(updatedList);

    if (
      this.selectedHolidayPlanSignal() &&
      this.selectedHolidayPlanSignal()!.id === updatedPlan.id
    ) {
      this.selectedHolidayPlanSignal.set(updatedPlan);
    }
  }

  addHolidayPeriod(holidayPlanId: number, newPeriod: { initDate: Date; finalDate: Date }) {
    const updatedList = this.holidayPlanListSignal().map(plan => {
      if (plan.id === holidayPlanId) {
        return {
          ...plan,
          holidayPeriod: [...plan.holidayPeriod, newPeriod]
        };
      }
      return plan;
    });
  
    this.holidayPlanListSignal.set(updatedList);
  
    // Atualiza o selectedHolidayPlanSignal se for o mesmo plano selecionado
    if (this.selectedHolidayPlanSignal() && this.selectedHolidayPlanSignal()!.id === holidayPlanId) {
      const updatedPlan = updatedList.find(p => p.id === holidayPlanId)!;
      this.selectedHolidayPlanSignal.set(updatedPlan);
    }
  }
}
