import {Todo, TodoInterface} from "../models/Todo";

export class TodoBuilder implements TodoInterface {
    title: string;
    completed: boolean = false;
    description?: string;
    dueDate?: Date;
    id?: number;

    constructor(title: string) {
        if (!title) {
            throw new Error("Title is required for a Todo");
        }
        this.title = title;
    }

    withDescription(description: string): TodoBuilder {
        this.description = description;
        return this; // imp for method chaining
    }

    withDueDate(date: Date): TodoBuilder {
        this.dueDate = date;
        return this;
    }

    build(): Todo {
        return new Todo(this);
    }
}