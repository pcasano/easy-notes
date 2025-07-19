import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type SettingsState = {
  sortAlphabetically: boolean;
  detectLinks: boolean;
  showCreationDate: boolean;
  showEditDate: boolean;
  showDeleteDate: boolean;
  activeArchive: boolean;
};

const initialSettingsState: SettingsState = {
  sortAlphabetically: true,
  detectLinks: false,
  showCreationDate: true,
  showEditDate: true,
  showDeleteDate: false,
  activeArchive: true,
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialSettingsState),
  withMethods((store) => ({
    saveSettings: (settings: SettingsState) => {
      patchState(store, () => ({ ...settings }));
    },
  }))
);
