import { cn, Pressable, Text, useColor, View } from "@nativetail/core";
import { EllipsisVertical } from "lucide-react-native";

type ActionType = {
	label: string;
	onClick: () => void;
};
type InfoCardProps = {
	containerClassname?: string;
	renderIcon?: () => React.ReactNode;
	title?: string;
	subtitle?: string;
	titleClassname?: string;
	subtitleClassName?: string;
	description?: string;
	descriptionClassName?: string;
	actions?: ActionType[];
};
export function InfoCard({
	containerClassname,
	renderIcon,
	subtitle,
	title,
	titleClassname,
	subtitleClassName,
	description,
	descriptionClassName,
	actions,
}: InfoCardProps) {
	return (
		<View
			className={cn(
				"flex-row items-center justify-between p-3 rounded-xl bg-card",
				containerClassname
			)}
		>
			<View className="flex-row items-center gap-2">
				{renderIcon && renderIcon()}
				<View className="">
					<Text className={cn("text-[16px] font-medium", titleClassname)}>
						{title}
					</Text>
					<Text className={cn("text-sm text-muted", subtitleClassName)}>
						{subtitle}
					</Text>
					<Text className={cn("text-xs text-muted/65", descriptionClassName)}>
						{description}
					</Text>
				</View>
			</View>
			<View className="flex-row gap-1">
				{actions && (
					<Pressable className="p-1.5 w-7 h-7 items-center justify-center border rounded-full border-muted/15 active:scale-95 scale-100">
						<EllipsisVertical color={useColor("foreground")} />
					</Pressable>
				)}
			</View>
		</View>
	);
}
