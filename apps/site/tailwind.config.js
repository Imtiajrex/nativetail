const plugin = require("tailwindcss/plugin");
module.exports = {
	theme: {
		screens: {
			sm: "380px",
			md: "420px",
			lg: "680px",
			// or maybe name them after devices for `tablet:flex-row`
			tablet: "1024px",
		},
		extend: {
			colors: {
				primary: "#E57E00",
				secondary: '#007AE5',
				background: '#140B01',
				card: '#4D2A01',
				foreground: '#fff',
				muted: '#D8D7D7',
				success: '#4CAF50',
				danger: '#F44336',
				warning: '#FFC107',
				info: '#00BCD4',
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				".container": "max-w-2xl flex-1 mx-auto gap-4 p-4 pt-10 w-full"
			})
		})
	]
};
