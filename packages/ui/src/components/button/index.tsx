import React, { useMemo } from "react";

import { MotiPressableProps } from "moti/interactions";
import {
	ActivityIndicator,
	cva,
	mergeClasses,
	Pressable,
	separateClasses,
	useTw,
	VariantProps,
} from "nativetail";

const buttonVariants = cva(
	"flex-row gap-2 items-center justify-center rounded text-sm font-medium hover:opacity-90 active:opacity-80 opacity-100 select-none",
	{
		variants: {
			variant: {
				default: "bg-primary  text-foreground ",
				destructive: "bg-red-500 text-foreground  ",
				outline: "border border-primary text-foreground bg-black/0  ",
				secondary: "bg-secondary text-foreground  ",
				ghost: "",
				link: "text-primary ",
				card: " bg-card ",
			},
			size: {
				default: "h-12 px-4 py-2",
				sm: "h-8 px-3 text-xs",
				lg: "h-10 px-8",
				icon: "h-9 w-9",
			},
			disabled: {
				true: "opacity-80",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);
type ButtonProps = MotiPressableProps &
	VariantProps<typeof buttonVariants> & {
		text?: string;
		disabled?: boolean;
		isLoading?: boolean;
		textClass?: string;
		leftElement?: React.ReactNode;
		rightElement?: React.ReactNode;
		className?: string;
		children?: React.ReactNode;
		loadingIndicatorClassName?: string;
	};

const Button = ({
	text,
	children,
	isLoading,
	className,
	disabled,
	variant,
	leftElement,
	rightElement,
	size,
	loadingIndicatorClassName,

	...props
}: ButtonProps) => {
	const tw = useTw();

	const loading = isLoading;

	const isDisabled = disabled || loading;
	const variantClass = useMemo(
		() =>
			buttonVariants({
				variant,
				size,
				className,
				disabled: isDisabled,
			}),
		[variant, size, className, isDisabled, tw]
	);

	const { textClasses } = separateClasses(variantClass);

	return (
		<Pressable
			disabled={disabled || loading}
			className={variantClass}
			{...props}
		>
			{leftElement}
			{loading && (
				<ActivityIndicator
					className={mergeClasses(
						"mr-2 h-5 w-5 text-foreground ",
						textClasses,
						loadingIndicatorClassName
					)}
				/>
			)}
			{children}
			{rightElement}
		</Pressable>
	);
};
export { Button };
