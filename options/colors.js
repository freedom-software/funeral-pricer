//----Colour constants-----
window.lightgreen_color = 'hsl( 66.9, 27.1%, 81.2% )';
window.green_color = 'hsl( 53.5, 29.6%, 75.5% )';
window.background_color = 'hsl( 0, 0%, 93% )';

//----Colours used through out the code----
window.colors = {
	highlight: lightgreen_color
	,background1: green_color
	,background2: background_color
	,progress1: 'hsl(0,50%,50%)'
	,progress2: 'hsla(120,100%,35%,1)'
	,progress_highlight: lightgreen_color
	,button_highlight: lightgreen_color
	,question_highlight: lightgreen_color
}

//----Custom Colour coding----
var style = document.createElement('STYLE');

//Text Colour
	//All Text
		style.innerHTML += '*{color: black;}';
	//Headings
		//Title
			style.innerHTML += 'h1{color: black;}';
		//Sub
			style.innerHTML += 'h2{color: black;}';

//Progress Bar
	//Background
		style.innerHTML += '#progress_bar{background-color: '+colors.progress1+';}';
	//Border
		style.innerHTML += '#progress_bar{border: 2px solid black;}';
	//Text
		style.innerHTML += '#progress_bar{color: black;}';

//Buttons Colour
	//Background
		style.innerHTML += 'button{background-color: white;}';
	//Border
		style.innerHTML += 'button{border-color: black;}';
	//Text
		style.innerHTML += 'button{color: black;}';

//Horizontal Rules
	//Colour
	/*style.innerHTML += 'hr{border-color: black;}';*/
	//Effect
	style.innerHTML += 'hr{border-style: inset;}';

//Body Background Colour
	style.innerHTML += 'body{background: linear-gradient(to bottom, '+colors.background1+' 0%,'+colors.background2+' 10%);}';

document.head.appendChild(style);