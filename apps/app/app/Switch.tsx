import { useThemeContext, View } from "@nativetail/core";
import { Switch } from "@nativetail/ui";
import { useState } from "react";

export default function Page() {
	const [checked, setChecked] = useState(false);
	return (
		<View className="container">
			<Switch
				checked={checked}
				onChange={(value) => {
					setChecked(value);
				}}
			/>
		</View>
	);
}
