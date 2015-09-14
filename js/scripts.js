//Ran on page load, loads elements by ID into the elements object and calls the HTML generating functions
function start() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementById(getElems[i]);		//Adding elements by their ID to the elements object to be refered to later
	};

	genText();

	for (n in questions) {
		genQuestion(n);												//Generate a question for each question in the questions object
		if(!firstQuestion) {
			var firstQuestion = document.getElementById(n);
		}
	}
	firstQuestion.className = firstQuestion.className.replace(' hiddenQuestion','');
	firstQuestion.children[0].style.boxShadow = '0px -1px 15px 6px '+window.FREEDOM_lightgreen;

	//genBreadcrumbs();												//Generate the breadcrumb
}

function genSpacer(name) {
	var spacer = document.createElement('SPAN');
	spacer.id = name;

	spacer.appendChild(document.createElement('HR'));

	var spacerTitle = document.createElement('H2');

	spacerTitle.innerHTML = name;
	spacer.appendChild(spacerTitle);

	elements.questions.appendChild(spacer);
	elements[name] = document.getElementById(name);
}
/*
function genSpacers() {

	var spacers = [];
	for (n in questions){
		if(spacers.indexOf(questions[n].type) == -1) {
			spacers.push(questions[n].type);
		}
	}
	for (var i = 0; i < spacers.length; i++) {
		genSpacer(spacers[i]);
	};
}*/

function genText() {
	elements.title.innerHTML = text.title;
	elements.buttons.children[0].innerHTML = text.calculateButton;
	elements.buttons.children[1].innerHTML = text.resetButton;
}

//Generates the HTML for a question, used on page load.
function genQuestion(unique) {
	var newQuestion = document.createElement('div');
	newQuestion.innerHTML = questions[unique].description;
	newQuestion.id = unique;
	newQuestion.className = ' hiddenQuestion';

	var dropdown = document.createElement('SELECT');
	dropdown.name = unique;
	dropdown.className = 'qu_select';
	if(questions[unique].default) dropdown.selectedIndex = questions[unique].default;
	dropdown.setAttribute('onChange','answer(this)');

	var option = document.createElement('OPTION');
	option.innerHTML = defaultAnswer;
	option.disabled = true;
	if(!questions[unique].default) option.selected = true;
	option.setAttribute('hidden','');
	dropdown.appendChild(option);

	var options = questions[unique].options
	for (var i = 0; i < options.length; i++) {
		option = document.createElement('OPTION');
		option.innerHTML = options[i].text;
		option.value = (i+1);
		dropdown.appendChild(option);
	};

	newQuestion.appendChild(dropdown);

	if(questions[unique].blurb) {
		newQuestion.innerHTML += "<div class='blurb'>"+questions[unique].blurb+"</div>";
	}

	if(questions[unique].relation) {
		newQuestion.className += ' relationQuestion';
	}else{
		answers[unique] = 0;
	}

	if(questions[unique].type) {
		var type = questions[unique].type;
		if(!document.getElementById(type)) {
			genSpacer(type);
		}
		var spacer = document.getElementById(type);
		if(spacer.nextSibling){
			var sibling = spacer.nextSibling;
			while(sibling.nodeName == 'DIV') {
				if(sibling.nextSibling){
					sibling = sibling.nextSibling;
				}else{
					break;
				}
			}
			if(sibling.nodeName == 'SPAN') {
				elements.questions.insertBefore(newQuestion,sibling);
			}else{
				elements.questions.appendChild(newQuestion);
			}
		}else{
			elements.questions.appendChild(newQuestion);
		}
	}
}

//Called when a question is answered, handels updating the answered questions object and hiding and showing additional questions
function answer(ele) {
	answers[ele.name]=ele.value;									//Add question answer to answers object

	if(ele.value == '') {												//If answered element's value is null (unlikely)
		answers[ele.name] = 0;									//Set answer to zero
	}

	var queries = elements.questions.children;
	for (var i = 0; i <queries.length; i++) {												//For each of the questions
		if(queries[i].nodeName == 'DIV') {
			var relation = questions[queries[i].id].relation;
			if(relation){																	//If the question relates to a question
				var select = document.getElementById(relation.question).children[0];
				if(relation.answers.indexOf(parseFloat(select.value)) > -1) {			//If the question it relates to is answered
					queries[i].className = queries[i].className.replace(' relationQuestion','');						//Hide the question
					if(!answers[queries[i].id]) {											//If question not in answers object
						answers[queries[i].id] = 0;										//Add the question to the object of questions to answer
					}
				}else{
					queries[i].children[0].selectedIndex = 0;							//Unselect any selected options in the dropdown
					if(queries[i].className.search('relationQuestion') == -1){
						queries[i].className += ' relationQuestion';					//Hide the question
					}
					delete answers[queries[i].id];										//Remove the questions from the object of questions to answer
				}
			}
			if(answers[queries[i].id] == 0) {
				queries[i].children[0].style.boxShadow = '0px -1px 15px 6px '+window.FREEDOM_lightgreen;
			}else{
				queries[i].children[0].style.boxShadow = 'none';
			}
		}
	}



	progress();									//Update progress trackers

	try{	//Look for next question that isn't hidden becuase of a relationship
		var nQu = queries[ele.name].nextSibling;
		while(nQu.nodeName != 'DIV' || nQu.className.search('relationQuestion') > -1) {
			nQu = nQu.nextSibling;
		}
		nQu.className = nQu.className.replace(' hiddenQuestion','');	//Show the next question
	}catch(err){
		null;
	}

	//updateBreadcrumb(ele.name);							//Change Breadcrumb state of the answered question
}

//calculates percentage completed, updating the progress_bar and activates final estimate at 100%
function progress() {
	var count = 0;
	for(n in answers) {
		if(answers[n] !== 0) {
			count ++							//Add 1 to count variable if the question value is not 0 (un-answered)
		}
	}

	var percent = 100 / (Object.keys(questions).length) * count;	//calculate percentage complete as 100 divided by the total number of questions multiplied by the number of questions answered
	if(count == Object.keys(answers).length) percent = 100;	//If the total number of questions to answer equals the count of questions answered, make percent complete 100%.

	elements.progress_bar.style.background = "linear-gradient(to right, hsla(120,100%,35%,1) "+percent+"%, hsl(0,50%,50%) "+percent+"%)";	//change progress bar background color

	if(percent === 100) {
		showHideButton(0,'show');
		elements.buttons.children[0].style.boxShadow = '0px -1px 15px 6px '+window.FREEDOM_lightgreen;
	}else{
		showHideButton(0,'hide');
	}
}

//Generates the elements and calculates the final estimate for the funeral price
function genSummary() {
	disableQuestions();
	elements.progress_bar.style.boxShadow = '0px -1px 15px 6px '+window.FREEDOM_lightgreen;
	elements.buttons.children[0].style.boxShadow = 'none';

	//Fixed values
	for (cost in fixedCosts.servies) {	//Add fixed services to service account
		estimate.services += fixedCosts.servies[cost];
	}
	for (cost in fixedCosts.disbursements) {	//Add fixed disbursements to service account
		estimate.disbursements += fixedCosts.disbursements[cost];
	}

	//Question values
	for(unique in answers) {
		var choice = questions[unique].options[answers[unique]-1];			//Shortcut to the question's answer object
		if(choice.services) {
			estimate.services += choice.services;								//Add any service costs to service account
		}
		if(choice.disbursements) {
			estimate.disbursements += choice.disbursements;					//Add any disbursement costs to disbursement account
		}
	}

	//Formulated values
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

	estimate.sum = estimate.services + estimate.disbursements;			//Combine service and disbursments accounts into total estimate

	elements.progress_bar.innerHTML = text.total+': ';
	var span = document.createElement('SPAN');
	span.id = 'estimate';
	span.innerHTML = approx(estimate.sum);		//Add total estiamte to estimate element
	elements.progress_bar.appendChild(span);

	//updateBreadcrumb(0);		//Update the Breadcrumb to move to position 0, which is the summary
}

//Generates the HTML for the breadcrumb
/*function genBreadcrumbs() {
	function createCrumb(quNum,text) {		//Creats individual crumbs into the parent breadcrumb
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