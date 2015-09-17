//global variables
var reflowTimer;
var estimate = { services : 0, disbursements : 0 };
var elements = {};
var answers = {};
var positions = {};
var files = 0;
var getElems = ['questions','progress_bar','summary','buttons','services','disbursements','title','mainHead'/*,'breadcrumb'*/];

var preferences = ['approximation.js','fixedCosts.js','formulas.js','questions.js','colors.js','text.js'];
for (var i = preferences.length - 1; i >= 0; i--) { XHR('/options/'+preferences[i]);}

function importConfig(file,text) {
	text = unescapeHTML(text);
	try {
		eval(text);
		if(text.search('function') > -1) {
			var script = document.createElement('SCRIPT');
			script.innerHTML = text;
			document.body.appendChild(script);
		}
		files ++;
	} catch(error) {
		switch (error.name) {
			case 'SyntaxError':
				//handle syntax error…
				alert("A " + error.name + " occured: \nThere is a configuration error in the '"+file+"' file.\nLine: "+error.lineNumber+"\nCharacter: "+error.columnNumber+"\nMessage: " + error.message);
			break;
			default:
				//handle all other error types here…
				alert("A " + error.name + "occured on file: "+file+"\nLine: "+error.lineNumber+"\nCharacter: "+error.columnNumber+"\nMessage: "+error.message);
			break;
		}
	}

	if(files >= 6){
		start();
	}
}

//Run on page load, loads elements by ID into the elements object and calls the HTML generating functions
function start() {
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementById(getElems[i]);		//Adding elements by their ID to the elements object to be refered to later
	};

	genText();

	for (var i = 0; i < questions.length; i++) {
		genQuestion(i);												//Generate an element for each question in the questions object
		positions[questions[i].id] = i;
		if(!firstQuestion) {
			var firstQuestion = document.getElementById(i);
		}
	}
	firstQuestion.className = firstQuestion.className.replace(' hiddenQuestion','');
	if(firstQuestion.children[0].selectedIndex > 0) {
		answer(firstQuestion.children[0]);
	}else{
		firstQuestion.children[0].style.boxShadow = '0px -1px 15px 6px '+colors.highlight;
	}
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

function genText() {
	elements.title.innerHTML = text.title;
	elements.mainHead.innerHTML = text.mainHead;
	elements.buttons.children[0].innerHTML = text.calculateButton;
	elements.buttons.children[1].innerHTML = text.resetButton;
}

//Generates the HTML for a question, used on page load.
function genQuestion(quID) {
	var newQuestion = document.createElement('div');
	newQuestion.innerHTML = questions[quID].text;
	newQuestion.id = quID;
	newQuestion.className = ' hiddenQuestion';

	var dropdown = document.createElement('SELECT');
	dropdown.name = quID;
	dropdown.className = 'qu_select';
	dropdown.setAttribute('onChange','answer(this)');

	var option = document.createElement('OPTION');
	option.innerHTML = defaultAnswer;
	option.disabled = true;
	if(!questions[quID].default || questions[quID].default <= 0) option.selected = true;
	option.setAttribute('hidden','');
	dropdown.appendChild(option);

	var options = questions[quID].options
	for (var i = 0; i < options.length; i++) {
		option = document.createElement('OPTION');
		option.innerHTML = options[i].text;
		option.value = (i+1);
		dropdown.appendChild(option);
	};

	if(questions[quID].default && questions[quID].default > 0) {
		dropdown.selectedIndex = questions[quID].default;
	}

	newQuestion.appendChild(dropdown);

	var blurb = document.createElement('TABLE');
	blurb.className = "blurb";
	blurb.innerHTML = "<tr><td></td></tr>";

	if(questions[quID].blurb) {
		blurb.children[0].children[0].children[0].innerHTML += ""+questions[quID].blurb+"";
	}
	newQuestion.appendChild(blurb);

	if(questions[quID].relation) {
		newQuestion.className += ' relationQuestion';
	}else{
		answers[quID] = 0;
	}

	if(questions[quID].category) {
		var category = questions[quID].category;
		if(!document.getElementById(category)) {
			genSpacer(category);
		}
		var spacer = document.getElementById(category);
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

function answerBlurb(show,element) {
	var image = document.getElementById(element.name+'_img');
	var blurb = document.getElementById(element.name+'_blurb');
	var cell = document.getElementById(element.name+'_cell');
	var file = questions[element.name].options[element.value-1].image;
	var text = questions[element.name].options[element.value-1].blurb;

	if(!cell) {
		var cell = document.createElement('TD');
		cell.id = element.name+'_cell';
		element.parentNode.lastChild.firstChild.firstChild.appendChild(cell);
	}

	if(file) {		//If the answer has an image associated with it
		if(show) {		//If intend to show image
			if(!image){		//If no image, create one
				image = document.createElement('IMG');
				image.id = element.name+'_img';
				image.src = "images/"+file;
				image.alt = file;

				if(blurb){
					cell.insertBefore(image,blurb);
				}else{
					cell.appendChild(image);
				}

			}else{		//else change image source
				image.src = "images/"+file;
				image.alt = file;
			}
		}
	}else{
		var removeImage = 1;
	}

	if(image && (removeImage || show == 0)) {		//If the function hasn't returned by now and an image is in the HTML, remove it
		cell.removeChild(image);
	}

	if(text) {		//If the answer has a blurb associated with it
		if(show) {		//If intend to show blurb
			if(!blurb) {		//If no blurb, create one
				blurb = document.createElement('div');
				blurb.id = element.name+'_blurb';
				blurb.innerHTML = text;

				cell.appendChild(blurb);
			}else{
				blurb.innerHTML = text;
			}
		}
	}else{
		var removeBlurb = 1;
	}

	if(blurb && (removeBlurb || show == 0)) {
		cell.removeChild(blurb);
	}

	if(cell.children.length <= 0) {
		cell.parentNode.removeChild(cell);
	}
}

//Called when a question is answered, handels updating the answered questions object and hiding and showing additional questions
function answer(ele) {
	answers[ele.name]=ele.value;									//Add question answer to answers object

	if(ele.value == '') {												//If answered element's value is null (unlikely)
		answers[ele.name] = 0;									//Set answer to zero
		answerBlurb(false,ele);
	}else{
		answerBlurb(true,ele);
	}

	var queries = elements.questions.children;
	for (var i = 0; i <queries.length; i++) {												//For each of the questions
		if(queries[i].nodeName == 'DIV') {
			var relation = questions[queries[i].id].relation;
			if(relation){																	//If the question relates to a question
				var select = document.getElementById(positions[relation.question]).children[0];
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
				queries[i].children[0].style.boxShadow = '0px -1px 15px 6px '+colors.question_highlight;
			}else{
				queries[i].children[0].style.boxShadow = 'none';
			}
		}
	}

	var count = parseFloat(ele.name)+1;

	do{		//Find the next question that isn't hidden by relationship
		var nQu = document.getElementById(count);
		count++;
	} while(nQu && nQu.className.search('relationQuestion') > -1);

	if(nQu) {
		nQu.className = nQu.className.replace(' hiddenQuestion','');	//Show the next question

		if(nQu.children[0].selectedIndex > 0) {		//If the question already has a selection
			answer(nQu.children[0]);					//behave as if it was just selected
			return;
		}
	}

	progress();									//Update progress trackers

	scrollBottom();

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

	elements.progress_bar.style.background = "linear-gradient(to right, "+colors.progress2+" "+percent+"%, "+colors.progress1+" "+percent+"%)";	//change progress bar background color

	if(percent === 100) {
		showHideButton(0,'show');
		elements.buttons.children[0].style.boxShadow = '0px -1px 15px 6px '+colors.button_highlight;
	}else{
		showHideButton(0,'hide');
	}
}

//Generates the elements and calculates the final estimate for the funeral price
function genSummary() {
	disableQuestions();
	elements.progress_bar.style.boxShadow = '0px -1px 15px 6px '+colors.progress_highlight;
	elements.buttons.children[0].style.boxShadow = 'none';

	estimate.services = 0;
	estimate.disbursements = 0;

	console.log('----Accounts Summary----');
	console.log('-Fixed Costs-');
	//Fixed values
	for (var i = fixedCosts.length - 1; i >= 0; i--) {
	 	fixedCosts[i]
	 	console.log(fixedCosts[i].name+' | '+fixedCosts[i].account+': '+fixedCosts[i].value);
		estimate[fixedCosts[i].account] += fixedCosts[i].value;
	 };
	 console.log('-Questions-');
	//Question values
	for(qID in answers) {
		var choice = questions[qID].options[answers[qID]-1];			//Shortcut to the question's answer object
		if(choice.costs) {
			console.log(questions[qID].text+' | '+choice.text+': ');
			for (cost in choice.costs) {
				console.log(' + '+cost+': '+choice.costs[cost]);
				estimate[cost] += choice.costs[cost];						//Add any service costs to service account
			}
		}
	}
	 console.log('-Formulas-');
	//Formulated values
	//Calculate formulas; formulas combine the values of 2 questions to conclude with
	for (formula in formulas) {
		var answer1 = answers[positions[formulas[formula].value1]];						//Number of option chosen for first question
		var answer2 = answers[positions[formulas[formula].value2]];						//Number of option chosen for second question

		if(answer1 && answer2) {												//If both questions answered
			var question1 = questions[positions[formulas[formula].value1]];				//Shortcut to first question in formula
			var question2 = questions[positions[formulas[formula].value2]];				//Shortcut to second question in formula

			var account = formulas[formula].account;										//Account to add cost to

			var value1 = question1.options[answer1-1].value;					//Value of option chosen for first question
			var value2 = question2.options[answer2-1].value;					//Value of option chosen for second question

			var operator = formulas[formula].operator;							//Operator to use for formula

			console.log(formula+':');
			console.log(' + '+account+': '+varOperators[operator](value1,value2));
			estimate[account] += varOperators[operator](value1,value2);		//Calculate result of formula and add to account
		}
	}
	//Create sumation of accounts
	console.log(' ## Summary ## ')
	sum = 0;
	for (account in estimate) {
		console.log(account+': '+estimate[account]);
		if(account != 'sum') sum += estimate[account];		//Combine service and disbursments accounts into total estimate
	}
	console.log('Total: '+sum);

	//Add sumation to progress bar
	elements.progress_bar.innerHTML = text.total+': ';
	var span = document.createElement('SPAN');
	span.id = 'estimate';
	span.innerHTML = approx(sum);		//Add total estiamte to estimate element
	elements.progress_bar.appendChild(span);

	//updateBreadcrumb(0);		//Update the Breadcrumb to move to position 0, which is the summary
}

function showHideButton(position,action) {
	switch(action){
		case 'show': elements.buttons.children[position].style.display = 'block'; break;
		case 'hide': elements.buttons.children[position].style.display = 'none'; break;
	}
}

function disableQuestions() {
	var queries = elements.questions.children;
	for (var i = queries.length - 1; i >= 0; i--) {
		if(queries[i].nodeName == 'DIV') {
			queries[i].children[0].setAttribute('disabled',true);
		}
	};
}

function scrollBottom() {
	var bottom = window.scrollMaxY;
	if(!bottom && document.documentElement.scrollHeight > document.documentElement.clientHeight) {
		bottom = document.documentElement.scrollHeight
	}
	if(bottom > 0){
		window.scrollTo(0,bottom);
		document.body.style.height = document.documentElement.scrollHeight+"px";
	}
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
			&& crumbs[i].className) {		//If the crumb dosn't need to be answered or hasn't been answered and has a class associated with it.
			crumbs[i].className = '';			//Remove colouring
		}
	};
}*/