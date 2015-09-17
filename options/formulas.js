window.formulas = {		//Formulas that are calculated based on the value of the questions specified in the formula

	/*	Example
	*
	*	uniqueFormulaName: {
	*		value1: uniqueQuestion1DescriptorWord
	*		,value2: uniqueQuestion2DescriptorWord
	*		,operator: "combines the 2 values in order with this operator (sourced from helpers.js varOperators variable"
	*		,account: "account to add costs to"
	*	}
	*/

	newspapers: {
		value1: 'newsNumber'
		,value2: 'newsSize'
		,operator: "*"
		,account: "disbursements"
	}
	,catering: {
		value1: 'guests'
		,value2: 'catering'
		,operator: "*"
		,account: "disbursements"
	}
	,program: {
		value1: 'guests'
		,value2: 'programCategory'
		,operator: "*"
		,account: "disbursements"
	}
}