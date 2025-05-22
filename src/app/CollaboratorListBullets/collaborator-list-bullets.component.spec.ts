import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorListBulletsComponent } from './collaborator-list-bullets.component';
import { CollaboratorService } from '../Services/collaboratorService';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('CollaboratorListBulletsComponent', () => {
  let component: CollaboratorListBulletsComponent;
  let fixture: ComponentFixture<CollaboratorListBulletsComponent>;
  let mockService: jasmine.SpyObj<CollaboratorService>;

  const mockCollaborators: Collaborator[] = [
    { id: 1, userId: 101, initDate: new Date(), finalDate: new Date() },
    { id: 2, userId: 102, initDate: new Date(), finalDate: new Date() },
    { id: 3, userId: 103, initDate: new Date(), finalDate: new Date() }
  ];

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<CollaboratorService>('CollaboratorService', [
      'getCollaboratorSignal',
      'selectCollaborator'
    ]);

    // Simula um signal com os dados mockados
    mockService.getCollaboratorSignal.and.returnValue(signal(mockCollaborators));

    await TestBed.configureTestingModule({
      imports: [CommonModule, CollaboratorListBulletsComponent],
      providers: [
        { provide: CollaboratorService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorListBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should render the section title', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Collaborator List (Bullets)');
  });

  it('should have a .bullet-container div', () => {
    const container = fixture.debugElement.query(By.css('.bullet-container'));
    expect(container).toBeTruthy();
  });

  it('each .bullet should be inside .bullet-container', () => {
    const container = fixture.debugElement.query(By.css('.bullet-container'));
    const bullets = container.queryAll(By.css('.bullet'));
    expect(bullets.length).toBe(mockCollaborators.length);
  });

  it('should render bullets for each collaborator', () => {
    const bulletElements = fixture.debugElement.queryAll(By.css('.bullet'));
    expect(bulletElements.length).toBe(mockCollaborators.length);
    bulletElements.forEach((el, index) => {
      expect(el.nativeElement.textContent).toContain(`. ${mockCollaborators[index].id}, ${mockCollaborators[index].userId}`);
    });
  });

  it('should call Details() method on bullet click', () => {
    spyOn(component, 'Details');
    const bullet = fixture.debugElement.query(By.css('.bullet'));
    bullet.triggerEventHandler('click', null);
    expect(component.Details).toHaveBeenCalledWith(mockCollaborators[0]);
  });

  it('should call CollaboratorService.selectCollaborator on Details()', () => {
    const collaborator = mockCollaborators[1];
    component.Details(collaborator);
    expect(mockService.selectCollaborator).toHaveBeenCalledWith(collaborator);
  });
});
