import { Note } from '../note/note.component';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Tab } from '../navigation-bar/navigation-bar.component';
import { v4 as uuid } from 'uuid';

type NoteState = {
  notes: Note[];
  isLoading: boolean;
  selectedNote: Note | undefined;
  selectedTab: Tab;
};

const initialNotes = [
  {
    id: '1',
    title: 'note 1',
    content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    createdAt: new Date(2015, 0, 11, 19, 25),
    tab: Tab.Notes,
  },
  {
    id: '2',
    title: 'note 2',
    content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    createdAt: new Date(2017, 8, 7, 9, 45),
    tab: Tab.Notes,
  },
  {
    id: '3',
    title: 'note 3',
    content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    createdAt: new Date(2014, 2, 15, 21, 30),
    tab: Tab.Notes,
  },
  {
    id: '4',
    title: 'note 4',
    content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    createdAt: new Date(2019, 10, 3, 17, 5),
    tab: Tab.Notes,
  },
  {
    id: '5',
    title: 'note 5',
    content: 'asdasdsadsandalsdnaslkdalsdnaslkdasldasdsadasd8',
    createdAt: new Date(2016, 0, 28, 11, 50),
    tab: Tab.Trash,
  },
];

const initialState: NoteState = {
  notes: initialNotes,
  isLoading: false,
  selectedNote: initialNotes[0],
  selectedTab: Tab.Notes,
};

export const NoteStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    onNewNote() {
      const newNote: Note = {
        id: uuid(),
        title: 'Untitled note',
        content: '',
        createdAt: new Date(),
        tab: Tab.Notes,
      };
      patchState(store, (state) => ({
        ...state,
        notes: [...state.notes, newNote],
        selectedNote: newNote,
      }));
    },

    onNoteUpdated(updatedNote: Note) {
      patchState(store, (state) => ({
        notes: state.notes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        ),
        selectedNote: updatedNote,
      }));
    },

    onNoteSelected(note: Note) {
      patchState(store, () => ({ selectedNote: undefined }));
      setTimeout(() => {
        patchState(store, () => ({ selectedNote: note }));
      });
    },

    onNoteMovedToTrash(noteToMoveToTrash: Note) {
      patchState(store, (state) => {
        const updatedNotes = state.notes.map((note) =>
          note.id === noteToMoveToTrash.id
            ? { ...note, tab: Tab.Trash, movedToTrashAt: new Date() }
            : note
        );

        const filteredNotes = updatedNotes.filter((n) => n.tab === Tab.Notes);

        return {
          notes: updatedNotes,
          selectedNote: filteredNotes.length > 0 ? filteredNotes[0] : undefined,
        };
      });
    },

    onNoteMovedToArchive(noteToMoveToArchive: Note) {
      patchState(store, (state) => {
        const updatedNotes = state.notes.map((note) =>
          note.id === noteToMoveToArchive.id
            ? { ...note, tab: Tab.Archive, archivedAt: new Date() }
            : note
        );

        const filteredNotes = updatedNotes.filter((n) => n.tab === Tab.Archive);

        return {
          notes: updatedNotes,
          selectedNote: filteredNotes.length > 0 ? filteredNotes[0] : undefined,
        };
      });
    },

    onNoteDeleted(noteToDelete: Note) {
      patchState(store, (state) => {
        const updatedNotes = state.notes.filter(
          (note) => note.id !== noteToDelete.id
        );
        const filteredNotes = updatedNotes.filter((n) => n.tab === Tab.Trash);
        return {
          notes: updatedNotes,
          selectedNote: filteredNotes.length > 0 ? filteredNotes[0] : undefined,
        };
      });
    },

    onNoteRestored(restoredNote: Note) {
      patchState(store, (state) => {
        const updatedNotes = state.notes.map((note) =>
          note.id === restoredNote.id
            ? { ...note, tab: Tab.Notes, movedToTrashAt: undefined }
            : note
        );

        const filteredNotes = updatedNotes.filter((n) => n.tab === Tab.Trash);

        return {
          notes: updatedNotes,
          selectedNote: filteredNotes[0],
        };
      });
    },

    onTabSelected(tab: Tab) {
      patchState(store, (state) => {
        const firstNote = state.notes.find((note) => note.tab === tab);
        return {
          selectedTab: tab,
          selectedNote: firstNote ?? undefined,
        };
      });
    },
  }))
);
