//Ran on page load, loads elements by ID into the elements object and calls the HTML generating functions
function startCalculator() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementById(getElems[i]);		//Adding elements by their ID to the elements object to be refered to later
	};

	for (n in questions) {
		genQuestion(n);												//Generate a question for each question in the questions object
	}

	//genBreadcrumbs();												//Generate the breadcrumb
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
		question.style.display = 'none';
	}else{
		answers[unique] = 0;
	}
	switch(questions[unique].type) {
		case 'service': elements.questions.insertBefore(question,elements.disbursements); break;
		default: elements.questions.appendChild(question);
	}

}

//Called when a question is answered, handels updating the answered questions object and hiding and showing additional questions
function answer(ele) {
	answers[ele.name]=ele.value;									//Add question answer to answers object

	if(ele.value == '') {												//If answered element's value is null (unlikely)
		answers[ele.name] = 0;									//Set answer to zero
	}

	var queries = elements.questions.children;
	for (var i = 0; i <queries.length; i++) {											//For each of the questions
		if(queries[i].nodeName == 'DIV') {
			var relation = questions[queries[i].id].relation;
			if(relation){																	//If the question relates to a question
				var select = document.getElementById(relation.question).children[0];
				if(relation.answers.indexOf(parseFloat(select.value)) > -1) {			//If the question it relates to is answered correctly
					queries[i].style.display = 'block';									//Show the question
					if(!answers[queries[i].id]) {											//If question not in answers object
						answers[queries[i].id] = 0;										//Add the question to the object of questions to answer
					}
				}else{
					queries[i].children[0].selectedIndex = 0;							//Unselect any selected options in the dropdown
					queries[i].style.display = 'none';									//Hide the question
					delete answers[queries[i].id];										//Remove the questions from the object of questions to answer
				}
			}
		}
	}

	//updateBreadcrumb(ele.name);							//Change Breadcrumb state of the answered question

	progress();									//Update progress trackers
}

//calculates percentage completed, updating the progress_bar and activates final estimate at 100%
function progress() {
	var count = 0;
	for(n in answers) {
		if(answers[n] !== 0) {
			count ++							//Add 1 to count variable if the question value is not 0 (un-answered)
		}
	}

	var percent = 100 / (Object.keys(answers).length) * count;	//calculate percentage complete as 100 divided by the total number of questions to answer multiplied by the number of questions answered

	elements.progress_bar.style.background = "linear-gradient(to right, hsla(120,100%,35%,1) "+percent+"%, hsl(0,50%,50%) "+percent+"%)";	//change progress bar background color

	if(percent === 100) {
		showButton(0);
	}
}

function showButton(position) {
	elements.buttons.children[position].style.display = 'inline-block';
}
function disableQuestions() {
	var queries = elements.questions.children;
	for (var i = queries.length - 1; i >= 0; i--) {
		if(queries[i].nodeName == 'DIV') {
			queries[i].children[0].setAttribute('disabled',true);
		}
	};
}

//Generates the elements and calculates the final estimate for the funeral price
function genSummary() {
	disableQuestions();

	professional = 2500;									//Set professional fee
	deathCertificate = 26.50;								//Set death certificate cost
	estimate.services = professional;						//Add professional fee to service account
	estimate.disbursements = deathCertificate;				//Add death certificate cost to disbursement account

	for(unique in answers) {
		var choice = questions[unique].options[answers[unique]-1];			//Shortcut to the question's answer object
		if(choice.services) {
			estimate.services += choice.services;								//Add any service costs to service account
		}
		if(choice.disbursements) {
			estimate.disbursements += choice.disbursements;					//Add any disbursement costs to disbursement account
		}
	}
	//Calculate formulas; formulas combine the values of 2 questions to conclude with
	for (formula in formulas) {
		var answer1 = answers[formulas[formula].value1];						//Number of option chosen for first question
		var answer2 = answers[formulas[formula].value2];						//Number of option chosen for second question
		if(answer1 && answer2) {												//If both questions answered
			var question1 = questions[formulas[formula].value1];				//Shortcut to first question in formula
			var question2 = questions[formulas[formula].value2];				//Shortcut to second question in formula
			var account = question1.type;										//Account to add cost to
			var value1 = question1.options[answer1-1].value;					//Value of option chosen for first question
			var value2 = question2.options[answer2-1].value;					//Value of option chosen for second question
			var operator = formulas[formula].operator;							//Operator to use for formula

			estimate[account] += varOperators[operator](value1,value2);		//Calculate result of formula and add to account
		}
	}

	estimate.sum = estimate.services + estimate.disbursements;				//Combine service and disbursments accounts into total estimate

	elements.progress_bar.innerHTML = 'Estimate: ';
	var span = document.createElement('SPAN');
	span.id = 'estimate';
	span.innerHTML = '$'+estimate.sum.toFixed(2);							//Add total estiamte to estimate element
	elements.progress_bar.appendChild(span);

	//updateBreadcrumb(0);									//Update the Breadcrumb to move to position 0, which is the summary
}

//Generates the HTML for the breadcrumb
/*function genBreadcrumbs() {
	function createCrumb(quNum,text) {							//Creats individual crumbs into the parent breadcrumb
		var span = document.createElement('SPAN');
		span.innerHTML= text;
		span.setAttribute('question',quNum);
		return span;
	}

	if(!elements.breadcrumb.innerHTML) {
		for (n in questions) {
			elements.breadcrumb.appendChild(createCrumb(n,questions[n].breadcrumb));

			elements.breadcrumb.innerHTML += '>';
		}
		elements.breadcrumb.appendChild(createCrumb(0,'Summary'));
	}
}*/

//Updates the breadcrumbs, adding or removing active class and scrolling the element along
/*function updateBreadcrumb(q_id) {
	var crumbs = elements.breadcrumb.children;
	for (var i = crumbs.length - 1; i >= 0; i--) {
		if(crumbs[i].getAttribute('question') == q_id) {												//If question attribute matches name of question just answered
			crumbs[i].className = 'activeCrumb';													//Colour the crumb to indicate it is active
			elements.breadcrumb.scrollLeft = crumbs[i].offsetLeft-(window.innerWidth / 2.3);	//Attempt to scroll the active crumb to the center of the screen
		}else if((!(crumbs[i].getAttribute('question') in answers) || answers[crumbs[i].getAttribute('question')] === 0)
			&& crumbs[i].className) {				//If the crumb dosn't need to be answered or hasn't been answered and has a class associated with it.
			crumbs[i].className = '';					//Remove colouring
		}
	};
}*/