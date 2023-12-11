import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecategorieComponent } from './servicecategorie.component';

describe('ServicecategorieComponent', () => {
  let component: ServicecategorieComponent;
  let fixture: ComponentFixture<ServicecategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicecategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicecategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
