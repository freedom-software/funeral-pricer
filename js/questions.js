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
				,disbursements: 4500
			}
			,{
				text: "Cremation"
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
			}
		]
	}

	,viewing: {
		description: "Will there be a viewing?"
		,breadcrumb: "Viewing"
		,type: "service"
		,options: [
			{
				text: "At your premises"
				,services: 750
			}
			,{
				text: "At home"
				,services: 500
			}
			,{
				text: "No"
				,services: 100
			}
		]
	}

	,casket: {
		description: "What sort of casket will be used?"
		,breadcrumb: "Casket"
		,type: "service"
		,options: [
			{
				text: "Superior"
				,services: 3500
			}
			,{
				text: "Above Average"
				,services: 2500
			}
			,{
				text: "Average"
				,services: 1500
			}
			,{
				text: "Conservative"
				,services: 1000
			}
			,{
				text: "Very Plain"
				,services: 350
			}
		]
	}

	,day: {
		description: "What sort of day will the funeral be on?"
		,breadcrumb: "Day"
		,type: "service"
		,options: [
			{
				text: "Sunday or Public Holiday"
				,services: 350
				,disbursements: 750
			}
			,{
				text: "Saturday"
				,services: 250
				,disbursements: 350
			}
			,{
				text: "Weekday"
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

	,lead: {
		description: "Who will lead the funeral service?"
		,breadcrumb: "Lead"
		,type: "disbursement"
		,options: [
			{
				text: "Church leader"
				,disbursements: 180
			}
			,{
				text: "Funeral celebran"
				,disbursements: 350
			}
			,{
				text: "Family member"
			}
		]
	}

	,flowers: {
		description: "Flowers to be displayed on the casket"
		,breadcrumb: "Flowers"
		,type: "disbursement"
		,options: [
			{
				text: "Superior"
				,disbursements: 250
			}
			,{
				text: "Above Average"
				,disbursements: 200
			}
			,{
				text: "Average"
				,disbursements: 150
			}
			,{
				text: "Conservative"
				,disbursements: 100
			}
		]
	}

	,newsNumber: {
		description: "Number of newspapers the notice will be sent"
		,breadcrumb: "Newspaper Number"
		,type: "disbursement"
		,options: [
			{
				text: "0"
			}
			,{
				text: "1"
				,value: 1
			}
			,{
				text: "2"
				,value: 2
			}
			,{
				text: "3"
				,value: 3
			}
			,{
				text: "4"
				,value: 4
			}
			,{
				text: "5"
				,value: 5
			}
			,{
				text: "6"
				,value: 6
			}
			,{
				text: "7"
				,value: 7
			}
			,{
				text: "8"
				,value: 8
			}
			,{
				text: "9"
				,value: 9
			}
			,{
				text: "10"
				,value: 10
			}
		]
	}

	,newsSize: {
		description: "Newspaper notice size"
		,breadcrumb: "Newspaper Size"
		,type: "disbursement"
		,options: [
			{
				text: "Short notice (~25 words)"
				,value: 25
			}
			,{
				text: "Standard notice (~100 words)"
				,value: 150
			}
			,{
				text: "Extended notice(~330 words)"
				,value: 500
			}
		]
	}

	,refreshments: {
		description: "Will refreshments be available to the guests?"
		,breadcrumb: "Refreshments"
		,type: "disbursement"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}

	,catering: {
		description: "Catering selection?"
		,breadcrumb: "Catering"
		,type: "disbursement"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}

	,program: {
		description: "Will a funeral program be required?"
		,breadcrumb: "Program"
		,type: "disbursement"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}

	,programType: {
		description: "Type of funeral program"
		,breadcrumb: "Program Type"
		,type: "disbursement"
		,options: [
			{
				text: "Complex with many images"
			}
			,{
				text: "Standard (up to 4 images)"
			}
			,{
				text: "Plain (1 image)"
			}
		]
	}

	,slides: {
		description: "Will a powerpoint slide show be required?"
		,breadcrumb: "Slide Show"
		,type: "disbursement"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}

	,slidesType: {
		description: "Type of powerpoint slide show"
		,breadcrumb: "Slide Show Type"
		,type: "disbursement"
		,options: [
			{
				text: "Type 1"
			}
			,{
				text: "Type 2"
			}
		]
	}

	,hynms: {
		description: "Will there be hymns sung at the service?"
		,breadcrumb: "Hymns"
		,type: "disbursement"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}

	,musicians: {
		description: "Will there be bagpipes or bugle players?"
		,breadcrumb: "Musicians"
		,type: "disbursement"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}
};






