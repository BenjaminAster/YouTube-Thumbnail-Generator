let letters = [
	"A",
	"E",
	"G",
	"I",
	"O",
	"S",
	"Z",
];

let numbers = [
	"4",
	"3",
	"6",
	"1",
	"0",
	"5",
	"2",
]

let outputStr = "";

function loop() {
	let inputStr = sourceInput.value;
	outputStr = "";

	for (let char of inputStr) {
		let index = letters.indexOf(char.toUpperCase());
		outputStr += (index == -1) ? char : numbers[index];
	}
	outputSpan.innerText = outputStr;

	//console.log(outputStr);

	setTimeout(loop, 25);
}


loop();

btnCopy.onclick = function () {
	let el = document.createElement('input');
	el.value = outputStr;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	this.innerText = "Copied!";

	btnCopy.onmouseover = function () {
		this.style.whiteSpace = "nowrap";
		this.innerHTML = "Copy again";
		this.style.width = "16vh";
	};
	btnCopy.onmouseout = function () {
		this.style.whiteSpace = "nowrap";
		this.innerHTML = "Copied!";
		this.style.width = "12vh";
	};
}
