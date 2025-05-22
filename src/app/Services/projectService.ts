import { Injectable, signal } from '@angular/core';
import { Project } from '../Interfaces/projectInterface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectListSignal = signal<Project[]>([
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
  ]);

  private selectedProjectSignal = signal<Project | null>(null);

  getProjects() {
    return this.projectListSignal.asReadonly();
  }

  getSelectedProject() {
    return this.selectedProjectSignal.asReadonly();
  }

  selectProject(project: Project) {
    this.selectedProjectSignal.set(project);
  }

  updateProject(updatedProject: Project) {
    const updatedList = this.projectListSignal().map(p =>
      p.id === updatedProject.id ? updatedProject : p
    );
    this.projectListSignal.set(updatedList);

    if (this.selectedProjectSignal()?.id === updatedProject.id) {
      this.selectedProjectSignal.set(updatedProject);
    }
  }
}
