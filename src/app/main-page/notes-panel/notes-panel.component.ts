import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NotePanelItemComponent } from './note-panel-item/note-panel-item.component';
import { Note } from '../note/note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Tab } from '../navigation-bar/navigation-bar.component';
import { SettingsStore } from '../../settings-page/services/settings.store';

@Component({
  selector: 'app-notes-panel',
  imports: [NotePanelItemComponent, ReactiveFormsModule],
  templateUrl: './notes-panel.component.html',
  styleUrl: './notes-panel.component.scss',
})
export class NotesPanelComponent {
  private settingsStore = inject(SettingsStore);

  settings = this.settingsStore.settings();

  readonly notes = input.required<Note[]>();

  notesFilteredByTab = computed(() => {
    const filteredNotes = this.notes().filter(
      (note) => note.tab === this.tab()
    );

    if (this.sortAlphabetically()) {
      return filteredNotes.sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      );
    } else if (this.sortByDate()) {
      return filteredNotes.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      return filteredNotes;
    }
  });

  readonly tab = input.required<Tab>();

  sortAlphabetically = signal(false);

  sortByDate = signal(true);

  noteSelected = output<Note>();

  noteDeleted = output<Note>();

  addNote = output<void>();

  filterNote = output<string>();

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterNote.emit(inputElement.value);
  }

  protected readonly Tab = Tab;

  sortAlphabeticallyClicked() {
    this.sortAlphabetically.set(true);
    this.sortByDate.set(false);
  }

  sortByDateClicked() {
    this.sortAlphabetically.set(false);
    this.sortByDate.set(true);
  }
}
