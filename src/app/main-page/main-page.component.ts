import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NotesPanelComponent } from './notes-panel/notes-panel.component';
import { Note, NoteComponent } from './note/note.component';
import {
  NavigationBarComponent,
  Tab,
} from './navigation-bar/navigation-bar.component';
import { NoteStore } from './services/note.store';

@Component({
  selector: 'app-main-page',
  imports: [NotesPanelComponent, NoteComponent, NavigationBarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  ngOnInit(): void {
    this.noteStore.onTabSelected(Tab.Notes);
  }

  private noteStore = inject(NoteStore);

  notes = this.noteStore.notes;

  selectedTab = this.noteStore.selectedTab;

  selectedNote = this.noteStore.selectedNote;

  filterText = signal('');

  filterTag = signal('');

  onNoteChosen(note: Note) {
    this.noteStore.onNoteSelected(note);
  }

  onNoteUpdated(updatedNote: Note) {
    this.noteStore.onNoteUpdated(updatedNote);
  }

  onNewNote() {
    this.noteStore.onNewNote();
  }

  onNoteMovedToTrash(noteToMoveToTrash: Note) {
    noteToMoveToTrash.pinnedAt = undefined;
    this.noteStore.onNoteMovedToTrash(noteToMoveToTrash, this.selectedTab());
  }

  filteredNotes = computed(() => {
    const textToFilter = this.filterText().trim().toLowerCase();
    const tagToFilter = this.filterTag().trim().toLowerCase();

    return this.notes().filter((note) => {
      const matchesText =
        !textToFilter ||
        note.title?.toLowerCase().includes(textToFilter) ||
        note.content?.toLowerCase().includes(textToFilter);

      const matchesTag =
        !tagToFilter || note.tag?.name.toLowerCase().includes(tagToFilter);

      return matchesText && matchesTag;
    });
  });

  onNoteFiltered(value: string) {
    this.filterText.set(value);
  }

  onNoteFilteredByTag(value: string) {
    this.filterTag.set(value);
  }

  onTabSelected(tab: Tab) {
    this.noteStore.onTabSelected(tab);
  }

  onNoteRestored(restoredNote: Note) {
    this.noteStore.onNoteRestored(restoredNote, this.selectedTab());
  }

  onNoteDeleted(noteToDelete: Note) {
    this.noteStore.onNoteDeleted(noteToDelete);
  }

  onNoteArchived(archivedNote: Note) {
    archivedNote.pinnedAt = undefined;
    this.noteStore.onNoteMovedToArchive(archivedNote);
  }

  onNotePinned(pinnedNote: Note) {
    this.noteStore.onNoteUpdated(pinnedNote);
  }
}
