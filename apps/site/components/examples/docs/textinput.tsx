import { TextInput, View } from "@nativetail/core";
import { useState } from "react";

export default function TextInputExample() {
	const [value, setValue] = useState("");
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 p-4 rounded-xl bg-background flex-1 items-center justify-center in:opacity-0 opacity-100 out:opacity-0"
			animated
		>
			<TextInput
				className="text-sm sm:text-xl w-full text-primary bg-card rounded-xl border border-muted/15 p-2"
				value={value}
				placeholderTextColor={"#ffffff25"}
				onChangeText={setValue}
				placeholder="Hello World"
			/>
			<TextInput
				className="text-sm sm:text-xl w-full text-primary bg-card rounded-xl border border-muted/15 p-2"
				value={value}
				placeholderTextColor={"#ffffff25"}
				onChangeText={setValue}
				placeholder="Enter multiline text here"
				multiline
			/>
		</View>
	);
}

export const TextInputExampleText = `
import { View } from "@nativetail/core";

export default function TextInputExample() {
	return (
		<View
			className="max-w-sm w-full mx-auto h-96 gap-2 p-4 rounded-xl bg-background flex-1 items-center justify-center in:opacity-0 opacity-100 out:opacity-0"
			animated
		>
			<TextInput
				className="text-sm sm:text-xl w-full text-primary bg-card rounded-xl border border-muted/15 p-2"
				value={value}
				placeholderTextColor={"#ffffff25"}
				onChangeText={setValue}
				placeholder="Hello World"
			/>
			<TextInput
				className="text-sm sm:text-xl w-full text-primary bg-card rounded-xl border border-muted/15 p-2"
				value={value}
				placeholderTextColor={"#ffffff25"}
				onChangeText={setValue}
				placeholder="Enter multiline text here"
				multiline
			/>
		</View>
	);
}
`;
