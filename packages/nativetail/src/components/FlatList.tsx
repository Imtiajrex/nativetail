import {
	FlatList as NativeFlatList,
	FlatListProps as NativeFlatListProps,
} from "react-native";
import { useTw } from "../utils/theme";
type ClassNameType = {
	className?: string;
};
type FlatListProps<T> = NativeFlatListProps<T> &
	ClassNameType & {
		contentClass?: string;
	};
export const FlatList = <T extends any>({
	className = "",
	contentClass = "",
	...props
}: FlatListProps<T>) => {
	const tw = useTw();
	return (
		<NativeFlatList
			style={tw`${className}`}
			contentContainerStyle={tw`${contentClass}`}
			{...props}
		/>
	);
};
