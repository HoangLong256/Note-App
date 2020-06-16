"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var note_controller_1 = __importDefault(require("./controller/note.controller"));
var PORT = 3000;
var app = new app_1.default([
    new note_controller_1.default(),
], 3000);
app.listen();
