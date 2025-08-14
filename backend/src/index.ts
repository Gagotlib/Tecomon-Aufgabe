//config
import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDB'
//routes
import routes from './routes'

dotenv.config()
const app: Application = express()

export const mongoURI = process.env['MONGODB_URI'] || ''
export const PORT = process.env['PORT'] || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use((req, _res, next) => {
	console.log(`${req.method} ${req.url}`)
	next()
})

// Routes
app.use(routes)

// Connect to MongoDB
connectDB(mongoURI).then(() => {
	const PORT = process.env['PORT'] || 5000
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})