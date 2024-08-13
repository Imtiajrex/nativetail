import React, { useMemo } from "react";

import {
	ActivityIndicator,
	cn,
	ConfigVariants,
	cva,
	mergeClasses,
	Pressable,
	separateClasses,
	useColor,
	useTw,
	VariantProps,
} from "@nativetail/core";
import { MotiPressableProps } from "moti/interactions";
import { useComponentTheme } from "../../utils/component-theme";

const buttonVariants = cva(
	"flex-row gap-2 items-center justify-center rounded text-sm font-medium hover:opacity-90 active:opacity-50 duration-30 opacity-100 select-none",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground ",
				destructive: "bg-red-500 text-foreground  ",
				outline: "border border-muted/15 text-foreground bg-black/0  ",
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
type VariantPropType = (
	props?: ConfigVariants<{
		variant: {
			default: string;
			destructive: string;
			outline: string;
			secondary: string;
			ghost: string;
			link: string;
			card: string;
		};
		size: {
			default: string;
			sm: string;
			lg: string;
			icon: string;
		};
		disabled: {
			true: string;
		};
	}> & {
		className?: string;
	}
) => string;
export type ButtonProps = MotiPressableProps &
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
		variants?: VariantPropType;
	};

const Button = (passedProps: ButtonProps) => {
	const componentTheme = useComponentTheme();
	const buttonProps = componentTheme?.Button || {};
	const {
		text,
		children,
		isLoading,
		disabled,
		variant,
		leftElement,
		rightElement,
		size,
		className: propClassName,
		loadingIndicatorClassName,
		variants,
		...props
	} = {
		...buttonProps,
		...passedProps,
	};
	const tw = useTw();
	const className = cn(buttonProps.className, passedProps.className);

	const loading = isLoading;

	const isDisabled = disabled || loading;
	const variantClass = useMemo(
		() =>
			variants
				? variants({
						variant,
						size,
						className,
						disabled: isDisabled,
					})
				: buttonVariants({
						variant,
						size,
						className,
						disabled: isDisabled,
					}),
		[variant, size, className, isDisabled, tw, variants]
	);

	const { textClasses } = separateClasses(variantClass);

	return (
		<>
			<Pressable
				disabled={disabled || loading}
				className={variantClass}
				{...props}
			>
				{leftElement}
				{loading && (
					<ActivityIndicator
						className={mergeClasses(
							"mr-2 h-5 w-5 text-primary-foreground ",
							textClasses,
							loadingIndicatorClassName
						)}
					/>
				)}
				{children}
				{rightElement}
			</Pressable>
		</>
	);
};
export { Button };
