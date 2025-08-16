import {Request, Response} from "express";
import {TodoService} from "../services/TodoService";
import { NewTodo } from "../../db/models/Todo";

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    async createTodo(req: Request, res: Response){
        try {
            const newTodo: NewTodo = req.body;
            const createdTodo = await this.todoService.createTodo(newTodo);
            return res.status(201).json(createdTodo);
        } catch (error) {
            console.error('Error creating todo: ', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }

    async getAllTodos(req: Request, res: Response){
        try {
            const todos = await this.todoService.getAllTodos();
            return res.status(200).json(todos);
        } catch (error) {
            console.error('Error finding todos: ', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }

    async updateTodo(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id!);
            const updates = req.body;
            const updatedTodo = await this.todoService.updateTodo(id,updates);
            return res.status(200).json(updatedTodo);
        } catch (error) {
            console.error('Error updating todo: ', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }

    async deleteTodo(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id!);
            const isDeleted = await this.todoService.deleteTodo(id);
            return res.status(204).json();
        } catch (error) {
            console.error('Error deleting todo: ', error);
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}