import {
	cn,
	Pressable,
	Text,
	TextInput,
	TextInputProps,
	useTw,
	View,
} from "@nativetail/core";
import { MotiView } from "moti";
import React, { createRef, useState } from "react";
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
	inputRef?: React.RefObject<NativeTextInput>;
	inputContainerClassName?: string;
	formatter?: (value: string) => string;
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
	inputRef = createRef<NativeTextInput>(),
	inputContainerClassName,
	formatter,
	...props
}: InputProps<T>) => {
	const tw = useTw();

	const [showPassword, setShowPassword] = useState(
		isSecretToggleable ? false : true
	);
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View className={cn("w-full gap-1", containerClassName)}>
			<Text className={cn("text-muted/75 duration-75 text-sm")}>{label}</Text>

			<View
				className={cn(
					" bg-card flex-row h-12 rounded-lg w-full border border-muted/15 ",
					inputContainerClassName,
					error && "border-danger",
					isFocused && "border-foreground"
				)}
			>
				{leftElement}
				<TextInput
					value={value}
					onChangeText={onChangeText}
					ref={inputRef}
					className={cn(
						" text-foreground p-2 rounded-lg flex-1 text-[16px]",
						formatter && "opacity-0 scale-0 flex-0 absolute",
						className
					)}
					placeholderTextColor={tw.color("muted")}
					secureTextEntry={!showPassword}
					{...props}
					onFocus={(e) => {
						setIsFocused(true);
						props?.onFocus?.(e);
					}}
					onBlur={(e) => {
						setIsFocused(false);
						props?.onBlur?.(e);
					}}
				/>
				{formatter && (
					<Pressable
						className={cn(
							" text-foreground p-2 flex-row rounded-lg text-left items-center h-full flex-1 text-[16px]",
							className
						)}
						onPress={() => {
							inputRef?.current?.focus();
						}}
					>
						{formatter(value)}
						{isFocused && <InputBlink />}
						{!value && (
							<Text className={cn("text-muted/75 absolute left-0 p-2")}>
								{props.placeholder}
							</Text>
						)}
					</Pressable>
				)}

				{rightElement}
			</View>
			{helperText && <Text className="text-muted text-sm">{helperText}</Text>}

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

const InputBlink = () => {
	const tw = useTw();
	return (
		<MotiView
			style={{
				width: 0.1,
				height: "90%",
				opacity: 1,
				marginHorizontal: 0.8,
				backgroundColor: tw.color("foreground/85"),
			}}
			from={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			transition={{
				duration: 650,
				loop: true,
			}}
		/>
	);
};
