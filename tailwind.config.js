/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#242099',
				secondary: '#FF5900'
			},
			fontFamily: {
				jost: ['Jost', 'serif']
			}
		}
	},
	plugins: [require('tailwind-scrollbar')]
}
