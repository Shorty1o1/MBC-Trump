"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component"); //import home components
var chooser_component_1 = require("./chooser/chooser.component"); //import chooser component
var about_component_1 = require("./about/about.component"); //import about component
var app_routing_1 = require("./app.routing");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, forms_1.FormsModule],
        declarations: [app_component_1.AppComponent, about_component_1.AboutComponent, chooser_component_1.ChooserComponent, home_component_1.HomeComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map