import { Component, Input,Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';
import { HolidayPeriod } from '../Interfaces/holidayPeriodInterface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormArray,FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-holiday-plan-details',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl:'./holiday-plan-details.component.html',
  styleUrls: ['./holiday-plan-details.component.css']

})
export class HolidayPlanDetailsComponent implements OnChanges{
  @Input() holidayPlan: HolidayPlan | null = null;
  @Output() holidayPlanEdit = new EventEmitter<HolidayPlan>();

  holidayPlanForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get holidayPeriods(): FormArray {
    return this.holidayPlanForm.get('holidayPeriod') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['holidayPlan'] && this.holidayPlan) {
      this.buildForm(this.holidayPlan);
    }
  }

  private buildForm(plan: HolidayPlan) {
    this.holidayPlanForm = this.fb.group({
      id: new FormControl({ value: plan.id, disabled: true }),
      collaboratorId: new FormControl(plan.collaboratorId),
      holidayPeriod: this.fb.array(
        plan.holidayPeriod.map(period =>
          this.fb.group({
            initDate: this.formatDate(period.initDate),
            finalDate: this.formatDate(period.finalDate)
          })
        )
      )
    });
  }

  submitEdit() {
    if (!this.holidayPlanForm || this.holidayPlanForm.invalid) return;

    const raw = this.holidayPlanForm.getRawValue();

    const updatedHolidayPlan: HolidayPlan = {
      id: this.holidayPlan?.id || 0,
      collaboratorId: raw.collaboratorId,
      holidayPeriod: raw.holidayPeriod.map((p: any) => ({
        initDate: new Date(p.initDate),
        finalDate: new Date(p.finalDate)
      }))
    };

    this.holidayPlanEdit.emit(updatedHolidayPlan);
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }
}
