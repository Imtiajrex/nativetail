import { View } from "@nativetail/core";
import { AlertDialog, AlertDialogRef, Button, showToast } from "@nativetail/ui";
import { useRef } from "react";

export default function Page() {
	return (
		<View className="container">
			<AlertDialogContent />
		</View>
	);
}

const AlertDialogContent = () => {
	const ref = useRef<AlertDialogRef>(null);

	return (
		<>
			<Button
				className="group w-full active:scale-95 scale-100"
				onPress={() => {
					ref?.current?.show();
				}}
			>
				Open Alert Dialog
			</Button>
			<AlertDialog
				ref={ref}
				onCancel={() => {
					ref?.current?.hide();
				}}
				onConfirm={() => {
					ref?.current?.hide();
					showToast({
						message: "Deleted Successfully",
						content: "The item has been deleted successfully",
						position: "top-right",
						type: "success",
					});
				}}
				title="Are you sure you want to delete this item?"
				description="This action cannot be undone"
			/>
		</>
	);
};
