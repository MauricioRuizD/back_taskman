import { Router } from 'express';
import { tasksController } from '../../../controlador/modules';

class TasksRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //this.router.put('/add', tasksController.Create);
        this.router.get('/list', tasksController.consultAllTasks);
    }

}

const tasksRoutes = new TasksRoutes();
export default tasksRoutes.router;