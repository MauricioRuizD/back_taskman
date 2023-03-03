import { Task } from "../../../nodetypes_tareas/mongodb/models/task";
import { StatusTask, PriorityTask } from "../../enums";

export class TasksService {
    async createTask(
        start: Date, priority: PriorityTask, name: string, detail: string, estimatedTime: number, assignedTo: string, status: StatusTask
    ) {
        const taskSaved = await new Task({ start, priority, name, detail, estimatedTime, assignedTo, status }).save();
        
        return taskSaved
    }

    async consultAllTasks() {
        const tasks = await Task.find();
        
        return tasks
    }
}