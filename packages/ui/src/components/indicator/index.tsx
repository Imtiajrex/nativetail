import { cn, View } from "@nativetail/core";

type IndicatorProps = {
	className?: string;
	size?: number;
	color?: string;
	Icon?: React.ReactNode;
};
export function Indicator({ className, size, color, Icon }: IndicatorProps) {
	return (
		<View className={cn("w-4 h-4 rounded-full bg-primary", className)}>
			{Icon}
		</View>
	);
}
