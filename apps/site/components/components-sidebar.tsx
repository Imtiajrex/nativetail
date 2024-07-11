import { Pressable, Text, View } from "@nativetail/core";
import { BottomSheet, BottomSheetRef } from "@nativetail/ui";
import { usePathname } from "expo-router";
import { useRef } from "react";
import { Iconify } from "react-native-iconify";
import { RoutesList } from "./docs-sidebar";

export default function ComponentsSidebar() {
	const pathname = usePathname();
	const formattedPath = pathname
		.replace("/components/", "")
		.replace("/components", "")
		.replaceAll("-", " ");

	const bottomSheetRef = useRef<BottomSheetRef>(null);
	return (
		<>
			<Pressable
				className="lg:hidden flex flex-row items-center gap-1"
				onPress={() => bottomSheetRef.current?.show()}
			>
				<Text className="text-sm font-bold capitalize">
					{formattedPath || "Components"}
				</Text>
				<Iconify icon="icon-park-outline:down" size={24} color={"white"} />
			</Pressable>
			<BottomSheet
				ref={bottomSheetRef}
				containerClassName="max-w-2xl mx-auto w-full p-4 bg-card"
			>
				<RoutesList routes={routes} />
			</BottomSheet>
			<View className="h-full max-w-[250px] w-full hidden lg:flex ">
				<RoutesList routes={routes} />
			</View>
		</>
	);
}
const routes = [
	{
		title: "Basic Input",
		path: "/components/basic-input",
		group: "Form",
	},
	{
		title: "Floating Input",
		path: "/components/floating-input",
		group: "Form",
	},
	{
		title: "Pin Input",
		path: "/components/pin-input",
		group: "Form",
	},
	{
		title: "Button",
		path: "/components/button",
		group: "Form",
	},
];
