import { Component } from '@angular/core';
import { Project } from './projectInterface';
import { Collaborator } from './collaboratorInterface';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './ProjectDetailsComponent/project-details.component';
import { ProjectListComponent } from './ProjectComponent/project-list.component';
import { CollaboratorDetailsComponent } from './CollaboratorDetails/collaborator-details.component';
import { CollaboratorComponentComponent } from './CollaboratorComponent/collaborator-list.component';
import { ProjectService } from './Services/projectService';
import { CollaboratorService } from './Services/collaboratorService';
import { HolidayPlan } from './holidayPlanInterface';
import { HolidayPeriod } from './holidayPeriodInterface';
import { HolidayPlanService } from './Services/holidayPlanService';
import { HolidayPlanListComponent } from './holiday-plan-list/holiday-plan-list.component';
import { HolidayPlanDetailsComponent } from './HolidayPlanDetails/holiday-plan-details.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ProjectDetailsComponent,
    ProjectListComponent,
    CollaboratorDetailsComponent,
    CollaboratorComponentComponent,
    HolidayPlanListComponent,
    HolidayPlanDetailsComponent,
    FormsModule
  ],
  standalone: true,
  template: `

    <div>
      <button (click)="toggleView('project')">Projects</button>
      <button (click)="toggleView('collaborator')">Collaborators</button>
      <button (click)="toggleView('holidayPlan')">Holiday Plans</button>
    </div>


    <app-project-list *ngIf="viewType === 'project'" [projectList]="projectList" (projectSelected)="onProjectSelected($event)">
    </app-project-list>


     @if((viewType=='project') &&(selectedProject!=null)){
      <app-project-details [project]="selectedProject" (projectEdit)="onProjectEdit($event)">
      </app-project-details>
     }
  

    <app-collaborator-component *ngIf="viewType === 'collaborator'" [collaboratorList]="collaboratorList" (collaboratorSelected)="onCollaboratorSelected($event)">
    </app-collaborator-component>

    @if((viewType=='collaborator') &&(selectedCollaborator!=null)){
    <app-collaborator-details [collaborator]="selectedCollaborator" (collaboratorEdit)="onCollaboratorEdit($event)">
    </app-collaborator-details>}

    <app-holiday-plan-list *ngIf="viewType === 'holidayPlan'" [holidayPlanList]="holidayPlanList" (holidayPlanSelected)="onHolidayPlanSelected($event)">
    </app-holiday-plan-list>

    @if(viewType === 'holidayPlan' && selectedHolidayPlan!=null){
      <app-holiday-plan-details [holidayPlan]="selectedHolidayPlan" (holidayPlanEdit)="onHolidayPlanEdit($event)">
      </app-holiday-plan-details>
}
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedProject: Project | null = null;
  selectedCollaborator: Collaborator | null = null;
  selectedHolidayPlan: HolidayPlan | null = null;
  projectList: Project[] = [];
  collaboratorList: Collaborator[] = [];
  holidayPlanList: HolidayPlan[] = [];
  viewType: 'project' | 'collaborator' |'holidayPlan' = 'project'; 

  constructor(
    private projectService: ProjectService,
    private collaboratorService: CollaboratorService,
    private holidayPlanService: HolidayPlanService
  ) {}

  ngOnInit(): void {
    this.projectList = this.projectService.getProjects();
    this.collaboratorList = this.collaboratorService.getCollaborator();
    this.holidayPlanList = this.holidayPlanService.getHolidayPlans();
  }

  toggleView(view: 'project' | 'collaborator'|'holidayPlan'): void {
    this.viewType = view;
    this.selectedProject = null; 
    this.selectedCollaborator = null; 
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

  onCollaboratorSelected(collaborator: Collaborator) {
    this.selectedCollaborator = collaborator;
  }
  onCollaboratorEdit(updatedCollaborator: Collaborator) {
    const index = this.collaboratorList.findIndex((c) => c.id === updatedCollaborator.id);
    if (index !== -1) {
      this.collaboratorList[index] = { ...updatedCollaborator };
      this.selectedCollaborator = this.collaboratorList[index];
    }
  }
}
