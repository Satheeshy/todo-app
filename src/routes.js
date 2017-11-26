"use strict";
var edit_component_1 = require("./EditTask/edit.component");
var todo_component_1 = require("./todo/todo.component");
var add_component_1 = require("./addTask/add.component");
exports.appRoutes = [
    { path: 'add', component: add_component_1.AddComponent },
    { path: 'edit/:id', component: edit_component_1.EditComponent },
    { path: '**', component: todo_component_1.TodoComponent }
];
