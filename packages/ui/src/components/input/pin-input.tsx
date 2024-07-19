import { cn, Pressable, TextInput, View } from "@nativetail/core";
import { useCallback, useEffect, useRef, useState } from "react";
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
	secureTextEntry?: boolean;
	pinHideTime?: number;
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
	secureTextEntry,
	pinHideTime = 300,
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
				<PinBox
					key={`pininput-${index}`}
					pinBoxClassName={pinBoxClassName}
					isFocused={isFocused}
					activeIndex={activeIndex}
					index={index}
					pinBoxFocusedClassName={pinBoxFocusedClassName}
					onPinBoxPress={onPinBoxPress}
					secureTextEntry={secureTextEntry}
					value={value}
					pinHideTime={pinHideTime}
				/>
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

const PinBox = ({
	pinBoxClassName,
	activeIndex,
	index,
	onPinBoxPress,
	value,
	isFocused,
	pinBoxFocusedClassName,
	secureTextEntry,
	pinHideTime,
}: {
	pinBoxClassName?: string;
	isFocused?: boolean;
	activeIndex: number;
	index: number;
	pinBoxFocusedClassName?: string;
	onPinBoxPress: () => void;
	value: string;
	secureTextEntry?: boolean;
	pinHideTime?: number;
}) => {
	const pinValue = value[index];
	const isActive = activeIndex === index;
	const [hide, setHide] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout>(null);
	useEffect(() => {
		if (!secureTextEntry) return;
		if (pinValue) {
			timeoutRef.current = setTimeout(() => {
				setHide(true);
			}, pinHideTime);
		} else {
			setHide(false);
		}
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [secureTextEntry, pinValue, pinHideTime]);
	return (
		<Pressable
			className={cn(
				"p-2 bg-card rounded-lg items-center justify-center w-full font-medium aspect-sqaure flex-1 border border-muted/15 h-16 text-foreground text-[16px] text-center",
				pinBoxClassName,
				isFocused &&
					isActive &&
					"border-foreground" + " " + pinBoxFocusedClassName
			)}
			onPress={onPinBoxPress}
		>
			{hide ? (
				<View className="w-2 h-2 rounded-full bg-foreground" />
			) : (
				pinValue
			)}
		</Pressable>
	);
};
