

$("#sourceInput")[0].addEventListener("input", (): void => {
	let originalStr: string =
		($("#sourceInput")[0] as HTMLInputElement).value;
	
	console.log(originalStr);
	
	// `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`
});