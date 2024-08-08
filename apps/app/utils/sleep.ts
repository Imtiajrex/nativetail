export const sleep = async (sleepMs: number) =>
	new Promise((resolve) => {
		setTimeout(() => resolve(true), sleepMs);
	});
