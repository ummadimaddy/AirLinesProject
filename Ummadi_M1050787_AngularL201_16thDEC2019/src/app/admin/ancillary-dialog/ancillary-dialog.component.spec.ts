import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AncillaryDialogComponent } from './ancillary-dialog.component';

describe('AncillaryDialogComponent', () => {
  let component: AncillaryDialogComponent;
  let fixture: ComponentFixture<AncillaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncillaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncillaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
