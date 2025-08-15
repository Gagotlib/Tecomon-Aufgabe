const API_URL = 'http://localhost:5000/api/widgets'

export const getWidgets = async () => {
	const res = await fetch(API_URL)
	const data = await res.json()

	if (!res.ok) {
		throw new Error(data?.error || 'Failed to fetch widgets')
	}

	return data
}

export const createWidget = async (widget: { location: string }) => {
	const res = await fetch(API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(widget)
	})
	const data = await res.json()

	if (!res.ok) {
		throw new Error(data?.error || 'Failed to create widget')
	}

	return data
}

export const deleteWidget = async (id: string) => {
	const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
	const data = await res.json()

	if (!res.ok) {
		throw new Error(data?.error || 'Failed to delete widget')
	}

	return data
}
