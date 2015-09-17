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

function insertAfter(newNode,referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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

function unescapeHTML(input) {
	var node = document.createElement('textarea');
	node.innerHTML = input;
	return node.value;
}

function XHR(url) {
	if (window.XMLHttpRequest) {
		var xhr=new XMLHttpRequest();
	} else {
		var xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && xhr.status==200) {
			if(xhr.responseText.length != 0){
				importConfig(url.replace('/options/',''),xhr.responseText);
			}
		}
	}
	xhr.open("GET", url);
	xhr.send();
}

function reflowElement(element) {
	var display = element.style.display;

	clearTimeout(reflowTimer);
	element.style.display = 'none';

	reflowTimer = setTimeout(function() {
		element.style.display = display;
		console.log('reflow');
	}, 500);
}

function initReflow(ID) {
	var element = document.getElementById(ID);

	if(window.attachEvent) {
		window.attachEvent('onresize', reflowElement(element) );
	}
	else if(window.addEventListener) {
		window.addEventListener('resize', reflowElement(element), true);
	}
}
