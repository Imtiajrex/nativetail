import React from "react";
import { TouchableOpacity as NativeTouchableOpacity } from "react-native";
import { useTw } from "../utils/theme";

type TouchableOpacityProps = React.ComponentProps<
	typeof NativeTouchableOpacity
> & {
	className?: string;
};
export const TouchableOpacity = (props: TouchableOpacityProps) => {
	const tw = useTw();
	return (
		<NativeTouchableOpacity
			{...props}
			style={[tw`${props.className}`, props.style]}
		/>
	);
};
