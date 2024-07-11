import { View } from "@nativetail/core";

import ComponentsSidebar from "components/components-sidebar";
import { Slot } from "expo-router";
import { MediumStyle } from "../docs/_layout";

export default function _layout() {
	return (
		<View className="max-w-7xl w-full gap-8 mx-auto lg:flex-row flex-col px-4 mt-4">
			<ComponentsSidebar />
			<View className="flex-col gap-4 flex-1">
				<MediumStyle>
					<Slot />
				</MediumStyle>
			</View>
		</View>
	);
}
