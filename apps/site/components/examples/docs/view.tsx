import { View } from "@nativetail/core";

export default function ViewExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 rounded-xl bg-background flex-1 items-center justify-center in:scale-0 scale-100 out:scale-0"
			animated
		>
			<View className="bg-primary h-5 w-5 rounded-full" />
			<View className="bg-secondary h-5 w-5 rounded-full" />
			<View className="bg-success h-5 w-5 rounded-full" />
		</View>
	);
}

export const ViewExampleText = `
import { View } from "@nativetail/core";

export default function ViewExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 rounded-xl bg-background flex-1 items-center justify-center in:scale-0 scale-100 out:scale-0"
			animated
		>
			<View className="bg-primary h-5 w-5 rounded-full" />
			<View className="bg-secondary h-5 w-5 rounded-full" />
			<View className="bg-success h-5 w-5 rounded-full" />
		</View>
	);
}
`;
