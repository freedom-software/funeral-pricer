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
		if(query[i].id == qNum) return true;
	};
	return false;
}

function genQuestion(unique) {
	genBreadcrumb();

	var question = document.createElement('div');
	question.innerHTML = questions[unique].description;
	question.id = unique;

	var dropdown = document.createElement('SELECT');
	dropdown.name = unique;
	dropdown.className = 'qu_select';
	dropdown.setAttribute('onChange','answer(this)');

	var option = document.createElement('OPTION');
	option.innerHTML = 'Please Select..';
	option.disabled = true;
	option.selected = true;
	option.setAttribute('hidden','');
	dropdown.appendChild(option);

	var options = questions[unique].options
	for (var i = 0; i < options.length; i++) {
		option = document.createElement('OPTION');
		option.innerHTML = options[i].text;
		option.value = unique+i;
		dropdown.appendChild(option);
	};

	question.appendChild(dropdown);

	if(questions[unique].relation) {
		question.setAttribute('relation',questions[unique].relation[0]);
		question.style.display = 'none';
		relations[questions[unique].relation[0]] = questions[unique].relation[1];
	}else{
		countAnswer[unique] = 0;
	}
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
	answers[ele.name]=ele.value;

	if(ele.value != '') {
		countAnswer[ele.name] = 1;
	}else{
		countAnswer[ele.name] = 0;
	}
	var queries = elements.questions.children;

	//console.log(relations[ele.name]);
	for (var i = 0; i <queries.length; i++) {
		if(queries[i].getAttribute('relation') === ele.name) {
			if(ele.name+(relations[ele.name]-1) == ele.value) {
				queries[i].style.display = 'block';
				countAnswer[queries[i].id] = 0;
			}else{
				queries[i].children[0].selectedIndex = 0;
				queries[i].style.display = 'none';
				delete countAnswer[queries[i].id];
			}
		}
	};

	progress();
}

function progress() {
	var count = 0;
	for(n in countAnswer) {
		if(countAnswer[n] === 1) {
			count ++
		}
	}
	var percent = (100 / (Object.keys(countAnswer).length)) * count;
	elements.progress_bar.style.background = "linear-gradient(to right, hsla(120,100%,35%,1) "+percent+"%, hsl(0,50%,50%) "+percent+"%)";

	if(percent === 100) {
		genSummary();
	}
}

function reset() {
	console.log('reseting');
}