import {Request, Response, Express, Router} from "express";
import IController from "./IController";

class TestController implements IController{

    public path = "/";
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get(this.path, this.executeTest);
    }

    private executeTest = (req: Request, res: Response) : void => {
        res.send({
            success: true,
            message: 'Get message successfull !!!'
        })
    }
}

export default TestController;