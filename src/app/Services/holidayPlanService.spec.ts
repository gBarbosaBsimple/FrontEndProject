import { TestBed } from '@angular/core/testing';
import { HolidayPlanService } from './holidayPlanService';
import { HolidayPlan } from '../Interfaces/holidayPlanInterface';

describe('HolidayPlanService (Angular Signal-compliant)', () => {
  let service: HolidayPlanService;

  const initialData: HolidayPlan[] = [
    {
      id: 1,
      collaboratorId: 101,
      holidayPeriod: [
        { initDate: new Date('2025-06-01'), finalDate: new Date('2025-06-10') },
        { initDate: new Date('2025-08-15'), finalDate: new Date('2025-08-22') }
      ]
    },
    {
      id: 2,
      collaboratorId: 102,
      holidayPeriod: [
        { initDate: new Date('2025-07-01'), finalDate: new Date('2025-07-10') }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayPlanService);
  });

  it('should be created', () => {
    // Act & Assert
    expect(service).toBeTruthy();
  });

  it('should return the initial holiday plan list', () => {
    // Act
    const plans = service.getHolidayPlans()();

    // Assert
    expect(plans.length).toBe(2);
    expect(plans).toEqual(initialData);
  });

  it('should return null initially as selected holiday plan', () => {
    // Act
    const selected = service.getSelectedHolidayPlan()();

    // Assert
    expect(selected).toBeNull();
  });

  it('should select a holiday plan', () => {
    // Arrange
    const planToSelect = initialData[1];

    // Act
    service.selectHolidayPlan(planToSelect);
    const selected = service.getSelectedHolidayPlan()();

    // Assert
    expect(selected).toEqual(planToSelect);
  });

  it('should update a holiday plan in the list', () => {
    // Arrange
    const updated: HolidayPlan = {
      id: 2,
      collaboratorId: 102,
      holidayPeriod: [
        { initDate: new Date('2025-07-01'), finalDate: new Date('2025-07-15') }, // mudou finalDate
      ]
    };

    // Act
    service.updateHolidayPlan(updated);
    const list = service.getHolidayPlans()();
    const found = list.find(p => p.id === 2);

    // Assert
    expect(found).toEqual(updated);
  });

  it('should also update selected holiday plan if same ID', () => {
    // Arrange
    const original = initialData[0];
    service.selectHolidayPlan(original);

    const updated: HolidayPlan = {
      ...original,
      holidayPeriod: [...original.holidayPeriod, { initDate: new Date('2025-09-01'), finalDate: new Date('2025-09-05') }]
    };

    // Act
    service.updateHolidayPlan(updated);
    const selected = service.getSelectedHolidayPlan()();

    // Assert
    expect(selected).toEqual(updated);
  });

  it('should not change selected holiday plan if a different one is updated', () => {
    // Arrange
    const selected = initialData[0];
    const updated = {
      ...initialData[1],
      holidayPeriod: [...initialData[1].holidayPeriod, { initDate: new Date('2025-07-20'), finalDate: new Date('2025-07-25') }]
    };

    service.selectHolidayPlan(selected);

    // Act
    service.updateHolidayPlan(updated);

    // Assert
    expect(service.getSelectedHolidayPlan()()).toEqual(selected);
  });

  it('should add a new holiday period to a holiday plan', () => {
    // Arrange
    const newPeriod = { initDate: new Date('2025-10-01'), finalDate: new Date('2025-10-05') };
    const planId = 1;

    // Act
    service.addHolidayPeriod(planId, newPeriod);
    const updatedPlan = service.getHolidayPlans()().find(p => p.id === planId);

    // Assert
    expect(updatedPlan).toBeDefined();
    expect(updatedPlan!.holidayPeriod).toContain(newPeriod);
  });

  it('should update selected holiday plan when adding new holiday period to it', () => {
    // Arrange
    const planToSelect = initialData[0];
    service.selectHolidayPlan(planToSelect);

    const newPeriod = { initDate: new Date('2025-12-01'), finalDate: new Date('2025-12-10') };

    // Act
    service.addHolidayPeriod(planToSelect.id, newPeriod);
    const selected = service.getSelectedHolidayPlan()();

    // Assert
    expect(selected).toBeDefined();
    expect(selected!.holidayPeriod).toContain(newPeriod);
  });
});
