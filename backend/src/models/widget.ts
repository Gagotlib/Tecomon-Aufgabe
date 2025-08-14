import { Schema, model, Document } from 'mongoose'

export interface IWidget extends Document {
	location: string
	createdAt: Date
}

const widgetSchema = new Schema<IWidget>({
	location: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
})

export default model<IWidget>('Widget', widgetSchema)
