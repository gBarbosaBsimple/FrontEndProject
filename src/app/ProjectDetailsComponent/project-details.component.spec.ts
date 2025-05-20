import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailsComponent } from './project-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;

  const mockProject = {
    id: 1,
    title: 'Project Title',
    acronym: 'PT',
    initDate: new Date('2024-01-01'),
    finalDate: new Date('2024-12-31')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,ProjectDetailsComponent],
    }).compileComponents();//cria o componente de teste

    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    component.ngOnChanges({
        project: {
          currentValue: mockProject,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });
    fixture.detectChanges();
  });
  it('should create the section if projectForm is defined', () => {
    component.projectForm = component['fb'].group({});// cria forum
    fixture.detectChanges();
  
    const section = fixture.debugElement.query(By.css('.project-details-section'));
    expect(section).toBeTruthy(); 
  });


  it('should create the form with project data and disable ID input', () => {
    expect(component.projectForm).toBeDefined();//forum criado? top

    const idInput = fixture.debugElement.query(By.css('input[formControlName="id"]')).nativeElement;
    expect(idInput.disabled).toBeTrue();  
    expect(idInput.value).toBe(mockProject.id.toString());

    const titleInput = fixture.debugElement.query(By.css('input[formControlName="title"]')).nativeElement;
    expect(titleInput.value).toBe(mockProject.title); 

    const acronymInput = fixture.debugElement.query(By.css('input[formControlName="acronym"]')).nativeElement;
    expect(acronymInput.value).toBe(mockProject.acronym); 

    const initDateInput = fixture.debugElement.query(By.css('input[formControlName="initDate"]')).nativeElement;
    expect(initDateInput.value).toBe(component.formatDate(mockProject.initDate));

    const finalDateInput = fixture.debugElement.query(By.css('input[formControlName="finalDate"]')).nativeElement;
    expect(finalDateInput.value).toBe(component.formatDate(mockProject.finalDate)); 
  });//nativeelement é o valor real no html original

  it('should update form control when input value changes', () => {
    const titleInput = fixture.debugElement.query(By.css('input[formControlName="title"]')).nativeElement;
    titleInput.value = 'New Project Title';
    titleInput.dispatchEvent(new Event('input')); 
    fixture.detectChanges();

    expect(component.projectForm.controls['title'].value).toBe('New Project Title');
  });

  it('should have a submit button in the form', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button).toBeTruthy(); 
    expect(button.nativeElement.textContent).toContain('Save'); 
  });

  it('should emit projectEdit event with updated data on form submit', () => {
    spyOn(component.projectEdit, 'emit');

    component.projectForm.controls['title'].setValue('Updated Title');
    component.projectForm.controls['acronym'].setValue('UT');
    component.projectForm.controls['initDate'].setValue('2024-02-01');
    component.projectForm.controls['finalDate'].setValue('2024-11-30');

    // Simula submit do formulário
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();

    expect(component.projectEdit.emit).toHaveBeenCalledWith({
      id: mockProject.id,            
      title: 'Updated Title',          
      acronym: 'UT',                   
      initDate: new Date('2024-02-01'),
      finalDate: new Date('2024-11-30') 
    });
  });

  it('should not emit event if form is invalid', () => {
    spyOn(component.projectEdit, 'emit');

    component.projectForm.controls['title'].setValue('');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();

    expect(component.projectEdit.emit).not.toHaveBeenCalled();
  });

  it('should not display the form if project input is null', () => {
    component.project = null;
    component.projectForm = undefined!;
    fixture.detectChanges();

    const section = fixture.debugElement.query(By.css('.project-details-section'));
    expect(section).toBeNull(); 
  });
});
