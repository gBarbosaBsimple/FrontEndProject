/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorComponentComponent } from './collaborator-list.component';
import { Collaborator } from '../collaboratorInterface';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('CollaboratorComponentComponent', () => {
  let component: CollaboratorComponentComponent;
  let fixture: ComponentFixture<CollaboratorComponentComponent>;

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
        userId: 102,
        initDate: new Date('2024-01-01'),
        finalDate: new Date('2024-12-31'),
      },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorComponentComponent], // Importa o componente
      providers:[DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorComponentComponent);// é a navegação do html noo component especifico
    component = fixture.componentInstance;
    component.collaboratorList = mockCollaborators; // Força a lista de colaboradores mockada
    fixture.detectChanges(); // Atualiza a visualização com os dados mockados
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table', () => {
       const table= fixture.nativeElement.querySelector('table');
       expect(table).toBeTruthy();//verificar se a tabela existe na interface
  });

  it('should display collaborator data correctly', () => {
        const list=fixture.nativeElement.querySelectorAll('tbody tr td');//navegar pelo html
        expect(list[0].textContent).toBe('1');//textcontent para ir buscar os conteudos de tds
        expect(list[1].textContent).toBe('101');
        expect(list[2].textContent).toBe('1/1/23');
        expect(list[3].textContent).toBe('12/31/23');
  });

  it('should call Details method when button is clicked', () => {
    spyOn(component, 'Details'); //emiçao do button
    const firstButton = fixture.debugElement.query(By.css('table tbody tr:nth-child(1) button'));
    firstButton.triggerEventHandler('click', null); // Dispara o evento de clique
    expect(component.Details).toHaveBeenCalledWith(mockCollaborators[0]);
  });

  it('should emit collaborator when Details method is called', () => {
    spyOn(component.collaboratorSelected, 'emit'); 

    const collaborator = mockCollaborators[0];
    component.Details(collaborator);

    expect(component.collaboratorSelected.emit).toHaveBeenCalledWith(collaborator); 
  });

  it('should display "Details" button', () => {
    const button = fixture.debugElement.query(By.css('table tbody tr:nth-child(1) button'));
    expect(button.nativeElement.textContent).toBe('Details'); 
  });
});
 */