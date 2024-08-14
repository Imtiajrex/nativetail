import { Text, View } from "@nativetail/core";
import { Stepper } from "@nativetail/ui";

export default function Page() {
	return (
		<View className="container">
			<Stepper
				steps={["Step 1", "Step 2", "Step 3", "Step 4"]}
				activeStep={"Step 2"}
			/>
		</View>
	);
}
