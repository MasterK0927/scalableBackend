import {Router} from 'express';
import { TodoController } from '../controllers/TodoController';

const router = Router();
const todoController = new TodoController();

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.patch('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;