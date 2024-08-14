import CircularProgress from "react-native-circular-progress-indicator";

import { Text, useColor, View } from "@nativetail/core";
import { CircularProgressBaseProps } from "react-native-circular-progress-indicator/lib/typescript/types";

export type StepperProps<T extends string> = {
	steps: T[];
	activeStep: T;
	progressProps?: CircularProgressBaseProps;
};
export function Stepper<T extends string>({
	steps,
	activeStep,
	progressProps,
}: StepperProps<T>) {
	const activeStepIndex = steps.findIndex((step) => step === activeStep);
	const stepProgresss = ((activeStepIndex + 1) / steps.length) * 100;
	const nextStep = steps[activeStepIndex + 1];
	const nextStepData = nextStep ? nextStep : "Completed";

	return (
		<View className="flex-row items-center gap-2">
			<View className="w-17 h-17 ">
				<CircularProgress
					value={stepProgresss}
					activeStrokeWidth={8}
					radius={33}
					showProgressValue={false}
					activeStrokeColor={useColor("primary")}
					inActiveStrokeColor={useColor("primary/15")}
					{...progressProps}
				/>
				<View className="absolute top-0 left-0 w-full h-full text-center flex items-center justify-center ">
					<Text className="text-sm foreground ">
						{activeStepIndex + 1} of {steps.length}
					</Text>
				</View>
			</View>
			<View className="gap-0.5">
				<Text className="text-[16px] font-medium">{activeStep}</Text>
				<Text className="text-sm text-muted">Next: {nextStepData}</Text>
			</View>
		</View>
	);
}
