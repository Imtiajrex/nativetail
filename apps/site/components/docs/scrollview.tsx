import { Text, View } from "@nativetail/core";
import ScrollviewExample, {
	ScrollviewExampleText,
} from "components/examples/docs/scrollview";
import ExampleViewer from "components/examples/example-viewer";

export default function Textpage() {
	return (
		<View className="gap-4">
			<Text className="text-2xl font-medium">ScrollView</Text>
			<ExampleViewer
				code={ScrollviewExampleText}
				example={<ScrollviewExample />}
			/>
		</View>
	);
}
