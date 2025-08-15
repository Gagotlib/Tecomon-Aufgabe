import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export interface Suggestion {
	name: string
	country: string
	latitude: number
	longitude: number
}

export function useLocationSuggestions(query: string) {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([])
	const [showDropdown, setShowDropdown] = useState(false)
	const [highlightIndex, setHighlightIndex] = useState(-1)
	const ignoreNextEffect = useRef(false)

	useEffect(() => {
		if (!query) {
			setSuggestions([])
			setShowDropdown(false)
			return
		}

		if (ignoreNextEffect.current) {
			ignoreNextEffect.current = false
			return
		}

		const timeout = setTimeout(async () => {
			try {
				const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`)
				setSuggestions(res.data.results || [])
				setShowDropdown(res.data.results?.length > 0)
				setHighlightIndex(-1)
			} catch (err) {
				console.error(err)
			}
		}, 300)

		return () => clearTimeout(timeout)
	}, [query])

	const selectSuggestion = (s: Suggestion) => {
		ignoreNextEffect.current = true
		setShowDropdown(false)
		setSuggestions([])
	}

	return { suggestions, showDropdown, highlightIndex, setHighlightIndex, setShowDropdown, selectSuggestion }
}
