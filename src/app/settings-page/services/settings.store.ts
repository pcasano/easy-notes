import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { BadgeType } from '../tag-setting/tag-setting.component';

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
    badges: BadgeType[];
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
    badges: [
      {
        name: 'Sport',
        class: 'bg-success',
      },
      {
        name: 'Work',
        class: 'bg-danger',
      },
      {
        name: 'Travel',
        class: 'bg-dark',
      },
    ],
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
