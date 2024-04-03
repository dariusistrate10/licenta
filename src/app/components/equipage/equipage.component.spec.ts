import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipageComponent } from './equipage.component';

describe('EquipageComponent', () => {
  let component: EquipageComponent;
  let fixture: ComponentFixture<EquipageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
