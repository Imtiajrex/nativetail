import { Text, View, cn } from "@nativetail/core";
import { Button } from "@nativetail/ui";
import DotPattern from "./dot-pattern";

export default function Hero() {
	return (
		<View className="min-h-[150] z-10 max-w-screen-xl mx-auto px-4 py-28">
			<View className=" max-w-4xl mx-auto h-full items-center justify-center gap-8">
				<View className="flex-row  gap-4 flex-wrap items-center justify-center ">
					<Text className="text-5xl text-foreground font-medium text-center lg:text-6xl fade-in-up">
						Supercharge
					</Text>
					<Text className="text-5xl text-foreground font-medium text-center lg:text-6xl fade-in-up">
						React Native with
					</Text>
					<Text className="text-primary lg:text-6xl text-5xl font-medium fade-in-up">
						NativeTail
					</Text>
				</View>
				<Text className="max-w-2xl mx-auto text-muted/75 text-center w-full leading-6 text-xl fade-in-up">
					Tailwind CSS, Smooth Animations, and Instant UI Components
				</Text>
				<View className="bg-primary/15 px-6 py-2 rounded-full border-primary/50 border shadow-sm text-lg text-primary  font-medium fade-in-up">
					npm install nativetail
				</View>
				<Button className="scale-100 active:scale-95 duration-100  max-w-sm w-full rounded-full text-xl h-18 text-black fade-in-up">
					Get Started
				</Button>
			</View>
			<DotPattern
				width={20}
				height={20}
				cx={1}
				cy={1}
				cr={1}
				className={cn(
					"[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
				)}
			/>
		</View>
	);
}
