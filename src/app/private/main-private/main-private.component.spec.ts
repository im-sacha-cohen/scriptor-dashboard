import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPrivateComponent } from './main-private.component';

describe('MainPrivateComponent', () => {
  let component: MainPrivateComponent;
  let fixture: ComponentFixture<MainPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPrivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
