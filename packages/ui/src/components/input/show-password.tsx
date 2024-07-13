import { Pressable, useTw } from "@nativetail/core";
import { Iconify } from "react-native-iconify";

export default function ShowPassword({
	showPassword,
	setShowPassword,
}: {
	showPassword: boolean;
	setShowPassword: (showPassword: boolean) => void;
}) {
	const tw = useTw();
	return (
		<Pressable
			onPress={() => setShowPassword(!showPassword)}
			className="absolute right-2 bottom-2"
		>
			{showPassword ? (
				<Iconify
					icon="solar:eye-linear"
					size={20}
					color={tw.color("foreground")}
				/>
			) : (
				<Iconify
					icon="solar:eye-closed-linear"
					size={20}
					color={tw.color("foreground")}
				/>
			)}
		</Pressable>
	);
}
