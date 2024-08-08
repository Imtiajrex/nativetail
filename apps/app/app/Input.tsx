import { View } from "@nativetail/core";
import { FloatingInput, Input, PinInput } from "@nativetail/ui";
import { useState } from "react";

export default function Index() {
	return (
		<View className="container">
			<FloatingInputContent />
			<FloatingPassword />
			<InputContent />
		</View>
	);
}

const FloatingInputContent = () => {
	const [name, setName] = useState("");
	return (
		<FloatingInput
			label="Name"
			value={name}
			onChangeText={setName}
			containerClassName="h-13"
			activeLabelClassName="-translate-y-12 "
			labelClassName="text-sm"
			className="text-sm pt-5"
		/>
	);
};
const PinContent = () => {
	const [pin, setPin] = useState("");
	return (
		<PinInput
			value={pin}
			onChangeText={setPin}
			length={4}
			containerClassName="w-full max-w-sm mx-auto"
			pinBoxClassName="h-14 text-xl"
			secureTextEntry
		/>
	);
};
const FloatingPassword = () => {
	const [secret, setSecret] = useState("");
	return (
		<FloatingInput
			label="Secret"
			value={secret}
			onChangeText={setSecret}
			isSecretToggleable
		/>
	);
};
const InputContent = () => {
	const [password, setPass] = useState("");
	return (
		<Input
			label="Password"
			value={password}
			onChangeText={setPass}
			placeholder="Enter Password"
			isSecretToggleable
		/>
	);
};
