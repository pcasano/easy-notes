import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsStore } from './services/settings.store';

@Component({
  selector: 'app-settings-page',
  imports: [FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent implements OnInit {
  private router = inject(Router);

  private settingsStore = inject(SettingsStore);

  sortAlphabetically = true;
  detectLinks = true;
  showCreationDate = true;
  showEditDate = true;
  showMovedToTrashDate = true;
  activeArchive = true;
  allowArchivedNotesEdit = true;

  ngOnInit() {
    const settings = this.settingsStore.settings;

    this.sortAlphabetically = settings.sortAlphabetically();
    this.detectLinks = settings.detectLinks();
    this.showCreationDate = settings.showCreationDate();
    this.showEditDate = settings.showEditDate();
    this.showMovedToTrashDate = settings.showMovedToTrashDate();
    this.activeArchive = settings.activeArchive();
    this.allowArchivedNotesEdit = settings.allowArchivedNotesEdit();
  }

  onBack() {
    const settings = {
      sortAlphabetically: this.sortAlphabetically,
      detectLinks: this.detectLinks,
      showCreationDate: this.showCreationDate,
      showEditDate: this.showEditDate,
      showMovedToTrashDate: this.showMovedToTrashDate,
      activeArchive: this.activeArchive,
      allowArchivedNotesEdit: this.allowArchivedNotesEdit,
    };

    this.settingsStore.saveSettings(settings);

    this.router.navigate(['/']);
  }
}
