function startCalculator() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementsByTagName(getElems[i])[0];
	};

	genBreadcrumb();

	calculator(1);
}

function calculator(page) {
	if(page){
		genContent(page);
	}else{
		console.log('No page selected');
	}
}

function genBreadcrumb() {
	var breadcrumbs = ['Burial','Funeral','Viewing','Casket'];
	var span = document.createElement('SPAN');

	for (var i = 0; i < breadcrumbs.length; i++) {
		span.innerText = breadcrumbs[i];
		span.setAttribute('question',i+1);
		span.setAttribute('onClick','breadClick(this)');
		elements.breadcrumb.appendChild(span);
		if(breadcrumbs.length-1 != i) {
			elements.breadcrumb.innerHTML += '>';
		}
	}
}

function genContent(page) {
	elements.h1.innerText = questions[page].headText;
	elements.questions.appendChild(elements.h1);

	removeChildren(elements.choices);

	appendButton(elements.choices,questions[page].buttons,page);

	elements.questions.appendChild(elements.choices);
}

function submitPage(ele) {
	answers[ele.name] = ele.value;
	console.log(answers);
	calculator(parseFloat(ele.name)+1);
}

function breadClick(ele) {
	console.log(ele);
	calculator(ele.getAttribute('question'));
}

function reset() {
	console.log('reseting');
}