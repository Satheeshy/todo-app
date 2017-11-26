import { ITaskService } from './../service/Itask.service';
import { Injectable } from "@angular/core";
import { Task } from "../models/task";
import { Observable } from "rxjs/Rx";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from "@angular/http";
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/catch'

@Injectable()
export class TaskService implements ITaskService {

    //URL for CRUD Operations
    private taskUrl = 'api/tasks';


    constructor(private http: Http) {

    }


    //Fetch all tasks
    GetAll(): Observable<Task[]> {

        return this.http.get(this.taskUrl)
            .retry(5)
            // .retryWhen(errors=> errors.delay(2000))
            .map(this.extractData)
            .catch(this.handleError);


    }
    //get single task
    Get(id: number): Observable<Task> {
        console.log(this.taskUrl + '/' + id);
        return this.http.get(this.taskUrl + '/' + id)
            .retry(5)
            .map(this.extractData).
            catch(this.handleError);

    }

    //create article
    Create(task: Task): Observable<Task> {
        return this.http.post(this.taskUrl, task, this.options)
        .retry(5)
        .map(this.extractData)
        .catch(this.handleError);
    }
    //delete article
    Delete(id: number): Observable<boolean> {
        return this.http.delete(this.taskUrl + '/' + id)
        .retry(5)
        .map(response => response.status)
        .catch(this.handleError);
    }
    Update(id: number, task: Task): Observable<Task> {
        return this.http.put(this.taskUrl + '/' + id, task, this.options)
        .retry(5)
        .map(this.extractData)
        .catch(this.handleError);
    }

    get options() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return options;
    }

    //handling errors
    private handleError(error: Response | any) {
        return Observable.throw(error.status);
    }

    //handling response
    private extractData(res: Response) {
        if (res.status == 204) return;
        return res.json().data as Task[];
    }

    private retryWhen(errors: Error) {

    }

}