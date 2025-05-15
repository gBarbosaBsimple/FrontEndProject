import { Component,Output, Input,EventEmitter } from '@angular/core';
import { Project } from '../projectInterface';
import { ProjectService } from '../Services/projectService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-list',
  imports: [CommonModule],
  template: `
    <section>
    <h2>Project List</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Acronym</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let project of projectList">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>{{ project.acronym }}</td>
          <td>
              <button (click)="Details(project)">Details</button>
            </td>
        </tr>
      </tbody>
    </table>
  </section>
  `,
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  @Input() projectList: Project[] = [];
  @Output() projectSelected= new EventEmitter<Project>();

  Details(project:Project){
    this.projectSelected.emit(project);
  }
}
