import { Text, View } from "@nativetail/core";
import TextInputExample, {
	TextInputExampleText,
} from "components/examples/docs/textinput.tsx";
import ExampleViewer from "components/examples/example-viewer";

export default function ViewPage() {
	return (
		<View className="gap-4">
			<Text className="text-2xl font-medium">View</Text>
			<ExampleViewer
				code={TextInputExampleText}
				example={<TextInputExample />}
			/>
		</View>
	);
}
