import { useTw } from "./theme";
export const useTwColor = () => {
	const tw = useTw();
	const getColor = (color: string) => {
		return tw.style(color).color as string;
	};
	return { getColor };
};

export const useColor = (color: string) => {
	const tw = useTw();
	const style = tw.style(color);
	if (color.includes("bg-")) return String(style.backgroundColor);
	else if (color.includes("text-")) return String(style.color);
	else if (color.includes("border-")) return String(style.borderColor);
	return tw.color(color);
};

export const separateClasses = (className: string, isText = false) => {
	const initialClasses = className.split(" ");
	const classes: string[] = [];
	initialClasses.forEach((c) => {
		if (c in predefinedAnimationClasses) {
			const classValue =
				predefinedAnimationClasses[
					c as keyof typeof predefinedAnimationClasses
				] + " ";

			classes.push(...classValue.split(" "));
		} else {
			classes.push(c);
		}
	});
	const textClasses = isText
		? classes.join(" ")
		: classes
				.filter((c) => textClassPrefixSet.some((nc) => c.startsWith(nc)))
				.join(" ");
	const otherClasses = isText
		? classes.join(" ")
		: classes
				.filter((c) => !c.startsWith("text-") || !c.startsWith("font-"))
				.join(" ");
	const animatableClasses = classes
		.filter((c) => nonAnimatedClassesSet.every((nc) => !c.startsWith(nc)))
		.join(" ");
	const hoverClasses = classes
		.filter((c) => c.startsWith("hover:"))
		.map((c) => c.replace("hover:", ""))
		.join(" ");
	const activeClasses = classes
		.filter((c) => c.startsWith("active:"))
		.map((c) => c.replace("active:", ""))
		.join(" ");
	const nonStateClasses = classes
		.filter((c) => !c.startsWith("hover:") || !c.startsWith("active:"))
		.join(" ");
	const inClasses = classes
		.filter((c) => c.startsWith("in:"))
		.map((c) => c.replace("in:", ""))
		.join(" ");
	const outClasses = classes
		.filter((c) => c.startsWith("out:"))
		.map((c) => c.replace("out:", ""))
		.join(" ");
	const nonAnimatableClasses = classes
		.filter((c) => nonAnimatedClassesSet.some((nc) => c.startsWith(nc)))
		.join(" ");
	const groupHoverClasses = classes
		.filter((c) => c.startsWith("group-hover:"))
		.map((c) => c.replace("group-hover:", ""))
		.join(" ");
	const groupActiveClasses = classes
		.filter((c) => c.startsWith("group-active:"))
		.map((c) => c.replace("group-active:", ""))
		.join(" ");

	return {
		textClasses,
		animatableClasses,
		otherClasses,
		hoverClasses,
		activeClasses,
		nonStateClasses,
		inClasses,
		outClasses,
		nonAnimatableClasses,
		groupHoverClasses,
		groupActiveClasses,
	};
};
const textClassPrefixSet = ["text-", "font-", "leading-"];
const predefinedAnimationClasses = {
	"fade-in": "in:opacity-100 opacity-100",
	"fade-out": "out:opacity-0 opacity-100",
	"fade-in-up": "in:-translate-y-2 translate-y-0 in:opacity-0 opacity-100",
	"fade-out-up": "out:-translate-y-2 translate-y-0  opacity-100 out:opacity-0",
	"fade-in-down": "in:translate-y-2 translate-y-0 in:opacity-0 opacity-100",
	"fade-out-down": "out:translate-y-2 translate-y-0 opacity-100 out:opacity-0",
	"fade-in-left": "in:-translate-x-2 translate-x-0 in:opacity-0 opacity-100",
	"fade-out-left":
		"out:-translate-x-2 translate-x-100 opacity-100 out:opacity-0",
	"fade-in-right": "in:translate-x-2 translate-x-0 in:opacity-0 opacity-100",
	"fade-out-right":
		"out:translate-x-2 translate-x-100 opacity-100 out:opacity-0",
	"fade-up-down":
		"in:-translate-y-2 translate-y-0 in:opacity-0 opacity-100 out:translate-y-2 opacity-100 out:opacity-0",
	"fade-down-up":
		"in:translate-y-2 translate-y-0 in:opacity-0 opacity-100 out:-translate-y-2 opacity-100 out:opacity-0",
	"fade-left-right":
		"in:-translate-x-2 translate-x-0 in:opacity-0 opacity-100 out:-translate-x-2 translate-x-100 opacity-100 out:opacity-0",
	"fade-right-left":
		"in:translate-x-2 translate-x-0 in:opacity-0 opacity-100 out:translate-x-2 translate-x-100 opacity-100 out:opacity-0",
} as const;
const nonAnimatedClassesSet = [
	"justify-",
	"items-",
	"self-",
	"flex",
	"space-",
	"p-",
	"m-",
	"border",
	"border-",
	"text-center",
	"text-left",
	"text-right",
	"font-normal",
	"font-medium",
	"font-bold",
	"font-semibold",
	"font-light",
	"font-thin",
	"font-extrabold",
	"font-black",
	"font-hairline",
	"font-extralight",
	"top-",
	"bottom-",
	"left-",
	"right-",
	"absolute",
	"overflow",
];
