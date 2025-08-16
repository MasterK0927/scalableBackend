// dependencies
import {Router, Request, Response} from 'express';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controllers';

// init
const router = Router();

// api
// delegate to controller
router.get("/", getAllTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// export
export default router;