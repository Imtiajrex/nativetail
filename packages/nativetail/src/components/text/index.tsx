import { MotiText } from "moti";
import React, { forwardRef } from "react";
import { TextStyle, Text as NativeText } from "react-native";
import { useInGroup } from "../../contexts/GroupContext";
import {
	AnimatedClassProps,
	useAnimatedStyle,
	useGroupedAnimatedStyle,
	useHasAnimatedStyle,
	usePlainStyle,
} from "../../hooks/useAnimatedStyle";

type TextProps = React.ComponentProps<typeof MotiText> &
	AnimatedClassProps<TextStyle> & {
		animated?: boolean;
	};
const GroupText = forwardRef<typeof MotiText, TextProps>(
	({ className = "", children, ...props }, ref) => {
		const { from, animate, exit, style, transition } = useGroupedAnimatedStyle({
			className: className,
			style: props.style,
			animate: props.animate,
			animatedClass: props.animatedClass,
			isText: true,
		});

		return (
			<MotiText
				from={from}
				animate={animate}
				exit={exit}
				style={style}
				transition={transition}
				{...props}
				ref={ref}
			>
				{children}
			</MotiText>
		);
	}
);

const BaseText = forwardRef<typeof MotiText, TextProps>(
	({ className = "", children, ...props }, ref) => {
		const { from, animate, exit, style, transition } = useAnimatedStyle({
			className: className,
			style: props.style,
			animate: props.animate,
			animatedClass: props.animatedClass,
			isText: true,
		});

		return (
			<MotiText
				from={from}
				animate={animate}
				exit={exit}
				style={style}
				transition={transition}
				{...props}
				ref={ref}
			>
				{children}
			</MotiText>
		);
	}
);
const PlainText = forwardRef<typeof MotiText, TextProps>(
	({ className = "", children, ...props }, ref) => {
		const { style } = usePlainStyle({
			className: className,
			style: props.style,
			isText: true,
		});
		return (
			<NativeText
				style={style}
				{...props}
				ref={ref as any as React.ForwardedRef<NativeText>}
			>
				{children}
			</NativeText>
		);
	}
);
const Text = forwardRef<typeof MotiText, TextProps>(
	({ animated, ...props }, ref) => {
		const inGroup = useInGroup();
		const hasAnimatedKeyword = useHasAnimatedStyle({
			className: props.className,
		});
		const isAnimated = animated || hasAnimatedKeyword;

		if (!isAnimated) {
			return <PlainText {...props} ref={ref} />;
		}
		if (inGroup) {
			return <GroupText {...props} ref={ref} />;
		}
		return <BaseText {...props} ref={ref} />;
	}
);
export { Text };
