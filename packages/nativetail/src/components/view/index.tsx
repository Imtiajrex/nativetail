import { MotiProps, MotiView } from "moti";
import React, { forwardRef, useMemo } from "react";
import { View as NativeView, ViewStyle } from "react-native";
import { useInGroup } from "../../contexts/GroupContext";
import {
	AnimatedClassProps,
	useAnimatedStyle,
	useGroupedAnimatedStyle,
	useHasAnimatedStyle,
	usePlainStyle,
} from "../../hooks/useAnimatedStyle";
import { renderChildren } from "../../utils/renderChildren";

export type ViewProps = React.ComponentProps<typeof NativeView> &
	MotiProps &
	AnimatedClassProps<ViewStyle> & {
		animated?: boolean;
		print?: boolean;
	};

const GroupView = forwardRef<typeof MotiView, ViewProps>(
	({ className = "text-foreground", children, ...props }, ref) => {
		const { from, animate, exit, style, textClasses, transition } =
			useGroupedAnimatedStyle({
				className: className,
				style: props.style,
				animate: props.animate,
				animatedClass: props.animatedClass,
				isText: false,
			});
		return (
			<MotiView
				from={from}
				animate={animate}
				exit={exit}
				style={style}
				transition={transition}
				{...props}
				ref={ref}
			>
				{renderChildren(children, textClasses)}
			</MotiView>
		);
	}
);

const BaseView = forwardRef<typeof MotiView, ViewProps>(
	({ className = "", children, ...props }, ref) => {
		const { from, animate, exit, style, textClasses, transition } =
			useAnimatedStyle({
				className: className,
				style: props.style,
				animate: props.animate,
				animatedClass: props.animatedClass,
				isText: false,
			});

		return (
			<MotiView
				from={from}
				animate={animate}
				exit={exit}
				transition={transition}
				style={style}
				{...props}
				ref={ref}
			>
				{renderChildren(children, textClasses)}
			</MotiView>
		);
	}
);
const PlainView = forwardRef<typeof MotiView, ViewProps>(
	({ className = "", children, ...props }, ref) => {
		const { textClasses, style } = usePlainStyle({
			className: className,
			style: props.style,
			isText: false,
		});
		return (
			<NativeView style={style} {...props}>
				{renderChildren(children, textClasses)}
			</NativeView>
		);
	}
);
const View = forwardRef<typeof MotiView, ViewProps>(
	({ animated, ...props }, ref) => {
		const inGroup = useInGroup();
		const hasAnimatedKeyword = useHasAnimatedStyle({
			className: props.className,
		});
		const isAnimated = animated || hasAnimatedKeyword;
		if (!isAnimated) {
			return <PlainView {...props} ref={ref} />;
		}
		if (inGroup) {
			return <GroupView {...props} ref={ref} />;
		}
		return <BaseView {...props} ref={ref} />;
	}
);
export { View };
