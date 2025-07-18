import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Imperial Color Palette
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					dark: 'hsl(var(--gold-dark))',
					light: 'hsl(var(--gold-light))'
				},
				stone: {
					DEFAULT: 'hsl(var(--stone))',
					dark: 'hsl(var(--stone-dark))'
				},
				blood: {
					DEFAULT: 'hsl(var(--blood))',
					dark: 'hsl(var(--blood-dark))'
				},
				// Google Calendar Colors
				gcal: {
					bg: 'hsl(var(--gcal-bg))',
					header: 'hsl(var(--gcal-header))',
					border: 'hsl(var(--gcal-border))',
					cell: 'hsl(var(--gcal-cell))',
					'cell-hover': 'hsl(var(--gcal-cell-hover))',
					time: 'hsl(var(--gcal-time))',
					text: 'hsl(var(--gcal-text))',
					line: 'hsl(var(--gcal-line))'
				},
				quest: {
					main: 'hsl(var(--quest-main))',
					side: 'hsl(var(--quest-side))',
					ritual: 'hsl(var(--quest-ritual))',
					completed: 'hsl(var(--quest-completed))',
					overdue: 'hsl(var(--quest-overdue))'
				},
				// Time tracking
				time: {
					line: 'hsl(var(--time-line))',
					indicator: 'hsl(var(--time-indicator))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'imperial': ['Cinzel', 'Playfair Display', 'serif'],
				'royal': ['Cinzel', 'serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'serif': ['Playfair Display', 'Georgia', 'serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
