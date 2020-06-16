"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var express_1 = require("express");
var NoteController = /** @class */ (function () {
    function NoteController() {
        var _this = this;
        this.path = '/notes/';
        this.router = express_1.Router();
        this.loadData = function () {
            try {
                var dataBuffer = fs_1.default.readFileSync('./lib/data/notes.json');
                var dataJSON = dataBuffer.toString();
                if (dataJSON.length === 0) {
                    return [];
                }
                return JSON.parse(dataJSON);
            }
            catch (error) {
                return [];
            }
        };
        this.saveData = function (data) {
            var dataJSON = JSON.stringify(data);
            fs_1.default.writeFileSync('./lib/data/notes.json', dataJSON);
        };
        this.createNode = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var date, note, data;
            return __generator(this, function (_a) {
                date = Date.now();
                note = req.body;
                note.id = date.toString();
                data = this.loadData();
                data.push(note);
                this.saveData(data);
                res.send({
                    success: true,
                    data: note
                });
                return [2 /*return*/];
            });
        }); };
        this.getAllNotes = function (req, res) {
            var data = _this.loadData();
            res.send({
                success: true,
                data: data
            });
        };
        this.getNoteByID = function (req, res) {
            var data = _this.loadData();
            var note = data.find(function (note) { return note.id === req.params.id; });
            if (!note) {
                res.send({
                    success: false,
                    message: 'ID is unavailable'
                });
            }
            res.send({
                success: true,
                data: note
            });
        };
        this.deleteNoteByID = function (req, res) {
            var data = _this.loadData();
            var newData = data.filter(function (note) { return note.id === req.params.id; });
            if (data.length !== newData.length) {
                _this.saveData(newData);
                res.send({
                    success: true,
                    message: 'note is deleted'
                });
            }
            res.send({
                success: false,
                message: 'ID is unavailable'
            });
        };
        this.initializeRoutes();
    }
    NoteController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllNotes);
        this.router.get(this.path + ":id", this.getNoteByID);
        this.router.post(this.path, this.createNode);
        this.router.delete(this.path + ":id", this.deleteNoteByID);
    };
    return NoteController;
}());
exports.default = NoteController;
