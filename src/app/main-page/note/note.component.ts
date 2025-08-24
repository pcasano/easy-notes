import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, skip, Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Tab } from '../navigation-bar/navigation-bar.component';
import { SettingsStore } from '../../settings-page/services/settings.store';
import { BadgeType } from '../../settings-page/tag-setting/tag-setting.component';

export type Note = {
  id: string;
  title?: string;
  content?: string;
  createdAt: Date;
  editedAt?: Date;
  movedToTrashAt?: Date;
  archivedAt?: Date;
  pinnedAt?: Date;
  tab: Tab;
  tag?: BadgeType;
};

@Component({
  selector: 'app-note',
  imports: [ReactiveFormsModule, DatePipe, FormsModule],
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

  pinnedNote = output<Note>();

  tags: BadgeType[] = this.settingsStore.settings.badges();

  noteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    pinned: new FormControl(),
    tag: new FormControl(),
  });

  isDraft = false;

  protected readonly Tab = Tab;

  ngOnInit(): void {
    this.noteForm.valueChanges
      .pipe(skip(1), debounceTime(2000), takeUntil(this.destroy$))
      .subscribe(({ pinned, tag, ...value }) => {
        const note = this.selectedNote();
        if (!note || this.tab() === Tab.Trash) return;

        this.updatedNote.emit({
          id: note.id,
          createdAt: note.createdAt,
          editedAt: this.isDraft ? undefined : new Date(),
          tab: this.tab(),
          pinnedAt: note.pinnedAt,
          tag: note.tag,
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
          pinned: !!note.pinnedAt,
          tag: note.tag?.name,
        },
        { emitEvent: false }
      );
    } else {
      this.noteForm.reset();
    }
  });

  readonly selectedTabEffect = effect(() => {
    if (
      this.tab() === Tab.Notes ||
      (this.tab() === Tab.Archive && this.settings.allowArchivedNotesEdit)
    ) {
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

  onPinToggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const note = this.selectedNote();
    if (!note) return;
    note.pinnedAt = checked ? new Date() : undefined;
    this.updatedNote.emit(note);
  }

  onTagChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const note = this.selectedNote();
    if (!note) return;
    const badge = this.tags.find((t) => t.name === value);
    if (badge) {
      note.tag = badge;
      this.updatedNote.emit(note);
    }
  }
}
