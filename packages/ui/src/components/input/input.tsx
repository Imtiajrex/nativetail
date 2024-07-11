import {
	cn,
	Text,
	TextInput,
	TextInputProps,
	useTw,
	View,
} from "@nativetail/core";

type InputProps = TextInputProps & {
	containerClassName?: string;
	label: string;
	error?: string;
	helperText?: string;
};
export function Input({
	value,
	onChangeText,
	containerClassName,
	label,
	error,
	className,
	...props
}: InputProps) {
	const tw = useTw();
	return (
		<View className={cn("w-full gap-1", containerClassName)}>
			<Text className={cn("text-muted/75 duration-75 ")}>{label}</Text>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				className={cn(
					"p-3 bg-card rounded-lg w-full border border-muted/15 h-14 text-foreground -z-5 text-[16px]",
					className
				)}
				placeholderTextColor={tw.color("muted")}
				{...props}
			/>
		</View>
	);
}
