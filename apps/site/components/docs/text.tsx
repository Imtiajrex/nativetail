import { Text, View } from "@nativetail/core";
import TextExample, { TextExampleText } from "components/examples/docs/text";
import ExampleViewer from "components/examples/example-viewer";

export default function Textpage() {
	return (
		<View className="gap-4">
			<Text className="text-2xl font-medium">Text</Text>
			<ExampleViewer code={TextExampleText} example={<TextExample />} />
		</View>
	);
}
