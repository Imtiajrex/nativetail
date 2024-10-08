import { TextInput, View, cn, useColor, useTw } from "@nativetail/core";
import { Minus, Plus } from "lucide-react-native";
import { useCallback, useRef } from "react";
import { Button } from "../button";
export type CounterProps = {
	value: number;
	max?: number;
	min?: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
	containerClassName?: string;
};
export function Counter({
	value,
	setValue,
	min,
	max,
	containerClassName,
}: CounterProps) {
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
				<Minus size={15} color={useColor("foreground")} />
			</CounterButton>
			<View className="flex-1 h-full">
				<TextInput
					className="flex-1 items-center text-center justify-center bg-card rounded-xl h-full text-foreground font-medium select-none"
					onChangeText={onChangeText}
					value={value?.toString?.()}
				/>
			</View>
			<CounterButton disabled={!!(max && value >= max)} onPress={increment}>
				<Plus size={15} color={useColor("foreground")} />
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
