import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitigeDetailComponent } from './litige-detail.component';

describe('LitigeDetailComponent', () => {
  let component: LitigeDetailComponent;
  let fixture: ComponentFixture<LitigeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitigeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LitigeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
