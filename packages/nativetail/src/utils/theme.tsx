import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Appearance } from "react-native";
import { TailwindFn, TwConfig, create, useAppColorScheme } from "../parser";
type ColorSchemeType = "light" | "dark";

type FontsResourceType = Record<string, Record<string, string>>;
type ContextType = {
	tw: TailwindFn | null;
	theme: any | null;
	setTheme: (theme: any) => void;
	colorScheme: ColorSchemeType;
	setColorScheme: (colorScheme: ColorSchemeType) => void;
	fonts?: FontsResourceType;
	defaultFont?: {
		name: string;
		weight: number;
	};
};

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
	defaultColorScheme,
	fonts,
	defaultFont,
}: {
	children: any;
	theme: TwConfig;
	defaultColorScheme?: ColorSchemeType;
	defaultFont?: {
		name: string;
		weight: number;
	};
	fonts?: FontsResourceType;
}) => {
	const tw = useRef(create(theme));
	const [appColorScheme, _, setAppColorScheme] = useAppColorScheme(tw.current);

	const [colorScheme, setColorScheme] = useState<ColorSchemeType>(
		defaultColorScheme || appColorScheme
	);

	useEffect(() => {
		if ("setColorScheme" in Appearance) {
			Appearance.setColorScheme(colorScheme);
		}
		setAppColorScheme(colorScheme);
	}, [colorScheme]);
	return (
		<ThemeContext.Provider
			value={{
				tw: tw.current,
				fonts,
				theme,
				defaultFont,
				setTheme: (theme) => {
					// setTw(create(theme));
					tw.current = create(theme);
				},
				colorScheme,
				setColorScheme,
			}}
		>
			{tw && children}
		</ThemeContext.Provider>
	);
};
export const useThemeContext = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext.theme) {
		console.warn("No theme context found");
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
		console.warn("No tw context found");
		return create(require("../../tailwind.config.js"));
	}
	const tw = twContext.tw;
	return tw!;
};
