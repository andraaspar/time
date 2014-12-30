module time.model.data {
	export class Time {
		
		private epochDate = new Date('0001-01-01T00:00:00Z');
		private epochJSTime = new BigNumber(this.epochDate.getTime());
		
		constructor() {
			
		}
		
		protected getNowJSTime(): BigNumber {
			return new BigNumber(Date.now());
		}
		
		getNow(): BigNumber {
			return this.getNowJSTime().minus(this.epochJSTime);
		}
		
		getNowArray(): string[] {
			var now = this.getNow().toString();
			while (now.length % 3) {
				now = ' ' + now;
			}
			return now.match(/(.{3})/g);
		}
		
		getDateAt(time: string): Date {
			time = illa.StringUtil.trim(time.replace(/:/g, ''));
			return new Date(new BigNumber(time).times(1000).round().plus(this.epochJSTime).toNumber());
		}
	}
}