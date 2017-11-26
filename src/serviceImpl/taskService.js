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
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        //URL for CRUD Operations
        this.taskUrl = 'api/tasks';
    }
    //Fetch all tasks
    TaskService.prototype.GetAll = function () {
        return this.http.get(this.taskUrl)
            .retry(5)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //get single task
    TaskService.prototype.Get = function (id) {
        console.log(this.taskUrl + '/' + id);
        return this.http.get(this.taskUrl + '/' + id)
            .retry(5)
            .map(this.extractData).
            catch(this.handleError);
    };
    //create article
    TaskService.prototype.Create = function (task) {
        return this.http.post(this.taskUrl, task, this.options)
            .retry(5)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //delete article
    TaskService.prototype.Delete = function (id) {
        return this.http.delete(this.taskUrl + '/' + id)
            .retry(5)
            .map(function (response) { return response.status; })
            .catch(this.handleError);
    };
    TaskService.prototype.Update = function (id, task) {
        return this.http.put(this.taskUrl + '/' + id, task, this.options)
            .retry(5)
            .map(this.extractData)
            .catch(this.handleError);
    };
    Object.defineProperty(TaskService.prototype, "options", {
        get: function () {
            var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
            var options = new http_1.RequestOptions({ headers: headers });
            return options;
        },
        enumerable: true,
        configurable: true
    });
    //handling errors
    TaskService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error.status);
    };
    //handling response
    TaskService.prototype.extractData = function (res) {
        if (res.status == 204)
            return;
        return res.json().data;
    };
    TaskService.prototype.retryWhen = function (errors) {
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
