import { cn, useTw, View } from "nativetail";
import { forwardRef } from "react";
import { Blur } from "../blur";
import { Button } from "../button";
import { Dialog, DialogMethods } from "../dialog";

type OptionType = {
	text: string;
	onPress: () => void;
	className?: string;
};
export type ActionSheetProps = {
	containerClassName?: string;
	contentClassName?: string;
	onCancel: () => void;
	useBlur?: boolean;
	children?: React.ReactNode;
	options?: OptionType[];
};
export type ActionSheetRef = DialogMethods;
export const ActionSheet = forwardRef<DialogMethods, ActionSheetProps>(
	function ActionSheet(
		{
			containerClassName,
			contentClassName,
			useBlur = true,
			onCancel,
			children,
			options,
		},
		ref
	) {
		const tw = useTw();

		return (
			<Dialog
				containerClassName={cn("justify-end", containerClassName)}
				contentClassName={cn(
					"bg-transparent border-transparent gap-2 pb-4",
					contentClassName
				)}
				useBlur={false}
				ref={ref}
			>
				<View className="w-full rounded-xl bg-card/95">
					{useBlur && (
						<Blur
							style={tw`absolute top-0 flex-1 left-0 right-0 bottom-0 rounded-xl bg-card`}
						/>
					)}
					{options?.map((action, index) => (
						<ActionSheetItem
							key={index}
							text={action.text}
							onPress={action.onPress}
							className={action.className}
							last={index == options.length - 1}
						/>
					))}
					{children}
				</View>
				<Button
					variant="link"
					className="w-full active:opacity-75 opacity-100 text-blue-500 bg-card rounded-xl"
					onPress={onCancel}
				>
					Cancel
				</Button>
			</Dialog>
		);
	}
);

const ActionSheetItem = ({
	className,
	text,
	onPress,
	last = false,
}: {
	className?: string;
	text: string;
	onPress: () => void;
	last?: boolean;
}) => {
	return (
		<Button
			variant="link"
			className={cn(
				"w-full items-center opacity-100  active:opacity-50 text-[16px] h-14 text-blue-500 rounded-none border-b ",
				last ? "border-transparent" : "border-muted/15",
				className
			)}
			onPress={onPress}
		>
			{text}
		</Button>
	);
};
