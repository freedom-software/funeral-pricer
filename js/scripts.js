//global variables
var reflowTimer;		//Variable containing the timer for reflows
var accounts = {};		//Object containg the various accounts and their amounts.
var totals = {};		//Object containing the account totals
var result = {sum:0,approximation:0};		//Object containing the end figures of the calcualtions
var elements = {};		//Object containing the various element references
var getElems = ['questions','progress_bar','summary','buttons','services','disbursements','title','mainHead','calculateButton','resetButton','emailButton'];		//Collection of elements to be referenced under the elements object
var answers = {};		//Object containg the question's number and the questions answer position in the options array of the question
var positions = {};		//Object containing a library of question IDs and their position in the questions array
var highlight_shadow = '0px -1px 15px 6px';		//Size of the shadow the highlighting of elements makes

//Run on page load, loads elements by ID into the elements object and calls the HTML generating functions
function start() {
	//Load html elements into elements object
	for (var i = getElems.length - 1; i >= 0; i--) {
		elements[getElems[i]] = document.getElementById(getElems[i]);		//Adding elements by their ID to the elements object to be refered to later
	};

	genText();		//Add the general text to the page

	for (var i = 0; i < questions.length; i++) {
		genQuestion(i);		//Generate an element for each question in the questions object
		positions[questions[i].id] = i;		//Add the question and it's position to the position's object
		if(!firstQuestion) {
			var firstQuestion = document.getElementById(i);		//Record the reference of the first question
		}
	}
	firstQuestion.className = firstQuestion.className.replace(' hiddenQuestion','');		//Show the first question
	if(firstQuestion.children[0].selectedIndex > 0) {		//If the first question has a default answer
		answer(firstQuestion.children[0]);		//Treat it as answered
	}else{
		firstQuestion.children[0].style.boxShadow = highlight_shadow+' '+colors.highlight;		//Otherwise highlight it for answering
	}
}

//Creates a spacer at the bottom of the questions element
function genSpacer(name) {
	var spacer = document.createElement('SPAN');
	spacer.id = name;

	spacer.appendChild(document.createElement('HR'));

	var spacerTitle = document.createElement('H2');

	spacerTitle.innerHTML = name;
	spacer.appendChild(spacerTitle);

	elements.questions.appendChild(spacer);
	elements[name] = document.getElementById(name);		//Add the spacer element to the element's object
}

//Adds the general text to the application
function genText() {
	elements.title.innerHTML = window.text.title;		//Fill in the title to the document head
	elements.mainHead.innerHTML = window.text.mainHead;		//Fill in the Main header
	elements.calculateButton.innerHTML = window.text.calculateButton;		//Fill in the calculate button
	elements.resetButton.innerHTML = window.text.resetButton;		//Fill in the reset button
	elements.emailButton.innerHTML = window.text.emailButton;		//Fill in the email button
}

//Generates the HTML for a question based on the ID supplied
function genQuestion(quID) {
	//Containing divider element
	var newQuestion = document.createElement('div');
	newQuestion.innerHTML = questions[quID].text;
	newQuestion.id = quID;
	newQuestion.className = ' hiddenQuestion';		//Hide the question by default

	//Dropdown to answer with
	var dropdown = document.createElement('SELECT');
	dropdown.name = quID;
	dropdown.className = 'qu_select';
	dropdown.setAttribute('onChange','answer(this)');		//Activate the answer function when the dropdown value is changed

	//Add the default value in the dropdown
	var option = document.createElement('OPTION');
	option.innerHTML = defaultAnswer;
	option.disabled = true;
	if(!questions[quID].default || questions[quID].default <= 0) option.selected = true;
	option.setAttribute('hidden','');
	dropdown.appendChild(option);

	//Add each option value from the question to the dropdown
	var options = questions[quID].options
	for (var i = 0; i < options.length; i++) {
		option = document.createElement('OPTION');
		option.innerHTML = options[i].text;
		option.value = (i+1);
		dropdown.appendChild(option);
	};

	//select the default option specified if there is one
	if(questions[quID].default && questions[quID].default > 0) {
		dropdown.selectedIndex = questions[quID].default;
	}

	newQuestion.appendChild(dropdown);		//Add dropdown to contaning divider

	//Add a table to the question that will contain any aditional information
	var blurb = document.createElement('TABLE');
	blurb.className = "blurb";
	blurb.innerHTML = "<tr><td></td></tr>";

	//If the question has a blurb add it to the first cell in the table
	if(questions[quID].blurb) {
		blurb.children[0].children[0].children[0].innerHTML += ""+questions[quID].blurb+"";
	}
	newQuestion.appendChild(blurb);

	//If the question has a relation (relies on the answer of another question to show) add this to the quesiton's classes
	if(questions[quID].relation) {
		newQuestion.className += ' relationQuestion';
	}else{
		answers[quID] = 0;		//Else add the question to the answers object as needs to be answered (0)
	}

	//Add Question to the application
	if(questions[quID].category) {		//If the question has a category
		var category = questions[quID].category;
		if(!elements[category]) {		//If the category does not exist
			genSpacer(category);		//Create it the spacer for the category
		}

		//Add the question before the next spacer
		if(elements[category].nextSibling){		//If there is another element after the category
			var sibling = elements[category].nextSibling;
			while(sibling.nodeName == 'DIV') {	//Find the next element that isn't a question
				if(sibling.nextSibling){
					sibling = sibling.nextSibling;
				}else{
					break;
				}
			}
			if(sibling.nodeName == 'SPAN') {		//If the next element is a category spacer
				elements.questions.insertBefore(newQuestion,sibling);		//Insert it before the the spacer
			}
		}
	}
	if(!document.getElementById(quID)) {		//If the question not on the page
		elements.questions.appendChild(newQuestion);		//Add it to the bottom of the questions
	}
}

//Adds a blurb and image to a questions answer
function answerBlurb(show,element) {
	var image = document.getElementById(element.name+'_img');
	var blurb = document.getElementById(element.name+'_blurb');
	var cell = document.getElementById(element.name+'_cell');
	var file = questions[element.name].options[element.value-1].image;
	var text = questions[element.name].options[element.value-1].blurb;

	if(!cell) {	//If a cell to enter the answer blurb and image in does not exist, create one
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

				//Insert the image before the blurb if one exists
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
	}else{		//Else mark image for removal
		var removeImage = 1;
	}

	if(image && (removeImage || show == 0)) {		//If an image exists and it's either been marked for removal or the question dosn't have a value (show=0), remove the image
		cell.removeChild(image);
	}

	if(text) {		//If the answer has a blurb associated with it
		if(show) {		//If intend to show blurb
			if(!blurb) {		//If no blurb, create one
				blurb = document.createElement('div');
				blurb.id = element.name+'_blurb';
				blurb.innerHTML = text;

				cell.appendChild(blurb);
			}else{		//Else replace existing blurb text with new text
				blurb.innerHTML = text;
			}
		}
	}else{		//Else mark blurb for removal
		var removeBlurb = 1;
	}

	if(blurb && (removeBlurb || show == 0)) {		//If an blurb exists and it's either been marked for removal or the question dosn't have a value (show=0), remove the blurb
		cell.removeChild(blurb);
	}

	if(cell.children.length <= 0) {		//If the cell dosn't have any contents remove it
		cell.parentNode.removeChild(cell);
	}
}

//Called when a question is answered, handels updating the answered questions object and hiding and showing additional questions
function answer(ele) {
	answers[ele.name]=ele.value;		//Add question answer to answers object

	if(ele.value == '') {		//If answered element's value is null (unlikely)
		answers[ele.name] = 0;		//Set answer to zero
		answerBlurb(false,ele);		//Hide answer blurb
	}else{		//Else show answer blurb
		answerBlurb(true,ele);
	}

	//Loop through each question, updating their state based off the recent answer
	var queries = elements.questions.children;
	for (var i = 0; i <queries.length; i++) {		//For each of the questions
		if(queries[i].nodeName == 'DIV') {
			var relation = questions[queries[i].id].relation;
			if(relation){		//If the question relates to a question
				var select = document.getElementById(positions[relation.question]).children[0];
				if(relation.answers.indexOf(parseFloat(select.value)) > -1) {		//If the question it relates to is answered
					queries[i].className = queries[i].className.replace(' relationQuestion','');		//Remove the hidding class the question
					if(!answers[queries[i].id]) {		//If question not in answers object
						answers[queries[i].id] = 0;		//Add the question to the object of questions to answer
					}
				}else{
					queries[i].children[0].selectedIndex = 0;		//Unselect any selected options in the dropdown
					if(queries[i].className.search('relationQuestion') == -1){
						queries[i].className += ' relationQuestion';		//Hide the question
					}
					delete answers[queries[i].id];		//Remove the questions from the object of questions to answer
				}
			}
			if(answers[queries[i].id] == 0) {		//If the quesiton still needs to be answered add a highlight to the dropdown
				queries[i].children[0].style.boxShadow = highlight_shadow+' '+colors.question_highlight;
			}else{
				queries[i].children[0].style.boxShadow = 'none';
			}
		}
	}

	//Find the next question that isn't hidden by relationship
	var count = parseFloat(ele.name)+1;
	do{
		var nQu = document.getElementById(count);
		count++;
	} while(nQu && nQu.className.search('relationQuestion') > -1);

	if(nQu) {
		nQu.className = nQu.className.replace(' hiddenQuestion','');		//Show the next question

		if(nQu.children[0].selectedIndex > 0) {		//If the question already has a selection
			answer(nQu.children[0]);		//Behave as if it was just selected
			return;
		}
	}

	progress();			//Update progress trackers

	scrollBottom();		//Scroll the window to the bottom of the page
}

//Calculates percentage completed, updating the progress_bar and activates final estimate at 100%
function progress() {
	var count = 0;
	for(n in answers) {
		if(answers[n] !== 0) {
			count ++		//Add 1 to count variable if the question value is not 0 (un-answered)
		}
	}

	//Calculate percentage complete as 100 divided by the total number of questions multiplied by the number of questions answered
	var percent = 100 / (Object.keys(questions).length) * count;

	//If the total number of questions to answer equals the count of questions answered, make percent complete 100%.
	if(count == Object.keys(answers).length) percent = 100;

	//Change progress bar background color to represent the percentage completed
	elements.progress_bar.style.background = "linear-gradient(to right, "+colors.progress2+" "+percent+"%, "+colors.progress1+" "+percent+"%)";

	if(percent === 100) {		//If 100% of the questions are answered
		elements.calculateButton.style.display = 'block';		//Show the calculation button
		elements.calculateButton.style.boxShadow = highlight_shadow+' '+colors.button_highlight;		//Highlight the button
	}else{		//Else hide the calculation button
		elements.calculateButton.style.display = 'none';
	}
}

//Generates the elements and calculates the final estimate for the funeral price
function genSummary() {
	disableQuestions();		//Disable all the questions so they can't be changed
	elements.progress_bar.style.boxShadow = highlight_shadow+' '+colors.progress_highlight;		//Highlight the progress bar
	elements.calculateButton.style.boxShadow = 'none';		//Remove the highlight on the calculate button

	accounts = {};		//Reset the accounts
	totals = {};		//Reset the totals
	result = {sum:0,approximation:0};		//Reset the result

	//Add the fixed values to their accounts
	for (var i = fixedCosts.length - 1; i >= 0; i--) {
		if(!accounts[fixedCosts[i].account]){		//Add the account to the accounts object if it dosn't exist
			accounts[fixedCosts[i].account] = {};
		}
		accounts[fixedCosts[i].account][fixedCosts[i].name] = fixedCosts[i].value;
	};
	//Add the question values to their accoutns
	for(qID in answers) {
		var choice = questions[qID].options[answers[qID]-1];
		if(choice.costs) {		//If the question's answer has direct costs associated to it add them
			for (account in choice.costs) {
				if(!accounts[account]){		//Add the account to the accounts object if it dosn't exist
					accounts[account] = {};
				}
				accounts[account][questions[qID].text+' | '+choice.text] = choice.costs[account];
			}
		}
	}
	//Add formulated values to their accounts
	//Calculate formulas; formulas combine the values of 2 questions to conclude with
	for (formula in formulas) {
		var answer1 = answers[positions[formulas[formula].value1]];		//Number of answer for first question
		var answer2 = answers[positions[formulas[formula].value2]];		//Number of answer for second question

		if(answer1 && answer2) {		//If both questions answered
			var question1 = questions[positions[formulas[formula].value1]];		//Shortcut to first question in formula
			var question2 = questions[positions[formulas[formula].value2]];		//Shortcut to second question in formula

			var account = formulas[formula].account;		//Account to add cost to

			var value1 = question1.options[answer1-1].value;		//Value of option chosen for first question
			var value2 = question2.options[answer2-1].value;		//Value of option chosen for second question

			var operator = formulas[formula].operator;			//Operator to use for formula

			if(!accounts[account]) accounts[account] = {}; //Add the account to the accounts object if it dosn't exist

			var text;
			if(formulas[formula]['text']) {
				var text = formulas[formula]['text'];
				text1 = question1.options[answer1-1].text;
				text2 = question2.options[answer2-1].text;
				text = text.replace('[value1]',text1);
				text = text.replace('[value2]',text2);
			}
			else{ text = formula; }

			accounts[account][text] = varOperators[operator](value1,value2);		//Calculate result of formula and add to account
		}
	}
	//Total accounts
	for(account in accounts) {
		var total = 0;
		for (item in accounts[account]) {
			total += accounts[account][item];		//Add each account's item value to the total
		};
		totals[account] = total;		//Add the total to the totals object
	}

	//Create sumation of accounts
	for (account in totals) {
		result.sum += totals[account];		//Combine each account into a result variable
	}
	result.approximation = approx(result.sum);		//Attempt to convert to approximation

	//Add result to progress bar
	elements.progress_bar.innerHTML = window.text.total + ': ';
	var span = document.createElement('SPAN');
	span.id = 'estimate';
	span.innerHTML = result.approximation;		//Add total estiamte to estimate element
	elements.progress_bar.appendChild(span);		//Add estimate to progress bar

	elements.emailButton.style.display = 'block';		//Show the email button
	scrollBottom();		//Scroll the window to the bottom of the page
}

//Function that shows or hides a button in the buttons divider
function showHideButton(position,action) {
	switch(action){
		case 'show': elements.buttons.children[position].style.display = 'block'; break;
		case 'hide': elements.buttons.children[position].style.display = 'none'; break;
	}
}

//Disables all the questions in the questions divider
function disableQuestions() {
	var queries = elements.questions.children;
	for (var i = queries.length - 1; i >= 0; i--) {
		if(queries[i].nodeName == 'DIV') {
			queries[i].children[0].setAttribute('disabled',true);		//Gives each divider (question) the disabled attribute
		}
	};
}

//Scrolls the window to the bottom of the page
function scrollBottom() {
	var bottom = window.scrollMaxY;
	//attempts to use a potentially less proccessor intensive method of finding the bottom of the page
	if(!bottom && document.documentElement.scrollHeight > document.documentElement.clientHeight) {
		bottom = document.documentElement.scrollHeight
	}
	//Otherwise uses the entire hight of the page as the position to scroll to
	if(bottom > 0){
		window.scrollTo(0,bottom);
		document.body.style.height = document.documentElement.scrollHeight+"px";
	}
}


//Builds the email for the browser's email handler and passes it to the sendmail() function
function emailApprox() {
	var body = "";
	for (account in accounts) {
		var subaccount = accounts[account];
		body += "\n"+ capitalizeFirstLetter(account);
		for (query in subaccount){
			body += "\n" + query + ": $" + subaccount[query];
		}
		body += "\nTotal: $" + totals[account] + "\n";
	};
	body += "\n";
	for (property in result) {
		body += "\n" + capitalizeFirstLetter(property)
		if(property == 'sum'){
			body += ": $" + result[property];
		}else{
			body += ": " + result[property];
		}
	};
	sendMail(null,null,text.emailSubject,body);
}

//Redirects the window object to the browser's mail handler
function sendMail(to,cc,subject,body) {
	var link = "mailto:"
		+ ((to) ? to : '')
		+ "?"
		+ ((cc) ? "cc=" + cc : '')
		+ ((subject) ?"&subject=" + escape(subject) :'')
		+ ((body) ? "&body=" + escape(body) : '');
	window.open(link);
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