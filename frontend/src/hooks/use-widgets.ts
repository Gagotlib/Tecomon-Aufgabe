import { useState, useEffect, useCallback } from 'react'
import { Widget } from '@/interfaces/widget.interface'
import { createWidget, deleteWidget, getWidgets } from '@/services/widget.service'
import { toast } from 'sonner' // <--- import toast

export function useWidgets() {
	const [widgets, setWidgets] = useState<Widget[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	// Load all widgets
	const loadWidgets = useCallback(async () => {
		setLoading(true)
		try {
			const data = await getWidgets()
			setWidgets(data)
		} catch (err) {
			const message = (err as Error).message || 'Failed to load widgets'
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}, [])

	// Add a new widget
	const addWidget = async (widget: { location: string }) => {
		setLoading(true)
		try {
			await createWidget(widget)
			await loadWidgets()
		} catch (err) {
			const message = (err as Error).message || 'Failed to add widget'
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	// Delete a widget
	const removeWidget = async (id: string) => {
		setLoading(true)
		try {
			await deleteWidget(id)
			await loadWidgets()
		} catch (err) {
			const message = (err as Error).message || 'Failed to delete widget'
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	// Initial load + auto refresh
	useEffect(() => {
		loadWidgets()

		// Refresh
		const interval = setInterval(() => {
			loadWidgets()
		}, 10 * 60 * 1000)

		// Cleanup on unmount
		return () => clearInterval(interval)
	}, [loadWidgets])

	return { widgets, loading, addWidget, removeWidget }
}
