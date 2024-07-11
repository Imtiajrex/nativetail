import {
	cn,
	cva,
	Pressable,
	useTw,
	VariantProps,
	View,
} from "@nativetail/core";

const switchVariants = cva(
	"rounded-full bg-card justify-center border p-0.5 items-start",
	{
		variants: {
			size: {
				small: "w-12 h-6",
				medium: "w-16 h-8",
				large: "w-24 h-12",
			},
		},
		defaultVariants: {
			size: "small",
		},
	}
);
type SwitchProps = VariantProps<typeof switchVariants> & {
	checked: boolean;
	onChange: (checked: boolean) => void;
	containerClassName?: string;
	containerActiveClass?: string;
	indicatorClassName?: string;
};
export function Switch({
	checked,
	onChange,
	containerClassName,
	size,
	indicatorClassName,
	containerActiveClass,
	...props
}: SwitchProps) {
	const className = switchVariants({
		className: containerClassName,
		size: size,
	});
	const tw = useTw();
	const style = tw.style(className);
	const containerWidth = Number(style.width) || 0;
	const indicatorWidth = containerWidth * 0.48;
	const x = `translate-x-${!checked ? 1 : indicatorWidth}`;
	return (
		<Pressable
			className={cn(
				className,
				checked ? "bg-primary/35 " + containerActiveClass : ""
			)}
			aria-checked={checked}
			accessibilityRole="switch"
			aria-label="Switch"
			{...props}
			onPress={() => onChange(!checked)}
		>
			<View
				className={cn(
					`rounded-full bg-primary aspect-square h-full`,
					indicatorClassName,
					x
				)}
				animated
			/>
		</Pressable>
	);
}
