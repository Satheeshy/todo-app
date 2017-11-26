"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var taskService_1 = require("./../serviceImpl/taskService");
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var Subscription_1 = require("rxjs/Subscription");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var TodoComponent = (function () {
    //dependency injection
    function TodoComponent(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.Subscriptions = new Subscription_1.Subscription();
        this.showMore = -1;
    }
    //When component is initializing, get all the user tasks and checks if any params exists
    TodoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllTask();
        this.route.queryParams.subscribe(function (params) {
            var result = params['result'];
            _this.geturl(result);
        });
    };
    TodoComponent.prototype.getAllTask = function () {
        var _this = this;
        this.Subscriptions.add(this.service.GetAll()
            .subscribe(function (res) {
            _this.todos = res;
            _this.toDeleteTask = [];
        }));
    };
    //Marking a task as done and updating the DB.
    TodoComponent.prototype.toggle = function (task) {
        task.done = !task.done;
        if (task.done)
            this.showHide("Marked an Item as Done!!");
        else
            this.showHide("UnMarked an Item!!");
        this.Subscriptions.add(this.service.Update(task.id, task).subscribe());
    };
    //routing to edit component
    TodoComponent.prototype.edit = function (id) {
        this.router.navigate(['/edit', id]);
    };
    //unsubscribing from all the subscriptions
    TodoComponent.prototype.ngOnDestroy = function () {
        this.Subscriptions.unsubscribe();
    };
    //routing to add compoennt
    TodoComponent.prototype.addTask = function () {
        this.router.navigate(['/add']);
    };
    //deleteing all the task marked by user
    TodoComponent.prototype.deleteTask = function () {
        var _this = this;
        if (this.toDeleteTask.length == 0)
            this.showHide("Please Mark an Item to Delete");
        this.toDeleteTask.forEach(function (task) {
            _this.Subscriptions.add(_this.service.Delete(task.id).subscribe(function (res) {
                _this.getAllTask();
                _this.showHide("Successfully deleted all the Task!!!!");
            }));
        });
    };
    //storing the task which are selected
    TodoComponent.prototype.taskToDelete = function (task, event) {
        if (event.target.checked)
            this.toDeleteTask.push(task);
        else {
            var index = this.toDeleteTask.indexOf(task);
            this.toDeleteTask.splice(index, 1);
        }
        console.log(this.toDeleteTask);
    };
    //get return-url from edit and add components
    TodoComponent.prototype.geturl = function (result) {
        if (result) {
            if (result == 'edit')
                this.showHide("You successfully edited the task!!!!");
            else if (result == 'add')
                this.showHide("Successfully added the Task!!!!");
        }
        else
            this.showMessage = false;
    };
    //display user messages
    TodoComponent.prototype.showHide = function (msg) {
        var _this = this;
        this.message = msg;
        this.showMessage = true;
        setTimeout(function () { _this.showMessage = false; }, 3000);
    };
    TodoComponent.prototype.viewMore = function (more) {
        console.log(more);
        if (more == this.showMore)
            this.showMore = -1;
        else
            this.showMore = more;
    };
    return TodoComponent;
}());
TodoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todo-comp',
        templateUrl: "./todo.component.html",
        styleUrls: ['./todo.component.css']
    }),
    __metadata("design:paramtypes", [taskService_1.TaskService, router_1.Router, router_2.ActivatedRoute])
], TodoComponent);
exports.TodoComponent = TodoComponent;
