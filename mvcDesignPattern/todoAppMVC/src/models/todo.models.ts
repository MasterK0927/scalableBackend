// import db object
import {db} from "../config/db";

// interface for todo object
export interface Todo {
    id: number,
    title: string,
    completed: boolean,
}

// tododata for fallback
const fallbackTodos: Todo[] = [
    {id: 1, title: 'Learn MVC pattern', completed: true},
    {id: 2, title: 'Create nodejs server', completed: true},
    {id: 3, title: 'Connect model to controller', completed: false},
]

// main function
export const findAll = async() => {
    if (db.isConnected) {
        console.log('db is the source of truth');
        const res = await db.pool.query('SELECT * FROM todos');
        return res.rows;
    } else {
        console.log("fetching from fallback");
        return fallbackTodos;
    }
}

export const create = async(newTodoData: {title: string}): Promise<Todo | null> => {
    const {title} = newTodoData;
    if (db.isConnected) {
        // db
        let existing = await db.pool.query(
            'SELECT * FROM todos WHERE title = $1 AND completed = false',
            [title]
        );
        if (existing.rows.length > 0) {
            console.log('An active todo with this title already exists in db');
            return null;
        }
        // if not exists
        const res = await db.pool.query(
            'INSERT INTO todos (title, completed) VALUES ($1, false) RETURNING *',
            [title]
        );
        return res.rows[0];
    } else {
        let existing = fallbackTodos.find(
            (todo) => todo.title === title && !todo.completed
        );
        if (existing) {
            console.log('An active todo with this title already exists in fallback');
            return null;
        }
        const newId = fallbackTodos.length > 0 ? Math.max(...fallbackTodos.map(t => t.id)) + 1 : 1;
        const newTodo : Todo = {
            id: newId,
            title: title,
            completed: false
        };
        fallbackTodos.push(newTodo);
        return newTodo;
    }
};

export const update = async(id: number, updateData: {title?: string; completed?: boolean}): Promise<Todo | null> => {
    if (db.isConnected) {
        // build the query dynamically
        const fields = Object.keys(updateData).map((key, index) => `"${key}" = $${index + 2}`).join(', ');
        const values = Object.values(updateData);

        if (fields.length === 0) {
            // if no data to update, fetch and return the current todo
            const currentTodo = await db.pool.query('SELECT * FROM todos WHERE id = $1', [id]);
            return currentTodo.rows[0] || null;
        }
        const updatedTodo = await db.pool.query(
            `UPDATE todos SET ${fields} WHERE id = $1 RETURNING *`,
            [id, ...values]
        );
        return updatedTodo.rows[0] || null;
    } else {
        const todoIndex = fallbackTodos.findIndex((todo) => todo.id === id);
        const originalTodo = fallbackTodos[todoIndex];
        if (!originalTodo) {
            return null;
        }
        const updatedTodo: Todo = {
            id: originalTodo.id,
            title: updateData.title ?? originalTodo?.title,
            completed: updateData.completed ?? originalTodo?.completed,
        };
        fallbackTodos[todoIndex] = updatedTodo;
        return updatedTodo;
    }
};

export const deletebyId = async(id: number) => {
    
}