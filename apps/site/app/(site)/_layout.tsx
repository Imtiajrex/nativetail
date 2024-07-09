import Nav from "components/home/nav";
import { Slot } from "expo-router";
import { ScrollView, useTw, View } from "nativetail";
import { useDeviceContext } from "nativetail/src/parser";

export default function _layout() {
	const tw = useTw();
	useDeviceContext(tw);
	return (
		<ScrollView>
			<View className="bg-background">
				<Nav />
				<Slot />
			</View>
		</ScrollView>
	);
}
