import { Text, useColor, View } from "@nativetail/core";
import { InfoCard, StatCard } from "@nativetail/ui";
import { CircleDollarSign, ClipboardCheck } from "lucide-react-native";

export default function Page() {
	return (
		<View className="container">
			<Stats />
			<Infos />
			<Data />
		</View>
	);
}

const Stats = () => {
	return (
		<View className="gap-2">
			<Text className="text-lg font-semibold text-foreground">Stats</Text>

			<View className="flex-wrap flex-row gap-2 min-h-28">
				<StatCard
					title="Total Earned"
					value="$10"
					containerClassName="w-44 h-full"
					Icon={<CircleDollarSign size={20} color={useColor("success")} />}
				/>
				<StatCard
					title="Active Orders"
					value="101"
					containerClassName="w-44 h-full"
					Icon={<ClipboardCheck size={20} color={useColor("primary")} />}
				/>
			</View>
		</View>
	);
};

const Infos = () => {
	return (
		<View className="gap-2">
			<Text className="text-lg font-semibold text-foreground">Infos</Text>

			<InfoCard title="Total Earned" subtitle="Today" actions={[]} />
		</View>
	);
};
const Data = () => {
	return <></>;
};
