import { Request, Response } from "express";
import { TodoService } from "../services/TodoService";

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    public async createTodo(req: Request, res: Response): Promise<Response> {
        const {title} = req.body;
        try {
            const newTodo = await this.todoService.createTodo(title);
            return res.status(201).json(newTodo);
        } catch (error) {
            console.error('Error in createTodo controller', error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
}