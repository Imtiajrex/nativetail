import React, { forwardRef } from "react";
import { useTw } from "../../utils/theme";

import { MotiPressable, MotiPressableProps } from "moti/interactions";
import { View as NativeView } from "react-native";
import GroupProvider from "../../contexts/GroupContext";
import usePressableStyle from "../../hooks/usePressableStyle";
import { renderChildren } from "../../utils/renderChildren";

export type PressableProps = MotiPressableProps & {
	textClass?: string;
	className?: string;
	children?: React.ReactNode;
	containerClassName?: string;
};

const Pressable = forwardRef<NativeView, PressableProps>(
	({ children, className = "", containerClassName, ...props }, ref) => {
		const tw = useTw();

		const {
			animate,
			textClasses,
			nonAnimatableClasses,
			containerStyle,
			transition,
		} = usePressableStyle({
			className: className,
		});

		return (
			<GroupProvider isGroup={className.includes("group")}>
				<MotiPressable
					animate={animate}
					style={tw`${nonAnimatableClasses}`}
					transition={transition}
					containerStyle={
						[
							containerStyle,
							props.containerStyle!,
							tw`${containerClassName}`,
						] as any
					}
					ref={ref}
					{...props}
				>
					{renderChildren(children, textClasses)}
				</MotiPressable>
			</GroupProvider>
		);
	}
);
export { Pressable };
