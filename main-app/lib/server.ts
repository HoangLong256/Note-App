import App from './app';
import NoteController from './controller/note.controller';
const PORT = 3000;

const app = new App(
    [
        new NoteController(),
    ],
    3000
);
app.listen();