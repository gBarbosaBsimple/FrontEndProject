import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProjectDetailsComponent } from './project-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../Services/projectService';
import { Project } from '../Interfaces/projectInterface';
import { By } from '@angular/platform-browser';
import { signal, Signal } from '@angular/core';
import { WritableSignal } from '@angular/core';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;

  let projectServiceMock: Partial<ProjectService>;//utilizamos as propriedades e metodos que quisermos do serviço
  let selectedProjectSignal: WritableSignal<Project | null>;

  const testProject: Project = {
    id: 1,
    title: 'Test Project',
    acronym: 'TP',
    initDate: new Date('2025-01-01'),
    finalDate: new Date('2025-12-31'),
  };

  beforeEach(async () => {
    // Inicializa signal com null para começar
    selectedProjectSignal = signal<Project | null>(null);

    // Mock parcial do serviço, só com getSelectedProject a devolver a signal readonly
    projectServiceMock = {
      getSelectedProject: () => selectedProjectSignal.asReadonly(),
      updateProject: jasmine.createSpy('updateProject')//função fake
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,ProjectDetailsComponent],
      declarations: [],
      providers: [
        { provide: ProjectService, useValue: projectServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
  });

  // TESTES DO HTML
  it('should render form with all input fields and a Save button', () => {
    // Arrange
    selectedProjectSignal.set(testProject);//da valores
    fixture.detectChanges();

    // Act form controller name- inputs
    const idInput = fixture.debugElement.query(By.css('input[formControlName="id"]'));
    const titleInput = fixture.debugElement.query(By.css('input[formControlName="title"]'));
    const acronymInput = fixture.debugElement.query(By.css('input[formControlName="acronym"]'));
    const initDateInput = fixture.debugElement.query(By.css('input[formControlName="initDate"]'));
    const finalDateInput = fixture.debugElement.query(By.css('input[formControlName="finalDate"]'));
    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    // Assert: inputs c valores crretos
    expect(idInput).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(acronymInput).toBeTruthy();
    expect(initDateInput).toBeTruthy();
    expect(finalDateInput).toBeTruthy();
    expect(saveButton).toBeTruthy();

    expect(idInput.nativeElement.value).toBe(testProject.id.toString());
    expect(titleInput.nativeElement.value).toBe(testProject.title);
    expect(acronymInput.nativeElement.value).toBe(testProject.acronym);
    expect(initDateInput.nativeElement.value).toBe(component.formatDate(testProject.initDate));
    expect(finalDateInput.nativeElement.value).toBe(component.formatDate(testProject.finalDate));
  });

  //chatgpt
  it('should disable the ID input field', () => {
    selectedProjectSignal.set(testProject);
    fixture.detectChanges();

    const idInput = fixture.debugElement.query(By.css('input[formControlName="id"]'));
    expect(idInput.nativeElement.disabled).toBeTrue();
  });

  // TESTES DOS MÉTODOS DA CLASSE
  it('constructor', () => {
    // Arrange
    expect(component.projectForm).toBeUndefined();

    // Act
    selectedProjectSignal.set(testProject);
    fixture.detectChanges();

    // Assert
    expect(component.projectForm).toBeTruthy();
    expect(component.projectForm.get('title')?.value).toBe(testProject.title);
  });

  it('should build form correctly when a project is selected', () => {
    // Arrange + Act
    component['buildForm'](testProject);

    // Assert
    expect(component.projectForm).toBeTruthy();
    expect(component.projectForm.getRawValue().id).toBe(testProject.id);
    expect(component.projectForm.get('title')?.value).toBe(testProject.title);
    expect(component.projectForm.get('acronym')?.value).toBe(testProject.acronym);
    expect(component.projectForm.get('initDate')?.value).toBe(component.formatDate(testProject.initDate));
    expect(component.projectForm.get('finalDate')?.value).toBe(component.formatDate(testProject.finalDate));
  });

  it('should formatDate return correct string format', () => {
    const date = new Date('2025-12-31');
    const formatted = component.formatDate(date);
    expect(formatted).toBe('2025-12-31');
  });

  
  it('should call updateProject on submitEdit when form is valid', () => {
    // Arrange
    component['buildForm'](testProject);
    fixture.detectChanges();

    component.projectForm.get('title')?.setValue('Updated Title');
    component.projectForm.get('initDate')?.setValue('2025-01-10');
    component.projectForm.get('finalDate')?.setValue('2025-12-25');

    // Act
    component.submitEdit();

    // Assert
    expect(projectServiceMock.updateProject).toHaveBeenCalledTimes(1);
    const updatedArg = (projectServiceMock.updateProject as jasmine.Spy).calls.mostRecent().args[0];
   // expect(testProject.title).toBe('Updated Title');
    expect(updatedArg.initDate).toEqual(new Date('2025-01-10'));
    expect(updatedArg.finalDate).toEqual(new Date('2025-12-25'));
  });

  it('should not call updateProject if form is invalid', () => {
    // Arrange
    component['buildForm'](testProject);
    component.projectForm.get('title')?.setValue(''); // Title is required -> invalid form

    // Act
    component.submitEdit();

    // Assert
    expect(projectServiceMock.updateProject).not.toHaveBeenCalled();
  });
});
