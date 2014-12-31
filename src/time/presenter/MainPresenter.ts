/// <reference path='../model/util/TimeUtil.ts'/>
/// <reference path='../view/screen/MainScreen.ts'/>
/// <reference path='../view/widget/Clock.ts'/>

module time.presenter {
	export class MainPresenter {
		
		private time: model.util.TimeUtil;
		private mainScreen: view.screen.MainScreen;
		private onTickBound = illa.bind(this.onTick, this);
		
		constructor() {
			this.time = new model.util.TimeUtil();
			this.mainScreen = new view.screen.MainScreen(jQuery('body'));
			
			this.onTick();
		}
		
		onTick(): void {
			this.mainScreen.setData(model.util.TimeUtil.getMainScreenData());
			
			window.requestAnimationFrame(this.onTickBound);
		}
	}
}