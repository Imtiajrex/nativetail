import {
	cn,
	Pressable,
	Text,
	TextInput,
	TextInputProps,
	useTw,
	View,
} from "@nativetail/core";
import { useState } from "react";
import { Iconify } from "react-native-iconify";
import ShowPassword from "./show-password";

type InputProps = TextInputProps & {
	containerClassName?: string;
	label: string;
	error?: string;
	helperText?: string;
	isPassword?: boolean;
	leftElement?: React.ReactNode;
	rightElement?: React.ReactNode;
};
export function Input({
	value,
	onChangeText,
	containerClassName,
	label,
	error,
	className,
	isPassword,
	rightElement,
	helperText,
	leftElement,
	...props
}: InputProps) {
	const tw = useTw();
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className={cn("w-full gap-1", containerClassName)}>
			<Text className={cn("text-muted/75 duration-75 ")}>{label}</Text>

			<TextInput
				value={value}
				onChangeText={onChangeText}
				className={cn(
					"p-3 bg-card rounded-lg w-full border border-muted/15 h-14 text-foreground -z-5 text-[16px]",
					className,
					isPassword || rightElement ? "pr-12" : "",
					leftElement ? "pl-12" : ""
				)}
				placeholderTextColor={tw.color("muted")}
				secureTextEntry={!showPassword}
				{...props}
			/>
			{helperText && <Text className="text-muted text-sm">{helperText}</Text>}

			{leftElement && (
				<View className="absolute left-2 bottom-2">{leftElement}</View>
			)}
			{error && <Text className="text-danger text-sm">{error}</Text>}

			{isPassword && (
				<ShowPassword
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>
			)}
		</View>
	);
}
