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
				primary: {
					DEFAULT: "#43D386",
					foreground: "#000",
				},
				secondary: '#EBB461',
				background: '#F2F2F2',
				card: '#fff',
				foreground: '#000',
				muted: '#383737',
				success: '#4CAF50',
				danger: '#F44336',
				warning: '#FFC107',
				info: '#00BCD4',
			},
		},
	},
};
