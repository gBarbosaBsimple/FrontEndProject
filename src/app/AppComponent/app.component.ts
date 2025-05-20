import { Component,Signal,signal,effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Project } from '../Interfaces/projectInterface';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from '../ProjectDetailsComponent/project-details.component';
import { ProjectListComponent } from '../ProjectComponent/project-list.component';
import { CollaboratorDetailsComponent } from '../CollaboratorDetails/collaborator-details.component';
import { CollaboratorComponentComponent } from '../CollaboratorComponent/collaborator-list.component';
import { CollaboratorListBulletsComponent } from '../CollaboratorListBullets/collaborator-list-bullets.component';
import { ProjectService } from '../Services/projectService';
import { CollaboratorService } from '../Services/collaboratorService';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';
import { HolidayPeriod } from '../Interfaces/holidayPeriodInterface';
import { HolidayPlanService } from '../Services/holidayPlanService';
import { HolidayPlanListComponent } from '../holiday-plan-list/holiday-plan-list.component';
import { HolidayPlanDetailsComponent } from '../HolidayPlanDetails/holiday-plan-details.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ProjectDetailsComponent,
    ProjectListComponent,
    CollaboratorDetailsComponent,
    CollaboratorListBulletsComponent,
    CollaboratorComponentComponent,
    HolidayPlanListComponent,
    HolidayPlanDetailsComponent,
    FormsModule
  ],
  standalone: true,
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedProject: Project | null = null;
  selectedCollaborator: Collaborator | null = null;
  selectedHolidayPlan: HolidayPlan | null = null;
  projectList: Project[] = [];
  holidayPlanList: HolidayPlan[] = [];
  viewType: 'project' | 'collaborator' |'holidayPlan' = 'project'; 

  constructor(
    private projectService: ProjectService,
    private collaboratorService: CollaboratorService,
    private holidayPlanService: HolidayPlanService
  ) {
    
    this.projectList = this.projectService.getProjects();
    this.holidayPlanList = this.holidayPlanService.getHolidayPlans();
    effect(() => {
      const collaborator = this.collaboratorService.getSelectedCollaboratorSignal()();
    
      this.selectedCollaborator = collaborator ? collaborator : null;    });
  }

  toggleView(view: 'project' | 'collaborator'|'holidayPlan'): void {
    this.viewType = view;
    this.selectedProject = null; 
    this.selectedCollaborator=null; 
    this.selectedHolidayPlan = null;
    }

  onHolidayPlanSelected(plan: HolidayPlan) {
    this.selectedHolidayPlan = plan;
  }
  onHolidayPlanEdit(updatedPlan: HolidayPlan) {
    const index = this.holidayPlanList.findIndex(p => p.id === updatedPlan.id);
    if (index !== -1) {
      this.holidayPlanList[index] = { ...updatedPlan };
      this.selectedHolidayPlan = this.holidayPlanList[index];
    }}
  
  onProjectSelected(project: Project) {
    this.selectedProject = project;
  }
  onProjectEdit(updatedProject: Project) {
    const index = this.projectList.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      this.projectList[index] = { ...updatedProject };
      this.selectedProject = this.projectList[index];
    }
  }
}
