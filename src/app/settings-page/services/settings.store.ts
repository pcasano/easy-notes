import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type SettingsState = {
  settings: {
    sortAlphabetically: boolean;
    detectLinks: boolean;
    showCreationDate: boolean;
    showEditDate: boolean;
    showMovedToTrashDate: boolean;
    activeArchive: boolean;
    allowArchivedNotesEdit: boolean;
    showSortingButtons: boolean;
  };
};

const initialSettingsState: SettingsState = {
  settings: {
    sortAlphabetically: true,
    detectLinks: false,
    showCreationDate: true,
    showEditDate: true,
    showMovedToTrashDate: false,
    activeArchive: true,
    allowArchivedNotesEdit: false,
    showSortingButtons: true,
  },
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialSettingsState),
  withMethods((store) => ({
    saveSettings: (updatedSettings: SettingsState['settings']) => {
      patchState(store, (state) => ({
        settings: {
          ...state.settings,
          ...updatedSettings,
        },
      }));
    },
  }))
);
