import { RequestMethod, ResponseOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
var moment = require('moment');

/**
 * A mocked HTTP server that overwrites angular's http library. Below we have created an in memory data base to query using RESTful means. 
 * to make get all tasks use http.get('api/tasks') just like you would when interfacing with an external api. 
 * 
 * We have also made it so that requests fail 20% of the time, so you will need to handle error gracefully. 
 * 
 * By default all http methods return an Observable stream, if you are more comfortable using promises, feel free to use rxjs's toPromise() method: 'rxjs/add/operator/toPromise'
 */
@Injectable()
export class MockHTTPServer implements InMemoryDbService {
    createDb(): {} {
        let tasks = [
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
        return {tasks}
    }

     /**
      * intercept response from the default HTTP method handlers. There is an 80% chance of success on all http calls, so handle errors gracefully
      * returns a response with a body object. To get the body object from the response, call .json() on the response.
      * A good place to learn more is on than angular docs https://angular.io. The http section will helpful
      */
    responseInterceptor(response: ResponseOptions, reqInfo: any) {
        let random = Math.random();
        if(random < 0.8) {
            const method = RequestMethod[reqInfo.req.method].toUpperCase();
            const body = JSON.stringify(response.body);
        } else {
            response.status = 400;
            response.body = {
                data: "An unknown error has occured, please try again"
            }
        }
        return response;
    }
}