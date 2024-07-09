export default {
	expo: {
		scheme: "native-tail-ui",
		name: "NativeTail",
		slug: "native-tail-ui",
		owner: "imtiajrex",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/images/splash.png",
			resizeMode: "cover",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.nativetail.app",

			buildNumber: "11",
		},
		android: {
			package: "com.nativetail.app",
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			permissions: ["android.permission.RECORD_AUDIO"],
			versionCode: 3,
		},
		web: {
			favicon: "./assets/images/favicon.png",
			bundler: "metro",
			output: "static",
		},
		plugins: ["expo-router", "expo-asset", "expo-font"],
		extra: {
			router: {
				origin: false,
			},
			eas: {},
		},
		runtimeVersion: {
			policy: "appVersion",
		},
		updates: {},
		experiments: {
			typedRoutes: true,
		},
	},
};
