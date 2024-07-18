import React from "react";
import { ActivityIndicator as NativeActivityIndicator } from "react-native";
import { getTWColor, useTw } from "../utils/tw";

type ActivityIndicatorProps = React.ComponentProps<
	typeof NativeActivityIndicator
> & {
	className?: string;
};
export const ActivityIndicator = (props: ActivityIndicatorProps) => {
	const tw = useTw();
	const color = getTWColor(props.className || "text-foreground");
	return (
		<NativeActivityIndicator
			{...props}
			style={tw`w-8 h-8 text-primary ${props.className}`}
			color={color}
		/>
	);
};
