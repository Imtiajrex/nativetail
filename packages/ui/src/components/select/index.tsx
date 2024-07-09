import { cn, PressableProps, Text, useTw, View } from "nativetail";
import { Dropdown } from "../dropdown";
import { memo, useCallback, useMemo } from "react";
import { Iconify } from "react-native-iconify";

type SelectProps = PressableProps & {
	containerClassName?: string;
	label: string;
	error?: string;
	helperText?: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ReactNode;
	}[];
};
export function Select({
	containerClassName,
	label,
	error,
	className,
	value,
	onChange,
	helperText,
	placeholder,
	options,
	...props
}: SelectProps) {
	const tw = useTw();
	const renderOptions = useCallback(() => {
		return options.map((option, index) => (
			<SelectItem
				label={option.label}
				value={option.value}
				icon={option.icon}
				onChange={onChange}
				isActive={value === option.value}
				key={option.value}
				first={index === 0}
				last={index === options.length - 1}
			/>
		));
	}, [options, value, onChange, tw]);
	return (
		<View className={cn("w-full gap-1", containerClassName)}>
			<Text className={cn("text-muted/75 duration-75 ")}>{label}</Text>

			<Dropdown.Root>
				<SelectTrigger
					options={options}
					value={value}
					placeholder={placeholder}
					{...props}
				/>
				<Dropdown.Menu>{renderOptions()}</Dropdown.Menu>
			</Dropdown.Root>
		</View>
	);
}
const SelectTrigger = memo(
	({
		options,
		className,
		value,
		placeholder,
		...props
	}: Partial<SelectProps>) => {
		const selectedOption = useMemo(
			() => options.find((option) => option.value === value),
			[value]
		);
		const tw = useTw();
		return (
			<Dropdown.Trigger
				className={cn(
					"p-3 bg-card rounded-lg w-full border flex-row items-center justify-between border-muted/15 h-14 text-foreground -z-5 text-[16px]",
					className
				)}
				{...props}
			>
				{selectedOption && (
					<Text className="text-foreground">{selectedOption.label}</Text>
				)}
				{!selectedOption && placeholder && (
					<Text className="text-muted">{placeholder}</Text>
				)}
				<Iconify
					icon="solar:alt-arrow-down-outline"
					size={20}
					color={tw.color("foreground")}
				/>
			</Dropdown.Trigger>
		);
	}
);

const SelectItem = memo(
	({
		label,
		value,
		icon,
		onChange,
		isActive,
		first,
		last,
	}: {
		label: string;
		value: string;
		icon?: React.ReactNode;

		onChange: (value: string) => void;
		isActive?: boolean;
		first?: boolean;
		last?: boolean;
	}) => {
		const tw = useTw();
		return (
			<Dropdown.Item
				key={value}
				onPress={() => onChange(isActive ? "" : value)}
				first={first}
				last={last}
			>
				<View className="flex-row items-center gap-2">
					<Text className="text-sm text-foreground">{label}</Text>
					{icon}
				</View>
				{isActive && (
					<Iconify
						icon="lucide:check"
						size={16}
						color={tw.color("foreground")}
					/>
				)}
			</Dropdown.Item>
		);
	}
);
