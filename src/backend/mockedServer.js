"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var moment = require('moment');
/**
 * A mocked HTTP server that overwrites angular's http library. Below we have created an in memory data base to query using RESTful means.
 * to make get all tasks use http.get('api/tasks') just like you would when interfacing with an external api.
 *
 * We have also made it so that requests fail 20% of the time, so you will need to handle error gracefully.
 *
 * By default all http methods return an Observable stream, if you are more comfortable using promises, feel free to use rxjs's toPromise() method: 'rxjs/add/operator/toPromise'
 */
var MockHTTPServer = (function () {
    function MockHTTPServer() {
    }
    MockHTTPServer.prototype.createDb = function () {
        var tasks = [
            {
                id: 1,
                title: "Get this thing done",
                description: "Finish the thinix interview app to score an internship.",
                due: moment().add(7, 'days').format(),
                done: false
            },
            {
                id: 9,
                title: "Turn in school project",
                description: "Submit the project asap",
                due: moment().add(3, 'days').add(2, 'hours').format(),
                done: true
            },
            {
                id: 40,
                title: "Workout",
                description: "Go to the gym friday",
                done: false
            },
            {
                id: 50,
                title: "Turn in homework",
                description: null,
                due: moment().add(1, 'days').add(2, 'hours').add(30, 'minutes').format(),
                done: false
            }
        ];
        return { tasks: tasks };
    };
    /**
     * intercept response from the default HTTP method handlers. There is an 80% chance of success on all http calls, so handle errors gracefully
     * returns a response with a body object. To get the body object from the response, call .json() on the response.
     * A good place to learn more is on than angular docs https://angular.io. The http section will helpful
     */
    MockHTTPServer.prototype.responseInterceptor = function (response, reqInfo) {
        var random = Math.random();
        if (random < 0.8) {
            var method = http_1.RequestMethod[reqInfo.req.method].toUpperCase();
            var body = JSON.stringify(response.body);
        }
        else {
            response.status = 400;
            response.body = {
                data: "An unknown error has occured, please try again"
            };
        }
        return response;
    };
    return MockHTTPServer;
}());
MockHTTPServer = __decorate([
    core_1.Injectable()
], MockHTTPServer);
exports.MockHTTPServer = MockHTTPServer;
