import { zodResolver } from "@hookform/resolvers/zod";
import { typeboxResolver } from "@hookform/resolvers/typebox";

import { cn, TextInputProps, View } from "@nativetail/core";
import React, { ComponentPropsWithoutRef } from "react";
import { Control, DefaultValues, FieldValues, useForm } from "react-hook-form";
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
import {
	Type,
	TSchema,
	Static,
	JavaScriptTypeBuilder,
	TObject,
	TProperties,
} from "@sinclair/typebox";

type ZodFormBuilderProps<
	T extends z.ZodObject<z.ZodRawShape>,
	IValues = z.infer<T>,
> = {
	schema: T;
	inputs?: Partial<
		Record<
			keyof IValues,
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
	onSubmit?: (values: IValues, reset?: () => void) => void;
	onError?: (values: Partial<Record<keyof T, any>>) => void;
	isSubmitting?: boolean;
	defaultValues?: DefaultValues<IValues>;
	inputContainerClassname?: string;
};
type TypeboxFormBuilderProps<T extends TSchema, IValues = Static<T>> = {
	schema: TSchema;
	inputs?: Partial<
		Record<
			keyof IValues,
			{
				render?: (props: {
					control: Control<IValues, any>;
					name: string;
				}) => React.ReactElement;
			} & InputType
		>
	>;
	containerClassname?: string;
	submitButtonProps?: ComponentPropsWithoutRef<typeof Button>;
	onSubmit?: (values: IValues, reset?: () => void) => void;
	onError?: (values: Partial<Record<string, any>>) => void;
	isSubmitting?: boolean;
	defaultValues?: DefaultValues<IValues>;
	inputContainerClassname?: string;
};

export type FormBuilderProps<T extends z.ZodObject<z.ZodRawShape> | TSchema> =
	T extends z.ZodObject<z.ZodRawShape>
		? ZodFormBuilderProps<T>
		: T extends TSchema
			? TypeboxFormBuilderProps<T>
			: never;
const isTypebox = (shape: any): shape is TObject<TProperties> => {
	return shape instanceof JavaScriptTypeBuilder;
};
const isZod = (shape: any): shape is z.ZodObject<z.ZodRawShape> => {
	return shape instanceof z.ZodObject;
};
export function FormBuilder<T extends z.ZodObject<z.ZodRawShape> | TSchema>({
	schema,
	inputs,
	containerClassname,
	submitButtonProps,
	onSubmit,
	onError,
	isSubmitting,
	defaultValues,
	inputContainerClassname,
}: FormBuilderProps<T>) {
	const shape = schema.shape;
	const keys = Object.keys(shape);

	type SchemaType = typeof schema;
	type FormSchemaType =
		SchemaType extends z.ZodObject<z.ZodRawShape>
			? z.infer<SchemaType>
			: SchemaType extends TSchema
				? Static<SchemaType>
				: any;
	const form = useForm<FormSchemaType>({
		resolver: isTypebox(schema)
			? typeboxResolver(schema)
			: isZod(schema)
				? zodResolver(schema)
				: undefined,
		defaultValues: defaultValues,
	});
	return (
		<View className={cn("gap-4", containerClassname)}>
			<View className={cn("flex-1 gap-2", inputContainerClassname)}>
				{keys.map((inputKey) => {
					const Input = inputs[inputKey];
					if (!Input) return null;
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
					return (
						<Render control={form.control} name={inputKey} key={inputKey} />
					);
				})}
			</View>
			<Button
				className="w-full"
				children={"Submit"}
				{...submitButtonProps}
				onPress={form.handleSubmit((data) => {
					onSubmit?.(data, form.reset);
				}, onError)}
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
	props?: InputProps;
};
type FloatingInputType = {
	type: "floating";
	props?: FloatingInputProps;
};
type SelectInputType = {
	type: "select";
	props?: SelectProps;
};
type MultiSelectInputType = {
	type: "multi-select";
	props?: MultiSelectProps;
};
type PinInputType = {
	type: "pin";
	props?: PinInputProps;
};
type PhoneInputType = {
	type: "phone";
	props?: TextInputProps;
};
type InputType =
	| TextInputType
	| FloatingInputType
	| SelectInputType
	| MultiSelectInputType
	| PinInputType
	| PhoneInputType;
