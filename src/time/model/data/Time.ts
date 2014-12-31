

module time.model.data {
	export class Time {
		
		private static epochDate = new Date('0001-01-01T00:00:00Z');
		private static epochJSTime = new BigNumber(Time.epochDate.getTime());
		
		private time: BigNumber;
		
		constructor(time: BigNumber);
		constructor(time: string);
		constructor(time: number);
		constructor(time) {
			if (time instanceof BigNumber) {
				this.time = time;
			} else {
				if (illa.isString(time)) {
					time = illa.StringUtil.trim(time.replace(/:/g, ''));
				}
				this.time = new BigNumber(time);
			}
		}
		
		getTime() { return this.time }
		
		toDate(): Date {
			return new Date(this.time.times(1000).plus(Time.epochJSTime).toN());
		}
		
		getSecondsPart(): number {
			return this.time.abs().mod(1000).toN();
		}
		
		getQuartersPart(): number {
			return this.time.abs().div(1000).floor().mod(1000).toN();
		}
		
		getDozensPart(): number {
			return this.time.abs().div(1000000).floor().mod(1000).toN();
		}
		
		getGenerationsPart(): number {
			return this.time.div(1000000000).round(0, BigNumber.ROUND_DOWN).toN();
		}
		
		toString(): string {
			return [
				this.getGenerationsPart(),
				('00' + this.getDozensPart()).slice(-3),
				('00' + this.getQuartersPart()).slice(-3),
				('00' + this.getSecondsPart()).slice(-3)
			].join(':');
		}
		
		static getNow(): Time {
			return this.fromJSTime(Date.now());
		}
		
		static fromDate(date: Date): Time {
			return this.fromJSTime(date.getTime());
		}
		
		static fromJSTime(time: number): Time {
			return new Time(new BigNumber(time).minus(this.epochJSTime).div(1000).round(0, BigNumber.ROUND_DOWN));
		}
	}
}