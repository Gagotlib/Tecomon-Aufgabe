'use client'

import { Suggestion } from "@/hooks/use-location-sugestions"

interface DropdownProps {
	suggestions: Suggestion[]
	highlightIndex: number
	onSelect: (s: Suggestion) => void
	onHover: (index: number) => void
}

export default function DropdownSuggestions({ suggestions, highlightIndex, onSelect, onHover }: DropdownProps) {
	return (
		<ul className='absolute z-10 bg-white border rounded shadow w-full max-h-60 overflow-y-auto'>
			{suggestions.map((s, index) => (
				<li
					key={`${s.name}-${s.latitude}-${s.longitude}`}
					className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${index === highlightIndex ? 'bg-gray-200' : ''}`}
					onMouseDown={() => onSelect(s)}
					onMouseEnter={() => onHover(index)}
				>
					{s.name}, {s.country}
				</li>
			))}
		</ul>
	)
}
