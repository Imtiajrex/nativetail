import { View } from "@nativetail/core";
import { MultiStepForm, showToast } from "@nativetail/ui";
import { useState } from "react";
import { z } from "zod";

export default function Page() {
	const [activeStep, setActiveStep] = useState("Personal Information");
	return (
		<View className="container">
			<MultiStepForm
				steps={[
					{
						name: "Personal Information",
						schema: z.object({
							name: z.string(),
							email: z.string().email(),
						}),
						inputs: {
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
						},
						onSubmit: (data) => {
							console.log(data);
							setActiveStep("Security");
						},
					},
					{
						name: "Security",
						schema: z.object({
							password: z.string().min(6),
						}),
						inputs: {
							password: {
								type: "text",
								props: {
									label: "Password",
									isSecretToggleable: true,
								},
							},
						},
						onSubmit: (data) => {
							console.log(data);
							showToast({
								message: "Account created successfully",
								type: "success",
							});
						},
					},
				]}
				activeStep={activeStep}
			/>
		</View>
	);
}
