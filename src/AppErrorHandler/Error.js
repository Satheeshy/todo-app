"use strict";
var MyErrorHandler = (function () {
    function MyErrorHandler() {
    }
    MyErrorHandler.prototype.handleError = function (error) {
        alert('An error occured');
        throw error;
    };
    return MyErrorHandler;
}());
exports.MyErrorHandler = MyErrorHandler;
