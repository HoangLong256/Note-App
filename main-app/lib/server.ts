import App from './app';
import TestContrller from './controller/TestController'
import TestController from './controller/TestController';
const PORT = 3000;

const app = new App(
    [
        new TestController(),
    ],
    3000
);
app.listen();