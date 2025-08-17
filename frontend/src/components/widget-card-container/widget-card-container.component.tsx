'use client'

import WidgetCard from '@/components/widget-card/widget-card.component'
import React from 'react'
import { Widget } from '@/interfaces/widget.interface'

interface WidgetCardContainerProps {
	widgets: Widget[]
	loading: boolean
	onDelete: (id: string) => Promise<void>
}

export default function WidgetCardContainer({ widgets, loading, onDelete }: WidgetCardContainerProps) {
	if (loading) return <p className='text-center'>Loading...</p>

	if (widgets.length === 0) return <p className='text-center'>No widgets yet.</p>

	return (
		<section className='grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
			{widgets.map((w) => (
				<WidgetCard key={w._id} widget={w} onDelete={onDelete} />
			))}
		</section>
	)
}
