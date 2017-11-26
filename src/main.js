"use strict";
var main_module_1 = require("./main.module");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
/**
* This is the main entry point for the applications. It's only job is to 'Bootstrap' our home module
*/
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(main_module_1.MainModule);
