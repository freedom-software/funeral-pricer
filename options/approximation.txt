function approx(total) {		//formulas to use for the approximation of the funeral value
	// type of forumla to use for approximating the funeral value; to add more options, alter esimate function at bottom of file.
	// 1: nearest multiples of the scope
	// 2: add & minus scope and remove anything smaller than 100
	var approxType = 1;
	var approxScope = 300;		// value to build the estimate around; if zero displays full value

	if(approxScope && approxScope > 0) {
		switch(approxType) {
			case 1:		//nearest multiples of the scope	-	narrow scope
				var min = Math.floor( total / approxScope ) * approxScope;
				var max = Math.ceil( total / approxScope ) * approxScope;
			break;
			case 2:		//add & minus scope and remove anything smaller than 100	-	wider scope
				var min = Math.round( ( total - approxScope ) / 100 ) * 100;
				var max = Math.round( ( total + approxScope) / 100 ) * 100;
			break;
			default:
				return "$"+total.toFixed(2);
		}
		return "$"+min+" - $"+max;
	}
	return "$"+total.toFixed(2);
}