/// <reference path='../../lib/illa/EventHandler.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

module berek {
	export class Widget extends illa.EventHandler {
		
		static JQUERY_DATA_KEY = 'berek_Widget';
		static EVENT_DESTROYED = 'berek_Widget_EVENT_DESTROYED';
		
		private jQuery: jQuery.IInstance;
		private isDestroyed = false;
		
		constructor(jq: jQuery.IInstance) {
			super();
			
			this.jQuery = jq;
			
			this.jQuery.data(Widget.JQUERY_DATA_KEY, this);
			if (!(Widget.EVENT_DESTROYED in jQuery.event.special)) {
				jQuery.event.special[Widget.EVENT_DESTROYED] = {
					remove: function(o) {
						if (o.handler) {
							o.handler(null);
						}
					}
				};
			}
			
			this.jQuery.on(Widget.EVENT_DESTROYED, illa.bind(this.onDestroyed, this));
		}

		getJQuery(): jQuery.IInstance {
			return this.jQuery;
		}

		getIsDestroyed(): boolean {
			return this.isDestroyed;
		}
		
		onDestroyed(e: jQuery.IEvent): void {
			this.isDestroyed = true;
			this.removeAllEventCallbacks();
		}

		static getFrom(source: jQuery.IInstance): Widget {
			var result: Widget = null;
			if (source) {
				var stored = source.data(Widget.JQUERY_DATA_KEY);
				if (stored instanceof Widget) {
					result = <any>stored;
				}
			}
			return result;
		}
	}
}