import {
	ActionSheet,
	ActionSheetRef,
	AlertDialog,
	AlertDialogRef,
	BottomSheet,
	BottomSheetRef,
	Button,
	Dropdown,
	FloatingInput,
	Input,
	Select,
	showToast,
	Switch,
} from "@nativetail/ui";
import { Text, useThemeContext, useTw, View } from "nativetail";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { Iconify } from "react-native-iconify";

export default function Index() {
	return (
		<View className="flex-1 bg-background">
			<View className="container">
				<Text className="text-foreground">Hellow</Text>
				<DropdownContent />
				<SwitchContent />
				<FloatingInputContent />
				<NativeInputContent />
				<SelectContent />
				<AlertDialogContent />
				<BottomSheetContent />
				<ActionSheetContent />
			</View>
		</View>
	);
}
const SwitchContent = () => {
	const { colorScheme, setColorScheme } = useThemeContext();
	return (
		<Switch
			checked={colorScheme === "dark"}
			onChange={(value) => {
				setColorScheme(value ? "dark" : "light");
			}}
		/>
	);
};
const NativeInputContent = () => {
	const [name, setName] = useState("");
	return (
		<TextInput value={name} onChangeText={setName} placeholder="Enter name" />
	);
};
const FloatingInputContent = () => {
	const [name, setName] = useState("");
	return <FloatingInput label="Name" value={name} onChangeText={setName} />;
};
const DropdownContent = () => {
	const tw = useTw();
	return (
		<Dropdown.Root>
			<Dropdown.Trigger className="w-12 h-12 rounded-full bg-card items-center justify-center">
				<Iconify icon="mage:dots" size={24} color={tw.color("foreground")} />
			</Dropdown.Trigger>
			<Dropdown.Menu className="duration-75">
				<Dropdown.Item
					onPress={() => {
						showToast({
							message: "Item 1",
							content: "Item 1 has been clicked",
							position: "top",
						});
					}}
				>
					Item 1
				</Dropdown.Item>
				<Dropdown.Item>Item 2</Dropdown.Item>
				<Dropdown.Item>Item 3</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown.Root>
	);
};
const SelectContent = () => {
	const [framework, setFramework] = useState("");

	return (
		<Select
			label="Select Framework"
			value={framework}
			onChange={setFramework}
			placeholder="Select Framework"
			options={[
				{
					label: "React",
					value: "react",
				},
				{
					label: "Vue",
					value: "vue",
				},
				{
					label: "Angular",
					value: "angular",
				},
			]}
		/>
	);
};
const AlertDialogContent = () => {
	const ref = useRef<AlertDialogRef>(null);

	return (
		<>
			<Button
				className="group w-full active:scale-95 scale-100"
				onPress={() => {
					ref?.current?.show();
				}}
			>
				Open Alert Dialog
			</Button>
			<AlertDialog
				ref={ref}
				onCancel={() => {
					ref?.current?.hide();
				}}
				onConfirm={() => {
					ref?.current?.hide();
					showToast({
						message: "Deleted Successfully",
						content: "The item has been deleted successfully",
						position: "top",
					});
				}}
				title="Are you sure you want to delete this item?"
				description="This action cannot be undone"
			/>
		</>
	);
};

const BottomSheetContent = () => {
	const bottomSheetRef = useRef<BottomSheetRef>(null);

	return (
		<>
			<Button
				className="group w-full active:scale-95 scale-100"
				onPress={() => {
					bottomSheetRef?.current?.show();
				}}
			>
				Open Bottom Sheet
				<View className=" absolute right-12 scale-0 -translate-x-16 group-hover:scale-100 group-hover:translate-x-0 group-active:scale-100 group-active:translate-x-0">
					<Iconify icon="mdi:plus-circle" size={24} color={"white"} />
				</View>
			</Button>
			<BottomSheet
				ref={bottomSheetRef}
				contentClassName="max-w-2xl mx-auto w-full"
			>
				<Text className="text-center font-medium text-lg">Create User</Text>
				<Input label="Name" placeholder="Enter Name" className="bg-card" />
				<Input label="Email" placeholder="Enter Email" className="bg-card" />
				<Button
					variant={"link"}
					onPress={() => {
						bottomSheetRef?.current?.hide();
					}}
				>
					Close
				</Button>
			</BottomSheet>
		</>
	);
};

const ActionSheetContent = () => {
	const ref = useRef<ActionSheetRef>(null);
	return (
		<>
			<Button
				className="group w-full active:scale-95 scale-100"
				onPress={() => {
					ref?.current?.show();
				}}
			>
				Open Action Sheet
				<View className=" absolute right-12 scale-0 -translate-x-16 group-hover:scale-100 group-hover:translate-x-0 group-active:scale-100 group-active:translate-x-0">
					<Iconify icon="mdi:plus-circle" size={24} color={"white"} />
				</View>
			</Button>

			<ActionSheet
				onCancel={() => {
					ref?.current?.hide();
				}}
				ref={ref}
				options={[
					{
						onPress: () => {
							ref?.current?.hide();
						},
						text: "Edit This Item",
					},
					{
						onPress: () => {
							ref?.current?.hide();
							showToast({
								message: "Deleted Successfully",
								content: "The item has been deleted successfully",
								position: "top",
							});
						},
						text: "Delete This Item",
						className: "text-red-500",
					},
				]}
			/>
		</>
	);
};
