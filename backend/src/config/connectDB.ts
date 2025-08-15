import mongoose from 'mongoose'

export const connectDB = async (mongoURI: string): Promise<void> => {
	try {
		await mongoose.connect(mongoURI)
		console.log('✅ MongoDB connected')
	} catch (error) {
		console.error('❌ Error connecting to MongoDB:', error)
		process.exit(1)
	}
}
