import pool from '../config/db';

export class TodoRepository {
    async createTodo(title: string): Promise<any> {
        const query = 'INSERT INTO todos (title) VALUES ($1) RETURNING id, title';
        const values = [title];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}