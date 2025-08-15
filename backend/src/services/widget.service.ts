import Widget, { IWidget } from '../models/widget.model'
import { fetchWeather } from '../utils/fetch-weather'

export async function getAllWidgets(): Promise<IWidget[]> {
	return Widget.find()
}

export async function createWidget(location: string): Promise<IWidget> {
	const weatherData = await fetchWeather(location)
	const widget = new Widget({
		location,
		weather: weatherData
	})
	await widget.save()
	return widget
}

export async function deleteWidgetById(id: string) {
	return Widget.findByIdAndDelete(id)
}
