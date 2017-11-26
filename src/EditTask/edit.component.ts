import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { OnInit, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Task } from "../models/task";
import { TaskService } from "../serviceImpl/taskService";
import { ActivatedRoute, Router } from "@angular/router";
import { ParamMap } from "@angular/router";
import { OnDestroy } from '@angular/core';
var moment = require('moment');

@Component({
  moduleId: module.id,
  selector: 'edit-comp',
  templateUrl: `./edit.component.html`,
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  /*
     Focus: Updating the form values on initialization and updating the values on submit

  */

  form: FormGroup;
  task: Task;
  subscription: Subscription;

  //form builder to programatically handling the form
  constructor(private fb: FormBuilder, private router: Router, private service: TaskService, private route: ActivatedRoute) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      due: ['', Validators.pattern('^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]
    });
  }

  //access api/task/id and update the form values on successfull response
  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .switchMap((params: ParamMap) => {
        let id: number = +params.get('id');
        console.log("edicomponent", id);
        return this.service.Get(id);
      }
      )
      .subscribe(response => {
        console.log(response);
        this.task = response;
        this.updateFormValues();
      })
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  updateFormValues() {
    this.title.setValue(this.task.title);
    this.description.setValue(this.task.description);
    let date;
    if (this.task.due) {
      date = moment(this.task.due).format('MM/DD/YYYY');
      this.due.setValue(date);
    }
  }

  // updating the task
  editTask() {
    let date = moment(this.due.value, "MM-DD-YYYY");
    console.log(date);
    let task: Task = {
      id: this.task.id,
      title: this.title.value,
      description: this.description.value,
      due: date,
      done: this.task.done
    }

    this.subscription = this.service.Update(this.task.id, task).subscribe(res => {
      this.router.navigate(['/'], {
        queryParams: { result: "edit" }
      });
    });

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