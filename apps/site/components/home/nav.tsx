import { Link, usePathname } from "expo-router";
import { Image, Pressable, Text, View } from "nativetail";

export default function Nav() {
	return (
		<View className="flex-row items-center gap-2 justify-between max-w-6xl mx-auto w-full px-4 pt-8">
			<Image source={require("assets/images/icon.png")} className="w-10 h-10" />
			<View className="flex-row items-center gap-2">
				<NavLink to="/" text="Home" />
				<NavLink to="/docs" text="Docs" />
				<NavLink to="/components" text="Components" />
			</View>
		</View>
	);
}

const NavLink = ({ to, text }: { to: string; text: string }) => {
	const pathname = usePathname();
	const isActive = pathname === to;
	return (
		<Pressable className="group">
			<Link href={to}>
				<Text
					className={`text-sm group-hover:text-primary  ${
						isActive
							? "text-primary font-medium"
							: "text-foreground font-normal"
					}`}
				>
					{text}
				</Text>
			</Link>
		</Pressable>
	);
};
