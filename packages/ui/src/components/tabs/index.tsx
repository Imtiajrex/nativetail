import { cn, Pressable, View } from "@nativetail/core";

export type TabsProps = {
	tabs: {
		label: string;
		value: string;
	}[];
	activeTab: string;
	setActiveTab: (value: string) => void;
	inactiveTabClassName?: string;
	activeTabClassName?: string;
	containerClassName?: string;
};
export function Tabs({
	tabs,
	activeTab,
	setActiveTab,
	containerClassName,
	activeTabClassName,
	inactiveTabClassName,
}: TabsProps) {
	return (
		<View
			className={cn(
				"rounded-xl self-start flex-row border overflow-hidden border-muted/15 bg-background",
				containerClassName
			)}
		>
			{tabs?.map((tab) => {
				const isActive = tab.value === activeTab;

				return (
					<Pressable
						className={cn(
							"p-2 text-sm font-medium",
							isActive ? "bg-primary text-white" : "bg-background text-muted",
							isActive ? activeTabClassName : inactiveTabClassName
						)}
						key={tab.value}
						onPress={() => setActiveTab(tab.value)}
					>
						{tab.label}
					</Pressable>
				);
			})}
		</View>
	);
}
