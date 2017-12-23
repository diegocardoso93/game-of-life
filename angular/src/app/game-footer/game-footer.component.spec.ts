import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFooterComponent } from './game-footer.component';

describe('GameFooterComponent', () => {
  let component: GameFooterComponent;
  let fixture: ComponentFixture<GameFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
