import { Component, input, output } from '@angular/core';
import { Note } from '../../note/note.component';
import { TruncatePipe } from './truncate.pipe';
import { Tab } from '../../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-note-panel-item',
  imports: [TruncatePipe],
  templateUrl: './note-panel-item.component.html',
  styleUrl: './note-panel-item.component.scss',
})
export class NotePanelItemComponent {
  readonly note = input.required<Note>();

  readonly tab = input.required<Tab>();

  selected = output<Note>();

  deleted = output<Note>();

  protected readonly Tab = Tab;
}
