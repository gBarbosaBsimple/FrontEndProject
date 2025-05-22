import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CollaboratorService } from '../Services/collaboratorService';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { signal } from '@angular/core';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { By } from '@angular/platform-browser';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let mockService: jasmine.SpyObj<CollaboratorService>;

  const mockCollaborator: Collaborator = {
    id: 1,
    userId: 101,
    initDate: new Date('2023-01-01'),
    finalDate: new Date('2023-12-31')
  };

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<CollaboratorService>('CollaboratorService', [
      'getSelectedCollaboratorSignal',
      'updateCollaborator'
    ]);

    mockService.getSelectedCollaboratorSignal.and.returnValue(signal(mockCollaborator));

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, CollaboratorDetailsComponent],
      providers: [
        { provide: CollaboratorService, useValue: mockService },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should build form with selected collaborator', () => {
    expect(component.collaboratorForm).toBeTruthy();
    expect(component.collaboratorForm.get('id')?.value).toBe(mockCollaborator.id);
    expect(component.collaboratorForm.get('userId')?.value).toBe(mockCollaborator.userId);
    expect(component.collaboratorForm.get('initDate')?.value).toBe('2023-01-01');
    expect(component.collaboratorForm.get('finalDate')?.value).toBe('2023-12-31');
  });

  it('should not submit if form is invalid', () => {
    const form = component.collaboratorForm;
  
    // invalida o campo obrigatório
    form.get('userId')?.setValue(null);
    fixture.detectChanges();
  
    expect(form.invalid).toBeTrue(); // verifica mesmo!
  
    // simula o submit real
    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();
  
    expect(mockService.updateCollaborator).not.toHaveBeenCalled();
  });

  it('should call updateCollaborator on submit', () => {
    spyOn(component, 'submitEdit').and.callThrough();
    const form = component.collaboratorForm;
    form.get('userId')?.setValue(202);
    form.get('initDate')?.setValue('2023-05-01');
    form.get('finalDate')?.setValue('2023-12-31');

    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', {});
    expect(component.submitEdit).toHaveBeenCalled();
    expect(mockService.updateCollaborator).toHaveBeenCalledWith({
      id: 1,
      userId: 202,
      initDate: new Date('2023-05-01'),
      finalDate: new Date('2023-12-31')
    });
  });

  it('should render form inputs correctly in template', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(4);

    const idInput = inputs[0].nativeElement as HTMLInputElement;
    expect(idInput.disabled).toBeTrue();
    expect(idInput.value).toBe('1');

    const userIdInput = inputs[1].nativeElement as HTMLInputElement;
    expect(userIdInput.value).toBe('101');
  });

  it('should display all labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('label'));
    const expectedLabels = ['ID:', 'userId:', 'Start Date:', 'End Date:'];

    expectedLabels.forEach(label => {
      expect(labels.some(l => l.nativeElement.textContent.includes(label))).toBeTrue();
    });
  });

  it('should render Save button with type submit', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Save');
  });

  it('should not crash if no collaborator is selected (signal = null)', () => {
    mockService.getSelectedCollaboratorSignal.and.returnValue(signal(null));
    const newFixture = TestBed.createComponent(CollaboratorDetailsComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    expect(newComponent.collaboratorForm).toBeUndefined();
  });
});
