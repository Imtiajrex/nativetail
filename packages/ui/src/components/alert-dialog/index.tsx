import { Text, View } from "@nativetail/core";
import { forwardRef } from "react";
import { Button } from "../button";
import { Dialog, DialogMethods } from "../dialog";

export type AlertDialogProps = {
	containerClassName?: string;
	onConfirm: () => void;
	onCancel: () => void;
	title?: string;
	description?: string;
	useBlur?: boolean;
};
export type AlertDialogRef = DialogMethods;
export const AlertDialog = forwardRef<DialogMethods, AlertDialogProps>(
	function AlertDialog(
		{ containerClassName, onConfirm, title, description, useBlur, onCancel },
		ref
	) {
		return (
			<Dialog
				containerClassName={containerClassName}
				useBlur={useBlur}
				ref={ref}
			>
				<View className="p-4 py-6">
					{title && (
						<Text className="text-foreground text-lg text-center font-semibold">
							{title}
						</Text>
					)}
					{description && (
						<Text className="text-muted/75 text-center w-full">
							{description}
						</Text>
					)}
				</View>

				<View className="flex-row items-center  border-t border-muted/15">
					<Button
						variant="link"
						className="flex-1 active:opacity-75 text-foreground"
						onPress={onCancel}
					>
						Cancel
					</Button>
					<Button
						variant="link"
						className="flex-1 border active:opacity-75 border-transparent rounded-none border-l-muted/15"
						onPress={onConfirm}
					>
						Confirm
					</Button>
				</View>
			</Dialog>
		);
	}
);
