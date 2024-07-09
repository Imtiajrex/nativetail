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
				primary: "#C8264B",
				secondary: '#EBB461',
				background: '#141414',
				card: '#272727',
				foreground: '#fff',
				muted: '#D9D7D9',
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
