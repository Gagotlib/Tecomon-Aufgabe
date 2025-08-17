import mongoose, { Schema, Document } from 'mongoose'
import { Weather } from '../interfaces/weather.interface'

export interface IWidget extends Document {
	location: string
	createdAt: Date
	weather?: Weather
	updatedAt: Date
}

const WidgetSchema = new Schema<IWidget>(
	{
		location: { type: String, required: true, unique: true }, 
		weather: { type: Schema.Types.Mixed }
	},
	{ timestamps: true } 
)

export default mongoose.model<IWidget>('Widget', WidgetSchema)
