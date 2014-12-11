/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/illa/StringUtil.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

/// <reference path='../BigNumber.d.ts'/>

module time {
	export class Main {
			
		private static instance = new Main();
		private epochDate = new Date('0001-01-01T00:00:00Z');
		private epochJSTime = new BigNumber(this.epochDate.getTime());
		
		constructor() {
			BigNumber.config({
				EXPONENTIAL_AT: 1e+9
			});
			
			jQuery(illa.bind(this.onDomLoaded, this));
		}
		
		protected onDomLoaded(): void {
			illa.Log.info('The current time is:', this.getNowSplit().slice(0, -1).join(':'));
			illa.Log.info('The time at 63:560:000:000 is:', this.getDateAt('63:560:000:000').toString());
		}
		
		protected getNowJSTime(): BigNumber {
			return new BigNumber(Date.now());
		}
		
		getNow(): BigNumber {
			return this.getNowJSTime().minus(this.epochJSTime);
		}
		
		getNowSplit(): RegExpMatchArray {
			var now = this.getNow().toString();
			while (now.length % 3) {
				now = ' ' + now;
			}
			var result = now.match(/(.{3})/g);
			return result;
		}
		
		getDateAt(time: string): Date {
			time = illa.StringUtil.trim(time.replace(/:/g, ''));
			return new Date(new BigNumber(time).times(1000).round().plus(this.epochJSTime).toNumber());
		}
		
		static getInstance() { return this.instance }
	}
}