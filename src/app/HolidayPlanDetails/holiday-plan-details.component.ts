import { Component, effect } from '@angular/core';
import { HolidayPlanService } from '../Services/holidayPlanService';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormArray,FormBuilder,FormGroup,FormControl,} from '@angular/forms';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';

@Component({
  selector: 'app-holiday-plan-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './holiday-plan-details.component.html',
  styleUrls: ['./holiday-plan-details.component.css'],
})
export class HolidayPlanDetailsComponent {
  holidayPlanForm!: FormGroup;

  constructor(private fb: FormBuilder,private holidayPlanService: HolidayPlanService ) {
    effect(() => {
      const holidayPlan = this.holidayPlanService.getSelectedHolidayPlan()();
      if (holidayPlan) {
        this.buildForm(holidayPlan);
      }
    });
  }

  get holidayPeriods(): FormArray {
    return this.holidayPlanForm.get('holidayPeriod') as FormArray;
  }

  private buildForm(holidayPlan: HolidayPlan) {
    this.holidayPlanForm = this.fb.group({
      id: [{ value: holidayPlan.id, disabled: true }],
      collaboratorId: [{value: holidayPlan.collaboratorId, disabled:true}],
      holidayPeriod: this.fb.array(
        holidayPlan.holidayPeriod.map((period: any) =>
          this.fb.group({
            initDate: this.formatDate(period.initDate),
            finalDate: this.formatDate(period.finalDate),
          })
        )
      ),
    });
  }

  submitEdit() {
    if (!this.holidayPlanForm || this.holidayPlanForm.invalid) return;

    const raw = this.holidayPlanForm.getRawValue();

    const updatedHolidayPlan = {
      ...raw,
      holidayPeriod: raw.holidayPeriod.map((p: any) => ({
        initDate: new Date(p.initDate),
        finalDate: new Date(p.finalDate),
      })),
    };

    this.holidayPlanService.updateHolidayPlan(updatedHolidayPlan);
  }

  addHolidayPeriod() {
    const newPeriod = {
      initDate: this.formatDate(new Date()),
      finalDate: this.formatDate(new Date()),
    };
  
    this.holidayPeriods.push(
      this.fb.group({
        initDate: newPeriod.initDate,
        finalDate: newPeriod.finalDate,
      })
    );
  
    const currentPlan = this.holidayPlanService.getSelectedHolidayPlan()();
    if (currentPlan) {
      this.holidayPlanService.addHolidayPeriod(currentPlan.id, {
        initDate: new Date(newPeriod.initDate),
        finalDate: new Date(newPeriod.finalDate),
      });
    }
  }
  private formatDate(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }
}
