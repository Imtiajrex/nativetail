import { BlurView } from "expo-blur";
import { AnimatePresence } from "moti";
import { cn, mergeClasses, Pressable, useTw, View } from "nativetail";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { Modal } from "react-native";

export type DialogProps = {
	containerClassName?: string;
	contentClassName?: string;
	useBlur?: boolean;
	children: React.ReactNode;
	onRequestClose?: () => void;
};
let timeout: NodeJS.Timeout;
export type DialogMethods = {
	show: () => void;
	hide: () => void;
};
export const Dialog = forwardRef<DialogMethods, DialogProps>(function Dialog(
	{
		containerClassName,
		contentClassName,
		useBlur,
		children,
		onRequestClose,
	}: DialogProps,
	ref
) {
	const [isOpen, setOpen] = useState(false);

	const getRef = useCallback(() => {
		return {
			show: () => {
				setOpen(true);
			},
			hide: () => {
				setOpen(false);
			},
		};
	}, [setOpen]);
	useImperativeHandle(ref, getRef, []);
	const tw = useTw();
	const [modalOpen, setModalOpen] = useState(isOpen);
	useEffect(() => {
		if (isOpen) {
			setModalOpen(true);
		} else {
			timeout = setTimeout(
				() => {
					setModalOpen(false);
				},
				isOpen ? 0 : 200
			);
		}
		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [isOpen]);

	const onDidAnimate = useCallback(() => {
		if (!isOpen) {
			setModalOpen(false);
		}
	}, [isOpen]);

	return (
		<Modal
			visible={modalOpen}
			transparent
			onRequestClose={onRequestClose}
			animationType="fade"
			statusBarTranslucent
		>
			<Pressable
				className={cn(
					"flex-1 items-center justify-center p-4 w-full h-full bg-black/35",
					containerClassName
				)}
				onPress={onRequestClose}
				disabled={!onRequestClose}
			>
				<AnimatePresence exitBeforeEnter>
					{isOpen && (
						<View
							className={mergeClasses(
								"absolute overflow-hidden in:opacity-0 opacity-100 out:opacity-0 in:scale-0 scale-100 out:scale-0 z-10 bg-card/80 rounded-xl max-w-sm w-full  border border-muted/10",
								contentClassName
							)}
							onDidAnimate={onDidAnimate}
						>
							{useBlur && (
								<BlurView
									style={tw`absolute top-0 left-0 right-0 bottom-0 rounded-xl flex-1 bg-card`}
									intensity={50}
									experimentalBlurMethod="dimezisBlurView"
								/>
							)}

							{children}
						</View>
					)}
				</AnimatePresence>
			</Pressable>
		</Modal>
	);
});
