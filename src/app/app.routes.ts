import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'settings', component: SettingsPageComponent },
];
