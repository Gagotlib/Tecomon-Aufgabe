// backend/controllers/weather.controller.ts
import { Request, Response } from 'express'
import { fetchWeather } from '../services/weather.service'

export const getWeather = async (req: Request, res: Response) => {
	const { location } = req.params
	if (!location) {
		return res.status(400).json({ error: 'Location is required' })
	}

	try {
		const data = await fetchWeather(location)
		res.json(data)
		return
	} catch (err) {
		res.status(500).json({ error: (err as Error).message })
		return
	}
}
