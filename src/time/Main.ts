/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

module time {
	export class Main {
			
		private static instance = new Main();
		
		constructor() {
			jQuery(illa.bind(this.onDomLoaded, this));
		}
		
		protected onDomLoaded(): void {
			illa.Log.info('Hi');
			jQuery('body').append('Hi');
		}
		
		static getInstance() { return this.instance }
	}
}