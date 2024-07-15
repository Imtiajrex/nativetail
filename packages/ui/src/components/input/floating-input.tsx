import {
	cn,
	Text,
	TextInput,
	TextInputProps,
	useTw,
	View,
} from "@nativetail/core";
import { useCallback, useState } from "react";
import ShowPassword from "./show-password";

type FloatingInputProps = Omit<TextInputProps, "placeholder"> & {
	containerClassName?: string;
	label: string;
	error?: string;
	helperText?: string;
	isSecretToggleable?: boolean;
	leftElement?: React.ReactNode;
	rightElement?: React.ReactNode;
};
export function FloatingInput({
	value,
	onChangeText,
	containerClassName,
	label,
	error,
	className,
	isSecretToggleable,
	helperText,
	leftElement,
	rightElement,
	...props
}: FloatingInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const onFocus = useCallback(() => {
		setIsFocused(true);
	}, []);
	const onBlur = useCallback(() => {
		setIsFocused(false);
	}, []);
	const [showPassword, setShowPassword] = useState(
		isSecretToggleable ? false : true
	);
	return (
		<>
			<View
				className={cn(
					"w-full rounded-xl h-16 overflow-hidden  border border-muted/15",
					containerClassName
				)}
			>
				<Label label={label} value={value} isFocused={isFocused} />

				{leftElement && (
					<View className="absolute left-2 bottom-2">{leftElement}</View>
				)}
				<TextInput
					onFocus={onFocus}
					onBlur={onBlur}
					value={value}
					onChangeText={onChangeText}
					className={cn(
						"flex-1 p-3 bg-card rounded-xl absolute w-full h-full -z-5 pt-5 text-foreground text-[16px]",
						className,
						isSecretToggleable || rightElement ? "pr-12" : "",
						leftElement ? "pl-12" : ""
					)}
					secureTextEntry={!showPassword}
					{...props}
					placeholder=""
				/>
				{rightElement && (
					<View className="absolute right-2 bottom-2">{rightElement}</View>
				)}
				{isSecretToggleable && (
					<ShowPassword
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
				)}
			</View>

			{helperText && <Text className="text-muted text-sm">{helperText}</Text>}

			{error && <Text className="text-danger text-sm">{error}</Text>}
		</>
	);
}

const Label = ({
	label,
	value,
	isFocused,
}: {
	label?: string;
	value?: string;
	isFocused?: boolean;
}) => {
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
