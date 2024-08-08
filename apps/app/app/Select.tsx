import { View } from "@nativetail/core";
import { MultiSelect, Select } from "@nativetail/ui";
import { useState } from "react";

export default function Page() {
	return (
		<View className="container">
			<SelectContent />
			<MultiSelectDemo />
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
