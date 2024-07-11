import { BlurView, BlurViewProps } from "expo-blur";
import { useColorScheme } from "@nativetail/core";

export type BlurProps = BlurViewProps;
export const Blur = (props: BlurProps) => {
	const [colorScheme] = useColorScheme();
	return (
		<BlurView
			intensity={50}
			tint={colorScheme === "dark" ? "dark" : "light"}
			experimentalBlurMethod="dimezisBlurView"
			{...props}
		/>
	);
};
