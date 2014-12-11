var illa;
(function (illa) {
    /**
     * A reference to the global object.
     * This is the window in a browser, and the global in node.
     */
    illa.GLOBAL = (function () {
        return this;
    })();
    illa.classByType = (function () {
        var classes = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ');
        var result = {};
        for (var i = 0, n = classes.length; i < n; i++) {
            result['[object ' + classes[i] + ']'] = classes[i].toLowerCase();
        }
        return result;
    })();
    /**
     * Returns true if the value is a string primitive.
     */
    function isString(v) {
        return typeof v == 'string';
    }
    illa.isString = isString;
    /**
     * Returns true if the value is a boolean primitive.
     */
    function isBoolean(v) {
        return typeof v == 'boolean';
    }
    illa.isBoolean = isBoolean;
    /**
     * Returns true if the value is a number primitive.
     */
    function isNumber(v) {
        return typeof v == 'number';
    }
    illa.isNumber = isNumber;
    /**
     * Returns true if the value is a function.
     */
    function isFunction(v) {
        return typeof v == 'function';
    }
    illa.isFunction = isFunction;
    /**
     * Returns true if the value is an array.
     * Array subclasses are not recognized as arrays.
     */
    function isArray(v) {
        return illa.getType(v) == 'array';
    }
    illa.isArray = isArray;
    if (Array.isArray)
        illa.isArray = Array.isArray;
    /**
     * Returns true if the value is undefined.
     */
    function isUndefined(v) {
        return typeof v == 'undefined';
    }
    illa.isUndefined = isUndefined;
    /**
     * Returns true if the value is null.
     */
    function isNull(v) {
        return v === null;
    }
    illa.isNull = isNull;
    /**
     * Returns true if the value is undefined or null.
     */
    function isUndefinedOrNull(v) {
        return typeof v == 'undefined' || v === null;
    }
    illa.isUndefinedOrNull = isUndefinedOrNull;
    /**
     * Returns true if the value is an object and not null. Includes functions.
     */
    function isObjectNotNull(v) {
        var t = typeof v;
        return t == 'object' && v !== null || t == 'function';
    }
    illa.isObjectNotNull = isObjectNotNull;
    /**
     * Returns the type of value.
     */
    function getType(v) {
        var result = '';
        if (v == null) {
            result = v + '';
        }
        else {
            result = typeof v;
            if (result == 'object' || result == 'function') {
                result = illa.classByType[illa.classByType.toString.call(v)] || 'object';
            }
        }
        return result;
    }
    illa.getType = getType;
    /**
     * Returns the value if ‘instanceof’ is true for the given constructor.
     */
    function as(c, v) {
        return v instanceof c ? v : null;
    }
    illa.as = as;
    /**
     * Binds a function to a ‘this’ context.
     * No argument binding allows us to keep function type safety.
     */
    function bind(fn, obj) {
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, arguments);
        };
    }
    illa.bind = bind;
    /**
     * Binds a function to a ‘this’ context, and also prepends the specified arguments
     * This is not type safe because of argument binding.
     */
    function partial(fn, obj) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!fn)
            throw 'No function.';
        return function () {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    }
    illa.partial = partial;
    if (Function.prototype.bind) {
        illa.bind = illa.partial = function (fn, obj) {
            return fn.call.apply(fn.bind, arguments);
        };
    }
})(illa || (illa = {}));
/// <reference path='_module.ts'/>
var illa;
(function (illa) {
    var Log = (function () {
        function Log() {
        }
        Log.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.log) {
                if (console.log.apply) {
                    console.log.apply(console, args);
                }
                else {
                    console.log(args.join(' '));
                }
            }
        };
        Log.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.info) {
                if (console.info.apply) {
                    console.info.apply(console, args);
                }
                else {
                    console.info(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.warn) {
                if (console.warn.apply) {
                    console.warn.apply(console, args);
                }
                else {
                    console.warn(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var console = illa.GLOBAL.console;
            if (console && console.error) {
                if (console.error.apply) {
                    console.error.apply(console, args);
                }
                else {
                    console.error(args.join(' '));
                }
            }
            else {
                Log.log.apply(this, args);
            }
        };
        Log.logIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.log.apply(this, [test].concat(args));
            }
        };
        Log.infoIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.info.apply(this, [test].concat(args));
            }
        };
        Log.warnIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.warn.apply(this, [test].concat(args));
            }
        };
        Log.errorIf = function (test) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (test) {
                Log.error.apply(this, [test].concat(args));
            }
        };
        return Log;
    })();
    illa.Log = Log;
})(illa || (illa = {}));
var illa;
(function (illa) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.escapeHTML = function (str) {
            return str.replace(/[&<>"']/g, function (s) {
                return StringUtil.CHAR_TO_HTML[s];
            });
        };
        StringUtil.castNicely = function (str) {
            return str == null ? '' : String(str);
        };
        StringUtil.trim = function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        };
        StringUtil.escapeRegExp = function (str) {
            return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
        StringUtil.CHAR_TO_HTML = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;' // IE8 does not support &apos;
        };
        return StringUtil;
    })();
    illa.StringUtil = StringUtil;
})(illa || (illa = {}));
/// <reference path='IAJAXSettingsBeforeSendFunction.ts'/>
/// <reference path='IAJAXSettingsCompleteFunction.ts'/>
/// <reference path='IAJAXSettingsContentsObject.ts'/>
/// <reference path='IAJAXSettingsDataFilterFunction.ts'/>
/// <reference path='IAJAXSettingsXHRFunction.ts'/>
/// <reference path='IXHRDoneFunction.ts'/>
/// <reference path='IXHRFailFunction.ts'/>
/// <reference path='IAJAXTransportCompleteFunction.ts'/>
/// <reference path='IAJAXTransportObject.ts'/>
/// <reference path='ICSSHookObject.ts'/>
/// <reference path='IEvent.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IPromise.ts'/>
/// <reference path='IAnimationOptions.ts'/>
/// <reference path='ITween.ts'/>
/// <reference path='IAnimationDoneFunction.ts'/>
/// <reference path='IAnimationProgressFunction.ts'/>
/// <reference path='IAnimationStartFunction.ts'/>
/// <reference path='IAnimationStepFunction.ts'/>
/// <reference path='ISpecialEasingObject.ts'/>
/// <reference path='IPositionObject.ts'/>
/// <reference path='IEvent.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IAddClassFunction.ts'/>
/// <reference path='IAJAXCompleteFunction.ts'/>
/// <reference path='IAJAXErrorFunction.ts'/>
/// <reference path='IAJAXSuccessFunction.ts'/>
/// <reference path='IAnimationOptions.ts'/>
/// <reference path='IAppendFunction.ts'/>
/// <reference path='IAttrFunction.ts'/>
/// <reference path='IClassToggleFunction.ts'/>
/// <reference path='ICSSFunction.ts'/>
/// <reference path='ICSSObject.ts'/>
/// <reference path='IEachFunction.ts'/>
/// <reference path='IHTMLFunction.ts'/>
/// <reference path='IIsFunction.ts'/>
/// <reference path='ILoadCompleteFunction.ts'/>
/// <reference path='IOffsetFunction.ts'/>
/// <reference path='IOnEventsObject.ts'/>
/// <reference path='IQueueCallbackFunction.ts'/>
/// <reference path='IReplaceWithFunction.ts'/>
/// <reference path='ISizeFunction.ts'/>
/// <reference path='ITextFunction.ts'/>
/// <reference path='IValFunction.ts'/>
/// <reference path='IWidthFunction.ts'/>
/// <reference path='IWrapFunction.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IStaticEventSpecialHandleObject.ts'/>
/// <reference path='IStaticEventSpecialSetupFunction.ts'/>
/// <reference path='IStaticEventSpecialTeardownFunction.ts'/>
/// <reference path='IStaticEventSpecialAddFunction.ts'/>
/// <reference path='IStaticEventSpecialAddFunction.ts'/>
/// <reference path='IEventHandler.ts'/>
/// <reference path='IStaticEventSpecialObject.ts'/>
/// <reference path='IStaticEventSpecial.ts'/>
/// <reference path='IXHRAlwaysFunction.ts'/>
/// <reference path='IXHRDoneFunction.ts'/>
/// <reference path='IXHRFailFunction.ts'/>
/// <reference path='IAJAXSettings.ts'/>
/// <reference path='IAJAXPrefilterFunction.ts'/>
/// <reference path='IAJAXTransportHandler.ts'/>
/// <reference path='ICallbacks.ts'/>
/// <reference path='ICSSHooksObject.ts'/>
/// <reference path='IDeferred.ts'/>
/// <reference path='IDeferredBeforeStartFunction.ts'/>
/// <reference path='IEachFunction.ts'/>
/// <reference path='IEachPropertyFunction.ts'/>
/// <reference path='IEventConstructor.ts'/>
/// <reference path='IFXObject.ts'/>
/// <reference path='IGetSuccessFunction.ts'/>
/// <reference path='IGrepFunction.ts'/>
/// <reference path='IInstance.ts'/>
/// <reference path='IMapFunction.ts'/>
/// <reference path='IStaticEvent.ts'/>
/// <reference path='IXHR.ts'/>
/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>
/// <reference path='../../lib/illa/StringUtil.ts'/>
/// <reference path='../../lib/jQuery.d.ts'/>
/// <reference path='../BigNumber.d.ts'/>
var time;
(function (_time) {
    var Main = (function () {
        function Main() {
            this.epochDate = new Date('0001-01-01T00:00:00Z');
            this.epochJSTime = new BigNumber(this.epochDate.getTime());
            BigNumber.config({
                EXPONENTIAL_AT: 1e+9
            });
            jQuery(illa.bind(this.onDomLoaded, this));
        }
        Main.prototype.onDomLoaded = function () {
            illa.Log.info('The current time is:', this.getNowSplit().slice(0, -1).join(':'));
            illa.Log.info('The time at 63:560:000:000 is:', this.getDateAt('63:560:000:000').toString());
        };
        Main.prototype.getNowJSTime = function () {
            return new BigNumber(Date.now());
        };
        Main.prototype.getNow = function () {
            return this.getNowJSTime().minus(this.epochJSTime);
        };
        Main.prototype.getNowSplit = function () {
            var now = this.getNow().toString();
            while (now.length % 3) {
                now = ' ' + now;
            }
            var result = now.match(/(.{3})/g);
            return result;
        };
        Main.prototype.getDateAt = function (time) {
            time = illa.StringUtil.trim(time.replace(/:/g, ''));
            return new Date(new BigNumber(time).times(1000).round().plus(this.epochJSTime).toNumber());
        };
        Main.getInstance = function () {
            return this.instance;
        };
        Main.instance = new Main();
        return Main;
    })();
    _time.Main = Main;
})(time || (time = {}));
