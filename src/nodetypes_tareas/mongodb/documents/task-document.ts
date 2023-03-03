import { Document } from "mongoose";
import { ITimestamp } from "../../interfaces";
import { StatusTask, PriorityTask } from "../../enums";

export interface TaskDocument extends Document, ITimestamp {
    start: Date,
    priority: PriorityTask,
    name: string,
    detail: string,
    estimatedTime: number,
    assignedTo: string,
    status: StatusTask,    
    lastLogin: Date,
    lastLogout: Date,
}