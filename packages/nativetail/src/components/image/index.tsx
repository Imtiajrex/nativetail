import { MotiImage } from "moti";
import React, { forwardRef } from "react";
import { ImageStyle, Image as NativeImage } from "react-native";
import { useInGroup } from "../../contexts/GroupContext";
import {
	AnimatedClassProps,
	useAnimatedStyle,
	useGroupedAnimatedStyle,
} from "../../hooks/useAnimatedStyle";

type ImageProps = React.ComponentProps<typeof NativeImage> &
	AnimatedClassProps<ImageStyle>;

const GroupImage = forwardRef<typeof MotiImage, ImageProps>(
	({ className = "text-foreground", ...props }, ref) => {
		const { from, animate, exit, style, transition } = useGroupedAnimatedStyle({
			className: className,
			style: props.style,
			animate: props.animate,
			animatedClass: props.animatedClass,
			isText: false,
		});
		return (
			<MotiImage
				from={from}
				animate={animate}
				exit={exit}
				style={style}
				transition={transition}
				{...props}
				ref={ref}
			/>
		);
	}
);

const BaseImage = forwardRef<typeof MotiImage, ImageProps>(
	({ className = "text-foreground", ...props }, ref) => {
		const { from, animate, exit, style, transition } = useAnimatedStyle({
			className: className,
			style: props.style,
			animate: props.animate,
			animatedClass: props.animatedClass,
			isText: false,
		});

		return (
			<MotiImage
				from={from}
				animate={animate}
				exit={exit}
				style={style}
				transition={transition}
				{...props}
				ref={ref}
			/>
		);
	}
);
const Image = forwardRef<typeof MotiImage, ImageProps>((props, ref) => {
	const inGroup = useInGroup();

	if (inGroup) {
		return <GroupImage {...props} ref={ref} />;
	}
	return <BaseImage {...props} ref={ref} />;
});
export { Image };
