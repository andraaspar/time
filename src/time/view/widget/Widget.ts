/// <reference path='../../../../lib/berek/Widget.ts'/>

module time.view.widget {
	export class Widget extends berek.Widget {
		
		protected initJqs(): void {
			var widgetsJq = this.getJQuery().find('[data-name]');
			for (var i = 0; i < widgetsJq.length; i++) {
				var widgetJq = widgetsJq.eq(i);
				var widgetName = widgetJq.data('name') + '';
				this[widgetName] = widgetJq;
			}
		}
	}
}