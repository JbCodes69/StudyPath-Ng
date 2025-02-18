import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouresComponent } from './coures.component';

describe('CouresComponent', () => {
  let component: CouresComponent;
  let fixture: ComponentFixture<CouresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
