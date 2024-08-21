import { zodResolver } from "@hookform/resolvers/zod";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { Text, View } from "@nativetail/core";
import {
	Button,
	FloatingInput,
	Input,
	MultiSelect,
	PhoneInput,
	PinInput,
	Select,
	showToast,
} from "@nativetail/ui";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { sleep } from "utils/sleep";
import { z } from "zod";
import { Type as t } from "@sinclair/typebox";

export default function Page() {
	return (
		<View className="container">
			<FormDemo />
		</View>
	);
}

const FormDemo = () => {
	const typeboxSchema = t.Object({
		name: t.String(),
		email: t.String(),
		pin: t.String(),
		ageGroup: t.Enum({
			1: "1",
			2: "2",
			3: "3",
		}),
		skills: t.Array(
			t.Enum({
				1: "1",
				2: "2",
				3: "3",
			})
		),
		phone: t.Optional(t.String()),
	});
	const schema = z.object({
		name: z.string().min(2).max(10),
		email: z.string().email(),
		pin: z.string().length(5),
		ageGroup: z.enum(["1", "2", "3"]),
		skills: z.array(z.enum(["1", "2", "3"])),
		phone: z.string().length(10).optional(),
	});
	type FormSchema = z.infer<typeof schema>;
	const { control, handleSubmit, reset } = useForm<FormSchema>({
		resolver: typeboxResolver(typeboxSchema),
		reValidateMode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			pin: "",
			skills: [],
			phone: "",
		},
	});
	const submit = useMutation({
		mutationFn: async (values: FormSchema) => {
			await sleep(1500);
		},
		onSuccess: () => {
			showToast({
				message: "Form submitted!",
				content: "Form has been submitted successfully!",
				type: "success",
			});
		},
		onError: () => {
			showToast({
				message: "Failed!",
				content: "Failed to submit form!",
				type: "danger",
			});
		},
	});
	return (
		<View className="gap-2 p-4  rounded-2xl border bg-card border-muted/15 ">
			<Text className=" text-xl">Form Demo</Text>
			<Input control={control} name={"name"} label="Name" />
			<FloatingInput control={control} name={"email"} label="Email" />
			<PinInput control={control} name={"pin"} length={5} />
			<PhoneInput control={control} name={"phone"} />
			<Select
				control={control}
				name="ageGroup"
				options={[
					{
						label: "18 - 24",
						value: "1",
					},
					{
						label: "25 - 30",
						value: "2",
					},
					{
						label: "30 - 40",
						value: "3",
					},
				]}
				label="Age Group"
				placeholder="Select Age Group"
			/>
			<MultiSelect
				control={control}
				name="skills"
				options={[
					{
						label: "React",
						value: "1",
					},
					{
						label: "Vue",
						value: "2",
					},
					{
						label: "Svelte",
						value: "3",
					},
				]}
				label="Skills"
				placeholder="Select Skills"
			/>
			<Button
				className="active:scale-95 scale-100 select-none"
				onPress={() => {
					handleSubmit(
						(values) => {
							submit.mutate(values);
						},
						(errors) => console.log(errors)
					)();
				}}
				isLoading={submit.isPending}
			>
				Control
			</Button>
		</View>
	);
};
