import { useThemeContext, View } from "@nativetail/core";
import { Switch } from "@nativetail/ui";

export default function Page() {
	const { colorScheme, setColorScheme, setTheme } = useThemeContext();
	return (
		<View className="container">
			<Switch
				checked={colorScheme === "dark"}
				onChange={(value) => {
					setColorScheme(value ? "dark" : "light");
					setTheme(require("../dark.tailwind.config"));
				}}
			/>
		</View>
	);
}
