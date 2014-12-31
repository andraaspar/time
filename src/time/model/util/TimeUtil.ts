/// <reference path='../data/Time.ts'/>
/// <reference path='../../view/screen/MainScreenData.ts'/>

module time.model.util {
	export class TimeUtil {
		
		static getMainScreenData(): view.screen.MainScreenData {
			var time = model.data.Time.getNow();
			illa.Log.info(time.getTime().toS(10), time.toDate().toISOString());
			
			var data = new view.screen.MainScreenData();
			data.time = Date.now();
			data.generation = time.getGenerationsPart();
			data.dozen = time.getDozensPart();
			data.quarter = time.getQuartersPart();
			data.seconds = time.getSecondsPart();
			
			return data;
		}
	}
}