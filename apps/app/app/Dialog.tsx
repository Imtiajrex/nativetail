import { Text, View } from "@nativetail/core";
import { Button, Dialog, DialogMethods } from "@nativetail/ui";
import { useRef } from "react";

export default function dialog() {
	return (
		<View className="container">
			<DialogDemo />
		</View>
	);
}

const DialogDemo = () => {
	const dialogRef = useRef<DialogMethods>(null);
	return (
		<>
			<Dialog contentClassName="p-4" ref={dialogRef}>
				<Text>Hello World from dialog!</Text>
			</Dialog>
			<Button
				className="w-full"
				variant={"outline"}
				onPress={() => {
					dialogRef.current?.show();
				}}
			>
				Open Dialog
			</Button>
		</>
	);
};
