import { cn, Pressable, Text, useColor, View } from "@nativetail/core";
import { EllipsisVertical } from "lucide-react-native";
import { useRef } from "react";
import {
	ActionSheet,
	ActionSheetProps,
	ActionSheetRef,
} from "../actions-sheet";

type InfoCardProps = {
	containerClassname?: string;
	renderIcon?: () => React.ReactNode;
	title?: string;
	subtitle?: string;
	titleClassname?: string;
	subtitleClassName?: string;
	description?: string;
	descriptionClassName?: string;
	actions?: ActionSheetProps["options"];
	renderRight?: () => React.ReactNode;
	onPress?: () => void;
	dotsClassname?: string;
};
export function InfoCard({
	containerClassname,
	renderIcon,
	renderRight,
	subtitle,
	title,
	titleClassname,
	subtitleClassName,
	description,
	descriptionClassName,
	actions,
	onPress,
	dotsClassname,
}: InfoCardProps) {
	const actionSheetRef = useRef<ActionSheetRef>(null);
	return (
		<Pressable
			className={cn(
				"flex-row items-center w-full justify-between p-3 rounded-xl bg-card",
				containerClassname
			)}
			disabled={!onPress}
		>
			<View className="flex-row items-center gap-2">
				{renderIcon && renderIcon()}
				<View className="">
					<Text className={cn("text-sm font-medium", titleClassname)}>
						{title}
					</Text>
					<Text className={cn("text-[13px] text-muted", subtitleClassName)}>
						{subtitle}
					</Text>
					<Text className={cn("text-xs text-muted/65", descriptionClassName)}>
						{description}
					</Text>
				</View>
			</View>
			<View className="flex-row gap-1">
				{renderRight && renderRight()}
				{actions && (
					<>
						<Pressable
							className={cn(
								"p-1.5 w-7 h-7 items-center justify-center border rounded-full border-muted/15 active:scale-95 scale-100",
								dotsClassname
							)}
							onPress={() => {
								actionSheetRef.current?.show();
							}}
						>
							<EllipsisVertical color={useColor("foreground")} />
						</Pressable>
						<ActionSheet
							onCancel={() => {
								actionSheetRef.current?.hide();
							}}
							options={actions.map((action) => ({
								...action,
								onPress: () => {
									actionSheetRef.current?.hide();
									action.onPress();
								},
							}))}
							ref={actionSheetRef}
						/>
					</>
				)}
			</View>
		</Pressable>
	);
}
