import { View } from "@nativetail/core";
import { Chip } from "@nativetail/ui";

export default function chips() {
	return (
		<View className="container">
			<View className="flex-row gap-2">
				<Chip text="Burger" />
				<Chip text="Hotdogs" variant={"card"} />
				<Chip text="Veggies" variant={"outline"} />
				<Chip text="Sandwich" variant={"destructive"} />
				<Chip text="Sandwich" variant={"secondary"} className="text-black" />
				<Chip text="Sandwich" variant={"success"} />
			</View>
		</View>
	);
}
