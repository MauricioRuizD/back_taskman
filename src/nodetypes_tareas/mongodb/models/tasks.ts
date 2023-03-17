import { model, Schema } from 'mongoose';
import { TasksDocument } from "../documents";

const {Types} = Schema;

const TasksSchema = new Schema(
    {

        start: {
            type: Types.Date,
            required: true,
            default: Date.now,
            get: (v: Date) => v.toISOString(),
            set: (v: string) => new Date(v) 
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
        /*assignedTo:[
            {
                type: Types.ObjectId,
                ref: 'User'
            }
        ],*/
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

TasksSchema.methods.formatStartDate = function() {
    return this.start.toLocaleDateString('es-ES');
  };

export const Tasks = model<TasksDocument>("Tasks", TasksSchema);