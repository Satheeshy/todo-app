import { Observable } from 'rxjs/Observable';
import { TaskService } from './../serviceImpl/taskService';
import { Component } from '@angular/core';
import { Task } from '../models/task';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { Event } from '_debugger';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'todo-comp',
  templateUrl: `./todo.component.html`,
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  /*
    TodoComponent is mainly to display all the tasks and manage delete tasks.
  */

  private todos: Task[];
  private toDeleteTask: Task[];
  private message: String;
  private showMessage: boolean;
  private Subscriptions = new Subscription();
  private showMore: number = -1;


  //dependency injection
  constructor(private service: TaskService, private router: Router, private route: ActivatedRoute) {

  }

  //When component is initializing, get all the user tasks and checks if any params exists
  ngOnInit(): void {
    this.getAllTask();
    this.route.queryParams.subscribe((params: Params) => {
      let result = params['result'];
      this.geturl(result);
    });
  }

  getAllTask() {
    this.Subscriptions.add(this.service.GetAll()
      .subscribe(res => {
        this.todos = res;
        this.toDeleteTask = [];
      }));
  }

  //Marking a task as done and updating the DB.
  toggle(task: Task) {
    task.done = !task.done
    if (task.done) this.showHide("Marked an Item as Done!!");
    else this.showHide("UnMarked an Item!!");
    this.Subscriptions.add(this.service.Update(task.id, task).subscribe());
  }
  //routing to edit component
  edit(id: Number) {
    this.router.navigate(['/edit', id]);
  }

  //unsubscribing from all the subscriptions
  ngOnDestroy() {
    this.Subscriptions.unsubscribe();
  }

  //routing to add compoennt
  addTask() {
    this.router.navigate(['/add']);
  }

  //deleteing all the task marked by user
  deleteTask() {
    if (this.toDeleteTask.length == 0) this.showHide("Please Mark an Item to Delete");

    this.toDeleteTask.forEach((task: Task) => {
      this.Subscriptions.add(
        this.service.Delete(task.id).subscribe(res => {
          this.getAllTask();
          this.showHide("Successfully deleted all the Task!!!!");
        })
      );
    })
  }


  //storing the task which are selected
  taskToDelete(task: Task, event: any) {
    if (event.target.checked) this.toDeleteTask.push(task);
    else {
      const index: number = this.toDeleteTask.indexOf(task);
      this.toDeleteTask.splice(index, 1);
    }
    console.log(this.toDeleteTask);

  }

  //get return-url from edit and add components
  geturl(result: String) {
    if (result) {
      if (result == 'edit') this.showHide("You successfully edited the task!!!!");
      else if (result == 'add') this.showHide("Successfully added the Task!!!!");
    }
    else this.showMessage = false;
  }

  //display user messages
  showHide(msg: String) {
    this.message = msg;
    this.showMessage = true;
    setTimeout(() => { this.showMessage = false }, 3000)
  }

  viewMore(more: number) {
    console.log(more);
    if(more == this.showMore) this.showMore = -1;
    else this.showMore = more;
  }





}
