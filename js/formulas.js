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