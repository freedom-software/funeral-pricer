function appendButton(ele,qu) {
	var choices = questions[qu].buttons;
	for (property in choices) {
		var button = document.createElement('BUTTON');
		button.innerText = choices[property];
		button.value = property;
		button.name = qu;
		button.setAttribute('onClick','submitPage(this);');
		ele.appendChild(button);
	}
}

function removeChildren(parent) {
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