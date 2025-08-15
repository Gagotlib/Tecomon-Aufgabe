import { Request, Response } from 'express'
import * as widgetService from '../services/widget.service'
import widgetModel from '../models/widget.model'

export const getWidgets = async (_req: Request, res: Response) => {
	try {
		const widgets = await widgetService.getAllWidgets()
		res.json(widgets)
	} catch (err) {
		res.status(500).json({ error: (err as Error).message })
	}
}

export const createWidget = async (req: Request, res: Response) => {
	const { location } = req.body

	if (!location) {
		res.status(400).json({ error: 'Missing location' })
		return
	}

	// Check if widget already exists
	const existing = await widgetModel.findOne({ location: location.trim() })
	if (existing) {
		res.status(400).json({ error: `Widget for "${location}" already exists.` })
		return
	}

	try {
		const widget = await widgetService.createWidget(location)
		res.status(201).json(widget)
	} catch (err) {
		res.status(500).json({ error: (err as Error).message })
	}
}

export const deleteWidget = async (req: Request, res: Response) => {
	const { id } = req.params

	if (!id) {
		res.status(400).json({ error: 'Missing id' })
		return
	}
	try {
		await widgetService.deleteWidgetById(id)
		res.json({ message: 'Widget deleted' })
	} catch (err) {
		res.status(500).json({ error: (err as Error).message })
	}
}
