import { BlurView } from "expo-blur";
import { cn, useTw, View } from "nativetail";
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
export const BottomSheet = forwardRef<ActionSheetRef, BottomSheetProps>(
	function BottomSheet(
		{
			containerClassName,
			contentClassName,
			children,
			useBlur,
			indicatorClassName,
			...props
		},
		ref
	) {
		const tw = useTw();
		return (
			<ActionSheet
				ref={ref}
				containerStyle={tw.style("bg-background/75", containerClassName)}
				gestureEnabled
				indicatorStyle={tw.style("bg-muted/15", indicatorClassName)}
				{...props}
			>
				{useBlur && (
					<BlurView
						style={tw`absolute top-0 left-0 right-0 bottom-0 rounded-xl flex-1 bg-card`}
						intensity={50}
						experimentalBlurMethod="dimezisBlurView"
					/>
				)}
				<View className={cn("p-4 ", contentClassName)}>{children}</View>
			</ActionSheet>
		);
	}
);
export { ActionSheetRef as BottomSheetRef };
