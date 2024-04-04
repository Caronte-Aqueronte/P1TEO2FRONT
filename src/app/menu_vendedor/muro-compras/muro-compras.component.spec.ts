import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuroComprasComponent } from './muro-compras.component';

describe('MuroComprasComponent', () => {
  let component: MuroComprasComponent;
  let fixture: ComponentFixture<MuroComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuroComprasComponent]
    });
    fixture = TestBed.createComponent(MuroComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
