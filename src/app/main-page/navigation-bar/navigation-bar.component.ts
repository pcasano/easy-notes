import { Component, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SettingsStore } from '../../settings-page/services/settings.store';

export enum Tab {
  Notes = 'Notes',
  Trash = 'Trash',
  Archive = 'Archive',
}

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            [class.active]="currentTab() === Tab.Notes"
            (click)="setTab(Tab.Notes)"
            role="button"
          >
            Notes
          </a>
        </li>
        @if (settings.activeArchive) {
          <li class="nav-item">
            <a
              class="nav-link"
              [class.active]="currentTab() === Tab.Archive"
              (click)="setTab(Tab.Archive)"
              role="button"
            >
              Archive
            </a>
          </li>
        }

        <li class="nav-item">
          <a
            class="nav-link"
            [class.active]="currentTab() === Tab.Trash"
            (click)="setTab(Tab.Trash)"
            role="button"
          >
            Trash
          </a>
        </li>
      </ul>

      <button routerLink="settings" class="btn btn-outline-secondary ms-3">
        <i class="bi bi-gear"></i>
      </button>
    </div>
  `,
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  private settingsStore = inject(SettingsStore);

  settings = this.settingsStore.settings();

  readonly Tab = Tab;

  selectedTab = output<Tab>();

  currentTab = signal<Tab>(Tab.Notes);

  setTab(tab: Tab) {
    this.currentTab.set(tab);
    this.selectedTab.emit(tab);
  }
}
