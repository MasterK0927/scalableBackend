import { TodoRepository } from "../../db/respositories/TodoRepository";
import { Todo, NewTodo } from "../../db/models/Todo";

export class TodoService {
    private todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepository();
    }

    async getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.findAll();
    }

    async createTodo(newTodo: NewTodo): Promise<Todo> {
        return this.todoRepository.create(newTodo);
    }

    async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo | null> {
        return this.todoRepository.update(id, todo);
    }

    async deleteTodo(id: number): Promise<boolean> {
        return this.todoRepository.delete(id);
    }
}