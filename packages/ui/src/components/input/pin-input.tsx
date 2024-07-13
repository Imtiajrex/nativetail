import { cn, Pressable, TextInput, View } from "@nativetail/core";
import { useCallback, useRef, useState } from "react";
import { TextInput as NativeTextInput } from "react-native";

export type PinInputProps = {
	value: string;
	onChangeText: (text: string) => void;
	length: number;
	pinBoxClassName?: string;
	pinBoxFocusedClassName?: string;
	containerClassName?: string;
	error?: string;
	helperText?: string;
};
export function PinInput({
	value,
	onChangeText,
	containerClassName,
	error,
	pinBoxClassName,
	pinBoxFocusedClassName,
	helperText,
	length,
	...props
}: PinInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const activeIndex = value.length == length ? length - 1 : value.length;
	const textInputRef = useRef<NativeTextInput>();
	const onFocus = useCallback(() => {
		setIsFocused(true);
	}, [setIsFocused]);
	const onBlur = useCallback(() => {
		setIsFocused(false);
	}, [setIsFocused]);
	const _handleChange = useCallback(
		(text: string) => {
			if (text.length <= length) {
				onChangeText(text);
			}
		},
		[onChangeText]
	);
	const onPinBoxPress = useCallback(() => {
		setIsFocused(true);
		textInputRef.current?.focus();
	}, [textInputRef, setIsFocused]);
	return (
		<View className={cn(" gap-2 flex-row  w-full", containerClassName)}>
			{Array.from({ length: length }).map((_, index) => (
				<Pressable
					key={`pininput-${index}`}
					className={cn(
						"p-2 bg-card rounded-lg items-center justify-center w-full font-medium aspect-sqaure flex-1 border border-muted/15 h-16 text-foreground text-[16px] text-center",
						pinBoxClassName,
						isFocused &&
							activeIndex === index &&
							"border-foreground" + " " + pinBoxFocusedClassName
					)}
					onPress={onPinBoxPress}
				>
					{value[index]}
				</Pressable>
			))}
			<TextInput
				ref={textInputRef}
				value={value}
				onChangeText={_handleChange}
				onFocus={onFocus}
				onBlur={onBlur}
				className="opacity-0 scale-0 absolute"
				{...props}
			/>
		</View>
	);
}
