declare module BigNumber {
	export interface ISettings {
		DECIMAL_PLACES?: number;
		ROUNDING_MODE?: number;
		EXPONENTIAL_AT?: any;
		RANGE?: any;
		ERRORS?: any;
	}
}

declare class BigNumber {
	constructor(value: BigNumber, base?: number);
	constructor(value: string, base?: number);
	constructor(value: number, base?: number);
	
	static config(settings?: BigNumber.ISettings): BigNumber.ISettings;
	
	static ROUND_UP: number;
	static ROUND_DOWN: number;
	static ROUND_CEIL: number;
	static ROUND_FLOOR: number;
	static ROUND_HALF_UP: number;
	static ROUND_HALF_DOWN: number;
	static ROUND_HALF_EVEN: number;
	static ROUND_HALF_CEIL: number;
	static ROUND_HALF_FLOOR: number;
	
	absoluteValue(): BigNumber;
	abs(): BigNumber;
	
	ceil(): BigNumber;
	
	decimalPlaces(): number;
	dp(): number;
	
	floor(): BigNumber;
	
	negated(): BigNumber;
	neg(): BigNumber;
	
	squareRoot(): BigNumber;
	sqrt(): BigNumber;
}