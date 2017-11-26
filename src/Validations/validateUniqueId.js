"use strict";
var IdValidator = (function () {
    function IdValidator() {
    }
    IdValidator.shouldbeUnique = function (c) {
        console.log(c.value);
    };
    return IdValidator;
}());
exports.IdValidator = IdValidator;
