import { ScrollView, Text, View } from "@nativetail/core";

export default function ScrollviewExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 p-2 rounded-xl bg-background flex-1 items-center justify-center in:opacity-0 opacity-100 out:opacity-0"
			animated
		>
			<ScrollView
				containerClass="bg-white rounded-xl w-full max-h-44 rounded-xl p-3 "
				className="bg-success/15 rounded-xl p-2"
			>
				<Text className="text-xl sm:text-2xl text-primary">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
			</ScrollView>
		</View>
	);
}

export const ScrollviewExampleText = `
import { View } from "@nativetail/core";

export default function ScrollviewExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 p-2 rounded-xl bg-background flex-1 items-center justify-center in:opacity-0 opacity-100 out:opacity-0"
			animated
		>
			<ScrollView
				containerClass="bg-white rounded-xl w-full max-h-44 rounded-xl p-3 "
				className="bg-success/15 rounded-xl p-2"
			>
				<Text className="text-xl sm:text-2xl text-primary">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
				<Text className="text-lg sm:text-xl text-success">Hello World</Text>
				<Text className="text-xs sm:text-sm text-danger">Hello World</Text>
			</ScrollView>
		</View>
	);
}
`;
