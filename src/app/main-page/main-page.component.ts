import { Component, signal, WritableSignal } from '@angular/core';
import { NotesPanelComponent } from './notes-panel/notes-panel.component';
import { Note, NoteComponent } from './note/note.component';

@Component({
  selector: 'app-main-page',
  imports: [NotesPanelComponent, NoteComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  notes: WritableSignal<Note[]> = signal([
    {
      id: 1,
      title: 'note 1',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    },
    {
      id: 2,
      title: 'note 2',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    },
    {
      id: 3,
      title: 'note 3',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    },
    {
      id: 4,
      title: 'note 4',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    },
    {
      id: 5,
      title: 'note 5',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    },
  ]);

  selectedNote = signal<any | undefined>(undefined);

  onNoteChosen(note: any) {
    this.selectedNote.set(note);
  }

  onNoteUpdated(newNote: Note) {
    this.notes.update((notes) =>
      notes.map((note) => (note.id === newNote.id ? newNote : note))
    );
  }
}
