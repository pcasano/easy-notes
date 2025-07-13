import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

export type Note = {
  id: string;
  title?: string;
  content?: string;
  createdAt: Date;
  editedAt?: Date;
};

@Component({
  selector: 'app-note',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent implements OnInit {
  private destroy$ = new Subject<void>();

  readonly selectedNote = input<Note | undefined>();

  updatedNote = output<Note>();

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  isDraft = false;

  ngOnInit(): void {
    this.noteForm.valueChanges
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((value) => {
        const note = this.selectedNote();
        if (!note) return;

        this.updatedNote.emit({
          id: note.id,
          createdAt: note.createdAt,
          editedAt: this.isDraft ? undefined : new Date(),
          ...value,
        } as Note);
      });
  }

  readonly selectedNoteEffect = effect(() => {
    const note = this.selectedNote();
    if (note) {
      this.isDraft = !note.content;
      this.noteForm.patchValue(
        {
          title: note.title,
          content: note.content,
        },
        { emitEvent: false }
      );
    } else {
      this.noteForm.reset();
    }
  });
}
