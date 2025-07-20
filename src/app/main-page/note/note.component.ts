import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Tab } from '../navigation-bar/navigation-bar.component';
import { SettingsStore } from '../../settings-page/services/settings.store';

export type Note = {
  id: string;
  title?: string;
  content?: string;
  createdAt: Date;
  editedAt?: Date;
  movedToTrashAt?: Date;
  archivedAt?: Date;
  tab: Tab;
};

@Component({
  selector: 'app-note',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent implements OnInit {
  private settingsStore = inject(SettingsStore);

  private destroy$ = new Subject<void>();

  readonly selectedNote = input<Note | undefined>();

  readonly tab = input.required<Tab>();

  settings = this.settingsStore.settings();

  updatedNote = output<Note>();

  movedToTrashNote = output<Note>();

  deletedNote = output<Note>();

  restoreNote = output<Note>();

  archivedNote = output<Note>();

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  isDraft = false;

  protected readonly Tab = Tab;

  ngOnInit(): void {
    this.noteForm.valueChanges
      .pipe(debounceTime(2000), takeUntil(this.destroy$))
      .subscribe((value) => {
        const note = this.selectedNote();
        if (!note || this.tab() !== Tab.Notes) return;

        this.updatedNote.emit({
          id: note.id,
          createdAt: note.createdAt,
          editedAt: this.isDraft ? undefined : new Date(),
          tab: Tab.Notes,
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

  readonly selectedTabEffect = effect(() => {
    if (this.tab() == Tab.Notes) {
      this.noteForm.enable();
    } else {
      this.noteForm.disable();
    }
  });

  onMoveToTrash() {
    const note = this.selectedNote();
    if (!note) return;
    this.movedToTrashNote.emit(note);
  }

  onDelete() {
    const note = this.selectedNote();
    if (!note) return;
    this.deletedNote.emit(note);
  }

  onRestore() {
    const note = this.selectedNote();
    if (!note) return;
    this.restoreNote.emit(note);
  }

  onArchive() {
    const note = this.selectedNote();
    if (!note) return;
    this.archivedNote.emit(note);
  }
}
