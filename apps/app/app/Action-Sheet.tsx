import { View } from "@nativetail/core";
import { ActionSheet, ActionSheetRef, Button, showToast } from "@nativetail/ui";
import { useRef } from "react";
import { Iconify } from "react-native-iconify";

export default function Page() {
	return (
		<View className="container">
			<ActionSheetContent />
		</View>
	);
}

const ActionSheetContent = () => {
	const ref = useRef<ActionSheetRef>(null);
	return (
		<>
			<Button
				className="group w-full active:scale-95 scale-100"
				onPress={() => {
					ref?.current?.show();
				}}
			>
				Open Action Sheet
				<View className=" absolute right-12 scale-0 -translate-x-16 group-hover:scale-100 group-hover:translate-x-0 group-active:scale-100 group-active:translate-x-0">
					<Iconify icon="mdi:plus-circle" size={24} color={"white"} />
				</View>
			</Button>

			<ActionSheet
				onCancel={() => {
					ref?.current?.hide();
				}}
				ref={ref}
				options={[
					{
						onPress: () => {
							ref?.current?.hide();
						},
						text: "Edit This Item",
					},
					{
						onPress: () => {
							ref?.current?.hide();
							showToast({
								message: "Deleted Successfully",
								content: "The item has been deleted successfully",
								position: "bottom-center",
								type: "success",
							});
						},
						text: "Delete This Item",
						className: "text-red-500",
					},
				]}
			/>
		</>
	);
};
