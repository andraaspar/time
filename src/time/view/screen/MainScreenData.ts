

module time.view.screen {
	export class MainScreenData {
		
		time: number;
		generation: string;
		fortnight: string;
		quarter: string;
		seconds: string;
		
		equals(other: MainScreenData): boolean {
			return this.time === other.time &&
				this.generation === other.generation &&
				this.fortnight === other.fortnight &&
				this.quarter === other.quarter &&
				this.seconds === other.seconds;
		}
	}
}