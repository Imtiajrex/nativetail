import { Text, View } from "@nativetail/core";
import { Button, FormBuilder, showToast } from "@nativetail/ui";
import { useMutation } from "@tanstack/react-query";
import { sleep } from "utils/sleep";
import { z } from "zod";
import { Static, Type as t } from "@sinclair/typebox";
export default function FormBuilderDemo() {
	const schema = z.object({
		name: z.string().min(2).max(10),
		email: z.string().email(),
		pin: z.string().length(5),
		ageGroup: z.enum(["1", "2", "3"]),
		skills: z.array(z.enum(["1", "2", "3"])),
		phone: z.string().length(10).optional(),
	});
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
	type FormSchema = Static<typeof typeboxSchema>;
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
		<View className="gap-2 m-4 container  rounded-2xl border bg-card border-muted/15 ">
			<Text className=" text-xl">Form Builder Demo</Text>
			<FormBuilder
				schema={schema}
				inputs={{
					name: {
						type: "text",
						props: {
							label: "Name",
						},
					},
					email: {
						type: "text",
						props: {
							label: "Email",
						},
					},
					ageGroup: {
						type: "select",
						props: {
							label: "Age Group",
							placeholder: "Select Age Group",
							options: [
								{
									label: "18 - 24",
									value: "1",
								},
								{
									label: "25 - 30",
									value: "2",
								},
							],
						},
					},
					pin: {
						type: "pin",
						props: {
							length: 5,
						},
					},
					phone: {
						type: "phone",
						props: {},
					},
					skills: {
						type: "multi-select",
						props: {
							label: "Skills",
							placeholder: "Select Skills",
							options: [
								{
									label: "React",
									value: "1",
								},
								{
									label: "Vue",
									value: "2",
								},
							],
						},
					},
				}}
				onSubmit={(values) => submit.mutate(values)}
				onError={(errors) => {
					console.log(errors);
					showToast({
						message: "Some error occured!",
						type: "danger",
						modal: true,
					});
				}}
				isSubmitting={submit.isPending}
				defaultValues={{
					pin: "",
				}}
			/>
			<Button className="text-primary-foreground">Hello</Button>
		</View>
	);
}
