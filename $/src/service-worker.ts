// import { build, files, timestamp } from '$service-worker';

// @ts-ignore
importScripts("/workbox-sw.js");

const cacheName = "workbox-cache";

workbox.setConfig({
	debug: false,
});

workbox.routing.registerRoute(
	new RegExp(".*"),
	new workbox.strategies.CacheFirst({
		cacheName,
	}),
);

self.addEventListener("install", async (evt: Event) => {
});

self.addEventListener("activate", async (evt: Event) => {
});

