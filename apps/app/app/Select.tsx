import { View } from "@nativetail/core";
import {
	BottomSheet,
	BottomSheetRef,
	Button,
	MultiSelect,
	Select,
} from "@nativetail/ui";
import { useRef, useState } from "react";

export default function Page() {
	const sheetRef = useRef<BottomSheetRef>(null);
	return (
		<View className="container">
			{/* <SelectContent />
			<MultiSelectDemo /> */}

			<Button
				onPress={() => {
					sheetRef.current?.show();
				}}
				variant={"outline"}
				className="w-full"
			>
				Open Bottom Sheet
			</Button>
			<BottomSheet ref={sheetRef}>
				<View className="p-4 max-w-4xl w-full mx-auto">
					<MultiSelectDemo />
					<Button
						onPress={() => {
							sheetRef.current?.hide();
						}}
					>
						Close
					</Button>
				</View>
			</BottomSheet>
		</View>
	);
}

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
const MultiSelectDemo = () => {
	const [framework, setFramework] = useState<string[]>([]);

	return (
		<MultiSelect
			label="Select Multi Framworkd"
			value={framework}
			onChange={setFramework}
			placeholder="Select multi frame work"
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
