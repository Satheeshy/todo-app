"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Error_1 = require("./AppErrorHandler/Error");
var taskService_1 = require("./serviceImpl/taskService");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var http_1 = require("@angular/http");
var home_component_1 = require("./home/home.component");
var header_component_1 = require("./header/header.component");
var mockedServer_1 = require("./backend/mockedServer");
var add_component_1 = require("./addTask/add.component");
var todo_component_1 = require("./todo/todo.component");
var router_1 = require("@angular/router");
var routes_1 = require("./routes");
var edit_component_1 = require("./EditTask/edit.component");
var core_2 = require("@angular/core");
var MainModule = (function () {
    /**
     * Main module for our application, if creating any new components, be sure to declare them above.
     * If creating any new services, provide them above
     */
    function MainModule() {
    }
    return MainModule;
}());
MainModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(routes_1.appRoutes), angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(mockedServer_1.MockHTTPServer, { delay: Math.random() * 800 })],
        declarations: [home_component_1.HomeComponent, edit_component_1.EditComponent, header_component_1.HeaderComponent, add_component_1.AddComponent, todo_component_1.TodoComponent],
        providers: [taskService_1.TaskService, { provide: core_2.ErrorHandler, useClass: Error_1.MyErrorHandler }],
        bootstrap: [home_component_1.HomeComponent]
    })
], MainModule);
exports.MainModule = MainModule;
