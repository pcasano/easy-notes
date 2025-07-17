import { Component, output, signal } from '@angular/core';

export enum Tab {
  Notes = 'Notes',
  Trash = 'Trash',
}

@Component({
  selector: 'app-navigation-bar',
  imports: [],
  template: `
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
  `,
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  readonly Tab = Tab;

  selectedTab = output<Tab>();

  currentTab = signal<Tab>(Tab.Notes);

  setTab(tab: Tab) {
    this.currentTab.set(tab);
    this.selectedTab.emit(tab);
  }
}
