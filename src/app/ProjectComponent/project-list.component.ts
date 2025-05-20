import { Component,Output, Input,EventEmitter } from '@angular/core';
import { Project } from '../Interfaces/projectInterface';
import { ProjectService } from '../Services/projectService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-list',
  imports: [CommonModule],
  templateUrl:'./project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {
  @Input() projectList: Project[] = [];
  @Output() projectSelected= new EventEmitter<Project>();

  Details(project:Project){
    this.projectSelected.emit(project);
  }
}
