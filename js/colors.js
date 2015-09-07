//Add colour constants to JS
window.FREEDOM_lightgreen = 'hsl( 66.9, 27.1%, 81.2% )';
window.FREEDOM_background = 'hsl( 0, 0%, 93% )';
window.FREEDOM_green = 'hsl( 53.5, 29.6%, 75.5% )';

var style = document.createElement('STYLE');
style.innerHTML += "body{background: linear-gradient(to bottom, "+window.FREEDOM_green+" 0%,"+window.FREEDOM_background+" 10%);}";
style.innerHTML += "header{}";
document.head.appendChild(style);