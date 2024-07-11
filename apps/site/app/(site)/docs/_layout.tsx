import { Text, useTw, View } from "@nativetail/core";
import React from "react";

import { MDXComponents, MDXStyles } from "@bacons/mdx";
import DocsSidebar from "components/docs-sidebar";
import { Slot } from "expo-router";
import { Platform } from "react-native";

export default function _layout() {
	return (
		<View className="max-w-7xl w-full gap-8 mx-auto lg:flex-row flex-col px-4 mt-4">
			<DocsSidebar />
			<View className="flex-col gap-4 flex-1">
				<MediumStyle>
					<Slot />
				</MediumStyle>
			</View>
		</View>
	);
}
export function MediumStyle({ children }: { children: React.ReactNode }) {
	const tw = useTw();

	const cardColor = tw.color("card");
	const textColor = tw.color("foreground");
	const mutedColor = tw.color("muted");
	return (
		<MDXStyles
			h1={{
				//   fontFamily: "Inter_900Black",
				fontSize: 32,
				color: textColor,
			}}
			h2={{
				//   fontFamily: "Inter_900Black",
				marginTop: 16,
				fontSize: 22,
				marginBottom: 0,
				color: textColor,
			}}
			code={{
				//   fontFamily: "SourceCodePro_400Regular",
				borderRadius: 16,
				backgroundColor: cardColor,
				padding: 20,
				fontSize: 16,
				color: textColor,
			}}
			inlineCode={{
				//   fontFamily: "SourceCodePro_400Regular",
				borderRadius: 2,
				fontSize: 15,
				backgroundColor: cardColor,
				paddingVertical: 2,
				paddingHorizontal: 4,
			}}
			p={{
				//   fontFamily: "Inter_400Regular",

				fontSize: Platform.select({
					web: "1rem",
					default: "16px",
				}),
				marginBottom: 16,
				color: mutedColor,
			}}
			blockquote={{
				//   fontFamily: "Inter_400Regular",
				borderLeftWidth: 3,
				fontSize: 21,
				borderLeftColor: "#292929",
				paddingLeft: 23,
			}}
			img={{
				width: "100%",
				minWidth: "100%",
				height: 180,
			}}
			a={{
				//   fontFamily: "Inter_400Regular",
				textDecorationLine: "underline",
			}}
			hr={{
				paddingBottom: 10,
				marginBottom: 14,
				marginTop: 32,
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				paddingTop: 24,
			}}
		>
			<MDXComponents
				components={{
					Bacon: <Text style={{ color: "red" }} />,
				}}
				hr={({ style }) => (
					<View style={style}>
						{["", "", ""].map((v, i) => (
							<View
								key={String(i)}
								style={{
									marginRight: i !== 2 ? 20 : 0,
									width: 3,
									height: 3,
									borderRadius: 1.5,
									backgroundColor: "black",
								}}
							/>
						))}
					</View>
				)}
			>
				{children}
			</MDXComponents>
		</MDXStyles>
	);
}
