import ViewExample, { ViewExampleText } from "components/examples/docs/view";
import ExampleViewer from "components/examples/example-viewer";
import { View, Text } from "@nativetail/core";

export default function ViewPage() {
	return (
		<View className="gap-4">
			<Text className="text-2xl font-medium">View</Text>
			<ExampleViewer code={ViewExampleText} example={<ViewExample />} />
		</View>
	);
}
