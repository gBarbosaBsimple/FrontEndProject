import { TestBed } from '@angular/core/testing';
import { CollaboratorService } from './collaboratorService';
import { Collaborator } from '../Interfaces/collaboratorInterface';
//TODO::uma classe com a inicialização do array e um serviço apenas com signals

describe('CollaboratorService (Angular Signal-compliant)', () => {
  let service: CollaboratorService;

  const initialData: Collaborator[] = [
    { id: 1, userId: 101, initDate: new Date('2023-01-01'), finalDate: new Date('2023-12-31') },
    { id: 2, userId: 102, initDate: new Date('2024-02-01'), finalDate: new Date('2024-11-30') },
    { id: 3, userId: 103, initDate: new Date('2025-05-10'), finalDate: new Date('2025-12-10') }
  ];
  //antes de cada it
  beforeEach(() => {
    TestBed.configureTestingModule({});//configura o ambiente de teste antes de cada teste rodar
    service = TestBed.inject(CollaboratorService);//dependency injection
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial collaborator list', () => {
    const collaborators = service.getCollaboratorSignal()();
    expect(collaborators.length).toBe(3);
    expect(collaborators).toEqual(initialData);
  });

  it('should return null initially as selected collaborator', () => {
    const selected = service.getSelectedCollaboratorSignal()();
    expect(selected).toBeNull();
  });

  it('should select a collaborator', () => {
    const collaboratorToSelect = initialData[1];
    service.selectCollaborator(collaboratorToSelect);
    const selected = service.getSelectedCollaboratorSignal()();
    expect(selected).toEqual(collaboratorToSelect);
  });

  it('should update a collaborator in the list', () => {
    const updated: Collaborator = {
      id: 2,
      userId: 999,
      initDate: new Date('2024-03-01'),
      finalDate: new Date('2024-12-31')
    };

    service.updateCollaborator(updated);

    const list = service.getCollaboratorSignal()();
    const found = list.find(c => c.id === 2);

    expect(found).toEqual(updated);
  });

  it('should also update selected collaborator if same ID', () => {
    const original = initialData[0];
    service.selectCollaborator(original);

    const updated: Collaborator = {
      ...original,
      userId: 777
    };

    service.updateCollaborator(updated);

    const selected = service.getSelectedCollaboratorSignal()();
    expect(selected).toEqual(updated);
  });

  it('should not change selected collaborator if a different one is updated', () => {
    const selected = initialData[0];
    const updated = { ...initialData[1], userId: 888 };

    service.selectCollaborator(selected);
    service.updateCollaborator(updated);

    expect(service.getSelectedCollaboratorSignal()()).toEqual(selected);
  });
});
