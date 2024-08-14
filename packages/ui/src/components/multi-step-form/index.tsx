import { View } from "@nativetail/core";
import { FormBuilder, FormBuilderProps } from "../form-builder";
import { Stepper } from "../stepper";
import { z } from "zod";
type FormStep<
	T extends string,
	ISchema extends z.ZodRawShape,
> = FormBuilderProps<ISchema> & {
	name: T;
};

type MultiStepFormProps<T extends string, ISchema extends z.ZodRawShape> = {
	steps: FormStep<T, any>[];
	activeStep: T;
};
export function MultiStepForm<T extends string, ISchema extends z.ZodRawShape>({
	activeStep,
	steps,
}: MultiStepFormProps<T, ISchema>) {
	const currentStep = steps.find((step) => step.name === activeStep);
	return (
		<View className="flex-1">
			<Stepper steps={steps.map((step) => step.name)} activeStep={activeStep} />
			<FormBuilder containerClassname="mt-4 flex-1" {...currentStep} />
		</View>
	);
}
