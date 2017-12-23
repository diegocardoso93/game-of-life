import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCelluleComponent } from './game-cellule.component';

describe('GameCelluleComponent', () => {
  let component: GameCelluleComponent;
  let fixture: ComponentFixture<GameCelluleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCelluleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCelluleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
