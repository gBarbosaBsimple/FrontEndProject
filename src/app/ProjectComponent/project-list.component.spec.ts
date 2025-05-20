import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { Project } from '../Interfaces/projectInterface';
import { By } from '@angular/platform-browser';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  const mockProjects: Project[] = [
    { 
      id: 1, 
      title: 'Project Alpha', 
      acronym: 'ALP',
      initDate: new Date('2023-01-01'), 
      finalDate: new Date('2023-12-31')
    },
    { 
      id: 2, 
      title: 'Project Beta', 
      acronym: 'BET',
      initDate: new Date('2024-01-01'), 
      finalDate: new Date('2024-12-31')
    },
    { 
      id: 3, 
      title: 'Project Gamma', 
      acronym: 'GAM',
      initDate: new Date('2025-01-01'), 
      finalDate: new Date('2025-12-31')
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],  // Importa o componente direto
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    component.projectList = mockProjects; // Força a lista mockada
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should render correct number of rows for projects', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockProjects.length);
  });

  it('should display project data correctly', () => {
    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');
    expect(cells[0].textContent).toBe('1');
    expect(cells[1].textContent).toBe('Project Alpha');
    expect(cells[2].textContent).toBe('ALP');
  });

  it('should call Details method when button is clicked', () => {
    spyOn(component, 'Details');
    const firstButton = fixture.debugElement.query(By.css('tbody tr:first-child button'));
    firstButton.triggerEventHandler('click', null);
    expect(component.Details).toHaveBeenCalledWith(mockProjects[0]);
  });

  it('should emit project when Details method is called', () => {
    spyOn(component.projectSelected, 'emit');
    const project = mockProjects[0];
    component.Details(project);
    expect(component.projectSelected.emit).toHaveBeenCalledWith(project);
  });

  it('should display "Details" button', () => {
    const button = fixture.debugElement.query(By.css('tbody tr:first-child button'));
    expect(button.nativeElement.textContent).toBe('Details');
  });

  it('should render no rows when projectList is empty', () => {
    component.projectList = [];
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
  });
});
