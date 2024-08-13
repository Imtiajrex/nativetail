import { cn, View } from "@nativetail/core";

type StatCardProps = {
	renderIcon?: () => React.ReactNode;
	renderTitle?: () => React.ReactNode;
	renderValue?: () => React.ReactNode;
	title?: string;
	value?: string;
	Icon?: React.ReactNode;
	containerClassName?: string;
};
export function StatCard(props: StatCardProps) {
	const renderIcon = () => {
		if (props.Icon) return <View className="mb-2">{props.Icon}</View>;
		if (!props.renderIcon) return null;
		return props.renderIcon();
	};
	const renderTitle = () => {
		if (!props.renderTitle)
			return <View className="text-xs text-muted/80">{props.title}</View>;
		return props.renderTitle();
	};
	const renderValue = () => {
		if (!props.renderValue)
			return (
				<View className="text-xl font-medium text-foreground">
					{props.value}
				</View>
			);
		return props.renderValue();
	};
	return (
		<View
			className={cn(
				"p-3 rounded-xl gap-0.5 bg-card border justify-between border-muted/15",
				props.containerClassName
			)}
		>
			{renderIcon()}
			<View className="gap-0.5">
				{renderValue()}
				{renderTitle()}
			</View>
		</View>
	);
}
