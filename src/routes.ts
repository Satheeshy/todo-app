import { EditComponent } from './EditTask/edit.component';
import { TodoComponent } from './todo/todo.component';
import { Component } from '@angular/core';
import { AddComponent } from './addTask/add.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    {path: 'add', component : AddComponent},
    {path:'edit/:id',component: EditComponent},
    {path: '**',component: TodoComponent}

];