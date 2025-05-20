import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../Interfaces/projectInterface';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl:'project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnChanges{
  @Input() project:Project|null=null
  @Output() projectEdit= new EventEmitter<Project>();
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.buildForm(this.project);
    }
  }

  private buildForm(project: Project) {
    this.projectForm = this.fb.group({
      id: [{ value: project.id, disabled: true }], // ← desativa edição do ID
      title: [project.title,Validators.required],//quando altero no teste um parametro tenho que fazer o validator
      acronym: [project.acronym],
      initDate: [this.formatDate(project.initDate)],
      finalDate: [this.formatDate(project.finalDate)],
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

    this.projectEdit.emit(updatedProject);
  }

   formatDate(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }
}
