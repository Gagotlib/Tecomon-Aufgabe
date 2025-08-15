// backend/routes/weather.routes.ts
import { Router, } from 'express'
import { getWeather } from '../controllers/weather.controller'

const router = Router()

router.get('/:location', getWeather)

export default router
