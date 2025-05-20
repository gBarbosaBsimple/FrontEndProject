import { Injectable,signal } from '@angular/core';
import { Collaborator } from '../Interfaces/collaboratorInterface';
@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private collaboratorListSignal = signal<Collaborator[]>([
    { id: 1, userId: 101, initDate: new Date('2023-01-01'), finalDate: new Date('2023-12-31') },
    { id: 2, userId: 102, initDate: new Date('2024-02-01'), finalDate: new Date('2024-11-30') },
    { id: 3, userId: 103, initDate: new Date('2025-05-10'), finalDate: new Date('2025-12-10') }
  ]);

  private selectedCollaboratorSignal = signal<Collaborator | null>(null);

  getCollaboratorSignal() {
    return this.collaboratorListSignal.asReadonly();
  }

  getSelectedCollaboratorSignal() {
    return this.selectedCollaboratorSignal.asReadonly();
  }

  selectCollaborator(collaborator: Collaborator) {
    this.selectedCollaboratorSignal.set(collaborator);// como se fosse o emit 
  }

  updateCollaborator(updatedCollaborator: Collaborator) {
    const updatedList = this.collaboratorListSignal().map(collaborator =>
      collaborator.id === updatedCollaborator.id ? updatedCollaborator : collaborator
    );
    this.collaboratorListSignal.set(updatedList);

    // Atualiza o colaborador selecionado, caso esteja a ser editado
    if (this.selectedCollaboratorSignal() && this.selectedCollaboratorSignal()!.id === updatedCollaborator.id) {
      this.selectedCollaboratorSignal.set(updatedCollaborator);//optional: keep state consistent
    }
  }
}