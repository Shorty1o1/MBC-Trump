import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {MasterComponent} from "./master/master.component"; //import master components
import {ChooserComponent} from "./chooser/chooser.component"; //import chooser component
import {AboutComponent} from "./about/about.component"; //import about component
import {SlaveComponent} from "./slave/slave.component";

const appRoutes: Routes = [
    {path: 'master', component: MasterComponent},
    {path: 'slave', component: SlaveComponent},
    {path: 'chooser', component: ChooserComponent},
    {path: 'about', component: AboutComponent},
    {path: '', component: SlaveComponent, pathMatch: 'full'} // redirect to master page on load
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
