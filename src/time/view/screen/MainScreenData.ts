

module time.view.screen {
	export class MainScreenData {
		
		time: number;
		generation: number;
		dozen: number;
		quarter: number;
		seconds: number;
		
		equals(other: MainScreenData): boolean {
			return this.time === other.time &&
				this.generation === other.generation &&
				this.dozen === other.dozen &&
				this.quarter === other.quarter &&
				this.seconds === other.seconds;
		}
	}
}