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

function progress(answered) {
	var percent = (100 / (Object.keys(questions).length)) * answered;
	elements.footer.style.background = "linear-gradient(to right, hsla(120,100%,35%,1) "+percent+"%, hsla(0,0%,0%,0) "+percent+"%)";
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
	progress(ele.name);

	if(Object.keys(questions).length != ele.name) {
		genContent(parseFloat(ele.name)+1);
	}else{
		genContent(0);
	}
}

function breadClick(ele) {
	genContent(ele.getAttribute('question'));
}

function reset() {
	console.log('reseting');
}