import { useLocalSearchParams } from "expo-router";
import { Text, View } from "@nativetail/core";
import { docRoutes } from "components/docs-sidebar";

export default function Doc() {
	const { doc } = useLocalSearchParams();
	const DocComponent = docRoutes.find(
		(route) => route.path === `/docs/${doc}`
	)?.page;
	return (
		<View>{DocComponent ? <DocComponent /> : <Text>Doc not found</Text>}</View>
	);
}
