import { TestBed } from '@angular/core/testing';
import { ProjectService } from './projectService';
import { Project } from '../Interfaces/projectInterface';

describe('ProjectService (Angular Signal-compliant)', () => {
  let service: ProjectService;

  // Arrange - dados iniciais para os testes
  const initialData: Project[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    // Act & Assert
    expect(service).toBeTruthy();
  });

  it('should return the initial project list', () => {
    // Act
    const projects = service.getProjects()();

    // Assert
    expect(projects.length).toBe(3);
    expect(projects).toEqual(initialData);
  });

  it('should return null initially as selected project', () => {
    // Act
    const selected = service.getSelectedProject()();

    // Assert
    expect(selected).toBeNull();
  });

  it('should select a project', () => {
    // Arrange
    const projectToSelect = initialData[1];

    // Act
    service.selectProject(projectToSelect);
    const selected = service.getSelectedProject()();

    // Assert
    expect(selected).toEqual(projectToSelect);
  });

  it('should update a project in the list', () => {
    // Arrange
    const updated: Project = {
      id: 2,
      title: 'Mobile App Revamp',
      acronym: 'MADV',
      initDate: new Date('2024-09-01'),
      finalDate: new Date('2025-04-30'),
    };

    // Act
    service.updateProject(updated);
    const list = service.getProjects()();
    const found = list.find(p => p.id === 2);

    // Assert
    expect(found).toEqual(updated);
  });

  it('should also update selected project if same ID', () => {
    // Arrange
    const original = initialData[0];
    service.selectProject(original);

    const updated: Project = {
      ...original,
      title: 'Website Redesign v2',
      acronym: 'WR2025V2'
    };

    // Act
    service.updateProject(updated);
    const selected = service.getSelectedProject()();

    // Assert
    expect(selected).toEqual(updated);
  });

  it('should not change selected project if a different one is updated', () => {
    // Arrange
    const selected = initialData[0];
    const updated = {
      ...initialData[1],
      title: 'Mobile App Updated',
      acronym: 'MADUPD'
    };

    service.selectProject(selected);

    // Act
    service.updateProject(updated);

    // Assert
    expect(service.getSelectedProject()()).toEqual(selected);
  });
});
