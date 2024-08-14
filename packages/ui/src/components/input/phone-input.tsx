import { cn, Pressable, Text, View } from "@nativetail/core";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FlashList } from "react-native-actions-sheet";
import { BottomSheet, BottomSheetRef } from "../bottom-sheet";
import { Input, InputProps } from "./input";

import { countries, ICountry } from "countries-list";
import { ChevronDown } from "lucide-react-native";
import { FloatingInput } from "./floating-input";
type CountryType = ICountry & {
	code: string;
};
export const PhoneInput = <T extends Record<string, any>>({
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

const BaseInput = <T extends Record<string, any>>(props: InputProps<T>) => {
	const [selectedCountry, setSelectedCountry] = useState<CountryType>({
		...countries.US,
		code: "US",
	});
	return (
		<Input
			{...props}
			leftElement={
				<SelectCountry
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}
				/>
			}
			placeholder="(123) 456-7890"
			value={props.value}
			formatter={(value) => {
				// Remove all non-numeric characters
				const cleaned = ("" + value).replace(/\D/g, "");

				// Format the cleaned number
				const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
				if (match) {
					return `(${match[1]}) ${match[2]}-${match[3]}`;
				}

				return value;
			}}
			onChangeText={(text) => {
				props.onChangeText?.(text);
			}}
		/>
	);
};

const SelectCountry = ({
	selectedCountry,
	setSelectedCountry,
}: {
	selectedCountry: CountryType;
	setSelectedCountry: (country: CountryType) => void;
}) => {
	const sheetRef = useRef<BottomSheetRef>(null);
	const flag = useMemo(
		() => selectedCountry && getFlagEmoji(selectedCountry.code),
		[selectedCountry]
	);
	return (
		<>
			<Pressable
				className=" p-2 h-full items-center justify-center flex-row gap-0.5 active:opacity-75 opacity-100 border-r border-muted/15 pr-1"
				onPress={() => {
					sheetRef.current?.show();
				}}
			>
				<Text>
					<Text className="mr-1">{flag}</Text>+{selectedCountry.phone?.[0]}
				</Text>
				<ChevronDown size={24} color="gray" />
			</Pressable>
			<CountryBottomSheet
				selectedCountry={selectedCountry}
				setSelectedCountry={setSelectedCountry}
				sheetRef={sheetRef}
			/>
		</>
	);
};

const CountryBottomSheet = ({
	selectedCountry,
	setSelectedCountry,
	sheetRef,
}: {
	selectedCountry: CountryType;
	setSelectedCountry: (code: CountryType) => void;
	sheetRef: React.RefObject<BottomSheetRef>;
}) => {
	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);
	const allCountries = useMemo(
		() =>
			Object.entries(countries)
				.map(([code, country]) => {
					return {
						code,
						name: country.name,
						...country,
					};
				})
				.filter((country) =>
					country.name?.toLowerCase()?.includes(search?.toLowerCase())
				),
		[search]
	);
	return (
		<BottomSheet
			ref={sheetRef}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			contentClassName=""
		>
			<View className="max-w-2xl mx-auto w-full max-h-[90%]">
				{open && (
					<CountryList
						countries={allCountries}
						search={search}
						setSearch={setSearch}
						selectedCountry={selectedCountry}
						setSelectedCountry={setSelectedCountry}
						close={() => {
							sheetRef.current?.hide();
						}}
					/>
				)}
			</View>
		</BottomSheet>
	);
};
const CountryList = memo(
	({
		countries,
		search,
		setSearch,
		selectedCountry,
		setSelectedCountry,
		close,
	}: {
		countries: CountryType[];
		search: string;
		setSearch: (search: string) => void;

		selectedCountry: CountryType;
		setSelectedCountry: (code: CountryType) => void;
		close: () => void;
	}) => {
		const renderItem = useCallback(
			({
				item,
			}: {
				item: ICountry & {
					code: string;
				};
			}) => {
				const isActive = selectedCountry.code === item.code;
				return (
					<Pressable
						onPress={() => {
							setSelectedCountry(item);
							close();
						}}
						className={cn(
							"p-3 bg-card rounded-xl border h-12 border-muted/15 flex-row gap-4 w-full",
							isActive && "bg-primary/10 border-primary"
						)}
						containerClassName="w-full"
					>
						{getFlagEmoji(item.code)}
						<Text>+{item.phone?.[0]}</Text>
						<Text className="font-medium">{item.name}</Text>
					</Pressable>
				);
			},
			[selectedCountry, setSelectedCountry, close]
		);

		return (
			<View className="overflow-x-hidden h-full">
				<>
					<Text className="text-center text-lg font-medium mb-2">
						Select Country
					</Text>
					<FloatingInput
						value={search}
						onChangeText={setSearch}
						label="Search Country"
						containerClassName="mb-2"
					/>
				</>
				<View>
					<FlashList
						data={countries.slice(0, 15)}
						renderItem={renderItem}
						estimatedItemSize={100}
						showsVerticalScrollIndicator
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View className="h-1" />}
						keyExtractor={(item) => item.code}
					/>
				</View>
			</View>
		);
	}
);
function getFlagEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}
