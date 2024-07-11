import { BottomSheet, BottomSheetRef } from "@nativetail/ui";
import { Link, usePathname } from "expo-router";
import { cn, Pressable, Text, View } from "@nativetail/core";
import { useMemo, useRef } from "react";
import { SectionList } from "react-native";
import { Iconify } from "react-native-iconify";

export default function DocsSidebar() {
	const pathname = usePathname();
	const formattedPath = pathname
		.replace("/docs/", "")
		.replace("/docs", "")
		.replaceAll("-", " ");

	const bottomSheetRef = useRef<BottomSheetRef>(null);
	return (
		<>
			<Pressable
				className="lg:hidden flex flex-row items-center gap-1"
				onPress={() => bottomSheetRef.current?.show()}
			>
				<Text className="text-sm font-bold capitalize">
					{formattedPath || "Docs"}
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
export const RoutesList = ({
	routes,
}: {
	routes: {
		title: string;
		path: string;
		group: string;
	}[];
}) => {
	const pathname = usePathname();
	const gropuedRoutes = useMemo(() => {
		return routes.reduce((acc, route) => {
			const existingGroup = acc.find((item) => item.title === route.group);
			if (existingGroup) {
				existingGroup.data.push(route);
			} else {
				acc.push({
					title: route.group,
					data: [route],
				});
			}
			return acc;
		}, [] as any[]);
	}, []);
	return (
		<SectionList
			sections={gropuedRoutes}
			keyExtractor={(item) => item.path}
			renderItem={({ item }) => {
				const isActive = item.path === pathname;
				return (
					<View className="py-1">
						<Link href={item.path}>
							<Text
								className={cn(
									"text-[16px] pl-6",
									isActive ? "font-bold text-primary" : "font-normal text-muted"
								)}
							>
								{item.title}
							</Text>
						</Link>
					</View>
				);
			}}
			renderSectionHeader={({ section: { title } }) => (
				<Text className="text-lg font-bold py-2 px-4">{title}</Text>
			)}
		/>
	);
};

const routes = [
	{
		title: "Introduction",
		path: "/docs",
		group: "Getting Started",
	},
	{
		title: "Installation",
		path: "/docs/installation",
		group: "Getting Started",
	},
	{
		title: "Theme Configuration",
		path: "/docs/theme-configuration",
		group: "Core Concepts",
	},
	{
		title: "Dark Mode",
		path: "/docs/dark-mode",
		group: "Core Concepts",
	},
	{
		title: "Breakpoints",
		path: "/docs/breakpoints",
		group: "Core Concepts",
	},
	{
		title: "Adding Custom Classes",
		path: "/docs/custom-classes",
		group: "Core Concepts",
	},
	{
		title: "Memo Busting",
		path: "/docs/memo-busting",
		group: "Core Concepts",
	},
	{
		title: "View",
		path: "/docs/view",
		group: "Components",
	},
	{
		title: "Text",
		path: "/docs/text",
		group: "Components",
	},
	{
		title: "ScrollView",
		path: "/docs/scrollview",
		group: "Components",
	},
	{
		title: "Pressable",
		path: "/docs/pressable",
		group: "Components",
	},
	{
		title: "Image",
		path: "/docs/image",
		group: "Components",
	},
	{
		title: "TextInput",
		path: "/docs/textinput",
		group: "Components",
	},
];
