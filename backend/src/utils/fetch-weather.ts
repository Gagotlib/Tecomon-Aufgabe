import axios from 'axios'

type CachedWeather = {
	data: any
	timestamp: number
}

const weatherCache = new Map<string, CachedWeather>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function fetchWeather(location: string) {
	const now = Date.now()

	// Check cache
	const cached = weatherCache.get(location.toLowerCase())
	if (cached && now - cached.timestamp < CACHE_DURATION) {
		console.log(`✅ Cache hit for ${location}`)
		return cached.data
	}

	// Step 1: Get coordinates
	const geoRes = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
		params: {
			name: location,
			count: 1,
			language: 'en',
			format: 'json'
		}
	})

	if (!geoRes.data.results || geoRes.data.results.length === 0) {
		throw new Error(`No coordinates found for ${location}`)
	}

	const { latitude, longitude } = geoRes.data.results[0]

	// Step 2: Get weather
	const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
		params: {
			latitude,
			longitude,
			current_weather: true
		}
	})

	// Save to cache
	weatherCache.set(location.toLowerCase(), {
		data: weatherRes.data,
		timestamp: now
	})

	return weatherRes.data
}
