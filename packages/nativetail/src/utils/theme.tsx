import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
	Appearance,
	useColorScheme as useNativeColorScheme,
} from "react-native";
import { TailwindFn, TwConfig, create } from "../parser";
type ColorSchemeType = "light" | "dark";

type ContextType = {
	tw: TailwindFn | null;
	theme: any | null;
	setTheme: (theme: any) => void;
	colorScheme: ColorSchemeType;
	setColorScheme: (colorScheme: ColorSchemeType) => void;
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
}: {
	children: any;
	theme: TwConfig;
	defaultColorScheme?: ColorSchemeType;
}) => {
	const [colorScheme, setColorScheme] = useState<ColorSchemeType>(
		defaultColorScheme || useNativeColorScheme()
	);

	const tw = useRef(create(theme));
	useEffect(() => {
		if ("setColorScheme" in Appearance) {
			Appearance.setColorScheme(colorScheme);
		}
	}, [colorScheme]);
	return (
		<ThemeContext.Provider
			value={{
				tw: tw.current,
				theme,
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
