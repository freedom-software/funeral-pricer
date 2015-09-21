window.defaultAnswer = 'Please Select..';		//Wording of the default dropdown option

window.questions = [		//Questions that will be displayed in the application

	/*	Example
	*
	*	{
	*		id: 'uniqueDescriptorWord'
	*		,text: 'Text displayed, asking the question'
	*		,category: '1 of 2 options (service, disbursement) to describe how to categorize the question'
	*		,blurb: 'Text displayed under the question'
	*		,relation: {
	*				question: 'uniqueDescriptorWord of the question of which the answer will show or hide this one'
	*				,answers: [array of possible answers for the question that will show this question]
	*			}
	*		,options: [  //Items to enter into the dropdown list to answer the question with
	*			{
	*				text: 'Text displayed in the dropbox'
	*				,costs: {
	*					accountName: amount to add for question to account
	*					,accountName: amount to add for question to account
	*				}
	*				,image: 'file name and extention in the images folder'
	*			}
	*			,{
	*				text: 'Text displayed in the dropbox'
	*				,value: amount to add for other calculations in formulas
	*				,blurb: 'Text to display when answer chosen'
	*			}
	*		]
	*	}
	*/

	{
		id: 'disposition'
		,text: 'Burial or Cremation?'
		,category: 'Services'
		,blurb: 'Will your loved one be Buried or Cremated?'
		,options: [
			{
				text: 'Burial'
				,costs: {disbursements: 4500}
			}
			,{
				text: 'Cremation'
				,costs: {disbursements: 575}
			}
		]
	}

	,{
		id: 'family'
		,text: 'Family Attending Burial?'
		,category: 'Services'
		,relation: {
			question: 'disposition'
			,answers: [1]
		}
		,options: [
			{
				text: 'Yes'
				,costs: {
					services: 200
					,disbursements: 150
				}
			}
			,{
				text: 'No'
			}
		]
	}

	,{
		id: 'viewing'
		,text: 'Will there be a viewing?'
		,blurb: 'Will your loved one need to be made ready to be viewed by your their friends and family.'
		,category: 'Services'
		,options: [
			{
				text: 'At your premises'
				,costs: {services: 750}
			}
			,{
				text: 'At home'
				,costs: {services: 500}
			}
			,{
				text: 'No'
				,costs: {services: 100}
			}
		]
	}

	,{
		id: 'casket'
		,text: 'Select the style of casket (coffin) required.'
		,category: 'Services'
		,options: [
			{
				text: 'Superior'
				,costs: {services: 3500}
				,image: 'casket_super.png'
				,blurb: 'Superior Casket'
			}
			,{
				text: 'Above Average'
				,costs: {services: 2500}
				,image: 'casket_above.png'
				,blurb: 'Above Average Casket'
			}
			,{
				text: 'Average'
				,costs: {services: 1500}
				,image: 'casket_average.png'
				,blurb: 'Average Casket'
			}
			,{
				text: 'Conservative'
				,costs: {services: 1000}
				,image: 'casket_conserve.png'
				,blurb: 'Conservative Casket'
			}
			,{
				text: 'Very Plain'
				,costs: {services: 350}
				,image: 'casket_plain.png'
				,blurb: 'Plain Casket'
			}
		]
	}

	,{
		id: 'funeral'
		,text: 'Funeral Service?'
		,category: 'Services'
		,blurb: 'Will a funeral service be held before the disposition?'
		,options: [
			{
				text: 'Yes'
			}
			,{
				text: 'No'
			}
		]
	}

	,{
		id: 'guests'
		,text: 'Estimated number of guests attending?'
		,category: 'Services'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Less than 20'
				,value: 15
			}
			,{
				text: '20 - 50'
				,value: 35
			}
			,{
				text: '50 - 100'
				,value: 75
			}
			,{
				text: '100 - 150'
				,value: 125
			}
			,{
				text: '150 - 200'
				,value: 175
			}
			,{
				text: '200 - 300'
				,value: 250
			}
			,{
				text: ' 300 - 500'
				,value: 400
			}
			,{
				text: ' 400 - 600'
				,value: 500
			}
			,{
				text: ' 600 - 1000'
				,value: 800
			}
			,{
				text: 'more than 1000'
				,value: 1000
			}
		]
	}

	,{
		id: 'day'
		,text: 'What day will the funeral be on?'
		,blurb: 'The type of day can incur an extra charge'
		,category: 'Services'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'A Sunday or Public Holiday'
				,costs: {
					services: 350
					,disbursements: 750
				}
			}
			,{
				text: 'A Saturday'
				,costs: {
					services: 250
					,disbursements: 350
				}
			}
			,{
				text: 'A Weekday'
			}
		]
	}

	,{
		id: 'lead'
		,text: 'Who will lead the funeral service?'
		,category: 'Other Charges'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Church leader'
				,costs:{ disbursements: 180 }
			}
			,{
				text: 'Funeral celebrant'
				,costs:{ disbursements: 350 }
			}
			,{
				text: 'Family member'
			}
		]
	}

	,{
		id: 'flowers'
		,text: 'Select the flowers to be displayed on the casket'
		,category: 'Other Charges'
		,blurb: 'Flowers will be displayed on the casket during the funeral'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Superior'
				,costs:{ disbursements: 250 }
				,image: 'flowers_super.png'
			}
			,{
				text: 'Above Average'
				,costs:{ disbursements: 200 }
				,image: 'flowers_above.png'
			}
			,{
				text: 'Average'
				,costs:{ disbursements: 150 }
				,image: 'flowers_average.gif'
			}
			,{
				text: 'Conservative'
				,costs:{ disbursements: 100 }
				,image: 'flowers_conserve.png'
			}
			,{
				text: 'No Flowers Required'
			}
		]
	}

	,{
		id: 'newsNumber'
		,text: 'Number of newspapers the notice will be sent'
		,category: 'Other Charges'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: '0'
				,value: 0
			}
			,{
				text: '1'
				,value: 1
			}
			,{
				text: '2'
				,value: 2
			}
			,{
				text: '3'
				,value: 3
			}
			,{
				text: '4'
				,value: 4
			}
			,{
				text: '5'
				,value: 5
			}
			,{
				text: '6'
				,value: 6
			}
			,{
				text: '7'
				,value: 7
			}
			,{
				text: '8'
				,value: 8
			}
			,{
				text: '9'
				,value: 9
			}
			,{
				text: '10'
				,value: 10
			}
		]
	}

	,{
		id: 'newsSize'
		,text: 'Newspaper notice size'
		,category: 'Other Charges'
		,relation: {
			question: 'newsNumber'
			,answers: range(2,11,1)		//range is defined in helpers.js: (start,end,step)
		}
		,options: [
			{
				text: 'Short notice (~25 words)'
				,value: 25
			}
			,{
				text: 'Standard notice (~100 words)'
				,value: 150
			}
			,{
				text: 'Extended notice(~330 words)'
				,value: 500
			}
		]
	}

	,{
		id: 'refreshments'
		,text: 'Will refreshments be available to the guests?'
		,category: 'Other Charges'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Yes'
			}
			,{
				text: 'No'
			}
		]
	}

	,{
		id: 'catering'
		,text: 'Catering selection?'
		,category: 'Other Charges'
		,relation: {
			question: 'refreshments'
			,answers: [1]
		}
		,options: [
			{
				text: 'Very Plain'
				,value: 5
				,image: 'cater_plain.jpg'
				,blurb: 'Plain catering'
			}
			,{
				text: 'Conservative'
				,value: 10
				,image: 'cater_conserve.jpg'
				,blurb: 'Conservative catering'
			}
			,{
				text: 'Average'
				,value: 15
				,image: 'cater_average.jpg'
				,blurb: 'Average catering'
			}
			,{
				text: 'Above Average'
				,value: 20
				,image: 'cater_above.jpg'
				,blurb: 'Above average catering'
			}
			,{
				text: 'Superior'
				,value: 25
				,image: 'cater_super.png'
				,blurb: 'Superior catering'
			}
		]
	}

	,{
		id: 'program'
		,text: 'Will a funeral program be required?'
		,category: 'Other Charges'
		,blurb: 'Document offered to attendees giving describing your loved on and the proceedings of the funeral'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Yes'
				,costs: { disbursements: 60 }
			}
			,{
				text: 'No'
			}
		]
	}

	,{
		id: 'programCategory'
		,text: 'Category of funeral program'
		,category: 'Other Charges'
		,relation: {
			question: 'program'
			,answers: [1]
		}
		,options: [
			{
				text: 'Complex with many images'
				,value: 2.2
			}
			,{
				text: 'Standard (up to 4 images)'
				,value: 1.6
			}
			,{
				text: 'Plain (1 image)'
				,value: 1.2
			}
		]
	}

	,{
		id: 'slides'
		,text: 'Will a powerpoint slide show be required?'
		,category: 'Other Charges'
		,blurb: 'We can setup a slide show to be displayed during the funeral showing images of your loved one'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Yes'
				,costs: { disbursements: 120 }
			}
			,{
				text: 'No'
			}
		]
	}

	,{
		id: 'slidescategory'
		,text: 'Category of powerpoint slide show'
		,category: 'Other Charges'
		,relation: {
			question: 'slides'
			,answers: [1]
		}
		,options: [
			{
				text: '20 Photos - 1 song'
				,costs: { disbursements: 50 }
			}
			,{
				text: '50 Photos - 2 song'
				,costs: { disbursements: 100 }
			}
			,{
				text: '2 Slide Shows'
				,costs: { disbursements: 200 }
			}
		]
	}

	,{
		id: 'hynms'
		,text: 'Will there be hymns sung at the service?'
		,category: 'Other Charges'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Yes'
				,costs: { disbursements: 100 }
			}
			,{
				text: 'No'
			}
		]
	}

	,{
		id: 'musicians'
		,text: 'Will there be bagpipes or bugle players?'
		,category: 'Other Charges'
		,relation: {
			question: 'funeral'
			,answers: [1]
		}
		,options: [
			{
				text: 'Yes'
				,costs: { disbursements: 100 }
			}
			,{
				text: 'No'
			}
		]
	}
];