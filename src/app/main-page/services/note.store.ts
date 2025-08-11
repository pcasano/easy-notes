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
    title: 'Meeting Recap - Project Alpha',
    content:
      'Yesterday’s meeting covered the latest progress on Project Alpha. We finalized the timeline for the next sprint and assigned tasks to the team. Key points include:\n' +
      '\n' +
      'Complete UI mockups by next Tuesday\n' +
      '\n' +
      'Backend API integration to start Thursday\n' +
      '\n' +
      'QA testing scheduled for the week after next\n' +
      '\n' +
      'Discuss potential risks and mitigation strategies in Friday’s meeting\n' +
      '\n' +
      'Please review the attached documents and share any feedback by the end of the day tomorrow.',
    createdAt: new Date(2015, 0, 11, 19, 25),
    tab: Tab.Notes,
  },
  {
    id: '2',
    title: 'Grocery Shopping List',
    content:
      'Content:\n' +
      '\n' +
      'Milk\n' +
      '\n' +
      'Eggs\n' +
      '\n' +
      'Whole grain bread\n' +
      '\n' +
      'Fresh spinach\n' +
      '\n' +
      'Bananas\n' +
      '\n' +
      'Chicken breasts\n' +
      '\n' +
      'Almond butter\n' +
      '\n' +
      'Coffee beans\n' +
      '\n' +
      'Toilet paper\n' +
      '\n' +
      'Dish soap\n' +
      '\n' +
      'Remember to check for any discounts or coupons before buying. Also, don’t forget to pick up a birthday card for Peter!',
    createdAt: new Date(2017, 8, 7, 9, 45),
    tab: Tab.Notes,
  },
  {
    id: '3',
    title: 'Weekend plans',
    content:
      'This weekend, I’m planning to take it easy and catch up on some reading. The weather is supposed to be nice, so I might go for a walk in the park Saturday morning. In the afternoon, I want to try out that new recipe for homemade pasta I found online. Sunday will be dedicated to organizing my workspace and prepping meals for the upcoming week. Hoping to squeeze in a movie night with friends as well!',
    createdAt: new Date(2014, 2, 15, 21, 30),
    tab: Tab.Notes,
  },
  {
    id: '4',
    title: 'Ideas for Blog Posts',
    content:
      'I’ve been brainstorming some topics for the next few blog posts. One idea is to write about productivity hacks for remote workers, focusing on tools and routines that help maintain focus. Another topic could cover sustainable living tips, like reducing plastic use and composting at home. I’m also considering an interview series with local entrepreneurs to share their stories and advice. Need to outline these ideas and set deadlines soon.',
    createdAt: new Date(2019, 10, 3, 17, 5),
    tab: Tab.Notes,
  },
  {
    id: '5',
    title: 'Reflection on Recent Workshop',
    content:
      'The workshop on effective communication was really insightful. I learned a lot about active listening and how to provide constructive feedback without causing defensiveness. The exercises helped me realize the importance of non-verbal cues and maintaining eye contact during conversations. I plan to apply these techniques in my team meetings to improve collaboration and reduce misunderstandings. Overall, it was a valuable experience that I’m glad I attended.',
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

    onNoteMovedToTrash(noteToMoveToTrash: Note, tab: Tab) {
      patchState(store, (state) => {
        const updatedNotes = state.notes.map((note) =>
          note.id === noteToMoveToTrash.id
            ? { ...note, tab: Tab.Trash, movedToTrashAt: new Date() }
            : note
        );

        const filteredNotes = updatedNotes.filter((n) => n.tab === tab);

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

        const filteredNotes = updatedNotes.filter((n) => n.tab === Tab.Notes);

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

    onNoteRestored(restoredNote: Note, tab: Tab) {
      patchState(store, (state) => {
        const updatedNotes = state.notes.map((note) =>
          note.id === restoredNote.id
            ? { ...note, tab: Tab.Notes, movedToTrashAt: undefined }
            : note
        );
        const firstNote = updatedNotes.find((note) => note.tab === tab);
        return {
          notes: updatedNotes,
          selectedNote: firstNote ?? undefined,
        };
      });
    },

    onTabSelected(tab: Tab) {
      patchState(store, () => ({ selectedNote: undefined }));
      setTimeout(() => {
        patchState(store, (state) => {
          const firstNote = state.notes.find((note) => note.tab === tab);
          return {
            selectedTab: tab,
            selectedNote: firstNote ?? undefined,
          };
        });
      });
    },
  }))
);
