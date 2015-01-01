/// <reference path='../data/DateDifference.ts'/>
/// <reference path='../data/Time.ts'/>
/// <reference path='../../view/screen/MainScreenData.ts'/>

module time.model.util {
	export class TimeUtil {
		
		static compare(d1: Date, d2: Date): data.DateDifference {
			var diff = new data.DateDifference();
			
			var d2Clone = new Date(d2.getTime());
			
			diff.years = d2.getFullYear() - d1.getFullYear();
			diff.months = d2.getMonth() - d1.getMonth();
			diff.days = d2.getDate() - d1.getDate();
			diff.hours = d2.getHours() - d1.getHours();
			diff.minutes = d2.getMinutes() - d1.getMinutes();
			diff.seconds = d2.getSeconds() - d1.getSeconds();
			if (diff.seconds < 0) {
				diff.seconds += 60;
				diff.minutes--;
			}
			if (diff.minutes < 0) {
				diff.minutes += 60;
				diff.hours--;
			}
			if (diff.hours < 0) {
				diff.hours += 24;
				diff.days--;
			}
			if (diff.days < 0) {
				d2Clone.setDate(diff.days);
				diff.days = d2Clone.getDate();
				diff.months--;
			}
			if (diff.months < 0) {
				d2Clone.setMonth(diff.months - 1);
				diff.months = d2Clone.getMonth() + 1;
				diff.years--;
			}
			
			return diff;
		}
		
		static getMainScreenData(): view.screen.MainScreenData {
			var nowTime = data.Time.getNow();
			var r = new view.screen.MainScreenData();
			r.time = Date.now();
			r.generation = nowTime.getGenerations(true).toN();
			r.dozen = nowTime.getDozensNotGenerations(true).toN();
			r.quarter = nowTime.getQuartersNotDozens(true).toN();
			r.seconds = nowTime.getSecondsNotQuarters(true).toN();
			
			return r;
		}
	}
}