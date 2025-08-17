import {Router} from "express";
import { TodoController } from "../controllers/TodoController";

const router = Router();
const todoController = new TodoController();

router.post('/', todoController.createTodo);

export default router;