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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var taskService_1 = require("../serviceImpl/taskService");
var moment = require('moment');
var AddComponent = (function () {
    function AddComponent(fb, service, router) {
        this.fb = fb;
        this.service = service;
        this.router = router;
        this.form = this.fb.group({
            id: ['', [forms_1.Validators.required, forms_1.Validators.pattern("^[0-9]*$")], this.validateUniqueId.bind(this)],
            title: ['', [forms_1.Validators.required]],
            description: [''],
            due: ['', forms_1.Validators.pattern('^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]
        });
    }
    //creating task and do post operation
    AddComponent.prototype.createTask = function () {
        var _this = this;
        var date = moment(this.due.value, "MM-DD-YYYY");
        console.log(date);
        var task = {
            id: +this.id.value,
            title: this.title.value,
            description: this.description.value,
            due: date,
            done: false
        };
        this.subsc = this.service.Create(task).subscribe(function (res) {
            _this.router.navigate(['/'], {
                queryParams: { result: "add" }
            });
        });
    };
    AddComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    AddComponent.prototype.ngOnDestroy = function () {
        if (this.subsc)
            this.subsc.unsubscribe();
    };
    /*
    Two task cannot have same ID.
    Also I cannot generate Angular UUID due to already persisted task in Inmemorydatabase.
    So here am comparing with all existing task ID and programatically invalidating id control.
  
    */
    AddComponent.prototype.validateUniqueId = function (control) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.task.forEach(function (task) {
                if (task.id == control.value)
                    resolve({ unique: true });
            });
            resolve(null);
        });
    };
    AddComponent.prototype.getTasks = function () {
        var _this = this;
        this.subsc = this.service.GetAll().subscribe(function (res) { return _this.task = res; });
    };
    Object.defineProperty(AddComponent.prototype, "id", {
        get: function () {
            return this.form.get('id');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddComponent.prototype, "description", {
        get: function () {
            return this.form.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddComponent.prototype, "title", {
        get: function () {
            return this.form.get('title');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddComponent.prototype, "due", {
        get: function () {
            return this.form.get('due');
        },
        enumerable: true,
        configurable: true
    });
    return AddComponent;
}());
AddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'add-comp',
        templateUrl: "./add.component.html",
        styleUrls: ['./add.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, taskService_1.TaskService, router_1.Router])
], AddComponent);
exports.AddComponent = AddComponent;
