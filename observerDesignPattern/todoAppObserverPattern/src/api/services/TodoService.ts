import { TodoRepository } from "../../db/respositories/TodoRepository";
import { TodoCreatedSubject } from "../../events/TodoCreatedSubject";
import { LoggerObserver } from "../../events/LoggerObserver";
import { NotificationObserver } from "../../events/NotificationObserver";

export class TodoService {
    private todoRepository: TodoRepository;
    private todoCreatedSubject: TodoCreatedSubject;

    constructor() {
        this.todoRepository = new TodoRepository();
        this.todoCreatedSubject = new TodoCreatedSubject();
        this.todoCreatedSubject.attach(new LoggerObserver());
        this.todoCreatedSubject.attach(new NotificationObserver());
    }

    public async createTodo(title: string): Promise<any> {
        const newTodo = await this.todoRepository.createTodo(title);
        this.todoCreatedSubject.notify(newTodo);
        return newTodo;
    }
}