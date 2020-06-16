"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express_1.default();
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.port = port;
        this.controllers = controllers;
        this.initializeController();
    }
    App.prototype.initializeController = function () {
        var _this = this;
        this.controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server running on the port " + _this.port);
        });
    };
    return App;
}());
;
exports.default = App;
