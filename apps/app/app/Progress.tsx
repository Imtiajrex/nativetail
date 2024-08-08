import { Counter, Progress } from "@nativetail/ui";
import { useState } from "react";
import { View } from "@nativetail/core";

export default function progress() {
	return (
		<View className="container">
			<ProgressContent />
		</View>
	);
}

const ProgressContent = () => {
	const [value, setValue] = useState(50);
	return (
		<>
			<Progress progress={value} max={100} />
			<Counter
				value={value}
				setValue={setValue}
				max={100}
				min={20}
				containerClassName=" max-w-45"
			/>
		</>
	);
};
