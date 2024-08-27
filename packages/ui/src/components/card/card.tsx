import { cn, Text, useTw, View } from "@nativetail/core";
import { Pressable } from "react-native";
import { Button, ButtonProps } from "../button";

export type CardProps = {
	renderHeader?: () => React.ReactNode;
	title?: string;
	subtitle?: string;
	description?: string;
	titleClassname?: string;
	subtitleClassName?: string;
	descriptionClassName?: string;
	containerClassName?: string;
	contentClassName?: string;
	buttonProps?: ButtonProps;
	onPress?: () => void;
	renderFooter?: () => React.ReactNode;
	renderContent?: () => React.ReactNode;
};
export function Card({
	description,
	descriptionClassName,
	renderHeader,
	subtitle,
	subtitleClassName,
	title,
	titleClassname,
	contentClassName,
	buttonProps,
	onPress,
	renderFooter,
	containerClassName,
	...props
}: CardProps) {
	const tw = useTw();
	const renderContent = () => {
		if (props.renderContent) {
			return props.renderContent();
		}
		return (
			<View className={cn("p-1 gap-1", contentClassName)}>
				<Text className={cn("text-lg font-medium", titleClassname)}>
					{title}
				</Text>
				<Text className={cn("text-sm ", subtitleClassName)}>{subtitle}</Text>
				<Text
					className={cn(
						"text-xs text-muted tracking-widest",
						descriptionClassName
					)}
				>
					{description}
				</Text>
				{buttonProps && <Button {...buttonProps} />}
			</View>
		);
	};
	return (
		<Pressable
			style={tw.style(
				"bg-card p-3 rounded-xl border border-muted/15",
				containerClassName
			)}
			onPress={onPress}
			disabled={!onPress}
		>
			{renderHeader && renderHeader()}
			{renderContent()}
			{renderFooter && renderFooter()}
		</Pressable>
	);
}
