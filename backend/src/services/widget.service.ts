import Widget, { IWidget } from '../models/widget.model'
import { fetchWeather } from './weather.service'


const CACHE_DURATION = 5 * 60 * 1000 

export async function getAllWidgets(): Promise<IWidget[]> {
	const widgets = await Widget.find()

	const updatedWidgets = await Promise.all(
		widgets.map(async (widget) => {
			const lastUpdated = widget.updatedAt?.getTime?.() || 0
			const isStale = Date.now() - lastUpdated > CACHE_DURATION

			if (!widget.weather || isStale) {
				const weatherData = await fetchWeather(widget.location)
				widget.weather = weatherData
				await widget.save()
			}

			return widget
		})
	)

	return updatedWidgets
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
