function startCalculator() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementById(getElems[i]);
	};

	for (n in questions) {
		genQuestion(n);
	}
}

function genBreadcrumb() {
	function insertCrumb(parent,quNum,text) {
		var span = document.createElement('SPAN');
		span.innerHTML= text;
		span.setAttribute('question',quNum);
		parent.appendChild(span);
	}

	if(!elements.breadcrumb.innerHTML) {
		for (n in questions) {
			insertCrumb(elements.breadcrumb,n,questions[n].breadcrumb);

			elements.breadcrumb.innerHTML += '>';
		}
		insertCrumb(elements.breadcrumb,0,'Summary');
	}
	var crumbs = elements.breadcrumb.children;
	for (var i = crumbs.length - 1; i >= 0; i--) {
		if(crumbs[i].getAttribute('question') == q_id) {
			crumbs[i].className = 'activeCrumb';
		}else{
			crumbs[i].className = '';
		}
	};
}

function questionExists(qNum) {
	var query = elements.questions.children;
	for (var i = query.length - 1; i >= 0; i--) {
		if(query[i].id == 'qu_'+qNum) return true;
	};
	return false;
}

function genQuestion(q_id) {
	genBreadcrumb();

	var question = document.createElement('div');
	question.innerHTML = questions[q_id].headText;
	question.id = 'qu_'+q_id;

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
		option.innerHTML = questions[q_id].options[choice][0];	//First value in the array for the question's options
		option.value = choice;
		dropdown.appendChild(option);
	}

	question.appendChild(dropdown);

	elements.questions.appendChild(question);
}

function genSummary() {
	q_id = 0;
	sum = 0;
	genBreadcrumb();

	for(number in answers) {
		sum += questions[number].options[answers[number]][1];	//Second value in the array for each question's options
	}

	elements.estimate.innerHTML = '$'+sum;
}

function answer(ele) {
	answers[ele.name] = ele.value;

	progress();

}

function progress() {
	var percent = (100 / (Object.keys(questions).length)) * Object.keys(answers).length;
	elements.progress_bar.style.background = "linear-gradient(to right, hsla(120,100%,35%,1) "+percent+"%, hsl(0,50%,50%) "+percent+"%)";

	if(percent === 100) {
		genSummary();
	}
}

function reset() {
	console.log('reseting');
}