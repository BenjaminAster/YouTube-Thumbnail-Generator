

// NOT USED ANY MORE

// // #

// import { sleep } from "$lib/utils";

// let isLight: boolean = false;

// const sunIconSwitchDelay: number = 75;

// function setCSSTheme(light: boolean): void {
// 	document.documentElement.style.setProperty(
// 		"--is-light",
// 		Number(light).toString()
// 	);

// 	document.documentElement.style["colorScheme"] = light ? "light" : "dark";
// }

// // 

// export function setInitialTheme(): boolean {
// 	isLight = (localStorage.getItem("isLight") === (true).toString());

// 	setCSSTheme(isLight);

// 	return isLight;
// }

// export async function toggleTheme(light?: boolean): Promise<boolean> {

// 	if (typeof light !== "boolean") {
// 		light = !isLight;
// 	}

// 	setCSSTheme(light);

// 	localStorage.setItem("isLight", light.toString());

// 	isLight = light;

// 	await sleep(sunIconSwitchDelay);

// 	return light;
// }