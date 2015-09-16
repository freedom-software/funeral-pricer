window.formulas = {

	/*	Example
	*
	*	uniqueFormulaName: {
	*		value1: uniqueQuestion1DescriptorWord
	*		,value2: uniqueQuestion2DescriptorWord
	*		,operator: "combines the 2 values in order with this operator (sourced from helpers.js varOperators variable"
	*		,type: "account to add costs to"
	*	}
	*/

	newspapers: {
		value1: 'newsNumber'
		,value2: 'newsSize'
		,operator: "*"
		,type: "disbursements"
	}
	,catering: {
		value1: 'guests'
		,value2: 'catering'
		,operator: "*"
		,type: "disbursements"
	}
	,program: {
		value1: 'guests'
		,value2: 'programType'
		,operator: "*"
		,type: "disbursements"
	}
}