import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesManagerComponent } from './policies-manager.component';

describe('PoliciesManagerComponent', () => {
  let component: PoliciesManagerComponent;
  let fixture: ComponentFixture<PoliciesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
