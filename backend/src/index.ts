import express, { Application } from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import widgetRoutes from './routes/widget.js'
import mongoose from 'mongoose'

dotenv.config()

const app: Application = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/widgets', widgetRoutes)

// Conexión a MongoDB
mongoose
	.connect(process.env.MONGODB_URI || '', {})
	.then(() => {
		console.log('MongoDB conectado')
		const PORT = process.env.PORT || 5000
		app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
	})
	.catch((err) => console.log(err))
