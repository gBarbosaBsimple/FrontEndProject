import { Component,Output, Input,EventEmitter } from '@angular/core';
import { Collaborator } from '../collaboratorInterface';
import { CollaboratorService } from '../Services/collaboratorService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-collaborator-component',
  imports: [CommonModule],
  template: `
    <section>
    <h2>Collaborator List</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>UserId</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let collaborator of collaboratorList">
          <td>{{ collaborator.id }}</td>
          <td>{{ collaborator.userId }}</td>
          <td>{{ collaborator.initDate | date: 'shortDate' }}</td>
          <td>{{ collaborator.finalDate | date: 'shortDate' }}</td>
          <td>
              <button (click)="Details(collaborator)">Details</button>
            </td>
        </tr>
      </tbody>
    </table>
  </section>
  `,
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorComponentComponent {
  @Input() collaboratorList: Collaborator[] = [];
  @Output() collaboratorSelected= new EventEmitter<Collaborator>();

  Details(collaborator:Collaborator){
    this.collaboratorSelected.emit(collaborator);
  }
}
