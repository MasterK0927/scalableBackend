import { randomBytes, randomUUID } from "crypto";
import { TodoBuilder } from "../builder/TodoBuilder";

export interface TodoInterface {
    title: string;
    completed: boolean;
    description?: string;
    dueDate?: Date;
    id?: number;
}

export class Todo implements TodoInterface {
    title: string;
    completed: boolean;
    description: string;
    dueDate?: Date;
    id?: number;

    constructor(builder: TodoBuilder) {
        this.title = builder.title;
        this.completed = builder.completed;
        this.description = builder.description || "";
        this.dueDate = builder.dueDate || new Date();
        this.id = builder.id || parseInt(randomUUID());
    }
}