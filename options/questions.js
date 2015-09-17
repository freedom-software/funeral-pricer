window.defaultAnswer = "Please Select..";

window.questions = [

	/*	Example
	*
	*	{
	*		id: "uniqueDescriptorWord"
	*		,text: "Text displayed, asking the question"
	*		,breadcrumb: "Text used in the breadcrumb at the top of the page"
	*		,category: "1 of 2 options (service, disbursement) to describe how to categorize the question"
	*		,blurb: "Text displayed under the question"
	*		,relation: {
	*				question: "uniqueDescriptorWord of the question of which the answer will show or hide this one"
	*				,answers: [array of possible answers for the question that will show this question]
	*			}
	*		,options: [  //Items to enter into the dropdown list to answer the question with
	*			{
	*				text: "Text displayed in the dropbox"
	*				,accountName: amount to add for question for 1 account
	*				,accountName: amount to add for question for another account
	*				,image: "file name and extention in the images folder"
	*			}
	*			,{
	*				text: "Text displayed in the dropbox"
	*				,value: amount to add for other calculations in formulas
	*				,blurb: "Text to display when answer chosen"
	*			}
	*		]
	*	}
	*/

	{
		id: "disposition"
		,text: "Burial or Cremation?"
		,category: "Services"
		,blurb: "Question BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion BlurbQuestion Blurb"
		,options: [
			{
				text: "Burial"
				,costs: {disbursements: 4500}
				,blurb: "answer blurbanswer blurbanswer blurbanswer blurbanswer blurbanswer blurbanswer blurbanswer blurbanswer blurbanswer blurb"
				,image: "Coffin.png"
			}
			,{
				text: "Cremation"
				,costs: {disbursements: 575}
			}
		]
	}

	,{
		id: "family"
		,text: "Family Attending Burial?"
		,category: "Services"
		,relation: {
			question: "disposition"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,costs: {
					services: 200
					,disbursements: 150
				}
			}
			,{
				text: "No"
			}
		]
	}

	,{
		id: 'viewing'
		,text: "Will there be a viewing?"
		,category: "Services"
		,options: [
			{
				text: "At your premises"
				,costs: {services: 750}
			}
			,{
				text: "At home"
				,costs: {services: 500}
			}
			,{
				text: "No"
				,costs: {services: 100}
			}
		]
	}

	,{
		id: "casket"
		,text: "Select the style of casket (coffin) required."
		,category: "Services"
		,options: [
			{
				text: "Superior"
				,costs: {services: 3500}
			}
			,{
				text: "Above Average"
				,costs: {services: 2500}
			}
			,{
				text: "Average"
				,costs: {services: 1500}
			}
			,{
				text: "Conservative"
				,costs: {services: 1000}
			}
			,{
				text: "Very Plain"
				,costs: {services: 350}
			}
		]
	}

	,{
		id: 'funeral'
		,text: "Funeral Service?"
		,category: "Services"
		,options: [
			{
				text: "Yes"
			}
			,{
				text: "No"
			}
		]
	}

	,{
		id: 'guests'
		,text: "Estimated number of guests attending?"
		,category: "Services"
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

	,{
		id: 'day'
		,text: "What day will the funeral be on?"
		,category: "Services"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "A Sunday or Public Holiday"
				,costs: {
					services: 350
					,disbursements: 750
				}
			}
			,{
				text: "A Saturday"
				,costs: {
					services: 250
					,disbursements: 350
				}
			}
			,{
				text: "A Weekday"
			}
		]
	}

	,{
		id: 'lead'
		,text: "Who will lead the funeral service?"
		,category: "Other Charges"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Church leader"
				,costs:{ disbursements: 180 }
			}
			,{
				text: "Funeral celebrant"
				,costs:{ disbursements: 350 }
			}
			,{
				text: "Family member"
			}
		]
	}

	,{
		id: 'flowers'
		,text: "Select the flowers to be displayed on the casket"
		,category: "Other Charges"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Superior"
				,costs:{ disbursements: 250 }
			}
			,{
				text: "Above Average"
				,costs:{ disbursements: 200 }
			}
			,{
				text: "Average"
				,costs:{ disbursements: 150 }
			}
			,{
				text: "Conservative"
				,costs:{ disbursements: 100 }
			}
			,{
				text: "No Flowers Required"
			}
		]
	}

	,{
		id: 'newsNumber'
		,text: "Number of newspapers the notice will be sent"
		,category: "Other Charges"
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

	,{
		id: 'newsSize'
		,text: "Newspaper notice size"
		,category: "Other Charges"
		,relation: {
			question: 'newsNumber'
			,answers: range(2,11,1)					//range is defined in helpers.js: (start,end,step)
		}
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

	,{
		id: 'refreshments'
		,text: "Will refreshments be available to the guests?"
		,category: "Other Charges"
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

	,{
		id: 'catering'
		,text: "Catering selection?"
		,category: "Other Charges"
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

	,{
		id: 'program'
		,text: "Will a funeral program be required?"
		,category: "Other Charges"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,costs: { disbursements: 60 }
			}
			,{
				text: "No"
			}
		]
	}

	,{
		id: 'programCategory'
		,text: "Category of funeral program"
		,category: "Other Charges"
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

	,{
		id: 'slides'
		,text: "Will a powerpoint slide show be required?"
		,category: "Other Charges"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,costs: { disbursements: 120 }
			}
			,{
				text: "No"
			}
		]
	}

	,{
		id: 'slidescategory'
		,text: "Category of powerpoint slide show"
		,category: "Other Charges"
		,relation: {
			question: "slides"
			,answers: [1]
		}
		,options: [
			{
				text: "20 Photos - 1 song"
				,costs: { disbursements: 50 }
			}
			,{
				text: "50 Photos - 2 song"
				,costs: { disbursements: 100 }
			}
			,{
				text: "2 Slide Shows"
				,costs: { disbursements: 200 }
			}
		]
	}

	,{
		id: 'hynms'
		,text: "Will there be hymns sung at the service?"
		,category: "Other Charges"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,costs: { disbursements: 100 }
			}
			,{
				text: "No"
			}
		]
	}

	,{
		id: 'musicians'
		,text: "Will there be bagpipes or bugle players?"
		,category: "Other Charges"
		,relation: {
			question: "funeral"
			,answers: [1]
		}
		,options: [
			{
				text: "Yes"
				,costs: { disbursements: 100 }
			}
			,{
				text: "No"
			}
		]
	}
];
