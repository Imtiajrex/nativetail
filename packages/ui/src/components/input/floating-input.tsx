import { cn, Text, TextInput, TextInputProps, View } from "@nativetail/core";
import { useCallback, useState } from "react";
import { create } from "zustand";

type FloatingInputProps = TextInputProps & {
	containerClassName?: string;
	label: string;
	error?: string;
	helperText?: string;
};
const useFocusSate = create<{
	isFocused: boolean;
	setIsFocused: (isFocused: boolean) => void;
}>((set) => ({
	isFocused: false,
	setIsFocused: (isFocused: boolean) => set({ isFocused }),
}));
export function FloatingInput({
	value,
	onChangeText,
	containerClassName,
	label,
	error,
	className,
	...props
}: FloatingInputProps) {
	const onFocus = useCallback(() => {
		useFocusSate.getState().setIsFocused(true);
	}, []);
	const onBlur = useCallback(() => {
		useFocusSate.getState().setIsFocused(false);
	}, []);
	return (
		<View
			className={cn(
				"w-full rounded-xl h-16 overflow-hidden  border border-muted/15",
				containerClassName
			)}
		>
			<Label label={label} value={value} />

			<TextInput
				onFocus={onFocus}
				onBlur={onBlur}
				value={value}
				onChangeText={onChangeText}
				className={cn(
					"flex-1 p-3 bg-card rounded-xl absolute w-full h-full -z-5 pt-5 text-foreground text-[16px]",
					className
				)}
				{...props}
			/>
		</View>
	);
}

const Label = ({ label, value }: { label?: string; value?: string }) => {
	const isFocused = useFocusSate((state) => state.isFocused);
	const labelOnTop = isFocused || !!value;

	return (
		<View className="flex-1 p-3 justify-center" pointerEvents="none">
			<Text
				animated
				className={cn(
					"text-muted duration-75  ",
					labelOnTop ? " -translate-y-16 text-xs" : "translate-y-0 text-[16px]"
				)}
			>
				{label}
			</Text>
		</View>
	);
};
