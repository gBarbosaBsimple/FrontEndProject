import { Component,effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project } from '../Interfaces/projectInterface';
import { ProjectDetailsComponent } from '../ProjectDetailsComponent/project-details.component';
import { ProjectListComponent } from '../ProjectComponent/project-list.component';
import { ProjectService } from '../Services/projectService';
import { ProjectListBulletsComponent } from '../project-list-bullets/project-list-bullets.component';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { CollaboratorDetailsComponent } from '../CollaboratorDetails/collaborator-details.component';
import { CollaboratorComponentComponent } from '../CollaboratorComponent/collaborator-list.component';
import { CollaboratorListBulletsComponent } from '../CollaboratorListBullets/collaborator-list-bullets.component';
import { CollaboratorService } from '../Services/collaboratorService';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';
import { HolidayPlanService } from '../Services/holidayPlanService';
import { HolidayPlanListComponent } from '../holiday-plan-list/holiday-plan-list.component';
import { HolidayPlanDetailsComponent } from '../HolidayPlanDetails/holiday-plan-details.component';
import { HolidayPlanListBulletsComponent } from '../holiday-plan-list-bullets/holiday-plan-list-bullets.component';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ProjectDetailsComponent,
    ProjectListComponent,
    ProjectListBulletsComponent,
    CollaboratorDetailsComponent,
    CollaboratorListBulletsComponent,
    CollaboratorComponentComponent,
    HolidayPlanListComponent,
    HolidayPlanDetailsComponent,
    HolidayPlanListBulletsComponent,
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
  viewType: 'project' | 'collaborator' |'holidayPlan' = 'project'; 

  constructor(
    private projectService: ProjectService,
    private collaboratorService: CollaboratorService,
    private holidayPlanService: HolidayPlanService
  ) {
    effect(() => {
      const collaborator = this.collaboratorService.getSelectedCollaboratorSignal()();
      const project = this.projectService.getSelectedProject()();
      const holidayPlan= this.holidayPlanService.getSelectedHolidayPlan()();

      this.selectedCollaborator = collaborator ? collaborator : null;
      this.selectedProject = project ? project : null; 
      this.selectedHolidayPlan=holidayPlan ? holidayPlan: null; });
  }

  toggleView(view: 'project' | 'collaborator'|'holidayPlan'): void {
    this.viewType = view;
    this.selectedProject = null; 
    this.selectedCollaborator=null; 
    this.selectedHolidayPlan = null;
    }
}
