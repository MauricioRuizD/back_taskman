import { Tasks } from "../../../nodetypes_tareas/mongodb/models/tasks";
//import { StatusTask, PriorityTask } from "../../enums";

export class TasksService {
    /*async createTask(
        start: Date, priority: PriorityTask, name: string, detail: string, estimatedTime: number, assignedTo: string, status: StatusTask
    ) {
        const taskSaved = await new Tasks({ start, priority, name, detail, estimatedTime, assignedTo, status }).save();
        
        return taskSaved
    }*/

    async consultAllTasks() {
        
        const tasks = await Tasks.find();
        return tasks
    }
}