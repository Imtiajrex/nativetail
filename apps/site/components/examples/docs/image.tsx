import { Image, View } from "@nativetail/core";

export default function ImageExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 rounded-xl bg-background flex-1 items-center justify-center in:scale-0 scale-100 out:scale-0"
			animated
		>
			<Image
				source={{
					uri: "https://images.unsplash.com/photo-1708947567920-316933385c73?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=650&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMTQ1ODc0MA&ixlib=rb-4.0.3&q=80&w=450",
				}}
				className="w-44 aspect-square rounded-xl"
			/>
		</View>
	);
}

export const ImageExampleText = `
import { View } from "@nativetail/core";

export default function ImageExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 rounded-xl bg-background flex-1 items-center justify-center in:scale-0 scale-100 out:scale-0"
			animated
		>
			<Image
				source={{
					uri: "https://images.unsplash.com/photo-1708947567920-316933385c73?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=650&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMTQ1ODc0MA&ixlib=rb-4.0.3&q=80&w=450",
				}}
				className="w-44 aspect-square rounded-xl"
			/>
		</View>
	);
}
`;
