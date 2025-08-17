import { LoggerSingleton } from "../../lib/LoggerSingleton";

export class TodoService {
    private logger: LoggerSingleton;

    constructor() {
        this.logger = LoggerSingleton.getInstance();
    }

    public async createTodo(todoData: string): Promise<string> {
        this.logger.log(`Attempting to create todo with data: ${todoData}`);
        const newTodo = `Todo created "${todoData}"`;
        this.logger.log(`Successfully created todo: ${newTodo}`);
        return newTodo;
    }
}