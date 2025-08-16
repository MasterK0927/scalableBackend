// import
import {Request, Response} from "express";
import {findAll, create, update, deletebyId} from "../models/todo.models";

// business logic
export const getAllTodos = async(req: Request, res: Response) => {
    try {
        // fetch all the todos
        const todos = await findAll();
        res.json(todos);
    } catch(err) {
        res.status(500).send('Something went wrong');
    }
};

export const createTodo = async(req: Request, res: Response) => {
    const {title} = req.body;
    if (!title) return res.status(400).send("Title is required");
    try {
        const newTodo = await create({title});
        if (newTodo) res.status(201).json(newTodo);
        else {
            res.status(409).send('Active todo with similar title already exists');
        }
    } catch(err) {
        res.status(500).send('something went wrong');
    }
};

export const updateTodo = async(req: Request, res: Response) => {
    // read id from url params
    const id = parseInt(req.params.id!, 10);
    // read data from body
    const {title, completed} = req.body;
    try {
        const updatedTodo = await update(id, {title, completed});
        if (updatedTodo) res.status(201).json(updatedTodo);
        else {
            res.status(400).send("Not found");
        }
    } catch(err) {
        res.status(500).send('something went wrong');
    }
};

export const deleteTodo = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id!, 10);
    try {
        await deletebyId(id);
    } catch(err) {
        res.status(500).send("Something went wrong");
    }
}