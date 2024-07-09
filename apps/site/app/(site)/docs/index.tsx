import { useTw, View as TailView, Text } from "nativetail";
import Intro from "../../../components/docs/intro.mdx";

import { MDXStyles, MDXComponents } from "@bacons/mdx";
import { View } from "@bacons/react-views";
import { Platform } from "react-native";

export default function index() {
	return (
		<TailView className="container">
			<GitHubStyle>
				<MediumStyle>
					<Intro />
				</MediumStyle>
			</GitHubStyle>
		</TailView>
	);
}

function GitHubStyle({ children }: { children: React.ReactNode }) {
	return (
		<MDXStyles
			th={{
				paddingVertical: 6,
				paddingHorizontal: 13,
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: "#30363d",
			}}
		>
			{children}
		</MDXStyles>
	);
}

function MediumStyle({ children }: { children: React.ReactNode }) {
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
					default: "16",
				}),
				marginBottom: Platform.select({
					web: "1.25em",
					default: 16,
				}),
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
					Bacon: (props) => <Text {...props} style={{ color: "blue" }} />,
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
