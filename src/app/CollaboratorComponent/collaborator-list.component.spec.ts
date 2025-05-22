import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorComponentComponent } from './collaborator-list.component';
import { CollaboratorService } from '../Services/collaboratorService';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { By } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { signal } from '@angular/core';

describe('CollaboratorComponentComponent', () => {
  let component: CollaboratorComponentComponent;
  let fixture: ComponentFixture<CollaboratorComponentComponent>;
  let mockService: jasmine.SpyObj<CollaboratorService>;

  const mockCollaborators: Collaborator[] = [
    {
      id: 1,
      userId: 101,
      initDate: new Date('2023-01-01'),
      finalDate: new Date('2023-12-31'),
    },
    {
      id: 2,
      userId: 102,
      initDate: new Date('2024-01-01'),
      finalDate: new Date('2024-12-31'),
    },
    {
      id: 3,
      userId: 103,
      initDate: new Date('2024-05-01'),
      finalDate: new Date('2024-12-31'),
    },
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<CollaboratorService>('CollaboratorService', [
      'getCollaboratorSignal',
      'selectCollaborator'
    ]);

    mockService.getCollaboratorSignal.and.returnValue(signal(mockCollaborators));

    await TestBed.configureTestingModule({
      imports: [CommonModule, CollaboratorComponentComponent],
      providers: [
        { provide: CollaboratorService, useValue: mockService },
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorComponentComponent);
    component = fixture.componentInstance;
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
    expect(rows.length).toBe(mockCollaborators.length);
  });

  it('should display collaborator data correctly', () => {
    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');
    expect(cells.length).toBe(5); // ID, UserId, Start, End, Actions
    expect(cells[0].textContent).toContain('1');
    expect(cells[1].textContent).toContain('101');
    expect(cells[2].textContent).toContain('1/1/23'); // DatePipe: 'shortDate'
    expect(cells[3].textContent).toContain('12/31/23');
  });

  it('should call Details method when button is clicked', () => {
    spyOn(component, 'Details');
    const button = fixture.debugElement.query(By.css('tbody tr:first-child button'));
    button.triggerEventHandler('click', null);
    expect(component.Details).toHaveBeenCalledWith(mockCollaborators[0]);
  });

  it('should call CollaboratorService.selectCollaborator when Details is called', () => {
    component.Details(mockCollaborators[1]);
    expect(mockService.selectCollaborator).toHaveBeenCalledWith(mockCollaborators[1]);
  });

  it('should display "Details" button for each row', () => {
    const buttons = fixture.debugElement.queryAll(By.css('tbody tr button'));
    expect(buttons.length).toBe(mockCollaborators.length);
    expect(buttons[0].nativeElement.textContent).toContain('Details');
  });
});
