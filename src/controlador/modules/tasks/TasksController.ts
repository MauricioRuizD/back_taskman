import { TasksService } from './TasksService';
import { NextFunction } from "express";
import { Request, Response } from 'express'

class TasksController {
    private tasksService: TasksService;

    constructor() {
        this.tasksService = new TasksService();
    }

    /*async Create(request: Request, response: Response, next: NextFunction) {
        try {
            const { start, priority, name, detail, estimatedTime, assignedTo, status } = request.body

            if(!start || !priority || !name || !detail || !estimatedTime || !assignedTo || !status) {
                return response.status(400).json('Invalid parameters');
            }

            await this.tasksService.createTask( start, priority, name, detail, estimatedTime, assignedTo, status )
                .then(tasks => response.json(tasks))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })
        } catch (error) {
            next(error)
        }
    }*/

     consultAllTasks = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        
        try {
            await this.tasksService.consultAllTasks()
                .then(tasks => response.json(tasks))
                .catch(error => {
                    console.error("[TASK CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })
        } catch (error) {
            next(error)
        }
    }
}

export const tasksController = new TasksController();