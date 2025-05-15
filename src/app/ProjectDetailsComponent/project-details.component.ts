import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../projectInterface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <section class="project-details-section" *ngIf="projectForm">
      <h2>Project Details</h2>

      <form [formGroup]="projectForm" (ngSubmit)="submitEdit()">
        <div class="details-box">
          <label>ID:
            <input type="number" formControlName="id" [disabled]="true" />
          </label>

          <label>Title:
            <input type="text" formControlName="title" />
          </label>

          <label>Acronym:
            <input type="text" formControlName="acronym" />
          </label>

          <label>Start Date:
            <input type="date" formControlName="initDate" />
          </label>

          <label>End Date:
            <input type="date" formControlName="finalDate" />
          </label>

          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnChanges{
  @Input() project:Project|null=null
  @Output() projectEdit= new EventEmitter<Project>();
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.buildForm(this.project);
    }
  }

  private buildForm(project: Project) {
    this.projectForm = this.fb.group({
      id: [{ value: project.id, disabled: true }], // ← desativa edição do ID
      title: [project.title],
      acronym: [project.acronym],
      initDate: [this.formatDate(project.initDate)],
      finalDate: [this.formatDate(project.finalDate)],
    });
  }

  submitEdit() {
    if (!this.projectForm || this.projectForm.invalid) return;

    const raw = this.projectForm.getRawValue(); // inclui campos disabled como 'id'

    const updatedProject: Project = {
      ...raw,
      initDate: new Date(raw.initDate),
      finalDate: new Date(raw.finalDate),
    };

    this.projectEdit.emit(updatedProject);
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }
}
