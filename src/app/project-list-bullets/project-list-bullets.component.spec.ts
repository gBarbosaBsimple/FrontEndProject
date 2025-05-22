import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListBulletsComponent } from './project-list-bullets.component';

describe('ProjectListBulletsComponent', () => {
  let component: ProjectListBulletsComponent;
  let fixture: ComponentFixture<ProjectListBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListBulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
