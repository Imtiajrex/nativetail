import { useMemo } from "react";

export default function useDuration(className?: string) {
	const duration = useMemo(() => {
		if (className?.includes("duration-")) {
			const durationClass = className
				.split(" ")
				.find((c) => c.includes("duration-"));
			if (durationClass) {
				const duration = durationClass.split("-")[1];
				return parseInt(duration);
			}
		}
		return 0;
	}, [className]);
	return duration;
}
