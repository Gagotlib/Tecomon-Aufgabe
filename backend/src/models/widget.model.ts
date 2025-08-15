import mongoose, { Schema, Document } from 'mongoose'
import { Weather } from '../interfaces/weather.interface'

export interface IWidget extends Document {
	location: string
	createdAt: Date
	weather?: Weather
}

const WidgetSchema = new Schema<IWidget>({
	location: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	weather: { type: Schema.Types.Mixed }
})

export default mongoose.model<IWidget>('Widget', WidgetSchema)
