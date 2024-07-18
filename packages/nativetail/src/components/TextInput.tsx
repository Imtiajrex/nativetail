import React, { forwardRef } from "react";
import { TextInput as NativeTextInput } from "react-native";
import { useTw } from "../utils/theme";
type ClassNameType = {
	className?: string;
};
export type TextInputProps = React.ComponentProps<typeof NativeTextInput> &
	ClassNameType & {
		label?: string;
	};
export const TextInput = forwardRef<NativeTextInput, TextInputProps>(
	({ className = "text-foreground", label, ...props }, ref) => {
		const tw = useTw();
		return <NativeTextInput style={tw.style(className)} {...props} ref={ref} />;
	}
);
