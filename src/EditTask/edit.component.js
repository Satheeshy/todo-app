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
var forms_1 = require("@angular/forms");
var taskService_1 = require("../serviceImpl/taskService");
var router_1 = require("@angular/router");
var moment = require('moment');
var EditComponent = (function () {
    //form builder to programatically handling the form
    function EditComponent(fb, router, service, route) {
        this.fb = fb;
        this.router = router;
        this.service = service;
        this.route = route;
        this.form = this.fb.group({
            title: ['', [forms_1.Validators.required]],
            description: [''],
            due: ['', forms_1.Validators.pattern('^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]
        });
    }
    //access api/task/id and update the form values on successfull response
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.paramMap
            .switchMap(function (params) {
            var id = +params.get('id');
            console.log("edicomponent", id);
            return _this.service.Get(id);
        })
            .subscribe(function (response) {
            console.log(response);
            _this.task = response;
            _this.updateFormValues();
        });
    };
    EditComponent.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    EditComponent.prototype.updateFormValues = function () {
        this.title.setValue(this.task.title);
        this.description.setValue(this.task.description);
        var date;
        if (this.task.due) {
            date = moment(this.task.due).format('MM/DD/YYYY');
            this.due.setValue(date);
        }
    };
    // updating the task
    EditComponent.prototype.editTask = function () {
        var _this = this;
        var date = moment(this.due.value, "MM-DD-YYYY");
        console.log(date);
        var task = {
            id: this.task.id,
            title: this.title.value,
            description: this.description.value,
            due: date,
            done: this.task.done
        };
        this.subscription = this.service.Update(this.task.id, task).subscribe(function (res) {
            _this.router.navigate(['/'], {
                queryParams: { result: "edit" }
            });
        });
    };
    Object.defineProperty(EditComponent.prototype, "description", {
        get: function () {
            return this.form.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditComponent.prototype, "title", {
        get: function () {
            return this.form.get('title');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditComponent.prototype, "due", {
        get: function () {
            return this.form.get('due');
        },
        enumerable: true,
        configurable: true
    });
    return EditComponent;
}());
EditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'edit-comp',
        templateUrl: "./edit.component.html",
        styleUrls: ['./edit.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router, taskService_1.TaskService, router_1.ActivatedRoute])
], EditComponent);
exports.EditComponent = EditComponent;
