/// <reference path='../widget/Clock.ts'/>
/// <reference path='../widget/Widget.ts'/>

/// <reference path='MainScreenData.ts'/>

module time.view.screen {
	export class MainScreen extends widget.Widget {
		
		private data: MainScreenData;
		
		private clock: widget.Clock;
		
		constructor(jq: jQuery.IInstance) {
			super(jq);
			
			this.getJQuery().html(illa.Arrkup.createString(
				['div', {id: 'clock'}]
			));
			this.clock = new view.widget.Clock(jQuery('#clock'));
		}
		
		getData() { return this.data }
		setData(value: MainScreenData): void {
			if (!this.data || !this.data.equals(value)) {
				this.data = value;
				
				var date = new Date(value.time);
				
				this.clock.yearJq.text(('000' + date.getFullYear()).slice(-4));
				this.clock.monthJq.text(('0' + (1 + date.getMonth())).slice(-2));
				this.clock.dateJq.text(('0' + date.getDate()).slice(-2));
				this.clock.hourJq.text(('0' + date.getHours()).slice(-2));
				this.clock.minuteJq.text(('0' + date.getMinutes()).slice(-2));
				this.clock.secondJq.text(('0' + date.getSeconds()).slice(-2));
				
				this.clock.generationJq.text(value.generation);
				this.clock.fortnightJq.text(('000' + value.dozen).slice(-3));
				this.clock.quarterJq.text(('000' + value.quarter).slice(-3));
				this.clock.secondJq2.text(('000' + value.seconds).slice(-3));
			}
		}
	}
}