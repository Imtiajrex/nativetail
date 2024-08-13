import { cn, Pressable, Text, useColor, useTw, View } from "@nativetail/core";
import {
	CheckCheck,
	Info,
	OctagonAlert,
	OctagonX,
	X,
} from "lucide-react-native";
import { AnimatePresence } from "moti";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-native";
import { Iconify } from "react-native-iconify";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { create } from "zustand";
type ToastType = {
	message: string;
	content?: string;
	id: string;
	timeout?: number;
	position?:
		| "top-center"
		| "top-left"
		| "top-right"
		| "bottom-left"
		| "bottom-right"
		| "bottom-center";

	containerClassName?: string;
	type?: "success" | "danger" | "info" | "warning";
	modal?: boolean;
	icon?: React.ReactNode;
};
type InsertToastType = Omit<ToastType, "id">;
type ToastStore = {
	toasts: ToastType[];
	addToast: (toast: ToastType) => void;
	removeToast: (id: string) => void;
};
const useToastState = create<ToastStore>((set) => ({
	toasts: [],
	addToast: (toast) =>
		set((state) => ({
			toasts: [
				...state.toasts,
				{
					type: "info",
					position: "top-center",
					...toast,
				},
			],
		})),
	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
}));
let timeouts = new Map<string, NodeJS.Timeout>();
export const showToast = (toast: InsertToastType) => {
	const id = Math.random().toString(36).substring(7);
	console.log(id);
	useToastState.getState().addToast({ ...toast, id });
	return id;
};
export function Toaster() {
	const toasts = useToastState((state) => state.toasts);
	const topToasts = toasts.filter((toast) => toast.position.includes("top"));
	const bottomToasts = toasts.filter((toast) =>
		toast.position.includes("bottom")
	);
	const safeInsets = useSafeAreaInsets();
	return (
		<AnimatePresence exitBeforeEnter presenceAffectsLayout>
			{topToasts.length > 0 && (
				<View
					className={cn(
						"absolute w-full top-0 left-0  justify-center z-50 gap-2",
						`top-[${safeInsets.top + 10}px]`
					)}
				>
					{topToasts.map((toast, index) => (
						<Toast index={index} {...toast} key={toast.id} />
					))}
				</View>
			)}
			{bottomToasts.length > 0 && (
				<View
					className={cn(
						"absolute w-full left-0  justify-center z-50 gap-2",
						`bottom-[${safeInsets.bottom + 10}px]`
					)}
				>
					{bottomToasts.map((toast, index) => (
						<Toast key={toast.id} index={index} {...toast} />
					))}
				</View>
			)}
		</AnimatePresence>
	);
}

const Toast = (
	toast: ToastType & {
		index: number;
	}
) => {
	const safeInsets = useSafeAreaInsets();
	const [visible, setVisible] = useState(true);
	const close = useCallback(() => {
		setVisible(false);
	}, [setVisible]);
	if (toast.modal)
		return (
			<Modal visible={visible} onRequestClose={close} transparent>
				<Pressable
					className={cn(
						"absolute w-full h-full bg-black/15 left-0 justify-start z-50 gap-2",
						toast.position.includes("top")
							? `pt-[${safeInsets.top + 10}px]`
							: `pb-[${safeInsets.bottom + 10}px]`
					)}
					onPress={close}
				>
					<BaseToast {...toast} />
				</Pressable>
			</Modal>
		);
	return <BaseToast {...toast} />;
};
const BaseToast = (
	toast: ToastType & {
		index: number;
	}
) => {
	const [open, setOpen] = useState(true);
	const tw = useTw();
	const closeToast = () => {
		setOpen(false);
		setTimeout(() => useToastState.getState().removeToast(toast.id), 150);
	};
	useEffect(() => {
		const id = setTimeout(closeToast, toast.timeout || 5000);
		timeouts.set(toast.id, id);
		return () => {
			clearTimeout(timeouts.get(toast.id)!);
			timeouts.delete(toast.id);
		};
	}, [toast.id]);

	const Icons = {
		success: <CheckCheck size={20} color={useColor("success")} />,
		danger: <OctagonX size={20} color={useColor("danger")} />,
		info: <Info size={20} color={useColor("info")} />,
		warning: <OctagonAlert size={20} color={useColor("warning")} />,
	};

	const Icon = toast.icon || Icons[toast.type];
	const horizontalPositions = {
		center: "items-center",
		left: "items-start",
		right: "items-end",
	};
	const horizontalPosition =
		horizontalPositions[
			toast.position.replace("top-", "").replace("bottom-", "")
		];
	return (
		<View
			className={cn("w-full", horizontalPosition, toast.containerClassName)}
			animated
		>
			<Pressable
				onPress={() => {
					if (open) closeToast();
				}}
				className="w-full items-center justify-center active:scale-95 scale-100  px-4"
			>
				<AnimatePresence presenceAffectsLayout exitBeforeEnter>
					{open && (
						<View
							className={cn(
								`bg-card/95 border border-muted/15 px-2 py-2  rounded-2xl overflow-hidden flex-row items-center gap-2 in:-translate-y-24  translate-y-0 out:-translate-y-24 in:scale-0 scale-100 out:scale-0`
							)}
							animated
						>
							<View className="in:scale-0 scale-100">{Icon}</View>
							<View className="">
								<Text className="font-medium text-sm text-foreground">
									{toast.message}
								</Text>
								{toast.content && (
									<Text className="text-xs text-muted">{toast.content}</Text>
								)}
							</View>
						</View>
					)}
				</AnimatePresence>
			</Pressable>
		</View>
	);
};
