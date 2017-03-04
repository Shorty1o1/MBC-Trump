import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component"; //import home components
import {ChooserComponent} from "./chooser/chooser.component"; //import chooser component
import {AboutComponent} from "./about/about.component"; //import about component
import {SlaveComponent} from "./slave/slave.component";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {MasterService} from "./service/masterService";

@NgModule({
    imports: [BrowserModule, routing, HttpModule, FormsModule], //other modules the app depends on
    declarations: [AppComponent, AboutComponent, ChooserComponent, HomeComponent, SlaveComponent], // declare all derectives and components
    bootstrap: [AppComponent], // root component to bootstarp
    providers: [MasterService, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule {
}

