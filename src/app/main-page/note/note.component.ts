import { Component, effect, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export type Note = {
  id: number;
  title: string;
  content: string;
};

@Component({
  selector: 'app-note',
  imports: [ReactiveFormsModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  readonly selectedNote = input<Note | undefined>();

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  readonly selectedNoteEffect = effect(() => {
    const note = this.selectedNote();
    if (note) {
      this.noteForm.patchValue({
        title: note.title,
        content: note.content,
      });
    } else {
      this.noteForm.reset();
    }
  });
}
