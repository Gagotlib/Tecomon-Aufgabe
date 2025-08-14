import { Request, Response } from 'express'
import Widget, { IWidget } from '../models/widget.js'

export const getWidgets = async (req: Request, res: Response) => {
	try {
		const widgets: IWidget[] = await Widget.find()
		res.json(widgets)
	} catch (err) {
		res.status(500).json({ error: (err as Error).message })
	}
}

export const createWidget = async (req: Request, res: Response) => {
	try {
		const { location } = req.body
		const widget = new Widget({ location })
		await widget.save()
		res.status(201).json(widget)
	} catch (err) {
		res.status(500).json({ error: (err as Error).message })
	}
}

export const deleteWidget = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		await Widget.findByIdAndDelete(id)
		res.json({ message: 'Widget eliminado' })
	} catch (err) {
		res.status(500).json({ error: (err as Error).message })
	}
}
