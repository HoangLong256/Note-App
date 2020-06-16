import IController from "./IController";
import Note from 'model/note.model';
import fs from 'fs';
import { Router, Request, Response } from "express";

class NoteController implements IController{
    public path = '/notes/';
    public router = Router();

    constructor(){
        this.initializeRoutes();
    }

    initializeRoutes():void {
        this.router.get(this.path, this.getAllNotes);
        this.router.get(`${this.path}:id`, this.getNoteByID);
        this.router.post(this.path, this.createNode);
        this.router.delete(`${this.path}:id`, this.deleteNoteByID)
    }

    private loadData = (): Note[] => {
        try {
            const dataBuffer = fs.readFileSync('./lib/data/notes.json');
            const dataJSON: string = dataBuffer.toString();
            if(dataJSON.length === 0){
                return [];
            }
            return JSON.parse(dataJSON);
        }catch(error) {
            return [];
        }
    }

    private saveData = (data: Note[]) => {
        const dataJSON = JSON.stringify(data);
        fs.writeFileSync('./lib/data/notes.json', dataJSON);
    }

    private createNode = async (req: Request, res: Response) =>{
        const date: number = Date.now();
        const note: Note = req.body;
        note.id = date.toString();
        const data =  this.loadData();
        data.push(note);
        this.saveData(data);
        res.send({
            success: true,
            data: note
        })
    }

    private getAllNotes =  (req: Request, res: Response) => {
        const data: Note[] =  this.loadData();
        res.send({
            success: true,
            data: data
        })
    }

    private getNoteByID = (req: Request, res: Response) => {
        const data: Note[] = this.loadData();
        const note: Note | undefined = data.find((note:Note) => note.id === req.params.id);
        if(!note){
            res.send({
                success: false,
                message: 'ID is unavailable'
            })
        }
        res.send({
            success: true,
            data: note
        })
    }

    private deleteNoteByID = (req: Request, res: Response) =>{
        const data: Note[] = this.loadData();
        const newData: Note[] = data.filter((note: Note) => note.id === req.params.id);
        if(data.length !== newData.length){
            this.saveData(newData);
            res.send({
                success: true,
                message: 'note is deleted'
            })
        }

        res.send({
            success: false,
            message: 'ID is unavailable'
        })
    }
}

export default NoteController;