import {
	cn,
	Text,
	TextInput,
	TextInputProps,
	useTw,
	View,
} from "@nativetail/core";
import React, { LegacyRef, useState } from "react";
import { Control, Controller, Path } from "react-hook-form";
import { TextInput as NativeTextInput } from "react-native";
import ShowPassword from "./show-password";

export type InputProps<T = Record<string, any>> = TextInputProps & {
	containerClassName?: string;
	label?: string;
	error?: string;
	helperText?: string;
	isSecretToggleable?: boolean;
	leftElement?: React.ReactNode;
	rightElement?: React.ReactNode;
	value?: string;
	control?: Control<T, any>;
	name?: Path<T>;
	inputRef?: LegacyRef<NativeTextInput>;
};

export const Input = <T extends Record<string, any>>({
	name,
	control,
	...props
}: InputProps<T>) => {
	if (control) {
		return (
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => {
					return (
						<BaseInput
							{...props}
							value={field.value}
							onChangeText={(text) => {
								field.onChange(text);
							}}
							error={fieldState.error?.message}
						/>
					);
				}}
			/>
		);
	}
	return <BaseInput {...props} />;
};

const BaseInput = <T extends Record<string, any>>({
	value,
	onChangeText,
	containerClassName,
	label,
	error,
	className,
	isSecretToggleable,
	rightElement,
	helperText,
	leftElement,
	inputRef,
	...props
}: InputProps<T>) => {
	const tw = useTw();

	const [showPassword, setShowPassword] = useState(
		isSecretToggleable ? false : true
	);
	return (
		<View className={cn("w-full gap-1", containerClassName)}>
			<Text className={cn("text-muted/75 duration-75 text-sm")}>{label}</Text>

			<TextInput
				value={value}
				onChangeText={onChangeText}
				ref={inputRef}
				className={cn(
					"p-3 bg-card rounded-lg w-full border border-muted/15 h-12 text-foreground -z-5 text-[16px]",
					className,
					isSecretToggleable || rightElement ? "pr-12" : "",
					leftElement ? "pl-12" : "",
					error && "border-danger"
				)}
				placeholderTextColor={tw.color("muted")}
				secureTextEntry={!showPassword}
				{...props}
			/>
			{helperText && <Text className="text-muted text-sm">{helperText}</Text>}

			{leftElement && (
				<View className="absolute left-2 bottom-2">{leftElement}</View>
			)}

			{rightElement && (
				<View className="absolute right-2 bottom-2">{rightElement}</View>
			)}
			{error && <Text className="text-danger text-sm">{error}</Text>}

			{isSecretToggleable && (
				<ShowPassword
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>
			)}
		</View>
	);
};
