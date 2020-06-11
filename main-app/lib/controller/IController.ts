import { Router } from "express";

interface IController {
    initializeRoutes() : void;
    router: Router
}
export default IController;