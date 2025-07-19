import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigeComponent } from './litige.component';

describe('LitigeComponent', () => {
  let component: LitigeComponent;
  let fixture: ComponentFixture<LitigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LitigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
