import { zodResolver } from "@hookform/resolvers/zod";
import { cn, TextInputProps, View } from "@nativetail/core";
import React, { ComponentPropsWithoutRef } from "react";
import { Control, DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../button";
import {
	FloatingInput,
	FloatingInputProps,
	Input,
	InputProps,
	PhoneInput,
	PinInput,
	PinInputProps,
} from "../input";
import { MultiSelect, MultiSelectProps, Select, SelectProps } from "../select";

export type FormBuilderProps<
	T extends z.ZodRawShape,
	IValues = z.infer<z.ZodObject<T>>,
> = {
	schema: z.ZodObject<T>;
	inputs?: Partial<
		Record<
			keyof T,
			{
				render?: (props: {
					control: Control<IValues, any>;
					name: keyof T;
				}) => React.ReactElement;
			} & InputType
		>
	>;
	containerClassname?: string;
	submitButtonProps?: ComponentPropsWithoutRef<typeof Button>;
	onSubmit?: (values: IValues) => void;
	onError?: (values: Partial<Record<keyof T, any>>) => void;
	isSubmitting?: boolean;
	defaultValues?: DefaultValues<IValues>;
};
export function FormBuilder<T extends z.ZodRawShape>({
	schema,
	inputs,
	containerClassname,
	submitButtonProps,
	onSubmit,
	onError,
	isSubmitting,
	defaultValues,
}: FormBuilderProps<T>) {
	const shape = schema.shape;
	const keys = Object.keys(shape);
	type FormSchemaType = z.infer<typeof schema>;
	const form = useForm<FormSchemaType>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
	});
	return (
		<View className={cn("gap-2", containerClassname)}>
			{keys.map((inputKey) => {
				const Input = inputs[inputKey];
				const Render = Input.render;
				if (!Render) {
					return (
						<InputComponent
							control={form.control}
							name={inputKey}
							{...Input}
							key={inputKey}
						/>
					);
				}
				return <Render control={form.control} name={inputKey} key={inputKey} />;
			})}
			<Button
				className="w-full"
				children={"Submit"}
				{...submitButtonProps}
				onPress={form.handleSubmit(onSubmit, onError)}
				isLoading={isSubmitting}
			/>
		</View>
	);
}
const InputComponent = ({
	control,
	name,
	props,
	type,
}: {
	control: Control<any>;
	name: string;
} & InputType) => {
	switch (type) {
		case "text":
			return <Input control={control} name={name} {...props} />;
		case "floating":
			return <FloatingInput control={control} name={name} {...props} />;
		case "select":
			return <Select control={control} name={name} {...props} />;
		case "multi-select":
			return <MultiSelect control={control} name={name} {...props} />;
		case "pin":
			return <PinInput control={control} name={name} {...props} />;
		case "phone":
			return <PhoneInput control={control} name={name} {...props} />;
	}
	return null;
};

type TextInputType = {
	type: "text";
	props: InputProps;
};
type FloatingInputType = {
	type: "floating";
	props: FloatingInputProps;
};
type SelectInputType = {
	type: "select";
	props: SelectProps;
};
type MultiSelectInputType = {
	type: "multi-select";
	props: MultiSelectProps;
};
type PinInputType = {
	type: "pin";
	props: PinInputProps;
};
type PhoneInputType = {
	type: "phone";
	props: TextInputProps;
};
type InputType =
	| TextInputType
	| FloatingInputType
	| SelectInputType
	| MultiSelectInputType
	| PinInputType
	| PhoneInputType;
