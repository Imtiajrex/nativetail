import { Text, View } from "@nativetail/core";
import PressableExample, {
	PressableExampleText,
} from "components/examples/docs/pressable";
import ExampleViewer from "components/examples/example-viewer";

export default function Textpage() {
	return (
		<View className="gap-4">
			<Text className="text-2xl font-medium">Pressable</Text>
			<ExampleViewer
				code={PressableExampleText}
				example={<PressableExample />}
			/>
		</View>
	);
}
