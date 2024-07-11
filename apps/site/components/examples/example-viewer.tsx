import { View } from "@nativetail/core";
import { Tabs } from "@nativetail/ui";
import { AnimatePresence } from "moti";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ExampleViewer({
	example,
	code,
}: {
	example: React.ReactNode;
	code: string;
}) {
	const [activeTab, setActiveTab] = useState("example");
	return (
		<View className="w-full rounded-xl gap-2">
			<Tabs
				tabs={[
					{
						label: "Example",
						value: "example",
					},
					{
						label: "Code",
						value: "code",
					},
				]}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<View className="min-h-96 w-full rounded-xl items-center justify-center overflow-hidden bg-card p-4">
				<AnimatePresence>
					{activeTab === "example" ? (
						example
					) : (
						<SyntaxHighlighter
							language="javascript"
							style={dark}
							wrapLongLines={true}
						>
							{code}
						</SyntaxHighlighter>
					)}
				</AnimatePresence>
			</View>
		</View>
	);
}
