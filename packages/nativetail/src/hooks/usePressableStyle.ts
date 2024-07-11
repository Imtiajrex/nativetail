import { useMemo } from "react";
import { separateClasses, useTw } from "../tw";

import {
	MotiPressableProp,
	MotiPressableTransitionProp,
} from "moti/interactions";
import useTransition from "./useTransition";

export default function usePressableStyle({
	className = "",
}: {
	className?: string;
}) {
	const tw = useTw();
	const transition = useTransition<MotiPressableTransitionProp>(className);

	const {
		textClasses,
		animatableClasses,
		nonAnimatableClasses,
		hoverClasses,
		activeClasses,
		inClasses,
		outClasses,
	} = useMemo(() => separateClasses(className), [className]);
	const activeStyle = useMemo(
		() => tw.style(animatableClasses, activeClasses),
		[activeClasses, animatableClasses, tw, tw.memoBuster]
	);
	const hoverStyle = useMemo(
		() => tw.style(animatableClasses, hoverClasses),
		[hoverClasses, animatableClasses, tw, tw.memoBuster]
	);
	const nonStateStyle = useMemo(
		() => tw`${animatableClasses}`,
		[animatableClasses, tw, tw.memoBuster]
	);
	const animate: MotiPressableProp = useMemo(
		() =>
			({ hovered, pressed }: { hovered: boolean; pressed: boolean }) => {
				"worklet";

				if (pressed) {
					return activeStyle;
				}
				if (hovered) {
					return hoverStyle;
				}
				return nonStateStyle;
			},
		[activeStyle, hoverStyle, nonStateStyle, tw, tw.memoBuster]
	);
	const containerStyle = useContainerStyle(className);
	const result = useMemo(
		() => ({
			from: tw`${inClasses}`,
			animate,
			exit: tw`${outClasses}`,
			style: tw`${nonAnimatableClasses}`,
			textClasses,
			nonAnimatableClasses,
			containerStyle,
			transition,
		}),
		[
			animate,
			containerStyle,
			inClasses,
			nonAnimatableClasses,
			outClasses,
			transition,
			tw,
			textClasses,
			tw.memoBuster,
		]
	);

	return result;
}

const useContainerStyle = (className: string) => {
	const tw = useTw();

	const containerStyle = useMemo(() => {
		const containerClasses = className.split(" ");
		let formattedClasses = "";
		containerClasses.forEach((c) => {
			const isIgnorable = ignorableKeys.some((key) => c.startsWith(key));
			if (!isIgnorable) {
				formattedClasses += c + " ";
			}
		});
		return tw`${formattedClasses}`;
	}, [className, tw]);
	return containerStyle;
};

const ignorableKeys = [
	"p-",
	"py-",
	"px-",
	"pl-",
	"pr-",
	"pt-",
	"pb-",
	"m-",
	"mx-",
	"my-",
	"ml-",
	"mr-",
	"mt-",
	"mb-",
	"bg",
	"border",
	"shadow",
	"height",
];
