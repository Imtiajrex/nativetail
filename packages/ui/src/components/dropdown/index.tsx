import {
	mergeClasses,
	Pressable,
	PressableProps,
	useTw,
	View,
} from "@nativetail/core";
import { AnimatePresence } from "moti";
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
	useWindowDimensions,
	ViewStyle,
} from "react-native";

type PositionType = {
	width: number;
	height: number;
	top: number;
	left: number;
	right: number;
	bottom: number;
};
type DropdownState = {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
	open: () => void;
	position: React.MutableRefObject<PositionType | null>;
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
	const position = useRef<PositionType | null>(null);
	return (
		<DropdownContext.Provider
			value={{
				isOpen: open,
				toggle: () => setOpen(!open),
				close: () => setOpen(false),
				open: () => setOpen(true),
				position,
				setPosition: (pos) => {
					position.current = pos;
				},
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
				const right = W - left - width;

				setPosition({
					width: Math.floor(width),
					top: Math.floor(top + statusBarHeight),
					bottom: Math.floor(bottom - statusBarHeight),
					left: Math.floor(left),
					right: Math.floor(right),
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

	useEffect(() => {
		_measure();
	}, [_measure]);

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
	const position = useDropdownContext().position.current;

	const [modalOpen, setModalOpen] = useState(isOpen);
	const [layout, setLayout] = useState<PositionType>({
		bottom: 0,
		height: 0,
		left: 0,
		right: 0,
		top: 0,
		width: 0,
	});
	const itemRef = useRef<NativeView>(null);
	const screen = useWindowDimensions();
	const tw = useTw();
	const left = position?.left || 0;
	const top = position?.top || 0;
	const menuX = left;
	const width = position?.width || 0;
	const style = tw`${className}`;
	const styleWidth = !isNaN(Number(style?.width)) ? Number(style?.width) : 0;
	const menuWidth = styleWidth || width || 0;
	const isEndOfXScreen = screen.width - menuX < menuWidth;
	const isEndOfYScreen = top + layout.height > screen.height;
	const menuStyle: ViewStyle = {
		left: menuX,
		transformOrigin: "top left",
	};
	menuStyle.top = top;

	if (isEndOfXScreen) {
		menuStyle.left = menuX - menuWidth + width;
		menuStyle.transformOrigin = "top right";
	}
	if (isEndOfYScreen) {
		menuStyle.top = top - layout.height - position.height;
		menuStyle.transformOrigin = "bottom left";
	}
	const measureLayout = useCallback(() => {
		if (itemRef.current) {
			itemRef.current.measure((x, y, width, height, pageX, pageY) => {
				setLayout({
					width,
					height,
					top: pageY,
					left: pageX,
					right: screen.width - pageX - width,
					bottom: screen.height - pageY - height,
				});
			});
		}
	}, []);

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
	const renderChildren = useCallback(() => {
		return React.Children.map(children, (child, index) => {
			return (
				child &&
				React.cloneElement(child as any, {
					key: index,
					last: index === React.Children.count(children) - 1,
					first: index === 0,
				})
			);
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
							ref={itemRef}
							className={mergeClasses(
								"absolute in:scale-0 scale-100 out:scale-0 overflow-hidden z-10 bg-card/95 rounded-xl  border border-muted/15",
								width ? `w-[${width}px]` : "",
								className
							)}
							onDidAnimate={onDidAnimate}
							style={menuStyle}
							onLayout={measureLayout}
							animated
							print
						>
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
	autoClosable = true,
	...props
}: {
	className?: string;
	last?: boolean;
	children: ReactNode;
	first?: boolean;
	autoClosable?: boolean;
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
				if (autoClosable) close();
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
