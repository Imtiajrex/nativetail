import { TextInput, View, cn, useTw } from "@nativetail/core";
import { useCallback, useRef } from "react";
import { Iconify } from "react-native-iconify";
import { Button } from "../button";
import { Control, Controller, Path } from "react-hook-form";
export type CounterProps<T extends Record<string, any>> = {
	value?: number;
	max?: number;
	min?: number;
	setValue?: React.Dispatch<React.SetStateAction<number>>;
	containerClassName?: string;
	control?: Control<T, any>;
	name?: Path<T>;
};
export const Counter = <T extends Record<string, any>>({
	name,
	control,
	...props
}: CounterProps<T>) => {
	if (control) {
		return (
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					return (
						<BaseCounter
							{...props}
							value={field.value}
							setValue={(text) => {
								field.onChange(text);
							}}
						/>
					);
				}}
			/>
		);
	}
	return <BaseCounter {...props} />;
};

function BaseCounter<T extends Record<string, any>>({
	value,
	setValue,
	min,
	max,
	containerClassName,
}: CounterProps<T>) {
	const tw = useTw();
	const increment = useCallback(() => {
		setValue((prev) => {
			if (max && prev >= max) return prev;
			return prev + 1;
		});
	}, [setValue, max]);
	const decrement = useCallback(() => {
		setValue((prev) => {
			if (min && prev <= min) return prev;
			return prev - 1;
		});
	}, [setValue, min]);
	const onChangeText = useCallback(
		(text) => {
			const number = parseInt(text);

			if (isNaN(number)) return;
			if (!number) return;
			setValue(number);
		},
		[min, max, setValue]
	);

	return (
		<View
			className={cn(
				"flex-row items-center gap-2 select-none w-full",
				containerClassName
			)}
		>
			<CounterButton disabled={!!(min && value <= min)} onPress={decrement}>
				<Iconify
					icon="ic:round-minus"
					size={15}
					color={tw.color("foreground")}
				/>
			</CounterButton>
			<View className="flex-1 h-full">
				<TextInput
					className="flex-1 items-center text-center justify-center bg-card rounded-xl h-full text-foreground font-medium select-none"
					onChangeText={onChangeText}
					value={value?.toString?.()}
				/>
			</View>
			<CounterButton disabled={!!(max && value >= max)} onPress={increment}>
				<Iconify
					icon="ic:round-plus"
					size={15}
					color={tw.color("foreground")}
				/>
			</CounterButton>
		</View>
	);
}
const CounterButton = ({
	onPress,
	children,
	disabled,
}: {
	onPress: () => void;
	children: React.ReactNode;
	disabled?: boolean;
}) => {
	const functionInterval = useRef<NodeJS.Timeout>();
	const onPressIn = useCallback(() => {
		onPress();
		functionInterval.current = setInterval(onPress, 100);
	}, [onPress]);
	const onPressOut = useCallback(() => {
		if (functionInterval.current) clearInterval(functionInterval.current);
	}, []);

	return (
		<Button
			disabled={disabled}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			size="sm"
		>
			{children}
		</Button>
	);
};
