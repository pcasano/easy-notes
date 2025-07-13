import { Component, signal, WritableSignal } from '@angular/core';
import { NotesPanelComponent } from './notes-panel/notes-panel.component';
import { Note, NoteComponent } from './note/note.component';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-main-page',
  imports: [NotesPanelComponent, NoteComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  notes: WritableSignal<Note[]> = signal([
    {
      id: '1',
      title: 'note 1',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2015, 0, 11, 19, 25),
    },
    {
      id: '2',
      title: 'note 2',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2017, 8, 7, 9, 45),
    },
    {
      id: '3',
      title: 'note 3',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2014, 2, 15, 21, 30),
    },
    {
      id: '4',
      title: 'note 4',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2019, 10, 3, 17, 5),
    },
    {
      id: '5',
      title: 'note 5',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2016, 0, 28, 11, 50),
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
    this.selectedNote.set(newNote);
  }

  onNewNote() {
    const newNote: Note = {
      id: uuid(),
      title: 'Untitled note',
      createdAt: new Date(),
    };
    this.selectedNote.set(newNote);
    this.notes.update((notes) => [...notes, newNote]);
  }
}
