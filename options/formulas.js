window.formulas = {		//Formulas that are calculated based on the value of the questions specified in the formula

	/*	Example
	*
	*	uniqueFormulaName: {
	*		value1: uniqueQuestion1ID
	*		,value2: uniqueQuestion2ID
	*		,operator: 'combines the 2 values in order with this operator (sourced from helpers.js varOperators variable'
	*		,account: 'account to add costs to'
	*		,text: 'Text to accompany the formula when the estimate summary is displayed ([value1] is replaced with the text answer for value1's question).
	*	}
	*/

	newspapers: {
		value1: 'newsNumber'
		,value2: 'newsSize'
		,operator: '*'
		,account: 'disbursements'
		,text: '[value1] Newspapers of [value2] Size'
	}
	,catering: {
		value1: 'guests'
		,value2: 'catering'
		,operator: '*'
		,account: 'disbursements'
		,text: '[value2] Catering for [value1] Guests'
	}
	,program: {
		value1: 'guests'
		,value2: 'programCategory'
		,operator: '*'
		,account: 'disbursements'
		,text: '[value2] Program for [value1] Guests'
	}
}