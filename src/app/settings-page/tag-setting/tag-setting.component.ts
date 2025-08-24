import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsStore } from '../services/settings.store';

export type BadgeType = {
  name: string;
  class: string;
};

@Component({
  selector: 'app-tag-setting',
  imports: [FormsModule],
  templateUrl: './tag-setting.component.html',
  styleUrl: './tag-setting.component.scss',
})
export class TagSettingComponent {
  private settingsStore = inject(SettingsStore);

  colors: BadgeType[] = [
    { name: 'Blue', class: 'bg-primary' },
    { name: 'Gray', class: 'bg-secondary' },
    { name: 'Green', class: 'bg-success' },
    { name: 'Red', class: 'bg-danger' },
    { name: 'Yellow', class: 'bg-warning text-dark' },
    { name: 'Cyan', class: 'bg-info text-dark' },
    { name: 'Black', class: 'bg-dark' },
  ];

  selectedClass = this.colors[0].class;
  badgeText = '';

  badges: BadgeType[] = this.settingsStore.settings.badges();

  savedBadges = output<BadgeType[]>();

  addBadge() {
    if (!this.badgeText.trim()) return;
    this.badges.push({
      name: this.badgeText,
      class: this.selectedClass,
    });
    this.badgeText = '';
    this.savedBadges.emit(this.badges);
  }

  removeBadge(index: number) {
    this.badges.splice(index, 1);
    this.savedBadges.emit(this.badges);
  }
}
