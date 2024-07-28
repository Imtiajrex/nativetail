import {
	cn,
	Pressable,
	PressableProps,
	Text,
	useTw,
	View,
} from "@nativetail/core";
import { Dropdown } from "../dropdown";
import { memo, useCallback, useMemo } from "react";
import { Iconify } from "react-native-iconify";
import { Control, Controller, Path } from "react-hook-form";

export type MultiSelectProps<T = Record<string, any>> = PressableProps & {
	containerClassName?: string;
	label?: string;
	error?: string;
	helperText?: string;
	value?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ReactNode;
	}[];
	control?: Control<T, any>;
	name?: Path<T>;
};
export const MultiSelect = <T extends Record<string, any>>({
	name,
	control,
	...props
}: MultiSelectProps<T>) => {
	if (control) {
		return (
			<Controller
				name={name}
				control={control}
				render={({ field, fieldState }) => {
					return (
						<BaseSelect
							{...props}
							value={field.value}
							onChange={(text) => {
								field.onChange(text);
							}}
							error={fieldState.error?.message}
						/>
					);
				}}
			/>
		);
	}
	return <BaseSelect {...props} />;
};
function BaseSelect<T extends Record<string, any>>({
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
}: MultiSelectProps<T>) {
	const tw = useTw();
	const renderOptions = useCallback(() => {
		return options.map((option, index) => (
			<SelectItem
				label={option.label}
				value={option.value}
				icon={option.icon}
				onChange={(val) => {
					if (!val) onChange(value.filter((v) => v != option.value));
					else onChange([...(value || []), val]);
				}}
				isActive={value?.includes?.(option.value)}
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
					onChange={onChange}
					error={error}
					{...props}
				/>
				<Dropdown.Menu>{renderOptions()}</Dropdown.Menu>
			</Dropdown.Root>
		</View>
	);
}
const SelectTrigger = memo(
	<T extends Record<string, any>>({
		options,
		className,
		value,
		placeholder,
		onChange,
		error,
		...props
	}: PressableProps & {
		options: MultiSelectProps<T>["options"];
		value: MultiSelectProps<T>["value"];
		onChange: MultiSelectProps<T>["onChange"];
		placeholder: MultiSelectProps<T>["placeholder"];
		error: MultiSelectProps<T>["error"];
	}) => {
		const selectedOptions = useMemo(
			() => options.filter((option) => value?.includes?.(option.value)),
			[value]
		);
		const tw = useTw();
		return (
			<>
				<Dropdown.Trigger
					className={cn(
						"p-3 bg-card rounded-lg w-full border flex-row items-center justify-between border-muted/15 h-14 text-foreground -z-5 text-[16px]",
						className
					)}
					{...props}
				>
					{selectedOptions.length > 0 && (
						<View className="flex-row gap-2 flex-wrap">
							{selectedOptions.map((option) => (
								<Pressable
									className="bg-muted/8 rounded-2xl text-sm px-2 py-1"
									key={option.value}
									onPress={() => {
										onChange(value.filter((val) => val != option.value));
									}}
								>
									{option.label}
								</Pressable>
							))}
						</View>
					)}
					{selectedOptions.length == 0 && placeholder && (
						<Text className="text-muted">{placeholder}</Text>
					)}
					<Iconify
						icon="solar:alt-arrow-down-outline"
						size={20}
						color={tw.color("foreground")}
					/>
				</Dropdown.Trigger>

				{error && <Text className="text-sm text-danger">{error}</Text>}
			</>
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
				autoClosable={false}
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
