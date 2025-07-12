import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePanelItemComponent } from './note-panel-item.component';

describe('NotePanelItemComponent', () => {
  let component: NotePanelItemComponent;
  let fixture: ComponentFixture<NotePanelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotePanelItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotePanelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
