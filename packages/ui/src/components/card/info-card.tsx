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
	renderContent?: () => React.ReactNode;
	contentClassName?: string;
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
	textContentClassname?: string;
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
	onPress,
	dotsClassname,
	contentClassName,
	textContentClassname,
	...props
}: InfoCardProps) {
	const actionSheetRef = useRef<ActionSheetRef>(null);
	const renderRight = () => {
		if (props.renderRight) {
			return props.renderRight();
		}
		if (actions)
			return (
				<View className="flex-row gap-1">
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
				</View>
			);
	};
	const renderContent = () => {
		if (props.renderContent) {
			return props.renderContent();
		}
		return (
			<View className={textContentClassname}>
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
		);
	};
	return (
		<Pressable
			className={cn(
				"flex-row items-center w-full justify-between ",
				containerClassname
			)}
			disabled={!onPress}
			onPress={onPress}
		>
			<View className={cn("flex-row gap-2 items-center p-2", contentClassName)}>
				{renderIcon && renderIcon()}
				{renderContent()}
			</View>
			{renderRight()}
		</Pressable>
	);
}
