/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			rotate: {
				270: '270deg',
			},
			minWidth: {
				7: '1.75rem',
			},
		},
		borderColor: {
			DEFAULT: '#000000',
		},
	},
	plugins: [],
};
