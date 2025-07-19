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
  showDeleteDate = true;
  activeArchive = true;

  ngOnInit() {
    this.sortAlphabetically = this.settingsStore.sortAlphabetically();
    this.detectLinks = this.settingsStore.detectLinks();
    this.showCreationDate = this.settingsStore.showCreationDate();
    this.showEditDate = this.settingsStore.showEditDate();
    this.showDeleteDate = this.settingsStore.showDeleteDate();
    this.activeArchive = this.settingsStore.activeArchive();
  }

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
