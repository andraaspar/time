

module time.model.data {
	export class Time {
		
		private static epochDate = new Date('0001-01-01T00:00:00Z');
		private static epochJSSeconds = new BigNumber(Time.epochDate.getTime());
		
		private seconds: BigNumber;
		
		constructor(seconds: BigNumber);
		constructor(seconds: string);
		constructor(seconds: number);
		constructor(seconds) {
			if (seconds instanceof BigNumber) {
				this.seconds = seconds;
			} else {
				if (illa.isString(seconds)) {
					seconds = illa.StringUtil.trim(seconds.replace(/:/g, ''));
				}
				this.seconds = new BigNumber(seconds);
			}
		}
		
		getMilliseconds(round?: boolean): BigNumber {
			var r = this.seconds.times(1000);
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		getMillisecondsNotSeconds(round?: boolean): BigNumber {
			return this.getMilliseconds(round).mod(1000);
		}
		
		getSeconds(round?: boolean): BigNumber {
			var r = this.seconds;
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		getSecondsNotMinutes(round?: boolean): BigNumber {
			return this.getSeconds(round).abs().mod(60);
		}
		
		getMinutes(round?: boolean): BigNumber {
			var r = this.seconds.div(60);
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		getMinutesNotHours(round?: boolean): BigNumber {
			return this.getMinutes(round).abs().mod(60);
		}
		
		getHours(round?: boolean): BigNumber {
			var r = this.seconds.div(60 * 60);
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		getHoursNotDays(round?: boolean): BigNumber {
			return this.getHours(round).abs().mod(24);
		}
		
		getDays(round?: boolean): BigNumber {
			var r = this.seconds.div(60 * 60 * 24);
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		toDate(): Date {
			return new Date(this.seconds.times(1000).plus(Time.epochJSSeconds).toN());
		}
		
		getSecondsNotQuarters(round?: boolean): BigNumber {
			return this.getSeconds(round).abs().mod(1000);
		}
		
		getQuarters(round?: boolean): BigNumber {
			var r = this.seconds.div(1000);
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		getQuartersNotDozens(round?: boolean): BigNumber {
			return this.getQuarters(round).abs().mod(1000);
		}
		
		getDozens(round?: boolean): BigNumber {
			var r = this.seconds.div(1000000);
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		getDozensNotGenerations(round?: boolean): BigNumber {
			return this.getDozens(round).abs().mod(1000);
		}
		
		getGenerations(round?: boolean): BigNumber {
			var r = this.seconds.div(1000000000);
			if (round) r = r.round(0, BigNumber.ROUND_DOWN);
			return r;
		}
		
		toString(): string {
			return [
				this.getGenerations(true),
				('00' + this.getDozensNotGenerations(true)).slice(-3),
				('00' + this.getQuartersNotDozens(true)).slice(-3),
				('00' + this.getSecondsNotQuarters(true)).slice(-3) + '.' + this.getMilliseconds()
			].join(':');
		}
		
		minus(other: Time): Time {
			return new Time(this.getSeconds().minus(other.getSeconds()));
		}
		
		plus(other: Time): Time {
			return new Time(this.getSeconds().plus(other.getSeconds()));
		}
		
		static getNow(): Time {
			return this.fromJSSeconds(Date.now());
		}
		
		static fromDate(date: Date): Time {
			return this.fromJSSeconds(date.getTime());
		}
		
		static fromJSSeconds(seconds: number): Time {
			return new Time(new BigNumber(seconds).minus(this.epochJSSeconds).div(1000));
		}
	}
}