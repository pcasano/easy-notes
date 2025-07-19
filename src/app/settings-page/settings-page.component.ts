import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { SettingsStore } from './services/settings.store';

@Component({
  selector: 'app-settings-page',
  imports: [FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private router = inject(Router);

  private settingsStore = inject(SettingsStore);

  sortAlphabetically = true;
  detectLinks = true;
  showCreationDate = true;
  showEditDate = true;
  showDeleteDate = true;
  activeArchive = true;

  onBack() {
    const settings = {
      sortAlphabetically: this.sortAlphabetically,
      detectLinks: this.detectLinks,
      showCreationDate: this.showCreationDate,
      showEditDate: this.showEditDate,
      showDeleteDate: this.showDeleteDate,
      activeArchive: this.activeArchive,
    };

    this.settingsStore.saveSettings(settings);

    this.router.navigate(['/']);
  }
}
