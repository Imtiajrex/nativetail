import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "nativetail/src/tw";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Toaster } from "@nativetail/ui";
import { View } from "nativetail";
import { SafeAreaProvider } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: "index",
};

export default function _layout() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);
	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<ThemeProvider
						theme={require("../tailwind.config.js")}
						darkTheme={require("../dark.tailwind.config.js")}
					>
						<View className="flex-1 bg-background">
							<Stack
								screenOptions={{
									headerShown: false,
								}}
							/>

							<Toaster />
						</View>
					</ThemeProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</>
	);
}
