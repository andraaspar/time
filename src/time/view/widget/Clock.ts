/// <reference path='Widget.ts'/>

module time.view.widget {
	export class Clock extends Widget {
		
		secondJq: jQuery.IInstance;
		minuteJq: jQuery.IInstance;
		hourJq: jQuery.IInstance;
		dateJq: jQuery.IInstance;
		monthJq: jQuery.IInstance;
		yearJq: jQuery.IInstance;
		
		generationJq: jQuery.IInstance;
		fortnightJq: jQuery.IInstance;
		quarterJq: jQuery.IInstance;
		secondJq2: jQuery.IInstance;
		
		constructor(jq: jQuery.IInstance) {
			super(jq);
			
			jq.html(illa.Arrkup.createString([
				['div',
					['span', {'data-name': 'yearJq'}],
					'-',
					['span', {'data-name': 'monthJq'}],
					'-',
					['span', {'data-name': 'dateJq'}],
					' ',
					['span', {'data-name': 'hourJq'}],
					':',
					['span', {'data-name': 'minuteJq'}],
					':',
					['span', {'data-name': 'secondJq'}]
				],
				['div',
					['span', {'data-name': 'generationJq'}],
					':',
					['span', {'data-name': 'fortnightJq'}],
					':',
					['span', {'data-name': 'quarterJq'}],
					':',
					['span', {'data-name': 'secondJq2'}]
				]
			]));
			
			this.initJqs();
		}
	}
}