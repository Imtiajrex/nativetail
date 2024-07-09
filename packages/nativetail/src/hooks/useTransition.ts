import { MotiTransitionProp } from "moti";
import { useMemo } from "react";
import useDuration from "./useDuration";

export default function useTransition<T extends any>(className?: string) {
	const duration = useDuration(className);
	return useMemo(() => {
		type TransitionProp = T extends MotiTransitionProp ? T : MotiTransitionProp;
		const transition: any = {
			type: "timing",
			duration: 150,
		};
		return transition as any;
	}, [duration]);
}
