var questions = {

	/*	Example
	*
	*	uniqueDescriptorWord: {
	*		description: "Text displayed, asking the question"
	*		,breadcrumb: "Text used in the breadcrumb at the top of the page"
	*		,type: "1 of 2 options (service, disbursement) to describe how to categorize the question"
	*		,relation: {
	*				question: "uniqueDescriptorWord of the question of which the answer will show or hide this one"
	*				,answers: [array of possible answers for the question that will show this question]
	*			}
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
		,relation: {
			question: "disposition"
			,answers: [1]
		}
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
		description: "Select the style of casket (coffin) required."
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

	,funeral: {
		description: "Funeral Service?"
		,breadcrumb: "Funeral"
		,type: "service"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}

	,guests: {
		description: "Estimated number of guests attending?"
		,breadcrumb: "Guests"
		,type: "service"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
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

	,day: {
		description: "What day will the funeral be on?"
		,breadcrumb: "Day"
		,type: "service"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "A Sunday or Public Holiday"
				,services: 350
				,disbursements: 750
			}
			,{
				text: "A Saturday"
				,services: 250
				,disbursements: 350
			}
			,{
				text: "A Weekday"
			}
		]
	}

	,lead: {
		description: "Who will lead the funeral service?"
		,breadcrumb: "Lead"
		,type: "disbursement"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Church leader"
				,disbursements: 180
			}
			,{
				text: "Funeral celebrant"
				,disbursements: 350
			}
			,{
				text: "Family member"
			}
		]
	}

	,flowers: {
		description: "Select the flowers to be displayed on the casket"
		,breadcrumb: "Flowers"
		,type: "disbursement"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
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
			,{
				text: "No Flowers Required"
			}
		]
	}

	,newsNumber: {
		description: "Number of newspapers the notice will be sent"
		,breadcrumb: "Newspaper Number"
		,type: "disbursement"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "0"
				,value: 0
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
		,relation: {
			question: 'newsNumber'
			,answers: range(2,11,1)					//range is defined in helpers.js: (start,end,step)
		}
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
		,relation: {
			question: "funeral"
			,answers: [1]
		}
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
		,relation: {
			question: "refreshments"
			,answers: [1]
		}
		,options: [
			{
				text: "Very Plain"
				,value: 5
			}
			,{
				text: "Conservative"
				,value: 10
			}
			,{
				text: "Average"
				,value: 15
			}
			,{
				text: "Above Average"
				,value: 20
			}
			,{
				text: "Superior"
				,value: 25
			}
		]
	}

	,program: {
		description: "Will a funeral program be required?"
		,breadcrumb: "Program"
		,type: "disbursement"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,disbursements: 60
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
		,relation: {
			question: "program"
			,answers: [1]
		}
		,options: [
			{
				text: "Complex with many images"
				,value: 2.2
			}
			,{
				text: "Standard (up to 4 images)"
				,value: 1.6
			}
			,{
				text: "Plain (1 image)"
				,value: 1.2
			}
		]
	}

	,slides: {
		description: "Will a powerpoint slide show be required?"
		,breadcrumb: "Slide Show"
		,type: "disbursement"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,disbursements: 120
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
		,relation: {
			question: "slides"
			,answers: [1]
		}
		,options: [
			{
				text: "20 Photos - 1 song"
				,disbursements: 50
			}
			,{
				text: "50 Photos - 2 song"
				,disbursements: 100
			}
			,{
				text: "2 Slide Shows"
				,disbursements: 200
			}
		]
	}

	,hynms: {
		description: "Will there be hymns sung at the service?"
		,breadcrumb: "Hymns"
		,type: "disbursement"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,disbursements: 100
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
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,disbursements: 100
			}
			,{
				text: "No"
			}
		]
	}
};
