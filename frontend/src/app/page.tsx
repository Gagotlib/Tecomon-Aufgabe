'use client'

import WidgetCardContainer from '@/components/widget-card-container/widget-card-container.component'
import WidgetForm from '@/components/widget-form/widget-form.component'
import { useWidgets } from '@/hooks/use-widgets'
import { Toaster } from 'sonner'

export default function Home() {
	const { widgets, loading, addWidget, removeWidget,  } = useWidgets()

	return (
		<div className='min-h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-purple-100 py-12 px-4'>
			<Toaster position='top-right' richColors />
			<div className='max-w-5xl mx-auto'>
				{/* App Title */}
				<h1 className='text-5xl font-extrabold mb-4 text-center text-purple-800 drop-shadow-lg'>Weather Hub</h1>

				{/* Explanatory Paragraph */}
				<p className='text-center text-gray-700 mb-10 text-lg'>Create your personalized weather widgets for any city. Track the current weather and manage your favorite locations in one dashboard.</p>

				{/* Widget Form */}
				<WidgetForm addWidget={addWidget} loading={loading} />

				{/* Widget Cards */}
				<WidgetCardContainer widgets={widgets} loading={loading} onDelete={removeWidget} />
			</div>
		</div>
	)
}
