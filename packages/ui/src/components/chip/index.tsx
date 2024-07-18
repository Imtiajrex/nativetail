import React, { useMemo } from "react";

import {
	cn,
	cva,
	separateClasses,
	Text,
	VariantProps,
	View,
} from "@nativetail/core";

const chipVariants = cva(
	"items-center justify-center self-start text-foreground rounded-full",
	{
		variants: {
			variant: {
				default: "bg-primary  ",
				destructive: "bg-danger  ",
				success: "bg-success",
				outline: "border border-primary bg-background  ",
				secondary: "bg-secondary  ",
				card: " bg-card ",
			},
			size: {
				default: "px-3 py-2 text-[16px]",
				sm: " px-2 py-1 text-sm",
				lg: "px-4 py-3 text-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);
export type ChipProps = VariantProps<typeof chipVariants> & {
	text?: string;
	textClass?: string;
	leftElement?: React.ReactNode;
	rightElement?: React.ReactNode;
	className?: string;
};

const Chip = ({
	text,
	variant,
	size = "sm",
	className,
	leftElement,
	rightElement,

	...props
}: ChipProps) => {
	const variantClass = useMemo(
		() =>
			chipVariants({
				variant,
				size,
				className: className,
			}),
		[variant, size, className]
	);

	const { textClasses } = separateClasses(variantClass);

	return (
		<View className={variantClass} {...props}>
			{leftElement}
			<Text className={cn(textClasses, "p-0 pt-0")}>{text}</Text>
			{rightElement}
		</View>
	);
};
export { Chip };
