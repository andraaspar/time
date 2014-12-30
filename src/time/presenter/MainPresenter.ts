/// <reference path='../model/data/Time.ts'/>
/// <reference path='../view/screen/MainScreen.ts'/>
/// <reference path='../view/screen/MainScreenData.ts'/>
/// <reference path='../view/widget/Clock.ts'/>

module time.presenter {
	export class MainPresenter {
		
		private time: model.data.Time;
		private mainScreen: view.screen.MainScreen;
		private onTickBound = illa.bind(this.onTick, this);
		
		constructor() {
			this.time = new model.data.Time();
			this.mainScreen = new view.screen.MainScreen(jQuery('body'));
			
			this.onTick();
		}
		
		onTick(): void {
			var nowArray = this.time.getNowArray();
			while (nowArray.length < 4) {
				nowArray.unshift('');
			}
			var data = new view.screen.MainScreenData();
			data.time = Date.now();
			data.generation = nowArray[0];
			data.fortnight = nowArray[1];
			data.quarter = nowArray[2];
			data.seconds = nowArray[3];
			this.mainScreen.setData(data);
			
			window.requestAnimationFrame(this.onTickBound);
		}
	}
}