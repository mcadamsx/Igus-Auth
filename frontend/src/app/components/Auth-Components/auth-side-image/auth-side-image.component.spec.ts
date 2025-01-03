import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSideImageComponent } from './auth-side-image.component';

describe('AuthSideImageComponent', () => {
  let component: AuthSideImageComponent;
  let fixture: ComponentFixture<AuthSideImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthSideImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthSideImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
