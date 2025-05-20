import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorListBulletsComponent } from './collaborator-list-bullets.component';

describe('CollaboratorListBulletsComponent', () => {
  let component: CollaboratorListBulletsComponent;
  let fixture: ComponentFixture<CollaboratorListBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorListBulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorListBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
