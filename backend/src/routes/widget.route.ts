import { Router } from 'express'
import { getWidgets, createWidget, deleteWidget } from '../controllers/widgets-controllers'

const router = Router()

// GET /widgets
router.get('/', getWidgets);

// POST /widgets
router.post('/', createWidget);

// DELETE /widgets/:id
router.delete('/:id', deleteWidget);
export default router
