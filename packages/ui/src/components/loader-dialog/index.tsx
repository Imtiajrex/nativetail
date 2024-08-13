import { ActivityIndicator, cn, useColor } from "@nativetail/core";
import { forwardRef } from "react";
import { Dialog, DialogMethods, DialogProps } from "../dialog";

export type LoaderProps = Omit<DialogProps, "children"> & {
	activityIndicatorProps?: React.ComponentProps<typeof ActivityIndicator>;
	children?: React.ReactNode;
};

export const Loader = forwardRef<DialogMethods, LoaderProps>(function Loader(
	{ ...props },
	ref
) {
	return (
		<Dialog
			ref={ref}
			closable={false}
			{...props}
			contentClassName={cn(
				"items-center justify-center p-4 w-24 h-24",
				props?.contentClassName
			)}
		>
			{props?.children || (
				<ActivityIndicator
					size="large"
					color={useColor("primary")}
					{...props?.activityIndicatorProps}
				/>
			)}
		</Dialog>
	);
});

export type Loader = DialogMethods;
