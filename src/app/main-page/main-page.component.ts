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
      isNew: false,
    },
    {
      id: '2',
      title: 'note 2',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2017, 8, 7, 9, 45),
      isNew: false,
    },
    {
      id: '3',
      title: 'note 3',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2014, 2, 15, 21, 30),
      isNew: false,
    },
    {
      id: '4',
      title: 'note 4',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2019, 10, 3, 17, 5),
      isNew: false,
    },
    {
      id: '5',
      title: 'note 5',
      content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
      createdAt: new Date(2016, 0, 28, 11, 50),
      isNew: false,
    },
  ]);

  selectedNote = signal<any | undefined>(undefined);

  onNoteChosen(note: Note) {
    this.selectedNote.set(note);
  }

  onNoteUpdated(updatedNote: Note) {
    this.notes.update((notes) =>
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    this.selectedNote.set(updatedNote);
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
