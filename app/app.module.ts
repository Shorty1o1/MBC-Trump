import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { HomeComponent } from './home/home.component'; //import home components
import { ChooserComponent } from './chooser/chooser.component'; //import chooser component
import { AboutComponent } from './about/about.component'; //import about component
import { routing }  from './app.routing';
import { HttpModule }      from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Platform } from './player/Platform';
import { Client } from './player/Client';


@NgModule({
  imports:      [ BrowserModule, routing, HttpModule, FormsModule  ], //other modules the app depends on
  declarations: [ AppComponent, AboutComponent, ChooserComponent, HomeComponent ], // declare all derectives and components
  bootstrap : [ AppComponent ], // root component to bootstarp
  providers: [    {provide: LocationStrategy, useClass: HashLocationStrategy}  ]
})
export class AppModule {
	pf = new Platform();

	client = new Client();
}

