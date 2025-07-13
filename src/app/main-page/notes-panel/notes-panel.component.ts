import { Component, input, output } from '@angular/core';
import { NotePanelItemComponent } from './note-panel-item/note-panel-item.component';
import { Note } from '../note/note.component';

@Component({
  selector: 'app-notes-panel',
  imports: [NotePanelItemComponent],
  templateUrl: './notes-panel.component.html',
  styleUrl: './notes-panel.component.scss',
})
export class NotesPanelComponent {
  readonly notes = input.required<Note[]>();

  noteSelected = output<any>();

  readonly addNote = output<void>();
}
