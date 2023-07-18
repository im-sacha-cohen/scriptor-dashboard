import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkNewComponent } from './link-new.component';

describe('LinkNewComponent', () => {
  let component: LinkNewComponent;
  let fixture: ComponentFixture<LinkNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
