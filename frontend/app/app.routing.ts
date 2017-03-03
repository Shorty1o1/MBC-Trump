import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'; //import home components
import { ChooserComponent } from './chooser/chooser.component'; //import chooser component
import { AboutComponent } from './about/about.component'; //import about component
import { SlaveComponent } from './slave/slave.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'slave', component: SlaveComponent },
  { path: 'chooser', component: ChooserComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: HomeComponent, pathMatch: 'full'} // redirect to home page on load
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
