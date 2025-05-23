import { Component,Signal } from '@angular/core';
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
  projectList:Signal<Project[]> ;

  constructor(private projectService: ProjectService){
    this.projectList= this.projectService.getProjects();
  }
  Details(project:Project){
    this.projectService.selectProject(project);//event para dar seguimento ao event emitter output
  }
}
