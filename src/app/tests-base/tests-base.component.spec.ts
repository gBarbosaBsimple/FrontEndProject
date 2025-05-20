import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEstsBaseComponent } from './tests-base.component';

describe('TEstsBaseComponent', () => {
  let component: TEstsBaseComponent;
  let fixture: ComponentFixture<TEstsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TEstsBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TEstsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
