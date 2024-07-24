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
	return (
		<>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<SafeAreaProvider>
					<PersistQueryClientProvider
						client={queryClient}
						persistOptions={{ persister: asyncStoragePersister }}
					>
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
					</PersistQueryClientProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</>
	);
}
