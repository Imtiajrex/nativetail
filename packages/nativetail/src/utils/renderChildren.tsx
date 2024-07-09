import React from "react";
import { Text } from "../components/text";

export const renderChildren = (
	children: React.ReactNode,
	textClasses?: string
) => {
	return React.Children.map(children, (child) => {
		if (child && (typeof child === "string" || typeof child === "number")) {
			return <Text className={textClasses}>{child}</Text>;
		}
		return child;
	});
};
