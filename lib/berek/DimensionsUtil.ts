/// <reference path='../../lib/illa/Axis2D.ts'/>
/// <reference path='../../lib/illa/Alignment.ts'/>
/// <reference path='../../lib/illa/End.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

/// <reference path='Context.ts'/>

module berek {
	export class DimensionsUtil {
		static getSize(jq: jQuery.IInstance, axis: illa.Axis2D, context = Context.PARENT): number {
			var result = NaN;

			switch (context) {
				case Context.INNER:
					switch (axis) {
						case illa.Axis2D.X:
							result = jq.innerWidth();
							break;
						case illa.Axis2D.Y:
							result = jq.innerHeight();
							break;
					}
					break;
				case Context.PARENT:
				case Context.PAGE:
					switch (axis) {
						case illa.Axis2D.X:
							result = jq.outerWidth();
							break;
						case illa.Axis2D.Y:
							result = jq.outerHeight();
							break;
					}
					break;
			}
			return result;
		}

		static setSize(jq: jQuery.IInstance, v: number, a?: illa.Axis2D, context = Context.PARENT): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				var value = v;
				switch (context) {
					case Context.PARENT:
					case Context.PAGE:
						var diff = value - this.getSize(jq, axis, context);
						value = this.getSize(jq, axis, Context.INNER) + diff;
						break;
				}
				if (isNaN(value) || !isFinite(value)) {
					value = 0;
				} else {
					value = Math.max(0, Math.round(value));
				}
				switch (axis) {
					case illa.Axis2D.X:
						jq.width(value);
						break;
					case illa.Axis2D.Y:
						jq.height(value);
						break;
				}
			}
		}

		static getOffset(jq: jQuery.IInstance, axis: illa.Axis2D, alignment = illa.Alignment.START, context = Context.PARENT): number {
			var result = NaN;
			var offset: jQuery.IPositionObject;
			switch (context) {
				case Context.INNER:
					offset = { left: 0, top: 0 };
					break;
				case Context.PARENT:
					offset = jq.position();
					break;
				case Context.PAGE:
					offset = jq.offset();
					break;
			}
			switch (axis) {
				case illa.Axis2D.X:
					result = offset.left;
					break;
				case illa.Axis2D.Y:
					result = offset.top;
					break;
			}
			if (alignment != illa.Alignment.START) {
				var size = this.getSize(jq, axis, context);
				if (alignment == illa.Alignment.CENTER) {
					size = size / 2;
				}
				result += size;
			}
			return result;
		}

		static setOffset(jq: jQuery.IInstance, v: number, a?: illa.Axis2D, alignment = illa.Alignment.START, context = Context.PARENT, preventNegative = false): void {
			for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
				var value = v;
				if (context == Context.PAGE) {
					var pageOffset = this.getOffset(jq, axis, illa.Alignment.START, Context.PAGE);
					var currentOffset = this.getOffset(jq, axis);
					value -= pageOffset - currentOffset; // Page offset of parent
				} else if (context == Context.INNER) {
					value += this.getOffset(jq, axis); // Parent offset
				}
				if (alignment != illa.Alignment.START) {
					var size = this.getSize(jq, axis, context);
					if (alignment == illa.Alignment.CENTER) {
						size = size / 2;
					}
					value -= size;
				}
				if (isNaN(value) || !isFinite(value)) {
					value = 0;
				} else {
					value = Math.round(value);
					if (preventNegative) value = Math.max(0, value);
				}
				switch (axis) {
					case illa.Axis2D.X:
						jq.css('left', value);
						break;
					case illa.Axis2D.Y:
						jq.css('top', value);
						break;
				}
			}
		}

		static getDirection(axis: illa.Axis2D, end: illa.End): string {
			switch (axis) {
				case illa.Axis2D.X:
					switch (end) {
						case illa.End.MIN:
							return 'left';
						case illa.End.MAX:
							return 'right';
					}
					break;
				case illa.Axis2D.Y:
					switch (end) {
						case illa.End.MIN:
							return 'top';
						case illa.End.MAX:
							return 'bottom';
					}
					break;
			}
			return '';
		}

		static getCSSProperty(prefix: string, suffix: string, jq: jQuery.IInstance, axis: illa.Axis2D, e?: illa.End): number {
			var result = 0;
			for (var end = e || illa.End.MIN, lastEnd = (e != null ? e : illa.End.MAX); end <= lastEnd; end++) {
				result += parseInt(jq.css(prefix + '-' + this.getDirection(axis, end) + '-' + suffix));
			}
			return result;
		}

		static setCSSProperty(prefix: string, suffix: string, jq: jQuery.IInstance, value: number, a?: illa.Axis2D, e?: illa.End): void {
			if (a == null && e == null) {
				jq.css(suffix ? prefix + '-' + suffix : prefix, value);
			} else {
				for (var axis = a || illa.Axis2D.X, lastAxis = (a != null ? a : illa.Axis2D.Y); axis <= lastAxis; axis++) {
					for (var end = e || illa.End.MIN, lastEnd = (e != null ? e : illa.End.MAX); end <= lastEnd; end++) {
						jq.css(prefix + '-' + this.getDirection(axis, end) + '-' + suffix, value);
					}
				}
			}
		}

		static getPadding(jq: jQuery.IInstance, axis: illa.Axis2D, e?: illa.End): number {
			return this.getCSSProperty('padding', '', jq, axis, e);
		}

		static setPadding(jq: jQuery.IInstance, value: number, a?: illa.Axis2D, e?: illa.End): void {
			this.setCSSProperty('padding', '', jq, value, a, e);
		}

		static getBorder(jq: jQuery.IInstance, axis: illa.Axis2D, e?: illa.End): number {
			return this.getCSSProperty('border', 'width', jq, axis, e);
		}

		static setBorder(jq: jQuery.IInstance, value: number, a?: illa.Axis2D, e?: illa.End): void {
			this.setCSSProperty('border', 'width', jq, value, a, e);
		}

		static getMargin(jq: jQuery.IInstance, axis: illa.Axis2D, e?: illa.End): number {
			return this.getCSSProperty('margin', '', jq, axis, e);
		}

		static setMargin(jq: jQuery.IInstance, value: number, a?: illa.Axis2D, e?: illa.End): void {
			this.setCSSProperty('margin', '', jq, value, a, e);
		}
	}
}