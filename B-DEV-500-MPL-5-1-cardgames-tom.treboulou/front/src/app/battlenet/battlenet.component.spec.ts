import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlenetComponent } from './battlenet.component';

describe('BattlenetComponent', () => {
  let component: BattlenetComponent;
  let fixture: ComponentFixture<BattlenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlenetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
