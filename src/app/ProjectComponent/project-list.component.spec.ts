import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../Services/projectService';
import { Project } from '../Interfaces/projectInterface';
import { signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectServiceMock: Partial<ProjectService>;
  let projectsSignal: WritableSignal<Project[]>;

  const mockProjects: Project[] = [
    { id: 1, title: 'Project One', acronym: 'P1', initDate: new Date(), finalDate: new Date() },
    { id: 2, title: 'Project Two', acronym: 'P2', initDate: new Date(), finalDate: new Date() }
  ];

  beforeEach(async () => {
    projectsSignal = signal<Project[]>([]);

    projectServiceMock = {
      getProjects: () => projectsSignal.asReadonly(),
      selectProject: jasmine.createSpy('selectProject')
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ProjectListComponent],
      providers: [
        { provide: ProjectService, useValue: projectServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //html
  it('should render the title "Project List"', () => {
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.textContent).toContain('Project List');
  });
  
  it('should render the table headers correctly', () => {
    fixture.detectChanges();
    const headers = fixture.debugElement.queryAll(By.css('thead th'));
    const headerTexts = headers.map(th => th.nativeElement.textContent.trim());
    expect(headerTexts).toEqual(['ID', 'Title', 'Acronym', 'Actions']);
  });
  
  it('should render project list in a table', () => {
    projectsSignal.set(mockProjects);
    fixture.detectChanges();
  
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
  
    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('1');
    expect(firstRowCells[1].nativeElement.textContent).toContain('Project One');
    expect(firstRowCells[2].nativeElement.textContent).toContain('P1');
    expect(firstRowCells[3].nativeElement.textContent).toContain('Details');
  });
  
  it('should show empty table when there are no projects', () => {
    projectsSignal.set([]);
    fixture.detectChanges();
  
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });
  
  it('should render a Details button for each project', () => {
    projectsSignal.set(mockProjects);
    fixture.detectChanges();
  
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(mockProjects.length);
    buttons.forEach(button => {
      expect(button.nativeElement.textContent).toContain('Details');
    });
  });

  //metodos
  it(' constructor', () => {
    expect(component.projectList).toBeDefined();
    expect(component.projectList()).toEqual([]);
  });
  
  it('should call selectProject when Details button is clicked', () => {
    projectsSignal.set(mockProjects);
    fixture.detectChanges();
  
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
  
    expect(projectServiceMock.selectProject).toHaveBeenCalledWith(mockProjects[0]);
  });
});
