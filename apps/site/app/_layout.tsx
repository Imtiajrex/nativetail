import { Slot } from "expo-router";
import { ScrollView, View } from "@nativetail/core";
import { ThemeProvider, useTw } from "@nativetail/core/src/tw";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import { useDeviceContext } from "@nativetail/core/src/parser";

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: "(site)",
};

export default function _layout() {
	return (
		<>
			<ThemeProvider theme={require("../tailwind.config.js")}>
				<Root />
			</ThemeProvider>
		</>
	);
}

const Root = () => {
	const tw = useTw();
	useDeviceContext(tw);
	return (
		<ScrollView className="flex-1 bg-background">
			<View className="bg-background">
				<Slot />
			</View>
		</ScrollView>
	);
};
