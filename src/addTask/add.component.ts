import { Task } from './../models/task';
import { Router } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { TaskService } from "../serviceImpl/taskService";
var moment = require('moment');

@Component({
  moduleId: module.id,
  selector: 'add-comp',
  templateUrl: `./add.component.html`,
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy {
  /*
  Creating a new task
  */

  form: FormGroup;
  subsc: Subscription;
  task: Task[];

  constructor(private fb: FormBuilder, private service: TaskService, private router: Router) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.pattern("^[0-9]*$")], this.validateUniqueId.bind(this)],
      title: ['', [Validators.required]],
      description: [''],
      due: ['',  Validators.pattern('^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]
    });
  }

  //creating task and do post operation
  createTask() {
    let date = moment(this.due.value,"MM-DD-YYYY");
    console.log(date);
    let task: Task = {
      id: +this.id.value,
      title: this.title.value,
      description: this.description.value,
      due: date,
      done: false
    }

    this.subsc = this.service.Create(task).subscribe(res => {
      this.router.navigate(['/'], {
        queryParams: { result: "add" }
      });
    });

  }

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnDestroy(): void {
    if (this.subsc)
      this.subsc.unsubscribe();
  }

  /*
  Two task cannot have same ID.
  Also I cannot generate Angular UUID due to already persisted task in Inmemorydatabase.
  So here am comparing with all existing task ID and programatically invalidating id control.

  */
  validateUniqueId(control: AbstractControl){
       return new Promise((resolve,reject)=>{
         this.task.forEach((task:Task)=>{
           if(task.id == control.value)
           resolve({unique: true});
         })
         resolve(null);
       }
       );
         
  }

  getTasks() {
    this.subsc = this.service.GetAll().subscribe(res => this.task = res);
  }
  get id() {
    return this.form.get('id');
  }
  get description() {
    return this.form.get('description');
  }
  get title() {
    return this.form.get('title');
  }
  get due() {
    return this.form.get('due');
  }


}