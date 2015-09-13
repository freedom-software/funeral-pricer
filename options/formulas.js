// type of forumla to use for approximating the funeral value; to add more options, alter esimate function at bottom of file.
// 1: nearest multiples of the scope
// 2: add & minus scope and remove anything smaller than 100
var approxType = 1;
var scope = 0;	// value to build the estimate around; if zero displays full value

var formulas = {

	/*	Example
	*
	*	uniqueFormulaName: {
	*		value1: uniqueQuestion1DescriptorWord
	*		,value2: uniqueQuestion2DescriptorWord
	*		,operator: "combines the 2 values in order with this operator (sourced from helpers.js varOperators variable"
	*	}
	*/

	newspapers: {
		value1: 'newsNumber'
		,value2: 'newsSize'
		,operator: "*"
	}
	,catering: {
		value1: 'guests'
		,value2: 'catering'
		,operator: "*"
	}
	,program: {
		value1: 'guests'
		,value2: 'programType'
		,operator: "*"
	}
}

function estimate(total) {		//formulas to use for the approximation of the funeral value
	if(scope && scope > 0){
		switch(approxType) {
			case 1:		//nearest multiples of the scope
				var min = Math.floor( total / scope ) * scope;
				var max = Math.ceil( total / scope ) * scope;
			break;
			case 2:		//add & minus scope and remove anything smaller than 100
				var min = Math.round( ( total - scope ) / 100 ) * 100;
				var max = Math.round( ( total + scope) / 100 ) * 100;
			break;
			default:
				return "$"+total.toFixed(2);
		}
		return "$"+min+" - $"+max;
	}
	return "$"+total.toFixed(2);
}