import React, { forwardRef } from "react";
import { ScrollView as NativeScrollView } from "react-native";
import { useTw } from "../utils/theme";
type ClassNameType = {
	className?: string;
};
type ScrollViewProps = React.ComponentProps<typeof NativeScrollView> &
	ClassNameType & {
		containerClass?: string;
	};
export const ScrollView = forwardRef<NativeScrollView, ScrollViewProps>(
	({ containerClass = "", className = "", ...props }, ref) => {
		const tw = useTw();
		return (
			<NativeScrollView
				style={tw`${containerClass}`}
				contentContainerStyle={tw`${className}`}
				{...props}
				ref={ref}
			/>
		);
	}
);
