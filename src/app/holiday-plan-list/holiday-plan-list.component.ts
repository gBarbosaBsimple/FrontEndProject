import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HolidayPlan } from '../holidayPlanInterface';
import { Collaborator } from '../collaboratorInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-plan-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Holiday Plan List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Collaborator ID</th>
            <th>lenght of Holiday Period</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let holidayPlan of holidayPlanList">
            <td>{{ holidayPlan.id }}</td>
            <td>{{ holidayPlan.collaboratorId }}</td>
            <td>{{ holidayPlan.holidayPeriod.length }}</td>
            <td>
              <button (click)="Details(holidayPlan)">Details</button>
              <button (click)="viewCollaboratorDetails(holidayPlan.collaboratorId)">Details Collaborator</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styleUrls: ['./holiday-plan-list.component.css']
})
export class HolidayPlanListComponent {
  @Input() holidayPlanList: HolidayPlan[] = [];
  @Input() collaboratorList: Collaborator[]=[];
  @Output() holidayPlanSelected = new EventEmitter<HolidayPlan>();
  @Output() collaboratorSelected = new EventEmitter<Collaborator>();  // Novo evento

  Details(holidayPlan: HolidayPlan) {
    this.holidayPlanSelected.emit(holidayPlan);
  }

  viewCollaboratorDetails(collaboratorId: number) {
    // Emitir o colaborador com base no ID
    const selectedCollaborator = this.findCollaboratorById(collaboratorId);
    if (selectedCollaborator) {
      this.collaboratorSelected.emit(selectedCollaborator);
    }
  }

  // Função para buscar um colaborador pelo ID
  findCollaboratorById(id: number): Collaborator | undefined {
    // Aqui, você pode fazer a busca no seu array de colaboradores.
    // Suponha que tenha uma lista de colaboradores, você pode buscar o colaborador com base no ID.
    // Exemplo:
    return this.collaboratorList.find(collaborator => collaborator.id === id);
  }
}
