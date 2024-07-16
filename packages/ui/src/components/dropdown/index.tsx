import { BlurView } from "expo-blur";
import { AnimatePresence } from "moti";
import {
	mergeClasses,
	Pressable,
	PressableProps,
	useTw,
	View,
} from "@nativetail/core";
import React, {
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	Dimensions,
	I18nManager,
	Modal,
	View as NativeView,
	StatusBar,
} from "react-native";
import { Blur } from "../blur";

type PositionType = {
	width: number;
	height: number;
	top: number;
	left: number;
	bottom: number;
};
type DropdownState = {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
	open: () => void;
	position: PositionType | null;
	setPosition: (position: PositionType | null) => void;
};
const DropdownContext = React.createContext<DropdownState | null>(null);
const useDropdownContext = () => {
	const context = React.useContext(DropdownContext);
	if (!context) {
		throw new Error("useDropdownContext must be used within a DropdownRoot");
	}
	return context;
};

const DropdownRoot = ({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState<PositionType | null>(null);
	return (
		<DropdownContext.Provider
			value={{
				isOpen: open,
				toggle: () => setOpen(!open),
				close: () => setOpen(false),
				open: () => setOpen(true),
				position,
				setPosition,
			}}
		>
			<View className={className} animated>
				{children}
			</View>
		</DropdownContext.Provider>
	);
};
const DropdownTrigger = ({
	className,
	children,
	containerClassName,
}: {
	className?: string;
	children: ReactNode;
	containerClassName?: string;
}) => {
	const toggle = useDropdownContext().toggle;
	const ref = useRef<NativeView>(null);

	const statusBarHeight: number = StatusBar.currentHeight || 0;
	const setPosition = useDropdownContext().setPosition;

	const { width: W, height: H } = Dimensions.get("window");
	const _measure = useCallback(() => {
		if (ref && ref?.current) {
			ref.current.measureInWindow((pageX, pageY, width, height) => {
				let isFull = false;

				const top = isFull ? 20 : height + pageY + 2;
				const bottom = H - top + height;
				const left = I18nManager.isRTL ? W - width - pageX : pageX;

				setPosition({
					width: Math.floor(width),
					top: Math.floor(top + statusBarHeight),
					bottom: Math.floor(bottom - statusBarHeight),
					left: Math.floor(left),
					height: Math.floor(height),
				});
			});
		}
	}, [H, W]);
	const handlePress = useCallback(() => {
		if (__DEV__) {
			_measure();
		}
		toggle();
	}, [toggle, _measure]);
	return (
		<Pressable
			className={className}
			onPress={handlePress}
			containerClassName={containerClassName}
			onLayout={_measure}
			ref={ref}
		>
			{children}
		</Pressable>
	);
};
let timeout: NodeJS.Timeout;
const DropdownMenu = ({
	className,
	children,
	useBlur = false,
}: {
	className?: string;
	children: ReactNode;
	useBlur?: boolean;
}) => {
	const { isOpen, close } = useDropdownContext();
	const position = useDropdownContext().position;
	const left = position?.left || 0;
	const top = position?.top || 0;
	const menuX = left;
	const menuY = top;
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
	const tw = useTw();
	const renderChildren = useCallback(() => {
		return React.Children.map(children, (child, index) => {
			return React.cloneElement(child as any, {
				key: index,
				last: index === React.Children.count(children) - 1,
				first: index === 0,
			});
		});
	}, [children]);
	return (
		<Modal
			visible={modalOpen}
			transparent
			onRequestClose={close}
			statusBarTranslucent
		>
			<Pressable className="flex-1 " onPress={close}>
				<AnimatePresence exitBeforeEnter>
					{isOpen && (
						<View
							className={mergeClasses(
								"absolute in:scale-0 scale-100 out:scale-0 overflow-hidden z-10 bg-card/95 rounded-xl max-w-xs w-full  border border-muted/15",
								className
							)}
							onDidAnimate={onDidAnimate}
							style={{
								top: menuY,
								left: menuX,
								transformOrigin: "top left",
							}}
							animated
							print
							id={"1"}
						>
							{useBlur && (
								<Blur style={tw`absolute top-0 left-0 rounded-xl flex-1 `} />
							)}
							{renderChildren()}
						</View>
					)}
				</AnimatePresence>
			</Pressable>
		</Modal>
	);
};
const DropdownItem = ({
	className,
	children,
	last,
	first,
	...props
}: {
	className?: string;
	last?: boolean;
	children: ReactNode;
	first?: boolean;
} & PressableProps) => {
	const close = useDropdownContext().close;
	return (
		<Pressable
			className={mergeClasses(
				"w-full text-[16px] font-medium bg-card/15 active:bg-card py-2.5 px-4 flex-row items-center justify-between border-b border-b-transparent text-foreground",
				first ? "rounded-t-xl" : "",
				last ? "rounded-b-xl" : "border-b-muted/15",
				className
			)}
			{...props}
			onPress={() => {
				close();
				props.onPress && props.onPress();
			}}
		>
			{children}
		</Pressable>
	);
};

const Dropdown = {
	Root: DropdownRoot,
	Trigger: DropdownTrigger,
	Menu: DropdownMenu,
	Item: DropdownItem,
};

export { Dropdown };
