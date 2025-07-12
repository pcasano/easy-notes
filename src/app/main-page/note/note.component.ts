import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

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
export class NoteComponent implements OnInit {
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.noteForm.valueChanges
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((value) => {
        const note = this.selectedNote();
        if (!note) return;

        this.updatedNote.emit({
          id: note.id,
          ...value,
        } as Note);
      });
  }

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
    } else {
      this.noteForm.reset();
    }
  });
}
