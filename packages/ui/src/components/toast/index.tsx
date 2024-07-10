import { BlurView } from "expo-blur";
import { cn, Pressable, Text, useTw, View } from "nativetail";
import { useEffect } from "react";
import { create } from "zustand";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatePresence } from "moti";
import { Blur } from "../blur";
type ToastType = {
	message: string;
	content?: string;
	id: string;
	timeout?: number;
	position?: "top" | "bottom";
	containerClassName?: string;
};
type InsertToastType = Omit<ToastType, "id">;
type ToastStore = {
	toasts: ToastType[];
	addToast: (toast: ToastType) => void;
	removeToast: (id: string) => void;
};
const useToastState = create<ToastStore>((set) => ({
	toasts: [],
	addToast: (toast) => set((state) => ({ toasts: [...state.toasts, toast] })),
	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
}));
let timeouts = new Map<string, NodeJS.Timeout>();
export const showToast = (toast: InsertToastType) => {
	const id = Math.random().toString(36).substring(7);
	useToastState.getState().addToast({ ...toast, id });
	return id;
};
export function Toaster() {
	const toasts = useToastState((state) => state.toasts);
	return (
		<AnimatePresence exitBeforeEnter>
			{toasts.map((toast, index) => (
				<Toast key={toast.id} index={index} {...toast} />
			))}
		</AnimatePresence>
	);
}

const Toast = (
	toast: ToastType & {
		index: number;
	}
) => {
	const tw = useTw();
	useEffect(() => {
		const id = setTimeout(() => {
			useToastState.getState().removeToast(toast.id);
		}, toast.timeout || 5000);
		timeouts.set(toast.id, id);
		return () => {
			clearTimeout(timeouts.get(toast.id)!);
			timeouts.delete(toast.id);
		};
	}, [toast.id]);
	const safeInsets = useSafeAreaInsets();
	return (
		<View
			className={cn(
				"absolute w-full top-0 left-0 items-center justify-center z-50 ",
				toast.position === "top"
					? `top-[${safeInsets.top + 10}px]`
					: `bottom-[${safeInsets.bottom + 10}px]`,
				toast.containerClassName
			)}
			animated
		>
			<Pressable
				onPress={() => {
					useToastState.getState().removeToast(toast.id);
				}}
				className="w-full items-center justify-center active:scale-95 scale-100  px-4"
			>
				<View
					className={cn(
						`bg-card/95 border border-muted/15 px-6 py-3 in:opacity-0 opacity-100 in:-translate-y-16  out:-translate-y-16 out:opacity-0 in:scale-0 scale-100 out:scale-0 rounded-full overflow-hidden max-w-sm w-full `,
						`translate-y-0`
					)}
					animated
				>
					<Blur
						style={tw`absolute top-0 left-0 rounded-xl flex-1 bg-card/50 rounded-full`}
					/>
					<Text className="font-medium text-[16px] text-foreground">
						{toast.message}
					</Text>
					{toast.content && (
						<Text className="text-sm text-muted">{toast.content}</Text>
					)}
				</View>
			</Pressable>
		</View>
	);
};
