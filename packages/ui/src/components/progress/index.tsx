import { View, cn } from "nativetail";
import React, { useMemo } from "react";
export type ProgressProps = {
	containerClassName?: string;
	progress: number;
	max: number;
};
export function Progress({ containerClassName, progress, max }: ProgressProps) {
	const percent = useMemo(() => {
		return Math.round((progress / max) * 100);
	}, [progress, max]);
	return (
		<View
			className={cn(
				"flex-row items-center rounded-full h-4 overflow-hidden bg-primary/15 border border-primary/35 ",
				containerClassName
			)}
		>
			<View
				className={cn(
					"w-full h-full bg-primary rounded-full",
					`w-[${percent}%]`
				)}
				animated
			/>
		</View>
	);
}
