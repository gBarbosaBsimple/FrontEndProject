import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProjectService } from './Services/projectService';
import { CollaboratorService } from './Services/collaboratorService';
import { HolidayPlanService } from './Services/holidayPlanService';
import { Project } from './projectInterface';
import { Collaborator } from './collaboratorInterface';
import { HolidayPlan } from './holidayPlanInterface';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const mockProjects: Project[] = [
    {
      id: 1,
      title: 'Website Redesign',
      acronym: 'WR2025',
      initDate: new Date('2025-01-15'),
      finalDate: new Date('2025-06-30'),
    },
    {
      id: 2,
      title: 'Mobile App Development',
      acronym: 'MAD',
      initDate: new Date('2024-09-01'),
      finalDate: new Date('2025-03-15'),
    },
    {
      id: 3,
      title: 'Internal Tools Automation',
      acronym: 'ITA',
      initDate: new Date('2024-11-01'),
      finalDate: new Date('2025-02-28'),
    },
  ];

  const mockCollaborators: Collaborator[] = [
    {
      id: 1,
      userId: 101,
      initDate: new Date('2023-01-01T00:00:00'),
      finalDate: new Date('2023-12-31T23:59:59'),
    },
    {
      id: 2,
      userId: 102,
      initDate: new Date('2024-02-01T08:00:00'),
      finalDate: new Date('2024-11-30T18:00:00'),
    },
    {
      id: 3,
      userId: 103,
      initDate: new Date('2025-05-10T09:00:00'),
      finalDate: new Date('2025-12-10T17:00:00'),
    },
  ];

  const mockHolidayPlans: HolidayPlan[] = [
    {
      id: 1,
      collaboratorId: 101,
      holidayPeriod: [
        { initDate: new Date('2025-06-01'), finalDate: new Date('2025-06-10') },
        { initDate: new Date('2025-08-15'), finalDate: new Date('2025-08-22') },
      ],
    },
    {
      id: 2,
      collaboratorId: 102,
      holidayPeriod: [
        { initDate: new Date('2025-07-01'), finalDate: new Date('2025-07-10') },
      ],
    },
  ];
  
  const mockProjectService = {
    getProjects: () => mockProjects,
  };

  const mockCollaboratorService = {
    getCollaborator: () => mockCollaborators,
  };

  const mockHolidayPlanService = {
    getHolidayPlans: () => mockHolidayPlans,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: CollaboratorService, useValue: mockCollaboratorService },
        { provide: HolidayPlanService, useValue: mockHolidayPlanService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load project, collaborator, and holiday plan data correctly', () => {
    expect(component.projectList.length).toBe(3);
    expect(component.collaboratorList.length).toBe(3);
    expect(component.holidayPlanList.length).toBe(2);
  });
//toogle
  it('should switch view type and reset selection', () => {
    component.selectedProject = mockProjects[0];
    component.selectedCollaborator = mockCollaborators[1];
    component.selectedHolidayPlan = mockHolidayPlans[0];

    component.toggleView('collaborator');
    expect(component.viewType).toBe('collaborator');
    expect(component.selectedProject).toBeNull();
    expect(component.selectedCollaborator).toBeNull();
    expect(component.selectedHolidayPlan).toBeNull();
  });

  it('should select and edit project correctly', () => {
    const updated = { ...mockProjects[0], title: 'Updated Project' };
    component.onProjectSelected(mockProjects[0]);
    expect(component.selectedProject).toEqual(mockProjects[0]);

    component.onProjectEdit(updated);
    expect(component.projectList[0].title).toBe('Updated Project');
    expect(component.selectedProject?.title).toBe('Updated Project');
  });

  it('should select and edit collaborator correctly', () => {
    const updated = { ...mockCollaborators[1], userId: 999 };
    component.onCollaboratorSelected(mockCollaborators[1]);
    expect(component.selectedCollaborator).toEqual(mockCollaborators[1]);

    component.onCollaboratorEdit(updated);
    expect(component.collaboratorList[1].userId).toBe(999);
    expect(component.selectedCollaborator?.userId).toBe(999);
  });

  it('should select and edit holiday plan correctly', () => {
    const updated = {
      ...mockHolidayPlans[1],
      holidayPeriod: [{ initDate: new Date('2025-12-01'), finalDate: new Date('2025-12-10') }],
    };

    component.onHolidayPlanSelected(mockHolidayPlans[1]);
    expect(component.selectedHolidayPlan).toEqual(mockHolidayPlans[1]);

    component.onHolidayPlanEdit(updated);
    expect(component.holidayPlanList[1].holidayPeriod.length).toBe(1);
    expect(component.selectedHolidayPlan?.holidayPeriod[0].initDate).toEqual(new Date('2025-12-01'));
  });
});
