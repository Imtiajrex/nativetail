import { createContext, useContext, useEffect, useState } from "react";
import {
	Appearance,
	useColorScheme as useNativeColorScheme,
} from "react-native";
import { create as createStore } from "zustand";
import { TailwindFn, create } from "../parser";
type ColorSchemeType = "light" | "dark";

type ContextType = {
	tw: TailwindFn | null;
	theme: any | null;
	setTheme: (theme: any) => void;
	colorScheme: ColorSchemeType;
	setColorScheme: (colorScheme: ColorSchemeType) => void;
};

export const useTwStore = createStore<{
	tw: TailwindFn | null;
}>(() => ({ tw: null }));
export const ThemeContext = createContext<ContextType>({
	tw: null,
	theme: null,
	setTheme: () => {},
	colorScheme: "light",
	setColorScheme: (colorScheme) => {},
});

export const ThemeProvider = ({
	children,
	theme,
	darkTheme,
	defaultColorScheme,
}: {
	children: any;
	theme: any;
	darkTheme?: any;
	defaultColorScheme?: ColorSchemeType;
}) => {
	const [colorScheme, setColorScheme] = useState<ColorSchemeType>(
		defaultColorScheme || useNativeColorScheme()
	);
	const tw = useTwStore((s) => s.tw);
	useEffect(() => {
		if (colorScheme === "dark" && darkTheme) return setTheme(darkTheme);
		if (theme) setTheme(theme);
	}, [theme, darkTheme, colorScheme]);
	const setTheme = (theme: any) => {
		useTwStore.setState({ tw: create(theme) });
	};
	useEffect(() => {
		if ("setColorScheme" in Appearance) {
			Appearance.setColorScheme(colorScheme);
		}
		if (colorScheme === "dark" && darkTheme) setTheme(darkTheme);
		else if (theme) setTheme(theme);
	}, [colorScheme]);
	return (
		<ThemeContext.Provider
			value={{ tw, theme, setTheme, colorScheme, setColorScheme }}
		>
			{tw && children}
		</ThemeContext.Provider>
	);
};
export const useThemeContext = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext.theme) {
		console.error("No theme context found");
	}
	return themeContext;
};
export const useColorScheme = () => {
	const themeContext = useThemeContext();
	return [themeContext.colorScheme, themeContext.setColorScheme] as const;
};

export const useTw = () => {
	const twContext = useContext(ThemeContext);
	if (!twContext.tw) {
		console.error("No tw context found");
		return create(require("../../tailwind.config.js"));
	}
	const tw = twContext.tw;
	return tw!;
};
