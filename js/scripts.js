function startCalculator() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementsByTagName(getElems[i])[0];
	};

	genBreadcrumb();

	genQuestion(1);
}

function genBreadcrumb() {
	for (n in questions) {
		var span = document.createElement('SPAN');
		span.innerText = questions[n].breadcrumb;
		span.setAttribute('question',n);
		span.setAttribute('onClick','genQuestion(this.getAttribute("question")');
		elements.breadcrumb.appendChild(span);

		if(Object.keys(questions).length != n) {
			elements.breadcrumb.innerHTML += '>';
		}
	}
}

function genQuestion(q_id) {
	if(!q_id){
		alert('No question specified.');
	}else{
		var question = document.createElement('QUESTION');
		question.innerText = questions[q_id].headText;

		var dropdown = document.createElement('SELECT');
		dropdown.name = q_id;
		dropdown.setAttribute('onChange','answer(this)');

		var option = document.createElement('OPTION');
		option.innerHTML = 'Please Select..';
		option.disabled = true;
		option.selected = true;
		option.setAttribute('hidden','');
		dropdown.appendChild(option);

		for (choice in questions[q_id].options) {
			option = document.createElement('OPTION');
			option.innerHTML = questions[q_id].options[choice];
			dropdown.appendChild(option);
		}

		question.appendChild(dropdown);

		elements.questions.appendChild(question);
	}
}

function answer(ele) {
	answers[ele.name] = ele.value;
	console.log(answers);
	progress(ele.name);

	if(Object.keys(questions).length != ele.name) {
		genQuestion(parseFloat(ele.name)+1);
	}else{
		genQuestion(0);
	}
}

function progress(answered) {
	var percent = (100 / (Object.keys(questions).length)) * answered;
	elements.footer.style.background = "linear-gradient(to right, hsla(120,100%,35%,1) "+percent+"%, hsla(0,0%,0%,0) "+percent+"%)";
}

function reset() {
	console.log('reseting');
}