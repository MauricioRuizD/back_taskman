import { TasksService } from './TaskService';
import { NextFunction } from "express";
import { Request, Response } from 'express'

export class TasksController {
    private tasksService: TasksService;

    /**
     * Creates an instance of UserController.
     */
    constructor() {
        this.tasksService = new TasksService()
    }

    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            const { start, priority, name, detail, estimatedTime, assignedTo, status } = request.body

            if(!start || !priority || !name || !detail || !estimatedTime || !assignedTo || !status) {
                return response.status(400).json('Invalid parameters');
            }

            await this.tasksService.createTask( start, priority, name, detail, estimatedTime, assignedTo, status )
                .then(task => response.json(task))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })
        } catch (error) {
            next(error)
        }
    }

    async consultAllTasks(request: Request, response: Response, next: NextFunction) {
        try {
            await this.tasksService.consultAllTasks()
                .then(task => response.json(task))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })
        } catch (error) {
            next(error)
        }
    }
}