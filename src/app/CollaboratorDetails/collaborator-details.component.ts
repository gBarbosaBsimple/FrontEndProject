import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,effect } from '@angular/core';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { CollaboratorService } from '../Services/collaboratorService';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-collaborator-details',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl:'./collaborator-details.component.html',
  styleUrls: ['./collaborator-details.component.css']
})
export class CollaboratorDetailsComponent{
  collaboratorForm!: FormGroup;

  constructor(private fb: FormBuilder,private collaboratorService: CollaboratorService) {
    effect(() => {
      const collaborator = this.collaboratorService.getSelectedCollaboratorSignal()();
      if (collaborator) {
        this.buildForm(collaborator);
      }
    });
  }
  //quando sofre alteracoes altera
  
  //criação do formulario reativo
  private buildForm(collaborator: Collaborator) {
    this.collaboratorForm = this.fb.group({
      id: [{ value: collaborator.id, disabled: true }], //desativa ID
      userId: [collaborator.userId,Validators.required],
      initDate: [this.formatDate(collaborator.initDate),Validators.required],
      finalDate: [this.formatDate(collaborator.finalDate),Validators.required],
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
    
    this.collaboratorService.updateCollaborator(updatedCollaborator); // Atualiza no Service
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }
}
