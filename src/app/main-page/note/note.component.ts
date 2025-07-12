import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  editedAt?: Date;
};

@Component({
  selector: 'app-note',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  private destroy$ = new Subject<void>();

  /*  ngOnInit(): void {
    this.noteForm.valueChanges
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((value) => {
        const note = this.selectedNote();
        if (!note) return;

        this.updatedNote.emit({
          id: note.id,
          editedAt: new Date(),
          ...value,
        } as Note);
      });
  }*/

  readonly selectedNote = input<Note | undefined>();

  updatedNote = output<Note>();

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

      this.noteForm.valueChanges
        .pipe(debounceTime(2000), takeUntil(this.destroy$))
        .subscribe((value) => {
          const note = this.selectedNote();
          if (!note) return;

          this.updatedNote.emit({
            id: note.id,
            createdAt: note.createdAt,
            editedAt: new Date(),
            ...value,
          } as Note);
          console.log(note.editedAt);
        });
    } else {
      this.noteForm.reset();
    }
  });
}
