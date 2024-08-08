import { Text, useTw, View } from "@nativetail/core";
import { Dropdown, showToast } from "@nativetail/ui";
import { Iconify } from "react-native-iconify";
export default function Page() {
	return (
		<View className="container">
			<DropdownTest />
			<DropdownContent />
		</View>
	);
}

const DropdownContent = () => {
	const tw = useTw();
	return (
		<Dropdown.Root>
			<Dropdown.Trigger className="w-12 h-12 rounded-full bg-card items-center justify-center">
				<Iconify icon="mage:dots" size={24} color={tw.color("foreground")} />
			</Dropdown.Trigger>
			<Dropdown.Menu className="duration-75 w-32">
				<Dropdown.Item
					onPress={() => {
						showToast({
							message: "Item 1",
							content: "Item 1 has been clicked",
							position: "top-left",
							type: "danger",
						});
					}}
				>
					Item 1
				</Dropdown.Item>
				<Dropdown.Item
					onPress={() => {
						showToast({
							message: "Item 2",
							content: "Item 2 has been clicked",
							position: "top-left",
							type: "warning",
						});
					}}
				>
					Item 2
				</Dropdown.Item>
				<Dropdown.Item>Item 3</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown.Root>
	);
};
const DropdownTest = () => {
	const tw = useTw();
	return (
		<View className="flex-row items-center justify-between">
			<Text>Drop down</Text>
			<Dropdown.Root>
				<Dropdown.Trigger className="w-12 h-12 rounded-full bg-card items-center justify-center">
					<Iconify icon="mage:dots" size={24} color={tw.color("foreground")} />
				</Dropdown.Trigger>
				<Dropdown.Menu className="w-44">
					<Dropdown.Item>Test Content</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Root>
		</View>
	);
};
