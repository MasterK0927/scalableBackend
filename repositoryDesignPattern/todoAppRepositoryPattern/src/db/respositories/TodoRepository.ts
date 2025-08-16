import {Pool} from "pg";
import {Todo, NewTodo} from "../models/Todo";
import {pool} from "../../config/db";

export class TodoRepository {
    private pool: Pool;
    constructor() {
        this.pool = pool;
    }
    async findAll(): Promise<Todo[]> {
        const query = "SELECT * FROM todos ORDER BY id ASC";
        const {rows} = await this.pool.query(query);
        return rows; 
    }

    async create(newTodo: NewTodo): Promise<Todo> {
        const query = 'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *';
        const values = [newTodo.title, newTodo.completed];
        const {rows} = await this.pool.query(query,values);
        return rows[0];
    }

    async update(id: number, todo: Partial<Todo>): Promise<Todo | null> {
        const updates = Object.keys(todo).map((key, index) => `${key} = $${index + 2}`).join(', ');
        const values = [id, ...Object.values(todo)];
        const query = `UPDATE todos SET ${updates} WHERE id = $1 RETURNING *`;
        const {rows} = await this.pool.query(query, values);
        return rows.length ? rows[0] : null;
    }

    async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM todos WHERE id = $1`;
        const {rowCount} = await this.pool.query(query, [id]);
        if (!rowCount) return false;
        return rowCount > 0;
    }
}