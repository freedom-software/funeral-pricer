function startCalculator() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementsByTagName(getElems[i])[0];
	};

	genBreadcrumb();

	calculator(1);
}

function calculator(page) {
	switch(parseFloat(page)) {
		case 1: genBurial(); break;
		case 2: genFuneral(); break;
		case 3: genViewing(); break;
		case 4: genCasket(); break;
		case 5: genDay(); break;
		case 6: genGuests(); break;
		default: console.log('No page selected');
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

function genBurial() {
	var headText = 'How will the deceased be disposed of?';
	var buttons = ['Burial','Cremation'];
	var questionNum = 1;
	genScreen(headText,buttons,questionNum);
}

function genFuneral() {
	var headText = 'Will there be a funeral service?';
	var buttons = ['Yes','No'];
	var questionNum = 2;
	genScreen(headText,buttons,questionNum);
}

function genViewing() {
	var headText = 'Will there be a viewing?';
	var buttons = ['Home','Premises','No'];
	var questionNum = 3;
	genScreen(headText,buttons,questionNum);
}

function genCasket() {
	var headText = 'What sort of casket will be used?';
	var buttons = ['Plain','Conservative','Average','Quality','Superior'];
	var questionNum = 4;
	genScreen(headText,buttons,questionNum);
}

function genDay() {
	var headText = 'What sort of day will the funeral be on?';
	var buttons = ['Week','Saterday','Sunday'];
	var questionNum = 5;
	genScreen(headText,buttons,questionNum);
}

function genGuests() {
	var headText = 'Estimated number of guests?';
	var buttons = ['>20','20-50','100-150','150-200','200-300','300-500','400-600','600-1000'];
	var questionNum = 6;
	genScreen(headText,buttons,questionNum);
}

function genScreen(headText,buttons,questionNum) {
	elements.h1.innerText = headText;
	elements.questions.appendChild(elements.h1);

	removeChildren(elements.choices);

	appendButton(elements.choices,buttons,questionNum);

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