import { Component, Input,Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { HolidayPlan } from '../holidayPlanInterface';
import { HolidayPeriod } from '../holidayPeriodInterface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormArray,FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-holiday-plan-details',
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <section class="project-details-section" *ngIf="holidayPlanForm">
  <h2>HolidayPlan Details</h2>

  <form [formGroup]="holidayPlanForm" (ngSubmit)="submitEdit()">
    <div class="details-box">
      <label>ID:
        <input type="number" formControlName="id" [disabled]="true" />
      </label>

      <label>Collaborator ID:
        <input type="number" formControlName="collaboratorId" />
      </label>

      <div formArrayName="holidayPeriod">
        <h3>Holiday Periods</h3>
        <div
          *ngFor="let period of holidayPeriods.controls; let i = index"
          [formGroupName]="i"
        >
          <label>Start Date:
            <input type="date" formControlName="initDate" />
          </label>

          <label>End Date:
            <input type="date" formControlName="finalDate" />
          </label>
        </div>
      </div>

      <!-- Botão fora do *ngFor -->
      <button type="submit">Save</button>
    </div>
  </form>
</section>
  `,
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
