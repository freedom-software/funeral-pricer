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

var varOperators = {
	'+': function(a,b) { return a + b }
	,'-': function(a,b) { return a - b }
	,'*': function(a,b) { return a * b }
	,'/': function(a,b) { return a / b }
	,'<': function(a,b) { return a < b }
	,'>': function(a,b) { return a > b }
};

var range = function(start, end, step) {
	var range = [];
	var typeofStart = typeof start;
	var typeofEnd = typeof end;

	if (step === 0) {
		throw TypeError("Step cannot be zero.");
	}

	if (typeofStart == "undefined" || typeofEnd == "undefined") {
		throw TypeError("Must pass start and end arguments.");
	} else if (typeofStart != typeofEnd) {
		throw TypeError("Start and end arguments must be of same type.");
	}

	typeof step == "undefined" && (step = 1);

	if (end < start) {
		step = -step;
	}

	if (typeofStart == "number") {

		while (step > 0 ? end >= start : end <= start) {
			range.push(start);
			start += step;
		}

	} else if (typeofStart == "string") {

		if (start.length != 1 || end.length != 1) {
			throw TypeError("Only strings with one character are supported.");
		}

		start = start.charCodeAt(0);
		end = end.charCodeAt(0);

		while (step > 0 ? end >= start : end <= start) {
			range.push(String.fromCharCode(start));
			start += step;
		}

	} else {
		throw TypeError("Only string and number types are supported");
	}

	return range;

}

//Add colour constants to JS
window.ICE_blue = '<?php echo ICE_blue; ?>';
window.ICE_background = '<?php echo ICE_background; ?>';
window.ICE_border = '<?php echo ICE_border; ?>';