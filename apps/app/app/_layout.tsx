import { ThemeProvider, View } from "@nativetail/core";
import { ComponentThemeProvider, Toaster } from "@nativetail/ui";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { onlineManager, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import NetInfo from "@react-native-community/netinfo";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
	Roboto_300Light,
} from "@expo-google-fonts/roboto";

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(!!state.isConnected);
	});
});
const queryClient = new QueryClient({});

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage,
});
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: "index",
};

export default function _layout() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	let [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold,
		Roboto_300Light,
	});
	if (!fontsLoaded) {
		return null;
	}
	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<PersistQueryClientProvider
						client={queryClient}
						persistOptions={{ persister: asyncStoragePersister }}
					>
						<ThemeProvider
							theme={require("../tailwind.config.js")}
							fonts={{
								roboto: {
									"300": "Roboto_300Light",
									"400": "Roboto_400Regular",
									"500": "Roboto_500Medium",
									"700": "Roboto_700Bold",
								},
							}}
							defaultFont={{
								name: "roboto",
								weight: 400,
							}}
						>
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
											headerTitleAlign: "center",
											headerLargeTitle: true,
										}}
									/>

									<Toaster />
								</View>
							</ComponentThemeProvider>
						</ThemeProvider>
					</PersistQueryClientProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</>
	);
}
