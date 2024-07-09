import { Slot } from "expo-router";
import { ScrollView, View } from "nativetail";
import { ThemeProvider } from "nativetail/src/tw";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

export const unstable_settings = {
	// Ensure any route can link back to `/`
	initialRouteName: "(site)",
};

export default function _layout() {
	return (
		<>
			<ThemeProvider theme={require("../tailwind.config.js")}>
				<ScrollView className="flex-1 bg-background">
					<View className="bg-background">
						<Slot />
					</View>
				</ScrollView>
			</ThemeProvider>
		</>
	);
}
