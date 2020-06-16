"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TestController = /** @class */ (function () {
    function TestController() {
        this.path = "/";
        this.router = express_1.Router();
        this.executeTest = function (req, res) {
            res.send({
                success: true,
                message: 'Get message successfull !!!'
            });
        };
        this.initializeRoutes();
    }
    TestController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.executeTest);
    };
    return TestController;
}());
exports.default = TestController;
