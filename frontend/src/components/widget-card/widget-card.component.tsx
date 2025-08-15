'use client'

import { Widget } from '@/interfaces/widget.interface'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface WidgetCardProps {
	widget: Widget
	onDelete: (id: string) => Promise<void>
}

export default function WidgetCard({ widget, onDelete }: WidgetCardProps) {
	const backgroundImage = widget.weather.current_weather.is_day ? '/images/day.jpg' : '/images/night.jpg'

	return (
		<div className='relative bg-cover bg-center p-4 rounded-lg h-40 shadow-md flex flex-col justify-center text-white' style={{ backgroundImage: `url(${backgroundImage})` }}>
			{/* Close button */}
			<Button
				variant='destructive'
				className='absolute top-2 right-2 w-8 h-8 flex items-center justify-center p-0 rounded-full bg-red-600 hover:bg-red-700 hover:cursor-pointer transition'
				onClick={() => onDelete(widget._id)}
			>
				<X className='w-4 h-4' />
			</Button>

			{/* Content */}
			<div className='flex flex-col h-full justify-center gap-2 items-center'>
				<span className='font-bold text-lg'>{widget.location}</span>
				<span className='text-6xl'>{widget.weather.current_weather.temperature}°C</span>
			</div>
		</div>
	)
}
