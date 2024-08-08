import { FlatList, Text, View } from "@nativetail/core";
import { Link } from "expo-router";
export default function Index() {
	return (
		<View className="container">
			<FlatList
				data={components}
				renderItem={({ item }) => (
					<Link
						href={item.link}
						style={{
							width: "100%",
						}}
						asChild
					>
						<View className="w-full">
							<View className="p-4 border-b border-muted/15">
								<Text>{item.name}</Text>
							</View>
						</View>
					</Link>
				)}
				keyExtractor={(item) => item.link}
			/>
		</View>
	);
}

const components = [
	{
		name: "Switch",
		link: "/Switch",
	},
	{
		name: "Chips",
		link: "/Chips",
	},
	{
		name: "Select",
		link: "/Select",
	},
	{
		name: "Input",
		link: "/Input",
	},
	{
		name: "Dropdown",
		link: "/Dropdown",
	},
	{
		name: "Progress",
		link: "/Progress",
	},
	{
		name: "Action Sheet",
		link: "/Action-Sheet",
	},
	{
		name: "Alert Dialog",
		link: "/Alert-Dialog",
	},
	{
		name: "Bottom Sheet",
		link: "/Bottom-Sheet",
	},
	{
		name: "Dialog",
		link: "/Dialog",
	},
	{
		name: "Form",
		link: "/Form",
	},
	{
		name: "Form Builder",
		link: "/Form-Builder",
	},
];
