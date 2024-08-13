import { cn, Pressable, useColor } from "@nativetail/core";
import { CheckIcon } from "lucide-react-native";

type CheckProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	className?: string;
	activeClassName?: string;
	inactiveCheckColor?: string;
	activeCheckColor?: string;
};
export function Check({
	checked,
	onChange,
	className,
	activeClassName,
	inactiveCheckColor,
	activeCheckColor,
	...props
}: CheckProps) {
	return (
		<Pressable
			className={cn(
				"border w-6 h-6 p-1 items-center justify-center rounded-lg border-muted/15 bg-card",
				className,
				checked ? "bg-primary " + activeClassName : ""
			)}
			aria-checked={checked}
			accessibilityRole="switch"
			aria-label="Check"
			{...props}
			onPress={() => onChange(!checked)}
		>
			<CheckIcon
				color={useColor(
					checked
						? activeCheckColor || "card"
						: inactiveCheckColor || "primary/35"
				)}
			/>
		</Pressable>
	);
}
