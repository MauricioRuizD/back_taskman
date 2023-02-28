import { model, Schema } from 'mongoose';
import { TaskDocument } from "../documents";

const {Types} = Schema;

const TaskSchema = new Schema(
    {

        start: {
            type: Types.Date,
            required: true,
        },
        priority: {
            type: Types.String,
            enum: ['HIGH', 'NORMAL', 'LOW'],
            default: 'NORMAL',
        },
        name: {
            type: Types.String,
            required: true,
        },
        detail: {
            type: Types.String,
            required: true,
        },
        estimatedTime:{
            type: Types.Number,
            required: true,
        },
        assignedTo:[
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],
        status: {
            type: Types.String,
            enum: ['OPEN', 'DONE', 'REMOVED'],
            default: 'OPEN'
        },
    },
    {
        timestamps: true,
    }
);

export const Task = model<TaskDocument>("Task", TaskSchema);