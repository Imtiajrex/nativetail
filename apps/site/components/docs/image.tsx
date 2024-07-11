import { Text, View } from "@nativetail/core";
import ImageExample, { ImageExampleText } from "components/examples/docs/image";
import ExampleViewer from "components/examples/example-viewer";

export default function ViewPage() {
	return (
		<View className="gap-4">
			<Text className="text-2xl font-medium">View</Text>
			<ExampleViewer code={ImageExampleText} example={<ImageExample />} />
		</View>
	);
}
