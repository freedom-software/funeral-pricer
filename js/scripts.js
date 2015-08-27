function startCalculator() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementsByTagName(getElems[i])[0];
	};

	genBreadcrumb();

	genContent(1);
}

function genBreadcrumb() {
	for (n in questions) {
		var span = document.createElement('SPAN');
		span.innerText = questions[n].breadcrumb;
		span.setAttribute('question',n);
		span.setAttribute('onClick','breadClick(this)');
		elements.breadcrumb.appendChild(span);

		if(Object.keys(questions).length != n) {
			elements.breadcrumb.innerHTML += '>';
		}
	}
}

function progress(percent) {

}

function genContent(page) {
	if(!page){
		alert('No question specified.');
	}else{
		elements.h1.innerText = questions[page].headText;
		elements.questions.appendChild(elements.h1);

		removeChildren(elements.choices);

		appendButton(elements.choices,page);

		elements.questions.appendChild(elements.choices);
	}
}

function submitPage(ele) {
	answers[ele.name] = ele.value;
	console.log(answers);
	genContent(parseFloat(ele.name)+1);
}

function breadClick(ele) {
	genContent(ele.getAttribute('question'));
}

function reset() {
	console.log('reseting');
}