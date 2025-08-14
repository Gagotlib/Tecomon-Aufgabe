import Widget, { IWidget } from '../models/widget'

export const getAllWidgets = async (): Promise<IWidget[]> => {
	return await Widget.find()
}

export const createNewWidget = async (location: string): Promise<IWidget> => {
	const widget = new Widget({ location })
	return await widget.save()
}

export const deleteWidgetById = async (id: string): Promise<void> => {
	await Widget.findByIdAndDelete(id)
}
