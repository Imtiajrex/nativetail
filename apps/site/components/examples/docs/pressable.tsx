import { Pressable, Text, View } from "@nativetail/core";

export default function PressableExample() {
	return (
		<Pressable className=" w-44 mx-auto h-44 bg-white group rounded-xl items-center justify-center opacity-100 active:opacity-75">
			<View className="w-7 h-7 rounded-full bg-success group-hover:scale-150 group-active:scale-75 scale-100" />
			<View className="w-7 h-7 rounded-full bg-danger group-hover:opacity-50 mt-4 group-active:opacity-100 opacity-10" />
			<Text className="text-xl mt-4 text-black font-medium group-hover:text-green-500 group-active:text-blue-500">
				Hello World
			</Text>
		</Pressable>
	);
}

export const PressableExampleText = `
import { View } from "@nativetail/core";

export default function PressableExample() {
	return (
		<Pressable className=" w-44 mx-auto h-44 bg-white group rounded-xl items-center justify-center opacity-100 active:opacity-75">
			<View className="w-7 h-7 rounded-full bg-success group-hover:scale-150 group-active:scale-75 scale-100" />
			<View className="w-7 h-7 rounded-full bg-danger group-hover:scale-125 mt-4 group-active:scale-50 scale-100" />
			<Text className="text-xl mt-4 text-black font-medium group-hover:text-green-500 group-active:text-blue-500">
				Hello World
			</Text>
		</Pressable>
	);
}
`;
