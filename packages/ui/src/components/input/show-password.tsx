import { Pressable, useColor } from "@nativetail/core";
import { Eye, EyeOff } from "lucide-react-native";

export default function ShowPassword({
	showPassword,
	setShowPassword,
}: {
	showPassword: boolean;
	setShowPassword: (showPassword: boolean) => void;
}) {
	return (
		<Pressable
			onPress={() => setShowPassword(!showPassword)}
			className="absolute right-2 bottom-2"
		>
			{showPassword ? (
				<Eye size={20} color={useColor("foreground")} />
			) : (
				<EyeOff size={20} color={useColor("foreground")} />
			)}
		</Pressable>
	);
}
