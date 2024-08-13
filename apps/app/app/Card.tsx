import { Text, useColor, View } from "@nativetail/core";
import {
	AlertDialog,
	AlertDialogRef,
	Card,
	Dialog,
	InfoCard,
	Loader,
	showToast,
	StatCard,
} from "@nativetail/ui";
import {
	ArrowDown,
	ArrowUp,
	CircleDollarSign,
	ClipboardCheck,
} from "lucide-react-native";
import { useRef } from "react";

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
	const ref = useRef<Loader>(null);
	const alertRef = useRef<AlertDialogRef>(null);
	return (
		<View className="gap-2">
			<Text className="text-lg font-semibold text-foreground">Infos</Text>
			<Loader ref={ref} />
			<AlertDialog
				ref={alertRef}
				onCancel={() => {
					alertRef.current?.hide();
				}}
				onConfirm={() => {
					alertRef.current?.hide();
					ref.current?.show();
					setTimeout(() => {
						ref.current?.hide();
						showToast({
							message: "Deleted",
							type: "success",
							modal: true,
							position: "bottom-left",
						});
					}, 2000);
				}}
				title="Delete"
				description="Are you sure you want to delete this item?"
			/>
			<InfoCard
				title="Total Earned"
				subtitle="Today"
				renderIcon={() => (
					<View className="rounded-full bg-primary/5 border border-muted/5 w-12 h-12 items-center justify-center">
						<CircleDollarSign size={24} color={useColor("primary")} />
					</View>
				)}
				actions={[
					{
						text: "Edit",
						onPress: () => {},
					},
					{
						text: "Delete",
						onPress: () => {
							alertRef.current?.show();
						},
						className: "text-danger",
					},
				]}
			/>
			<View className="bg-card rounded-2xl p-2 py-4">
				<InfoCard
					title="Received Payment"
					subtitle="10$ Received"
					containerClassname="p-0 border-b border-muted/10 rounded-none py-2"
					renderIcon={() => (
						<View className="rounded-full bg-green-100 border border-muted/5 w-10 h-10 items-center justify-center">
							<ArrowUp size={24} color={useColor("green-500")} />
						</View>
					)}
					dotsClassname="border-transparent"
					actions={[
						{
							text: "Share",
							onPress: () => {},
						},
					]}
				/>
				<InfoCard
					title="Withdrawal Request"
					subtitle="10$ Requested"
					containerClassname="p-0 border-b border-muted/10 rounded-none py-2"
					renderIcon={() => (
						<View className="rounded-full bg-red-100 border border-muted/5 w-10 h-10 items-center justify-center">
							<ArrowDown size={24} color={useColor("red-500")} />
						</View>
					)}
					dotsClassname="border-transparent"
					actions={[
						{
							text: "Share",
							onPress: () => {},
						},
					]}
				/>
			</View>
		</View>
	);
};
const Data = () => {
	return (
		<View className="gap-2">
			<Text className="text-lg font-semibold text-foreground">Data</Text>
			<Card />
		</View>
	);
};
