import { Router } from 'express'
import { getWidgets, createWidget, deleteWidget } from '../controllers/widgets.js'

const router = Router()

router.get('/', getWidgets)
router.post('/', createWidget)
router.delete('/:id', deleteWidget)

export default router
