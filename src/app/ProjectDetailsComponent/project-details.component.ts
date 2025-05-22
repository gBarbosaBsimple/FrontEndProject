import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, effect } from '@angular/core';
import { Project } from '../Interfaces/projectInterface';
import { ProjectService } from '../Services/projectService';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl:'project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent{
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder,private projectService:ProjectService) {
    effect(()=>{ 
      const project= this.projectService.getSelectedProject()();
      if(project){
        this.buildForm(project);
      }
    });
  }


  private buildForm(project: Project) {
    this.projectForm = this.fb.group({
      id: [{ value: project.id, disabled: true }], // ← desativa ID
      title: [project.title,Validators.required],//quando altero no teste um parametro tenho que fazer o validator
      acronym: [project.acronym,Validators.required],
      initDate: [this.formatDate(project.initDate),Validators.required],
      finalDate: [this.formatDate(project.finalDate),Validators.required],
    });
  }

  submitEdit() {
    if (!this.projectForm || this.projectForm.invalid) return;

    const raw = this.projectForm.getRawValue(); // inclui campos disabled como 'id'

    const updatedProject: Project = {
      ...raw,
      initDate: new Date(raw.initDate),
      finalDate: new Date(raw.finalDate),
    };

    this.projectService.updateProject(updatedProject);
  }

   formatDate(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }
}
