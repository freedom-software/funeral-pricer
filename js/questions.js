var questions = {

	/*	Help comment
	*
	*	uniqueDescriptorWord: {
	*		description: "Text displayed, asking the question"
	*		,breadcrumb: "Text used in the breadcrumb at the top of the page"
	*		,type: "1 of 2 options (service, disbursement) to describe how to categorize the question"
	*		,options: [  //Items to enter into the dropdown list to answer the question with
	*			{
	*				text: "Text displayed in the dropbox"
	*				,services: amount to add for services
	*				,disbursments: amount to add for disbursments
	*			}
	*			,{
	*				text: "Text displayed in the dropbox"
	*				,value: amount to add for other calculations in formulas
	*			}
	*		]
	*	}
	*/

	disposition: {
		description: "Burial or Cremation?"
		,breadcrumb: "Burial/Cremation"
		,type: "service"
		,options: [
			{
				text: "Burial"
				,services: 0
				,disbursements: 4500
			}
			,{
				text: "Cremation"
				,services: 0
				,disbursements: 575
			}
		]
	}

	,family: {
		description: "Family Attending Burial?"
		,breadcrumb: "Family"
		,type: "service"
		,relation: ["disposition",1]
		,options: [
			{
				text: "Yes"
				,services: 200
				,disbursements: 150
			}
			,{
				text: "No"
				,services: 0
				,disbursements: 575
			}
		]
	}

	,viewing: {
		description: "Will there be a viewing?"
		,breadcrumb: "Viewing"
		,type: "service"
		,options: [
			{
				text: "No"
				,services: 100
				,disbursements: 0
			}
			,{
				text: "At home"
				,services: 500
				,disbursements: 0
			}
			,{
				text: "At your premises"
				,services: 750
				,disbursements: 0
			}
		]
	}

	,casket: {
		description: "What sort of casket will be used?"
		,breadcrumb: "Casket"
		,type: "service"
		,options: [
			{
				text: "Very Plain"
				,services: 350
				,disbursements: 0
			}
			,{
				text: "Conservative"
				,services: 1000
				,disbursements: 0
			}
			,{
				text: "Average"
				,services: 1500
				,disbursements: 0
			}
			,{
				text: "Above Average"
				,services: 2500
				,disbursements: 0
			}
			,{
				text: "Superior"
				,services: 3500
				,disbursements: 0
			}
		]
	}

	,day: {
		description: "What sort of day will the funeral be on?"
		,breadcrumb: "Day"
		,type: "service"
		,options: [
			{
				text: "Weekday"
				,value: 0
			}
			,{
				text: "Saturday"
				,value: 250
			}
			,{
				text: "Sunday or Public Holiday"
				,value: 350
			}
		]
	}

	,guests: {
		description: "Estimated number of guests?"
		,breadcrumb: "Guests"
		,type: "service"
		,options: [
			{
				text: "Less than 20"
				,value: 15
			}
			,{
				text: "20 - 50"
				,value: 35
			}
			,{
				text: "50 - 100"
				,value: 75
			}
			,{
				text: "100 - 150"
				,value: 125
			}
			,{
				text: "150 - 200"
				,value: 175
			}
			,{
				text: "200 - 300"
				,value: 250
			}
			,{
				text: " 300 - 500"
				,value: 400
			}
			,{
				text: " 400 - 600"
				,value: 500
			}
			,{
				text: " 600 - 1000"
				,value: 800
			}
			,{
				text: "more than 1000"
				,value: 1000
			}
		]
	}
};






