import { MyErrorHandler } from './AppErrorHandler/Error';
import { TaskService } from './serviceImpl/taskService';
import { NgModule }      from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpModule } from "@angular/http";

import { HomeComponent }  from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { MockHTTPServer } from './backend/mockedServer';
import { AddComponent } from './addTask/add.component';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './routes';
import { EditComponent } from './EditTask/edit.component';
import { ErrorHandler } from '@angular/core';

@NgModule({
  imports:      [ BrowserModule,  ReactiveFormsModule, HttpModule, RouterModule.forRoot(appRoutes),InMemoryWebApiModule.forRoot(MockHTTPServer, { delay: Math.random() * 800 }) ],
  declarations: [ HomeComponent,EditComponent, HeaderComponent,AddComponent,TodoComponent ],
  providers: [TaskService, {provide:ErrorHandler,useClass:MyErrorHandler}],
  bootstrap:    [ HomeComponent ]
})
/**
 * Main module for our application, if creating any new components, be sure to declare them above. 
 * If creating any new services, provide them above
 */
export class MainModule { }