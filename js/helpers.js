function appendButton(ele,text,qu) {
	if(!Array.isArray(text)) {
		text = [text];
	}

	for (var i = 0; i < text.length; i++) {
		var button = document.createElement('BUTTON');
		button.innerText = text[i];
		button.value = text[i];
		button.name = qu;
		button.setAttribute('onClick','submitPage(this);');
		ele.appendChild(button);
	};
}

function removeChildren(parent) {
	console.log(parent);
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function compare(a,b) {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}

//Add colour constants to JS
window.ICE_blue = '<?php echo ICE_blue; ?>';
window.ICE_background = '<?php echo ICE_background; ?>';
window.ICE_border = '<?php echo ICE_border; ?>';