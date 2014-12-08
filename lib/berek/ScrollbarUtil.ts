/// <reference path='../../lib/illa/Axis2D.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

module berek {
	export class ScrollbarUtil {
		static CSS_CLASS = 'berek-ScrollbarUtil-box';
		private box: jQuery.IInstance;
		private defaultWidth = NaN;
		private defaultHeight = NaN;
		
		constructor(box?: jQuery.IInstance) {
			if (box) {
				this.box = box;
			} else {
				this.box = jQuery('<div>');
			}
			this.box.addClass(ScrollbarUtil.CSS_CLASS);
			this.box.prependTo('body');
		}

		getDefaultSize(axis: illa.Axis2D): number {
			var result = NaN;

			if (isNaN(this.defaultWidth)) {
				var boxElement = <HTMLElement>this.box[0];
				this.defaultWidth = Math.ceil(boxElement.offsetWidth - boxElement.clientWidth);
				this.defaultHeight = Math.ceil(boxElement.offsetHeight - boxElement.clientHeight);
			}

			switch (axis) {
				case illa.Axis2D.X:
					result = this.defaultWidth;
					break;
				case illa.Axis2D.Y:
					result = this.defaultHeight;
					break;
			}

			return result;
		}

		clearDefaultSizeCache() {
			// Only the width is checked
			this.defaultWidth = NaN;
		}

		static isVisibleOn(jq: jQuery.IInstance, axis: illa.Axis2D): boolean {
			var elem = jq[0];
			if (!elem) return false;
			var overflow = '';
			switch (axis) {
				case illa.Axis2D.X:
					overflow = jq.css('overflow-x');
					break;
				case illa.Axis2D.Y:
					overflow = jq.css('overflow-y');
					break;
			}
			switch (overflow) {
				case 'scroll': return true;
				case 'auto':
					switch (axis) {
						case illa.Axis2D.X: return elem.scrollWidth > jq.innerWidth();
						case illa.Axis2D.Y: return elem.scrollHeight > jq.innerHeight();
					}
					break;
			}
			return false;
		}

		static getScroll(jq: jQuery.IInstance, axis: illa.Axis2D): number {
			var result = NaN;
			switch (axis) {
				case illa.Axis2D.X:
					result = jq.scrollLeft();
					break;
				case illa.Axis2D.Y:
					result = jq.scrollTop();
					break;
			}
			return result;
		}

		static setScroll(jq: jQuery.IInstance, value: number, axis?: illa.Axis2D): void {
			switch (axis) {
				default:
				case illa.Axis2D.X:
					jq.scrollLeft(value);
					if (axis != null) break;
				case illa.Axis2D.Y:
					jq.scrollTop(value);
			}
		}
	}
}