import { Text, View } from "@nativetail/core";

export default function TextExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 rounded-xl bg-background flex-1 items-center justify-center in:opacity-0 opacity-100 out:opacity-0"
			animated
		>
			<Text className="text-xl sm:text-2xl text-primary">Hello World</Text>
			<Text className="text-lg sm:text-xl text-success">Hello World</Text>
			<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
		</View>
	);
}

export const TextExampleText = `
import { View } from "@nativetail/core";

export default function TextExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 rounded-xl bg-background flex-1 items-center justify-center in:opacity-0 opacity-100 out:opacity-0"
			animated
		>
			<Text className="text-xl sm:text-2xl text-primary">Hello World</Text>
			<Text className="text-lg sm:text-xl text-success">Hello World</Text>
			<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
		</View>
	);
}
`;
