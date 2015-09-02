//Ran on page load, loads elements by ID into the elements object and calls the HTML generating functions
function startCalculator() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementById(getElems[i]);
	};
	genBreadcrumb();

	for (n in questions) {
		genQuestion(n);
	}
}

//Generates the HTML for the breadcrumb
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
}

//Updates the breadcrumbs, adding or removing active class and scrolling the element along
function updateBreadcrumb(q_id) {
	var crumbs = elements.breadcrumb.children;
	for (var i = crumbs.length - 1; i >= 0; i--) {
		if(crumbs[i].getAttribute('question') == q_id) {												//If question attribute matches name of question just answered
			crumbs[i].className = 'activeCrumb';													//Colour the crumb to indicate it is active
			elements.breadcrumb.scrollLeft = crumbs[i].offsetLeft-(window.innerWidth / 2.3);	//Attempt to scroll the active crumb to the center of the screen
		}else{
			crumbs[i].className = '';																//Remove colouring
		}
	};
}

//Generates the HTML for a question, used on page load.
function genQuestion(unique) {
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
		option.value = (i+1);
		dropdown.appendChild(option);
	};

	question.appendChild(dropdown);

	if(questions[unique].relation) {
		question.setAttribute('relation',questions[unique].relation[0]);
		question.style.display = 'none';
		relations[questions[unique].relation[0]] = questions[unique].relation[1];
	}else{
		answers[unique] = 0;
	}
	elements.questions.appendChild(question);
}

//Called when a question is answered, handels updating the answered questions object and hiding and showing additional questions
function answer(ele) {
	answers[ele.name]=ele.value;									//Add question answer to answers object

	if(ele.value == '') {												//If answered element's value is null (unlikely)
		answers[ele.name] = 0;									//Set answer to zero
	}else{
		updateBreadcrumb(ele.name);							//Change Breadcrumb state
	}

	var queries = elements.questions.children;
	for (var i = 0; i <queries.length; i++) {							//for each of the questions
		if(queries[i].getAttribute('relation') === ele.name) {			//if the question relates to the recently answered question
			if(relations[ele.name] == ele.value) {					//if the value of the recently answered question is what is needed to show the hidden question
				queries[i].style.display = 'block';					//show the question
				answers[queries[i].id] = 0;							//add the question to the object of questions to answer
			}else{
				queries[i].children[0].selectedIndex = 0;			//unselect any selected options in the dropdown
				queries[i].style.display = 'none';					//hide the question
				delete answers[queries[i].id];						//remove the questions from the object of questions to answer
			}
		}
	};

	progress();
}

//calculates percentage completed, updating the progress_bar and activates final estimate at 100%
function progress() {
	var count = 0;
	for(n in answers) {
		if(answers[n] !== 0) {
			count ++
		}
	}
	var percent = 100 / (Object.keys(answers).length) * count;	//calculate percentage complete as 100 divided by the total number of questions to answer multiplied by the number of questions answered
	elements.progress_bar.style.background = "linear-gradient(to right, hsla(120,100%,35%,1) "+percent+"%, hsl(0,50%,50%) "+percent+"%)";

	if(percent === 100) {
		genSummary();
	}
}

//Generates the elements and calculates the final estimate for the funeral price
function genSummary() {
	sum = 0;
	services = 0;
	disbursements = 0;
	professional = 2500;
	deathCertificate = 26.50;

	updateBreadcrumb(0);

	for(unique in answers) {
		var choice = questions[unique].options[answers[unique]-1];
		if(choice.value) {

		}else{
			if(choice.services) {
				services += choice.services;
			}
			if(choice.disbursements) {
				disbursements += choice.disbursements;
			}
		}
		services += professional;
		disbursements += deathCertificate;
	}
	sum += services + disbursements;

	elements.estimate.innerHTML = '$'+sum.toFixed(2);
	elements.estimateWord.className = 'estimateShow';
}

//For reseting the pricer
function reset() {
	console.log('reseting');
}