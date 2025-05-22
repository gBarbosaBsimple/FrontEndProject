import { Component,Signal } from '@angular/core';
import { Project } from '../Interfaces/projectInterface';
import { ProjectService } from '../Services/projectService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-list-bullets',
  imports: [CommonModule],
  templateUrl: './project-list-bullets.component.html',
  styleUrl: './project-list-bullets.component.css'
})
export class ProjectListBulletsComponent {
  projectList: Signal<Project[]>;
  
  constructor(private projectService:ProjectService ){
    this.projectList= this.projectService.getProjects();
  }

  Details(project:Project){
    this.projectService.selectProject(project);
  }
}
