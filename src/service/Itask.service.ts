import { Observable } from 'rxjs/Rx';
import { Task } from '../models/task';


/**
 * An interface that defines basic CRUD operations to minultate task objects. You should implement this interface in a new service whose sole responsibily is
 * to interact with the mocked "backend". You can interface with the mocked db using angular's http library. ie: http.get('api/tasks) to retreive all tasks.
 */
export interface ITaskService {
    /**
    * Retreives all tasks from the list
    */
    GetAll() : Promise<Task[]> | Observable<Task[]>

    /**
    * retreives a task from the list
    * @param id the id of the task to retreive
    */
    Get(id: number) : Promise<Task> | Observable<Task>

    /**
    * Creates a new task
    * @param task the new task to create
    */
    Create(task: Task) : Promise<Task> | Observable<Task>

    /**
    * Removes a task
    * @param id Id of the task you want to remove
    */
    Delete(id: number) : Promise<boolean> | Observable<boolean>

    /**
    * updates a task
    * @param id the id of the task you want to update
    * @param task the updated task
    */
    Update(id: number, task: Task) : Promise<Task> | Observable<Task>
}
