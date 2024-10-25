import { cn, useTw, View } from "@nativetail/core";
import { forwardRef } from "react";
import ActionSheet, {
	ActionSheetProps,
	ActionSheetRef,
} from "react-native-actions-sheet";
export type BottomSheetProps = ActionSheetProps & {
	containerClassName?: string;
	contentClassName?: string;
	indicatorClassName?: string;
	useBlur?: boolean;
};
export type BottomSheetRef = ActionSheetRef;
export const BottomSheet = forwardRef<ActionSheetRef, BottomSheetProps>(
	function BottomSheet(
		{
			containerClassName,
			contentClassName,
			children,
			useBlur = false,
			indicatorClassName,
			...props
		},
		ref
	) {
		const tw = useTw();
		return (
			<ActionSheet
				ref={ref}
				containerStyle={tw.style("bg-background", containerClassName)}
				gestureEnabled
				indicatorStyle={tw.style("bg-muted/15", indicatorClassName)}
				{...props}
			>
				<View className={cn("p-4 ", contentClassName)}>{children}</View>
			</ActionSheet>
		);
	}
);
