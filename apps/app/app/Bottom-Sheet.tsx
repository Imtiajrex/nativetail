import { Text, View } from "@nativetail/core";
import { BottomSheet, BottomSheetRef, Button, Input } from "@nativetail/ui";
import { useRef } from "react";
import { Iconify } from "react-native-iconify";

export default function Page() {
	return (
		<View className="container">
			<BottomSheetContent />
		</View>
	);
}

const BottomSheetContent = () => {
	const bottomSheetRef = useRef<BottomSheetRef>(null);

	return (
		<>
			<Button
				className="group w-full active:scale-95 scale-100"
				onPress={() => {
					bottomSheetRef?.current?.show();
				}}
			>
				Open Bottom Sheet
				<View className=" absolute right-12 scale-0 -translate-x-16 group-hover:scale-100 group-hover:translate-x-0 group-active:scale-100 group-active:translate-x-0">
					<Iconify icon="mdi:plus-circle" size={24} color={"white"} />
				</View>
			</Button>
			<BottomSheet
				ref={bottomSheetRef}
				contentClassName="max-w-2xl mx-auto w-full"
			>
				<Text className="text-center font-medium text-lg">Create User</Text>
				<Input label="Name" placeholder="Enter Name" className="bg-card" />
				<Input label="Email" placeholder="Enter Email" className="bg-card" />
				<Button
					variant={"link"}
					onPress={() => {
						bottomSheetRef?.current?.hide();
					}}
				>
					Close
				</Button>
			</BottomSheet>
		</>
	);
};
