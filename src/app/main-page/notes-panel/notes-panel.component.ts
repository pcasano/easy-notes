import { Component, computed, input, output } from '@angular/core';
import { NotePanelItemComponent } from './note-panel-item/note-panel-item.component';
import { Note } from '../note/note.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Tab } from '../navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-notes-panel',
  imports: [NotePanelItemComponent, ReactiveFormsModule],
  templateUrl: './notes-panel.component.html',
  styleUrl: './notes-panel.component.scss',
})
export class NotesPanelComponent {
  readonly notes = input.required<Note[]>();

  notesFilteredByTab = computed(() => {
    return this.notes().filter((note) => note.tab === this.tab());
  });

  readonly tab = input.required<Tab>();

  noteSelected = output<Note>();

  noteDeleted = output<Note>();

  addNote = output<void>();

  filterNote = output<string>();

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.filterNote.emit(inputElement.value);
  }

  protected readonly Tab = Tab;
}
