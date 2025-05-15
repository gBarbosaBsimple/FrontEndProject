import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Collaborator } from '../collaboratorInterface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-collaborator-details',
  imports: [CommonModule,ReactiveFormsModule],
  template: `
    <section class="project-details-section" *ngIf="collaboratorForm">
      <h2>Collaborator Details</h2>

      <form [formGroup]="collaboratorForm" (ngSubmit)="submitEdit()">
        <div class="details-box">
          <label>ID:
            <input type="number" formControlName="id"/>
          </label>

          <label>userId:
            <input type="number" formControlName="userId" />
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
  styleUrls: ['./collaborator-details.component.css']
})
export class CollaboratorDetailsComponent implements OnChanges{
  @Input() collaborator:Collaborator|null=null
  @Output() collaboratorEdit= new EventEmitter<Collaborator>();
  collaboratorForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  //quando sofre alteracoes altera
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collaborator'] && this.collaborator) {
      this.buildForm(this.collaborator);
    }
  }
  //criação do formulario reativo
  private buildForm(collaborator: Collaborator) {
    this.collaboratorForm = this.fb.group({
      id: [{ value: collaborator.id, disabled: true }], //desativa ID
      userId: [collaborator.userId],
      initDate: [this.formatDate(collaborator.initDate)],
      finalDate: [this.formatDate(collaborator.finalDate)],
    });
  }

  submitEdit() {
    if (!this.collaboratorForm || this.collaboratorForm.invalid) return;

    const raw = this.collaboratorForm.getRawValue(); // inclui campos disabled como 'id'

    const updatedCollaborator: Collaborator = {
      ...raw,
      initDate: new Date(raw.initDate),
      finalDate: new Date(raw.finalDate),
    };

    this.collaboratorEdit.emit(updatedCollaborator);
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }
}
