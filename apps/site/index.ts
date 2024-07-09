import { LogBox } from "react-native";
import "./global.css";

if (!__DEV__) {
	LogBox.ignoreAllLogs();
}

import "expo-router/entry";
