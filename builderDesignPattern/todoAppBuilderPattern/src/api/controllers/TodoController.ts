import {Request, Response} from "express";
import { TodoBuilder } from "../../builder/TodoBuilder";
import { Todo } from "../../models/Todo";

export class TodoController {
    public async createTodo(req: Request, res: Response): Promise<Response> {
        const {title, description, dueDate} = req.body;
        try {
            const builder = new TodoBuilder(title);
            if (description) builder.withDescription(description);
            if (dueDate) builder.withDueDate(dueDate);
            const newTodo: Todo = builder.build();
            console.log("new todo created: ", newTodo);
            return res.status(201).json(newTodo);
        } catch (error: any) {
            return res.status(400).json({error: error.message});
        }
    }
}