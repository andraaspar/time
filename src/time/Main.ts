/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Arrkup.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/illa/StringUtil.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

/// <reference path='../BigNumber.d.ts'/>

/// <reference path='presenter/MainPresenter.ts'/>

module time {
	export class Main {
			
		private static instance = new Main();
		
		private mainPresenter: presenter.MainPresenter;
		
		constructor() {
			BigNumber.config({
				EXPONENTIAL_AT: 1e+9
			});
			
			jQuery(illa.bind(this.onDomLoaded, this));
		}
		
		protected onDomLoaded(): void {
			this.mainPresenter = new presenter.MainPresenter();
		}
		
		static getInstance() { return this.instance }
	}
}