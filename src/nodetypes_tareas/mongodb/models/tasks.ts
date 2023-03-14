import { model, Schema } from 'mongoose';
import { TasksDocument } from "../documents";

const {Types} = Schema;

const TasksSchema = new Schema(
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

export const Tasks = model<TasksDocument>("Tasks", TasksSchema);