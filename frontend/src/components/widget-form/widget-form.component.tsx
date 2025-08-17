'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from 'react'
import { Suggestion, useLocationSuggestions } from '@/hooks/use-location-sugestions'
import DropdownSuggestions from '../dropdown-suggestions/dropdown-suggestions.component'
import { capitalize } from '@/utils/capitalize'

interface WidgetFormProps {
	addWidget: (widget: { location: string }) => Promise<void>
	loading: boolean
}

export default function WidgetForm({ addWidget, loading }: WidgetFormProps) {
	const [location, setLocation] = useState('')
	const containerRef = useRef<HTMLDivElement>(null)
	const { suggestions, showDropdown, highlightIndex, setHighlightIndex, setShowDropdown, selectSuggestion } = useLocationSuggestions(location)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setShowDropdown(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [setShowDropdown])

	const handleSelect = (s: Suggestion) => {
		setLocation(s.name)
		selectSuggestion(s)
	}

	// Handle keyboard events
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showDropdown) return
		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setHighlightIndex((highlightIndex + 1) % suggestions.length)
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			setHighlightIndex((highlightIndex - 1 + suggestions.length) % suggestions.length)
		} else if (e.key === 'Enter') {
			e.preventDefault()
			if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
				handleSelect(suggestions[highlightIndex])
			} else {
				handleSubmit(e)
			}
		} else if (e.key === 'Escape') {
			setShowDropdown(false)
		}
	}

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!location.trim()) return

		const formattedLocation = capitalize(location.trim())
		await addWidget({ location: formattedLocation })
		setLocation('')
	}

	return (
		<section className='relative w-full' ref={containerRef}>
			<form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
				<Input className='border rounded px-3 py-2 flex-1' value={location} onChange={(e) => setLocation(e.target.value)} onKeyDown={handleKeyDown} placeholder='Location' required type='text' />

				<Button type='submit' className='bg-blue-600 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition self-start sm:self-auto'>
					{loading ? 'Loading...' : 'Add Widget'}
				</Button>
			</form>

			{showDropdown && suggestions.length > 0 && <DropdownSuggestions suggestions={suggestions} highlightIndex={highlightIndex} onSelect={handleSelect} onHover={setHighlightIndex} />}
		</section>
	)
}
