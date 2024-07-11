import { cn, View } from "@nativetail/core";
import { useCallback } from "react";

export type StepperProps = {
	steps: string[];
	activeStepIndex: number;
	setActiveStepIndex?: (index: number) => void;
};
export const Stepper = (props: StepperProps) => {
	const renderSteps = useCallback(() => {
		return props.steps.map((step, index) => {
			const isActive = index === props.activeStepIndex;
			const isCompleted = index < props.activeStepIndex;
			return (
				<View key={index} className="flex-row items-center">
					<View
						className={cn("w-4 h-4 rounded-full", {
							"bg-primary": isActive,
							"bg-gray-300": !isActive && !isCompleted,
							"bg-success": isCompleted,
						})}
					/>
					{index < props.steps.length - 1 && (
						<View className="h-0.5 bg-gray-300 w-4" />
					)}
				</View>
			);
		});
	}, [props.steps, props.activeStepIndex]);
	return <View className="flex-row items-center">{renderSteps()}</View>;
};
