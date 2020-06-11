import express from 'express';
import IController from 'controller/IController';

class App{

    public app: express.Application;
    public controllers: IController[];
    public port: number;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.controllers = controllers;
        this.port = port;
        this.initializeController()
    }

    private initializeController() {
        this.controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }   

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on the port " + this.port);
        })
    }

};

export default App;
