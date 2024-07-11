import { Text, View } from "@nativetail/core";
import { useLocalSearchParams } from "expo-router";

export default function Doc() {
	const { component } = useLocalSearchParams();
	return (
		<View>
			<Text>{component}</Text>
		</View>
	);
}
