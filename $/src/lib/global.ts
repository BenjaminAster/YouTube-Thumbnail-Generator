
import { PWA } from "$lib/pwa/";

import {
	colorTheme,
} from "$lib/utils";

export async function onMountFunction() {
	await PWA.preparePwa();
	colorTheme.setInitial();
}

