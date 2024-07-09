import { MotiProps, UseAnimationState } from "moti";
import { useMotiPressable } from "moti/interactions";
import { useCallback, useEffect, useMemo } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
	SharedValue,
	runOnJS,
	useAnimatedReaction,
	useDerivedValue,
	useSharedValue,
} from "react-native-reanimated";
import { separateClasses, useTw } from "../../src/tw";
import { mergeClasses } from "../utils";
import useTransition from "./useTransition";

export type AnimatedClassProps<T extends ViewStyle | TextStyle> = {
	className?: string;
	style?: StyleProp<T>;
	animate?: MotiProps<ViewStyle | TextStyle>["animate"];
	animatedClass?: Readonly<SharedValue<string>>;
	isText?: boolean;
};

const baseClass = `text-left text-[16px] leading-normal font-normal bg-transparent text-foreground`;
export const useAnimatedStyle = <T extends ViewStyle | TextStyle>({
	className = "",
	style,
	animate,
	animatedClass,
	isText,
	state,
}: AnimatedClassProps<T> & {
	state?: Pick<UseAnimationState<any>, "__state"> | undefined;
}) => {
	const tw = useTw();
	const transition = useTransition(className);

	const {
		textClasses,
		animatableClasses,
		inClasses,
		outClasses,
		nonAnimatableClasses,
	} = useMemo(
		() => separateClasses(mergeClasses(baseClass, className), isText),
		[className, isText, baseClass, tw]
	);
	const parse = useCallback(
		(...classes: string[]) => {
			if (tw) {
				parsedStyle.value = tw.style(...classes);
			}
		},
		[tw]
	);
	const parsedStyle = useSharedValue(
		tw.style(animatableClasses, animatedClass?.value ?? "")
	);
	useEffect(() => {
		parse(animatableClasses, animatedClass?.value ?? "");
	}, [className, animatableClasses, tw]);
	useAnimatedReaction(
		() => {
			return animatedClass?.value;
		},
		(value) => {
			if (value) runOnJS(parse)(animatableClasses, value || "");
		},
		[animatableClasses, className, tw]
	);
	const animatedStyle = useDerivedValue(() => {
		return {
			...parsedStyle?.value,
			...state?.__state?.value,
			...(typeof style === "object" ? style : {}),
		};
	}, [className, animatableClasses, isText, style, tw]);
	const from = useMemo(() => tw`${inClasses}`, [inClasses, tw]);
	const exit = useMemo(() => tw`${outClasses}`, [outClasses, tw]);
	const newStyle = useMemo(
		() => [tw`${nonAnimatableClasses}`, style ?? {}],
		[nonAnimatableClasses, style, tw]
	);

	return {
		from: from,
		animate: animatedStyle,
		exit: exit,
		style: newStyle,
		textClasses,
		state,
		transition,
	};
};

const animatePresentKeywords = [
	"hover:",
	"focus:",
	"active:",
	"disabled:",
	"in:",
	"out:",
];
export const useHasAnimatedStyle = ({ className = "" }) => {
	const hasAnimatedStyle = useMemo(
		() => animatePresentKeywords.some((keyword) => className.includes(keyword)),
		[className]
	);
	return hasAnimatedStyle;
};
export function usePlainStyle({ className = "", style, isText }) {
	const tw = useTw();
	const { textClasses } = useMemo(
		() => separateClasses(mergeClasses(baseClass, className), isText),
		[className, isText, baseClass, tw]
	);
	const newStyle = useMemo(
		() => [tw.style(textClasses, className), style ?? {}],
		[className, style, tw]
	);
	return {
		style: newStyle,
		textClasses,
	};
}
export function useGroupedAnimatedStyle<T extends ViewStyle | TextStyle>({
	className = "",
	style,
	animate,
	animatedClass,
	isText,
}: AnimatedClassProps<T>) {
	const tw = useTw();
	const { animatableClasses, groupHoverClasses, groupActiveClasses } = useMemo(
		() => separateClasses(mergeClasses(baseClass, className), isText),
		[className, isText, baseClass, tw]
	);

	const groupHoverStyles = useMemo(
		() => tw.style(groupHoverClasses),
		[groupHoverClasses]
	);
	const groupActiveStyles = useMemo(
		() => tw.style(groupActiveClasses),
		[groupActiveClasses]
	);
	const animatableStyles = useMemo(
		() => tw.style(animatableClasses),
		[animatableClasses]
	);
	const state = useMotiPressable(
		({ pressed, hovered }) => {
			"worklet";
			if (pressed) {
				return groupActiveStyles;
			}
			if (hovered) {
				return groupHoverStyles;
			}
			return animatableStyles;
		},
		[groupActiveStyles, groupHoverStyles, animatableStyles, tw]
	);
	const animatedStyle = useAnimatedStyle({
		className,
		style,
		animate,
		animatedClass,
		isText,
		state,
	});
	return animatedStyle;
}
