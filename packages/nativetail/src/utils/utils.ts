import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

import {
	cva,
	type VariantProps,
	type ConfigVariants,
} from "class-variance-authority";

export function mergeClasses(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const useForceUpdate = (renderOptions: any[]) => {
	const [, updateState] = React.useState<any>();
	const forceUpdate = React.useCallback(() => {
		if (__DEV__) updateState({});
	}, []);
	React.useEffect(forceUpdate, renderOptions);
};

export { mergeClasses as cn, cva, type VariantProps, type ConfigVariants };
