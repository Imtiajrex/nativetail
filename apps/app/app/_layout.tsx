import { cva, ThemeProvider, View } from "@nativetail/core";
import { ComponentThemeProvider, Toaster } from "@nativetail/ui";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
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
					<ThemeProvider theme={require("../tailwind.config.js")}>
						<ComponentThemeProvider
							components={{
								Button: {
									className: "active:scale-98 scale-100 rounded-2xl",
								},
							}}
						>
							<View className="flex-1 bg-background">
								<Stack
									screenOptions={{
										headerShown: false,
									}}
								/>

								<Toaster />
							</View>
						</ComponentThemeProvider>
					</ThemeProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</>
	);
}
