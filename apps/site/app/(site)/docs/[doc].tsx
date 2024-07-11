import { useLocalSearchParams } from "expo-router";
import { Text, View } from "@nativetail/core";

export default function Doc() {
	const { doc } = useLocalSearchParams();
	return (
		<View>
			<Text>{doc}</Text>
		</View>
	);
}
