import React, { createContext, useContext } from "react";
import {
	ActionSheetProps,
	AlertDialogProps,
	BottomSheetProps,
	ButtonProps,
	ChipProps,
	CounterProps,
	DialogProps,
	FloatingInputProps,
	InputProps,
	PinInputProps,
	ProgressProps,
} from "../components";
type ComponentsType = {
	Button?: Partial<ButtonProps>;
	Dialog?: Partial<DialogProps>;
	AlertDialog?: Partial<AlertDialogProps>;
	Input?: Partial<InputProps>;
	FloatingInput?: Partial<FloatingInputProps>;
	PinInput?: Partial<PinInputProps>;
	BottomSheet?: Partial<BottomSheetProps>;
	ActionSheet?: Partial<ActionSheetProps>;
	Chip?: ChipProps;
	Progress?: ProgressProps;
	Counter?: CounterProps;
};
type ComponentThemeContextType = {
	components: ComponentsType;
};

const ComponentThemeContext = createContext<ComponentThemeContextType>({
	components: {},
});
export const useComponentTheme = () => {
	const ctx = useContext(ComponentThemeContext);
	return ctx.components;
};
export function ComponentThemeProvider({
	children,
	components,
}: {
	children: React.ReactNode;
	components: ComponentsType;
}) {
	return (
		<ComponentThemeContext.Provider value={{ components }}>
			{children}
		</ComponentThemeContext.Provider>
	);
}
