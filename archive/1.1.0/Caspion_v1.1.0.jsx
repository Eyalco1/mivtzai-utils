/**
 * @name Caspion
 * @description Utilites for operative projects
 * @version 1.1.0
 * @author Eyal Cohen
 * @license ISC
 */

Array.prototype.map || (Array.prototype.map = function (callback) { var T, A, k; if (null == this)
    throw new TypeError("this is null or not defined"); var O = Object(this), len = O.length >>> 0; if ("function" != typeof callback)
    throw new TypeError(callback + " is not a function"); for (arguments.length > 1 && (T = arguments[1]), A = new Array(len), k = 0; k < len;) {
    var kValue, mappedValue;
    k in O && (kValue = O[k], mappedValue = callback.call(T, kValue, k, O), A[k] = mappedValue), k++;
} return A; });
Array.prototype.forEach || (Array.prototype.forEach = function (callback, thisArg) { if (null == this)
    throw new TypeError("Array.prototype.forEach called on null or undefined"); var T, k, O = Object(this), len = O.length >>> 0; if ("function" != typeof callback)
    throw new TypeError(callback + " is not a function"); for (arguments.length > 1 && (T = thisArg), k = 0; k < len;) {
    var kValue;
    k in O && (kValue = O[k], callback.call(T, kValue, k, O)), k++;
} });
Array.prototype.filter || (Array.prototype.filter = function (fun) {
    "use strict";
    if (null == this)
        throw new TypeError;
    var t = Object(this), len = t.length >>> 0;
    if ("function" != typeof fun)
        throw new TypeError;
    for (var res = [], thisArg = arguments.length >= 2 ? arguments[1] : void 0, i = 0; i < len; i++)
        if (i in t) {
            var val = t[i];
            fun.call(thisArg, val, i, t) && res.push(val);
        }
    return res;
});
Array.prototype.every || (Array.prototype.every = function (callbackfn, thisArg) {
    "use strict";
    var T, k;
    if (null == this)
        throw new TypeError("this is null or not defined");
    var O = Object(this), len = O.length >>> 0;
    if ("function" != typeof callbackfn && "[object Function]" !== Object.prototype.toString.call(callbackfn))
        throw new TypeError;
    for (arguments.length > 1 && (T = thisArg), k = 0; k < len;) {
        var kValue, testResult;
        if (k in O)
            if (kValue = O[k], !(testResult = T ? callbackfn.call(T, kValue, k, O) : callbackfn(kValue, k, O)))
                return !1;
        k++;
    }
    return !0;
});
Array.prototype.some || (Array.prototype.some = function (fun, thisArg) {
    "use strict";
    if (null == this)
        throw new TypeError("Array.prototype.some called on null or undefined");
    if ("function" != typeof fun)
        throw new TypeError;
    for (var t = Object(this), len = t.length >>> 0, i = 0; i < len; i++)
        if (i in t && fun.call(thisArg, t[i], i, t))
            return !0;
    return !1;
});
Array.prototype.find = Array.prototype.find || function (callback) { if (null === this)
    throw new TypeError("Array.prototype.find called on null or undefined"); if ("function" != typeof callback)
    throw new TypeError("callback must be a function"); for (var list = Object(this), length = list.length >>> 0, thisArg = arguments[1], i = 0; i < length; i++) {
    var element = list[i];
    if (callback.call(thisArg, element, i, list))
        return element;
} };
Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
    "use strict";
    if (this == null)
        throw TypeError();
    var r = Object(this), n = 0 | r.length;
    if (0 === n)
        return -1;
    var e = 0;
    for (arguments.length > 1 && (e = Number(arguments[1]), e == e && isFinite(e) ? 0 !== e && (e = Math.floor(e)) < 0 && (e = Math.max(n - Math.abs(e), 0)) : e = 0); e < n; e++)
        if (e in r && r[e] === t)
            return e;
    return -1;
});
Array.prototype.includes || (Array.prototype.includes = function (t) { return !!~this.indexOf(t); });
if (typeof JSON !== 'object') {
    JSON = {};
}
(function () {
    'use strict';
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    function this_value() {
        return this.valueOf();
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() +
                    '-' +
                    f(this.getUTCMonth() + 1) +
                    '-' +
                    f(this.getUTCDate()) +
                    'T' +
                    f(this.getUTCHours()) +
                    ':' +
                    f(this.getUTCMinutes()) +
                    ':' +
                    f(this.getUTCSeconds()) +
                    'Z'
                : null;
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }
    var gap;
    var indent;
    var meta;
    var rep;
    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? '"' +
                string.replace(rx_escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string'
                        ? c
                        : '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
            : '"' + string + '"';
    }
    var seen;
    function includes(array, value) {
        var i;
        for (i = 0; i < array.length; i += 1) {
            if (value === array[i]) {
                return true;
            }
        }
        return false;
    }
    function str(key, holder) {
        var i;
        var k;
        var v;
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];
        if (value &&
            typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case 'string':
                return quote(value);
            case 'number':
                return isFinite(value) ? String(value) : 'null';
            case 'boolean':
            case 'null':
                return String(value);
            case 'object':
                if (!value) {
                    return 'null';
                }
                if (includes(seen, value)) {
                    throw new TypeError('Converting circular structure to JSON');
                }
                seen.push(value);
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v =
                        partial.length === 0
                            ? '[]'
                            : gap
                                ? '[\n' +
                                    gap +
                                    partial.join(',\n' + gap) +
                                    '\n' +
                                    mind +
                                    ']'
                                : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v =
                    partial.length === 0
                        ? '{}'
                        : gap
                            ? '{\n' +
                                gap +
                                partial.join(',\n' + gap) +
                                '\n' +
                                mind +
                                '}'
                            : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            }
            else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer &&
                typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            seen = [];
            return str('', { '': value });
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            }
                            else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return ('\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4));
                });
            }
            if (rx_one.test(text
                .replace(rx_two, '@')
                .replace(rx_three, ']')
                .replace(rx_four, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({ '': j }, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
})();
var tvaiBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00FBIDATH\u0089\u00B5U\u0081\r\u00820\x10<\r\x03\u00E0\x06N`p\x03\u00DD\u0084\x11t\x136\u00B0\x0B\u00988\u0082#\u00E0\x04\u00AE\u00C0\x06o>>\u00C9\x17\u00DBZ\u00F8r\u00C9\u00A7@\u009A\u00FF\u00EB\u00DD\u00D3\u00DF\x10\x11\n\u00E2\'\u00D9\u00B6dv\u00C1\x15\u00C0YVT+\x14\u00E8\x01<\u00C7\u00975\n4z-\u00E9\u00C1\x1E\u00C0{\u00FA\u00B1\u0094\x07N\u00A492i/\u00F8\x04\u00C6h\u00E8\u008B\u009E\u0088\u00EAi.\u00ABDN\f\x1D\u00D4\u00EA\u00C3\u00C0\u00BES\u00CC\u00A3\u00FB\u0096v\u00D1\x05\u00C0]\u008Cm\u0093;\x170w\u00C2\u00DC\u00E5\u00EC\u009F\u00EB\x013~\u00C8\u00F3)\u00A8\u00B9\u00E1\x04\u00CCx \u00A2C\u00A8[b\u0091\u009B\u00BCM\u00B5\u00A2U\u00A2N~\u00A2Z\u00DA\u00F2\u00BF,3$\u00CAj\u00C5T\u00A4\u00AE\u008AV\u0098\u00BF\u00C4\u00D0E\u0088\x15`)n"K3[\x16\u0085\u0090\x07\u00B5\u00BA\u00CF\u00F3Z1\u0081*4\u00E6\x00\u00ECd5%\u0087\u0092\u00C8\x1Bs\u0092\u00D8\u009C\x1Cj\u00A2yc\u00AE$\u00C6\x02\u00DE\u0098+\t69\u00E4\x01O#;\x00|\x00\u00E1a\u00F0\u0083\x02\u00DB\u00B5q\x00\x00\x00\x00IEND\u00AEB`\u0082';
var numsBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x010IDATH\u0089\u00EDU\u00D1\u00AD\u0082P\f=\x1A\u00FFe\x03\x19\u00E1\u00BA\x01#0\x02#0\x02#0\x02#\u00E8\x06\u008C\u00A0\x1B\u00F86\u00E0MPS-/}\u00B5\u00D5\u00EB\u008711\u009E\u00A4\x01.\u00A7\u00ED\u00ED\u00ED),\u0088\b\u00AF\u00C4\u00F2\u00A5\u00D1?"\u00C1\u00CA<\u0097b\x15\u0080\u0093\u00D8\x01\u00C0\x14\u00F8\x17\x00\u0092\u00F2\x1B\u0095\u00DF\x15\u00DCd"JD4\u0092\u008F\u0089\u0088z\u00E1i\u00EB\x03>I\u00ACt\x11\x10\x11\u0095\x12\u00E4\x11\x06\x15|\u00C8\u00E0s\u00CC2\u0097<#\u0089\u00E5b\u00E0&\u00D7\u00CE\u00D9n\x01\u00EC\u009D\u00F5:\u00E0\u00EF\u00C5\u00E7\u0086\u00CF\t\u00D6f\u00F1(\u008D\u00ED\u0083\u00C6z\u00E8\u00C5\u00E7h\u00DE\u00AD=\u0099\x16\u00E6\u009A\u0083\u00D0\u0087e\u00FA\x03`\u00A3\u00D6\u00F8\u00BE\r\u008E"\u0092k#2\u00DD\u0098\u00F5_nr\u00F7D\u00D3XqE\u00A6\u00EA\x18\u00C33\u00B2\x1B\u0095L\u009B\u00CC$\u00A5\x1E\u009CJ\u00AA98\u00C4Iv\u00AF\u00F9\\I{g\u00E0\u00BAy\u00D0\u00B4\u00D5\x01\u00B9v&yN\u00E2m\u00E8\u00AFZMNA\u00D9]\x10<:\u00DAI\x12\u00FFK\u00F0p\'\u008E\u00B5A\u00B5Is\u00E7\x1B\u00EFCw\u00D2;1V\x05\u00C1\x1B\u00CB]\\:}\u00D5\u00B1\u00C5N\u00A6\u00F3\u009E\u00EE\u00ED\u008C\u00DCL\u00FF\u00F7\u009F\u00FC\u00E6\x04\x00\u00CE=*\u0087W\x0E\u00A9\u0095\u00DB\x00\x00\x00\x00IEND\u00AEB`\u0082';
var bgBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\x0BIDATH\u0089\u00CD\u0096\u00E1m\u00C20\x10\u0085\u00BF"\u00FE7\x1B\x106\u00C8\x06x\x03\u00D8\u00A0\u008C\x00\x1Bd\u0083\u0096\r\u00D8\u00A0\u008C\u0090n\u00D0\x11\u00D2\r\u00D8\u00E0\u00D0I\x07\u00B2\u00ACs\u0095\u008A\u008B\u00D4\'Y\u00B2\u00CE\u00F6{>\u00FB\u00E5\x1CD$\u0089\u00C8 \u00F1P\u00CE\u00F4\u00A2\x1D`\u00C3<\u00F8R\x011\u00EA#\u00F0\x1D$\u00D3\x01\u00EF\u00DAYfA%\x1F\u00A2\u00F3XD\x13F\x0B\u00E8Q\u009C\u0081=\u00D0x\x13\u0096^\u00F0\x0F\u00B8\x00+\u00E0\u00CD\u0096\u009C#3h\u008D\u00FC\u008E\u00E4MzF`\x04N\u00D6\u00FF\x01>\u00A2\x05\x14\x07`m\u00D9\u00B8\x16\u008Fp\u00D1\u00F8\u00DB\u00E0\u00BF\u00B6\u00A9\u00DAr\u00F7\u00AC\u0080\u00EBm\u0083Z\u00F2\u00B3\u00E6\u009E\u00A9\x02\u00EA\u00F3\u00DE\u0089\u00EB\u00E5n\u00B39\u00F5\u008DdEZ\u00CB6Y\u00EB\u00B3\u00B1.\u008BwNa\x1F\u008A\u00B5\u00E9>P\x13\u00D8\x15\x04\u00A3\u00884\u00D6\u00AE\u0095\u0097\u00A3\u009F*\u00D0VH.\x13\x1E\u00A6T\n\u0094\u00B5\u00A8\u00B13}uNs\u00EB\u00C4\u00BC;k\u00F3@)p\u00B5\n\x19\u0086\u00D9?\u00B4<\u0083\u00C8\u009D?\u00B8f\x7F\u00F4\u00E7\u00FDm\x11I7\x1D\u00C4\u00E2\x1A\u00DFx\u0084\u00C7\x00\x00\x00\x00IEND\u00AEB`\u0082';
var textReverseBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00ABIDATH\u0089\u00D5\u0096\u00E1\t\u0080 \x10\u0085_\u00D1\x00\u008D\u00D0\bm\u00D0(5\u0092#8J#\u00B9\u00C1\u0085p\u0092\u0094\u008A\u00E1\u009D\u00D0\u0083\u00C3\x1F\u00E2\u00FBN\u00EFD\x07"\u0082\u00A6F!\u00EF\x03\u0080I\u00CE\u00F8\x1D4\u00C6B\u00B7\u00EC\u00D3K\x02\u00E0\u00E3\u00C8A\u00A4\x00Y\u0088$ \t\u0099\u00B8\x14\'\u0080M\u00B8\u0099v\bvQ^\u00DAG\u00F4\u009B"\x7FnS\u00C3\u008Bj\u00CCg"r)\u00F3\x1C\u00C0F\u00D9,\u0095\u0090\u0095\u0093z\u00CD\u0095\u00CCkwP\fU\u00F3\x18\u00A0b\x1E\x00\u00B1\u00B9\u00A4N\x0F\u00E8v\u0093U\u008F\u00A8K\u0091\u00BB\u00B4\u00E9\x13\u00E2\u00F8\u00966\x01\u00C2{\x10\u00CB?\u00E0\x0E\u0080\u00E5\u00B1I\u00BA\u00DF\x16\x00\x17\u00D4}\x15Y\u00BBDg\u00AE\x00\x00\x00\x00IEND\u00AEB`\u0082';
var logosBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x02]IDATH\u0089\u00B5\u0096Oh\u00CFq\x18\u00C7_\x1B#\u00FFFF.\u00F3\u00A7\u0090v\u00E0 \x07\u00DBE\x0E\x1C\u00CC.\x1C\x10\u0092rP\u00A3\x15\u00A7qq\x17\u00CD\u00C1a%\x17\x07iEb9\x10\x0E\u00944B\u00B8\u00AC,'\x12m\u00CD\u00CCl\u00B6\u0097><\u00BF|\u00FB\u00FA\u00FE\u00D6oeO=\u00F5\u00EDy\u009E\u00CF\u00E7\u00F9<\u00CF\u00FB\u00FD|>\u00DF*\u0095\u00E9\u0094\u00EA)\u00EC\u00DD\t\u00DC\x07\u00AA\u00A6t\u009ETA\x05\u00DA\u00A4N\u00F8G\x0EW\u00B8\u00E6\u00B7V\x12T\u00AD>\u00F3\u00AF|T\x17\u00FE\u00CF\x04G\u00FDW:*M03\u00D3\u00AD\u008D\u00C0\u00A6\\\x07\u00D7\x00\u00C7S'\u0081\u0097@\x03\u00F0)l\u00F3\u0080\u009E\u00F0\u0095\u00A4\x17xP\x0E\u0083\u00EB\x05'-\u00C9\u00B8:\u00A8~-SQI\u00DE\u00E4+\u00C8\u00D24U\u00F0\x14\x18\x07Z\u0081\u0091\u00B0\u00F7\x03\u00C3@\x170\x1B\u00E8\x06\x06\u0080G\u00E1O\u00AC:\x0B,\x03\u00F6\x02\u00D7&cQg\u009C\u00E4t\u00CE\u009E\u00AA{\x19\x15|Pwd|\u00BBc\u00CD\u00C3J@^\u00A2~Q\u0087\u00D4\u00FA\u008C\u00BD=h\u009A\u00ECO\u00D45\u00EA\x16u\u008E\u00DA\u00A7\u008E\u00A9\x1B\u008A\x12\u00E4\x07\u00ED3p9\x00l\u00CF\u00B4\u00A0\x0F\u00B8\x05\u00CC\x02\u00BE\x06\u00E0\u00F5\u00C0\x11`\x15p\x07xU4gE\u0093\u00BC \u00D3{\u0082%\x07\u0080\x16`,z=\x01\u00DC\u00CD\u00C4\u00D4\x16m^\u0084A*}$\u00FA\\\u009B\u00B1\u00CFU{\u0082M\u00F7\u00D4}\u00EA\u0099\x18\u00C2\u009Eh\u00DF\u00B6J0\u00B8\x1D\u0080\x1D*\b\u00BE\x11\u00BE\u00B4\u00D9M\u00F5R\u00D8\x1B#\u00F1[\u00B5\u00A6\b\u0083\u00B6(\u00A69t\x14X\x1F\u00D4Kz\nX\x1BZ\u00C2\u00A4\x11\x18\n\u00FF\u00AE\u00C0\u00AE!\x060\u00C9\x1E\u00A0\x03\u00A8Is0\x18\x01K\u0081\u00F9e:\u00F9<\u00FC\u00CB\u00CB\u00F6\u00FA\u008F\u00A4\u00D9\u00F9\x00,\u008A\u00EF\x15\u0094\u0099\u00DAVu\u00B3\u00BA?.\u00B7\u009F\u00EA\u00BBL\u00CC\u00B0z,b\x0E\u00AA\u00DF\x0B\u00F69W\u00C2\u00E0\u00AA:\u0090qt\u00E5\u00FA\u00D8\\\u00B0\u00F8d.\u00A6-\u00E3+a\u00B4.\x0B\u00F2\u00DE8e)\u00E0B\fQ\x1E|\x0B\u00C0lQ\u00FB3\u00FE+\u00E5X\u0094\u00A8\u00F7#\x13\u00F8^=\u00A1\u00AET\u00D7\x06}S\u00F2\u00ED\u0091|\u00A7\u00DA\u009Dy\u0088\f\u00A6\u00D5\u0094K\u0090tk\u00CC@^\x12\x0E\u00DF\u00E2J\u00E8UGs\u00FE\u0094\u00E4\u00BC:\u00A3\u0092\x07\u00A7N\u00BDX\x06\u00B8\u00BC\u00A4\u008D\x1F\u00C7\u00BDT\u00F8\u00E0L\u00F6WQ\x17\u00D7C\x13\u00B0\x1AX\x1C3\u0090\u00F8\u00FF\x1Ex\x11w\u00D0\u00EB\u00C9x;\u00BD\u00BF-\u00C0/\u00B5\u00B0\u00BB\u00ABQn_\x17\x00\x00\x00\x00IEND\u00AEB`\u0082";
var formatBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\x0EIDATH\u0089\u00CDU\u0081\r\u00C2 \x10<\u008D\x03\u00E0\x04e\x047\x107\u00E9\b\u008C\u00E2(u\x02\u00E3\x06\u00ED\x068\u0081u\x02\f\u00C9\u00A3\u00D8\u00D0\u00E7il\u00E2%_\u009A\u0087\u00FF#\x7F<\u00C0{/5\u00EB?\u00B0\u00D2\u00B8M\u00F8\b\u00E1\x004\u00B4\u00F4\x0E@K\u00C2\u00B6\u00C2\u00E4\u0086\u0092?\u00C9\x1A\u00F2\u00FD\u008C\u00A0\u00A5\u00B1#K},$%R\x00\x1E\u00F4\x7F\u00A2\u00F1J\u00E3\x1E\u00C0\u00C8F\x0B\u0084\u008A\u00E2\u00BA\u00C4\u00E7\u00C8W\x14[B\u0090K\u0096#]D`\u0092\u00A3\u00A9\x13\u00BFN\u00FC\u0086\u00CBQ\x129\ny\u00A1c\x1A\u00E1\u00C8W\x16\u009BaW\u00C9.\u00DB\u00CC|\u009B\u00CC\u00AB%%\u008Au\x1E\u00995cIl\u00EE\u0098\u00A6\u009D[\u00C2lg\u00CFi`*\u0092\u0083\u00EB\u00EC9\u0082(\u00DC\x10\u009A\u00B1`\u00C3$\u00E6\x1B\x05q%\u00B7\u00A6\u00E5\u00C4\u00AE\x0E\u00A8\u00DDP.\u00A0\u00A7\u00C5\u009D y\u00B4\u008Eb\u00FA\u00E9\u00DCnR1M\u0097\u00D7\r\u00C0\u00B9B\u00E43]\u008A1\u00C7\u00BB)k\x1E\u009CE\u0090\u00BE\x07\u00FFK\x1048T\u00D6\u00BB\x066\x10\x04q\u008E+\x11\u00A8uK\x04\u00E0\x05:\u00AF\u00D3k\x1C;\x7Fu\x00\x00\x00\x00IEND\u00AEB`\u0082';
var illusBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\x1EIDATH\u0089\u00B5U\u00D1\x11\u00820\f}z\u00FE\u00CB\x06\u00E2\x04:\x02\x1B\u00B0\x02\x1B\u00C8\b\u00B8\x01#8\x02N`\u00DD\u0080\x11\x18\u00A1N\x10\u00AF\\\u00CBU\u00ACM\u00CA\u00C9\u00BB\u00EBW_\u00FB\u0092\u0097\u00B4\u00D9\x10Q\x01\u00C0\u00AC\x18:\x00}`\u00BF\x02\u0090G\u00CE\r \u00A2\u009C\u00884\u00C5\u00D1\x13\x11\x02K1\u00E7\u00D4vT\x01\x1A&\u0083\u0093\u0080\x13\u0086\x17\x15\x17\u008D\u00C1y\u0096\u0085(\x03\u00DF\u00CF\x17\x13\u00CF-5\x01_\u00C0X\u00D52\u00FCt\u00AB\x02\u0085\u00EB\u0099\u00B4\u00B5m\u008Cd\u008B\x1C*&\u00A6}\u0092U\u00B3\u00E8\x0B"\u00EA\x04mk\u00D0\b8\u00CA]\u009C\u00D9\u008B\u00FF\u008D\u00C9"\u0093r\u0099T<\x19\u0094\u00FB*\x1E+\\np\u00DC\n\u008A\u00BA\x14W\u00F7\x17\r+x_\u00BB\u00C6\u0081\u0080l\u008A\u00DF\nx\u0083\u00E5\u00E5~gJ\x04\x1A\u00DBe\\\u00A6\u00DA\u00F2>Z?\u00F4\u00D0B\u00D0\x00j\u0086\x13|\u0080R\x01\u00D8\u00A1sg8\u00E5|x\u00A5\b \u00E1\u00C7\u00CD\u0096\nhA[\x1F\u00FC\x1F7U\x00\u00D6\u00AA\'\u00C3\u00B98\u00AB\u0096\b\x18\u0088\u0087\u00D3R\x01\u00C9\x1C\x1F\u00AD\u00DA\u00D9\'\x1D\u0083\u00FA\u00B1\u00E9\u00A6\u00DFT\u00D0/\x00x\x03\u00B8\u008B\u00F8\u00D5Z\u0086N\x14\x00\x00\x00\x00IEND\u00AEB`\u0082';
var israelShapeBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00F5IDATH\u0089\u00BDU\u00DB\r\u00C20\f<\x10\u00FFd\x03\x18\u00A1#t\u0084\u008C\u00C0\b\u008C\u00D0\x11:B\u00D9\x00&\u00A0#t\u0084v\x03\u0098\u00C0\u00C8(\u0095\u00A2(\x0F\u00BB\n\u009CT5Jm_\u00ED\u00F8\x1C\x10\u00D1\u00D6\u00C7\x12\u00D1\\\u00F2=@\u008F\u00DEyX\x00'\u00F7\u00BE'\u00A3l\u00F8\u00FB\x10]\u00CE^\x1B|\f\u0082ODdr>\u00BB/\u008B\x1C/\x00Gg\u00BD\x00h\u00DC^\x12{Ep\u00E3\x05g\u00CC\u00A5\u00E0P\x12\u00B4\n\u00DBM\x04\u00F6\u00DF\x04sM\u0082KP\x7F\u00C6\u00B9\x16\x01\x1Fn\x17\u00D9\u00AF\u0096A\u00EF\x14\x1B\"\u00AD^\x1F\x05a]#\u00CA]\u00D1H\u00C4Y\u00CA W\u0086\u00A2\x06 (\x11\u0097\u00E1\u009D\u00F8fj\x100\u0086\u00C8\u00DE\r\u00C0$!\u0090\f\u00B8&R\u00FFV: \u00A5\u00C3\u00CE7Z\u00A4\x1A\u0080Bh\x0Fo-\u00EA\x7F-\u0081\x7F\x0E\u00E3/\br\u00DDT\u0085`%a\u00A82\u00D0\u00DCh|\x1F<\u00D9GC\u00A0\u00C9\u0080\u00FB\u009E\u00FB_\x0E\x00\x1F\u00E8N\u00A1$\u0093\u0096\u00FCj\x00\x00\x00\x00IEND\u00AEB`\u0082";
var gazaShapeBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00F5IDATH\u0089\u00AD\u0095\u00E1\r\u0083 \x10F\u00BFv\u0081\u00BAA\u00BBA\u00E9\x06\u008E\u00D0\x11\u00EC\x06\u008E`7\u00E9(\u008E\u00E0\b\u008E\u00E0\x06\u00D7` \u00A5x\u0087\x1E\u00F0%\u00FC\x11\u00F2\u00DE\x01\x17\x04\x11\u0095\x0ECD\x13\x11\u00DD8N\r\u0081\u0085\u00DB,NVU0\u00D06]-\u0081a\u00E0>}\u00A9\u00A0!\u00A2Y\u0080/n\u00BEH0\np+}\u0096\x1E\u00D1G\u00A8\u00BA\u00AD\u00D1E=\x03\x17[T+\u00E8\u0084\u00CAE\u00B8F\u00D0\n\u00F0M\u00DF\u00E7\b\u008C\u0083\u00A9*?*\u00E0\u00E0\u00C93\u00D7\b\u009A\u00E0\x19P\x1D\u00CB\x11\x01\x07\u00A7\u00B8\u00C7s\x05\x12|\u00D6\u00C2\u00ED8\u00E3?\r\u0080\x11\u00C0\x1D\u00DB\u00CC\u00CC\u00B7\u00DD\u0084\u0082\x14\u00DC\u00CF\x17\t\u00BA\x04\x1C;sbN\u00EBE\u00FC*\u009C\x00\\S\u00EB\u00B5\u0082p\x07\x0B\u0080>\u00B1\u00F6\u00AD\u0085#\u00DAA(\u00BAD\u00DF\x1Enw\u00EA\u00C4]\x04w\u00D1a^\u00B9\u00F05\u0089W\u00D3\u00FET\x0E?\t\u00D2\u00E0\u008E\u00C8\u00B7\u00AB\u00C9\u00AE\u00DA\x07\u00C0\x17\u00AD\x7F\u00DF\u00E8g\u00DD\u009By\x00\x00\x00\x00IEND\u00AEB`\u0082';
var ILMapPhotoBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00LIDATH\u0089c\u00FC\u00FF\u00FF?\x03-\x01\x13MM\x1F\u00B5\u0080\x1C\x0B\x1A\x18\x18\x18\u00FE\u00A3a\x07"\u00E4\u0088\u00B6\u0080\u00EA`\u00D4\u0082Q\x0BF-```\u00A1P\x7F\x02\u0096\u00DC|\x00\u008A\u00A9bA<\x0Eq\u00B8\x05C?\u0092G\u00AB\u00CC\u00E1n\x01\x03\x03\x03\x00\x15\\\x12\u00E4A\u00B92J\x00\x00\x00\x00IEND\u00AEB`\u0082';
var GAMapPhotoBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\tIDATH\u0089\u00EDUQ\r\u0083@\f\u00ED\u0096\u00FD\x0F\x07L\x02\x12\u0090\u0080\x04$ \u00819@\x02\x12\u0090p\x12n\x0E\u0098\x03\u00A6\u00E0-\u0097\x14\u00D25\u00BD\x0Bd\u00E3g\u00A1\t\t4\u00EF\u00DA\u00BE\u00BE\u00F68\x01\u00A0=\u00ED\u00BCk\u00F4#\u00C1\x1A\u00BB\x18\u0098\u0082\u00882~w_g\bS\x04 \x03\u00D0\u00C36\x07\u00A0`\u009C|n\x06\u00DAk\u00DC\x1C|\u008C\x04\u009Fm\u00E2\u0080\u00F2p\x13\u00C1~\u00E0\u0082\x065\x11\u00E5\u008A\u00D8K}_\u0089\u00A8U\u00BE:\u00D2\u0094J\u00B7\u00C8\u00A9\n:f\u00E5\x13\u00F4\u008B\x04\u00DBQ2\u00B0D\x1EX\u00E4&!\u009D\u00AE\u00FE)\u00BA\u0090\u00F3\u00A0\u00F8\x18\u0083\x12@\x1B\u00A9n\u00AELk\u00A6\u00F5\u00E8\u00A4\x06[\u00ADT\u009A=\u0098\u00B5\u00A9C,A\u0098\u00FF\u00FB\u00CA\u00F6\u0084v\u00F6\u00CA\u0097/I""\x13\u00B7J\u009Ac\u00FF\u0094\x10XZ?\u00EF\u00815\u00CF\u00DE\b\x14\x12W+\u0083\u0083\u00CF/\u008B\u00A6G\u00D2\x02\u0087\x05\x1A\u0094\u00DF\t\u00E13\u00E3\\\u00BD\u00E5\u00AA\u00B0\x02\u00B4j\u00BBu\u00A1\u0083\u00F5G\u00FB\u00E9ew\u00FC2\u00FF=\x01\x11\u00BD\x01U~\u00D8\u00CC\x1D5 \u00CA\x00\x00\x00\x00IEND\u00AEB`\u0082';
var popBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00D7IDATH\u0089\u00B5\u0095\u00D1\x11\u00820\f\u0086?=\u00DFe\x146\u00B0\u008E\u00E4\x06\u008C\u00E0H\u00B8AG\u00C1\t\u00E2\x15\u00DB;\u00E4R,m\u00F8\u00EF\u00F2@\u00DA~?\t\x01N"B\u0085z\u00E0Yp\u00CC_j\u00E8@\x07\u00DCJ6\u00D6\x1Ax\u00E0\u00AE\u00E4Ce\x03pM\u0089\u00DA\x16i\n\u00F0q\t\x07^\u00E7\x03\u00E0o\u00E0\u0091\x16j[\u00B4\x05w\u00F1\x19\u00CDj\u00AD@\u0083\u00FB\u00E5\u0086\x16\u0083\u00BF\u00F0\x16\u0083"x\u00ADA1|V\x18\u00D3\x1D\u00D1\u008B\u00C8$_M\u00F1Z;\u00DF\u0089\u0088\x0B\u00EBG\u00C0\x7F\u00E2Px2\u00E8c9\u009D5<\x19\u008C\u00F1\u00B0\u00B3\u0086\u0087\u00D8\u009A\u00A2}\u00D3\u0092Q\u00CE\u00C0\x04N\u00C6\u00C0\f\u00AE\x19\u0098\u00C2\u00D7\x06\u00E6\u00F0Y\u008B)\u0092\u0096i\u00C9\u0085\u00F6?\x18\u00E2\u00F7\u00DC\u00AD\u00F2\u00A1\u009A\u00C9\u00A2\u0082\u009C\u00B4\u00F7\u00A4\u00A8\u0082\u00D2>\u00EF\u00BF{\u00E0\x03\x07\u00DBG\u00B9q4\f\u00D0\x00\x00\x00\x00IEND\u00AEB`\u0082';
var frameBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u008DIDATH\u0089c\u00FC\u00FF\u00FF?\x03-\x01\x13MMg```! \u00DF@\u00A9\x05\u0084\u0082\u0088\u00E2\u00F0#\u00E4\u0083F2\u00CDU```\u0088g \u00C2\x07\u00E4\x02\x07\x06\x06\u0086\u00FD\f\u00F4\u0088\u00E4Q\x0B\b\x02ZE\u00B2\x00\x03\x03\u0083\x01\x03\r-\u0080\x03\u00BA\x14\x15\x0EP\u00F6\x05\x06\x06\u0086\x0F\u00D4\u00B6\x00\x14D\u00B00rd``8@m\x0BF\u00F3\u00C1\u00C0[\u0080\x1C\u00C9\x0B\x19\x18\x18\x1E\u0090i\x0E\u00CE\u008A\t\u00D9\x02J\x00#.\u00BD,\x14T*D\u0081!^T000\x00\x00\x1D\u009F'T\x1DC\u00D4<\x00\x00\x00\x00IEND\u00AEB`\u0082";
var folderBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00D2IDATH\u0089\u00ED\u0095\u00DD\r\u00C20\f\u0084\u00BFV\fP&`\x04V(\x1B0BVb\x13Fh7\u0080\r\u00C2\x06e\x02#W\tDyhJ\u00E5\u00F0\u00C4IV\u00FBP\u009D}\u00E7\u009F6"BM\u00B4U\u00D9\x7F\u0095\u00C0\x01\x13 \u0085p[\x12h\x0F<pX\u00F9\u00FD%\x14S\u00C2\x10\x02\u00A4\x1E\u009C\x0E\u00D0.\u00A9\u00E4\t\\\x01\u00BF\u00C5\u008A%\u008B\u00E2\u009C\u009E\u00DE\u00B2\f\u0091\u008Ei$\u00EF\u0083\u008AR\u00D3K\u00A1\x1C.U\u00D0\u0084\u00E7\r8\x1Ai\x18\u00F3E\u00EB\f\u00C9g\u00BE<AoH\u00AE\x18\u00AA\'\u00C8{`\u00E9\u00BFb\u009F*\u00B0\u00F6\u00FF\u00AE[\u009F&8\x1B\u0092\x13\u00C7>M`\u00EE?\u00D9&?\u00BE8zk0\u00EFU\u00AA\u00C0\u0092|\u008C/m\u00A8\u00DC\x1A\u009F\u009B\x16\u00CE\u00EAdx\u00B4\u00BD\u0088t\u00EA\u00BC\u00C6\u00FF\u00A7\u00BF\f\u00E0\x05\u00BB\u00A4\x03\u00F3\u00D1~\x02\u00D0\x00\x00\x00\x00IEND\u00AEB`\u0082';
var helpBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00ACIDAT8\u008D\u00A5\u0091a\r\u00C3 \x14\u0084\u00AFSP\x07\u00AD\x04$LB%TJ\u00E7`\x12\u0090\u00B09\u0098\x04$ \u0081)\u00B8\u0085\u00E55\u00A1/\u00F4\u0095\u00AD\u0097\u00BC\x1F\u0085\u00BB\u008F\u0083\u0082\u00A4\u009E\u0091\u00A4'\u0099\u00B8\u00D5\u0083\u00E4U\u00FBux\u00E6\u00B1&\x0B\x10\x1B\x00\u00D1\x028\u00A9\u009E\u00A4\u00CD(k\x1A\u00BC\x0BX!\u00AE\u00F8\u00EEI\u0086_\x00z\u00BC\n\u00FBV@>\u00F9\u00A5\u00C2A\u00D6\u009B\x00\u00F7\u00CAo\u00EC\u00B5\u00CF\x02$\u00EB\u00E4u.\u00D8W(v<\u0080TsZ\u0080\x1Cz\x03x*\u00D8F\u00DD\u00F7\x1E'd5p\x00\u00A2\u00CC\u00FCO\u0083\x1C\x1CJo\u00CDd5h\u0092\x05X\u00E4\x11\u00B3nU\x07\u0080\x0F\u00AE|\u00F2\u00F6\x1C\u008E\u00B6\u00DF\x00\x00\x00\x00IEND\u00AEB`\u0082";
var quoteBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00xIDAT8\u008Dc\u00FC\u00FF\u00FF?\x03%\u0080\u0089"\u00DD\f\f\f,\f\f\f\x07\u00F0\u00C8;@i\u009Cj@^\u00C0\u00E7\x07F(\u008DS\r\u00C5^\x185\x00\x12\u008D\u008EH\u00FC\r\f\f\f\u00FCP\u00F6C$q\u00DCj@\u00B1\b\u00C5\t\u00FFQA\x02\u0092\x1CN5\u00C8\u0092\x0F\u0090$\x1E`\u00D1\u008CU\rE\u00B6\u0083\u00C4Aa\x00\x02\u00A0${\x10\u00CA\u00FE\u00C0\u00C0\u00C0\u00B0\x00Kx\x19`S3\u00C0\u00B9\u0091\u0081\u0081\x01\x00\b\u00F8\u00BB\u0088y\u00F5\x0B\u00D9\x00\x00\x00\x00IEND\u00AEB`\u0082';
var tatzaBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00EDIDATH\u0089\u00BDU\u0081\r\u00830\f3\u0088\x03\u00F8h\u009C\u00C0\t\u009C\u00B0\x13v\x02'\u00F4\u0084\u009E\u00C0\t;\u0081\x13\u00F8\u00C0SX2U\x13\x15PZ,E\u0088\u0094\u00C6u\x1C\x15\u0090|\u0092\u00F4$;\u0092\u00C8\x1D\r\u0080\x1E\u00C0\x03\u00C0\x02`BfT$\x07\x00-\x00\x0F`V\"\x1F\u00C4%\b\u00C1\u00FF\u00FE>\u0088\u00F6\u00B2\u009E\x03=w$gQ\u009A\u00E2O-\x1C\x1A1x\u00F5f\f\u00D6\u00A5\u008DN\u0095\u00EE*0\u009C9\u0099\u00D3=\u00F3\u00DE\u00B7Mbg\x07}\u00DA\u00D4\u00C5\x07#\u00D3\u00DC\u00F7\u00AAj\u00D1\u00F7\u00D6\u00D6\u00B6\u00A6(\x07\u00C4\u009FN\u0094\x1E19\x05^G\u00FC%\n\u00ACx\u0095\u0099d\u009D\u00BA\u0092\x04+R\u00A7\u00E8\bh\x04ENn\u00A8K\x16\u0087*(\u00E5A\u0085;<\u00B8\u00A5EEM.\u00D9\u00A2\u009F\x07v3\u00BA\u00CC\x04\u00DF\u00BA$'\u00BD\x05\u00C7\u00E0v\f\u00B1\u0095\u008B\u00E5-'\u00B5\u00A4\u00E6$\n.\u00FF\u00D8#x\x03\u00F0\x1FE\u00EB\u00AD\u00CE\u0092\u00C4\f\\\x00\x00\x00\x00IEND\u00AEB`\u0082";
var recScaleXBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01JIDATH\u0089\u00C5V\u00B1\u0091\u00C2@\f\\\x18r\\\u0082C2(\u0080\u00C0\x1D\u00BC;xw\u0080\x0B \u0080\x0E(\u0081\x0E\u00A0\x04\x07_\u00C0\u0087do2B\x7F\x05\u00FA\u00D1\u00CC\x1E\u0088\u009B3\u0098\u00F3\u00FB_3\x1A\u00DFI\u00BA]\u009FNgy$"\x18R\u00C6\u00C4N\x01\u00EC\x01\x1C\x01\u00E4=\u00F8rb\u00EC\u0088\t\u0088H*"\u008D\u00DCK\u00AE;{Qs\x0FC1\u00D3\t\u0080\x02\u00C0\u00D4{\u0093\u00C3/dM1\u008Bq\u0087\u00C0~\u00D2\u0092\u00A22"Ee(E\u00CE\u00B9\x10\u0091\x0B\x1D\u00EB\bp\u00A7kb\\\u0088y\u00AD\u00A2O\x00\'\u008E?LJ*\u00DD\u00A4\u00D1\u008Cjm\u0095\u0089wkO\u00C4\u00C4\u00E4I~\u00B5\x00\u00BE\u00BCy\x12\u0088i\u0095g\u0087\\\x03\u00D8\u009A\u00F9;\u008073\u00DF2&\u009A\x00\u00BC4\u00E7\u0080\u00FDL\u00DFC\u00E9B\u00D0\x00(\x03\u00F6\u0092\u00BE\u00DE\x04\u00E0\u00C1v\u00B1E\x11(\u00D0*`_\u00B5\x10\u00BFL`\u00F3\u00FCM\r\u00F9\u00A2\b4\u00CFs\x0F\u00D0\u0082\u00CE[\u00CE\u00E7&\u00E6\x16V\u00BC\u0085\x19\u00E7\u00FE\'D\u00C7\t\u00D5\u00B7\u00A7\\\u0093\u00D1V9\\\u00B7\u0083\x05\u0080\x19\u00C7K>k^\u00AA\x115a\u00D54\x01{\u00ED\u00AD\u009D\x11\u00F3o>v\x1B\x19N6\u00FF\u00D6\x0FbZf\u00F1\u00A8\x1F(\u00C9ND\u008E\u0091\u00E0\u00B6/+\u00C6\u00DEU\u00D6\u00B0\u00BF-\x00~\x00L\u00DB\u00BCGD\u00F6\x02\u008A\x00\x00\x00\x00IEND\u00AEB`\u0082';
var textPopBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00EAIDATH\u0089\u00EDU\u00C1\r\u00C20\x103\u00A8\x0F~t\x046\u0080\r(\x1Bt\x03\u00D8\u0080\u008C\u00C0\be\x03\u00D8\u00A4O\u009Ee\x03F(\x13\x18\x05\u008CTE%JP\u008AT\u0089\u0093\u00F2i\u00EFl\u00F7\u00E2\u00BBNHb\u00C8\u0098\x0E\u008A\u00FE\x0B\u0082\u00AC\u00E7\u00D9\n@\u0095\x00\u00BB\x01`\\\x02\x0B^\x03\u0098' X\x03\u00C8\u00DD\x16\u0095\u0089\u00C0\u00DF\u00B1\x1D\u00FF%\u008F\u009F\u00C0\u009D\u00E4\\.Z&\u00C2?\u00F7\u00AD\nKb<E3\u00BD\u00B7B.\u009E\u00BC\u00F69O\u0096 \u00F2T$[\u0092yH],\u00F8\u0082\u00AF8\u0084\u00D6\u00C4\x12\u009CH\u00DEB\u00D5w\t\n\u00A9*=\u00C9\u0085\u00D4\u00EFbDA\u00C0\u00DD\u00A8>$\u00D7R\x1F\u00F5\u00D5\u0099\x1Cq\u00D7\x1E\u00B2[t/\x07\u00B8\u00CE\u00B2\u00CBk\x13\u00EB\u00D3L\u00CB\u00ED\u00AA\u00F5\u00DAh\x06\u008A\u009E\u00DC\u00A3\u00AC\x19\x17j\te=\u00AA\x15\u00DF\u00D8\u00D7{\u00C9F\u00C0&\u00C6!!\u00E7\u00FF\u00D3\u00F7\x07\u0080\x07Z\x1F'f6E?T\x00\x00\x00\x00IEND\u00AEB`\u0082";
var arrowBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00uIDATH\u0089c\u00FC\u00FF\u00FF?\x03-\x01\x13MM\x1F\u00B5\u0080\u009E\x16$\u00E0\u0094\x01\u00A5"*`\x10H\u00C0f\x0E5-\u00C0j\t\u00B5-\u00C0\u00B0\u0084\u0085\u0081\u0081\u00C1\u0080\u0081\u0081A\u0080Jq\x01\x02\u00F3\u00A1\u00F4\x02X\x1C\x1C\u00F8O\x1B\u0090\x00\u00F3\x01\u00AD\x00\u00D8\'C\u00BA\u00A8H\x04\u00C5\x03\u00A84\u00A5F$\u00EF\u00C7f8\u0098E\u00EBd:\u00A42\x1AM\u008B\n\u00AC\u0086\u0083\u00F0h\u00959\u00DC-```\x00\x00h\u00AFq\x15)\u00A8}\u00A0\x00\x00\x00\x00IEND\u00AEB`\u0082';
var mikraBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00F4IDATH\u0089\u00D5\u0096\u00E1\r\u00820\x10F\x1F\u0086\u00FF0\x02#\u00B8\u00818\u0081n\u0080#\u00B8\u0081\u00B0\u0081\x1B\u00C8\b:\x01\u00BA\u0081#0\x02Np\u0086\u00A4hi\x02\u00C9\t%\u00F1K\u009A\u00B4\x07\u00B9\u00D7\u00DE\x1DW\x02\x11\u00C1\u00A7V^\u00BD\x03!p\u00F7\thC\u00E45F\u00A15/f\u00F4\u009B\x00\x19\u00CE\t\u0082\x19\x01)P1S\u0092\x0F@\r\u00B4\x1B-\u0081\u00D8~\x18:/\u00A7\n\u00C7\u00B5\t\u00C5\u00C5\u00B2e\x06p\x1E\x02T\n\u00C0P\u00CEvc\u0080\u0087\x02P\u00BB\u00E10z\u00F5V\u00F2\x15?\u008CXD\x1A\u00E9+\x17\u0091\u00B4\u00B3\u00B8\'\u00D0\u00AA\x01\u00D6&\u00D1\u00AD\u009E\u00C0\u00D5\u00CE\u00E5"\u00ADb\u008Ab\u00B3\u00EB\u00C8\u00F2Q\u00D8\u00ED\u00C7\x05h\u00FARW\u00F3\u0091c?\u008E\x016\n\u00C0\u00D0fz@\x17\u00B0U\x00\u00BA\x0F\u00ED\u00E4\u00D8o\u00BD\u00D5\u00C42m\u00C7^Dj\u00E3\u00A34\u00A5\u00FB)S\u00EF\u00CD\u00CE\x0EQ># \u00E9&\u008B\\8\u009A\u00FE\u00A3\u00D6\u009F\u00FFU\x00oU\u00A0\u00D0\u00BAk9\u00F1)\x00\x00\x00\x00IEND\u00AEB`\u0082';
var danBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00(\x00\x00\x00(\b\x06\x00\x00\x00\u008C\u00FE\u00B8m\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x02\u00CFIDATX\u0085\u00CDY;n\u00DC0\x10\u009D,\\\u00A4\u00B3\u00CAtV\u0091\u00DE,\u00D2\u00AFn\x10\u00DD :\u0082\u008B\u00F4\u00D1\r\u00B2\u00B9\u0081\u00D2\u00A5T\u00E3\u009E\u00AE\u00D2*p\u00E5N\u00BE\u0081\u00B6K\u00C7\u0080\u008B\u00C7\x05C\u00F33\u00A3\u0095\x01?\u0080\u00F0ZKr\u009E\u00E6\u00C7\x19\u00EE;c\f\u00AD@ED\r\u0086\u00C2\u00B8\x0E\u00B69\x12\u00D1\u0084\u00A11\x16\u00B1(KP0\x1Ac\u00CC`\u00D6a\u00C1\u00DAF"\u0093;\u00B16\u00C6\u00E8\u0095\u00C4b\u00D0\u00D8s\x13\u0082\u00FD\u0086\u00C4B\u00F4\u0097\x10\u00AC\u0084Z\u00D3\x108\tIj\u00C8\x12\x11\u00AC"\u0082\u00BA\u00E0\u0099\u00F5\u00A9\x03|*&\u00A0\u00C1\u009A\u0091ArJ\u0091\u00E4\u00923\u00D0N\u0085\u00BF}\u00EE\u00AD\x13>\\"\x1A%\x19\u00DB,e\u00D6\x05\x1A\u0091F\u00BE?\u00EE\n$u\u00B8f\x17d\u009D\u009E\u0088\u00F6\u0099\u00ACT\u00AFI\u009A\x1E\x0ED\u00F4#\u00F3\u00FD\x1E\x1C\u00A2y\u00B0N\u00BC\u00D5(\u00CD]\u008CQ\n\u00BEs\n\u00E2\u0098\u00D6\u0099WmH\u00B0\u00C2\u009EES\u00FB\x11\x17\u00C3\u0080\u00C9[\u0092s\u00A3+hQ\u00F9>\u00D8%|\u00C2\u009E\u00B1\x03\x11\u00CD\x17\u00FA^\fc\u00E1\u00FB;\u00E7\u0083%u[\x1C^A\u0083v\u00CC\x05\u00B7\u00AAv\u00A8H\u00C2J$\u0084\u00BC\n\u00E1!g\x19\u00CB\u00A9q\x04/\u00C1p6G\x1C]FF.\u00A5Y4W\u00F0\u00B3\x12R\x02,\u00B9/\u00A8\x0F\x15\u00E6ihfDN\u00FBLD?\u00F1\u00FD\u00EC\u00F9\x1EG\u00AE"\u0086\u00FF9\u00D4\u0088\u00F6\x19\'\x02w]l\x1Fb\u00D6\u0095\x0B\t6\x1E2\u00E9H\u0082!s(\u00BC\u00C0\u0095\u00C0\u00F7Z\u0098\u00D4\u0087+\u00EB\tf\u00BE\u00C5\u00E7g/\x00\u00EC\u00F1x\x13\u00EC\u00A3\u00B9B%\x04mT}\u00F4\u00FE\u00B7$|\u00C26\u00D2\u00BF\u00E3\u00F3\x1C\u0090\u00A8A\u00EC\x1A\u00A3}\r\u0082\x14\x10\u00B4Z\u00F9\u0096\u0098\u00B7/Dh\u00C5\x15\u00B8\u0083\u0099\u00B8\u00F8 \u0098\u009B\x03\u00B7*:\u00EE<\x1F\u00E2\u00E0\u00EF\x06\u00E4\x1E\x02\u009F\u00CCa\u0092\x12|\u00BF\x01A\u00C9\u00B9~"\u00C8\u008E(\u0098\u00E6y\x05)\x1FO\u0082\u00B9ZJ\u0090.\u00ACl\u00FE\x10\u00D1#s\u00EE\u00D1\x11\\p\x14q\u00A0P\u00B6\u00AF\u00C1\x11\u00E7\u00F2\'\u00E6\u00DA\u00F1\u00C4\u00ADP\u00B0\u00C6@^\u0087vo\u008C\u00B9\u00C13\u0085"\u00B4\u00C7Q\u00D8\u00E0\u00C4p\u008D\u00BF+z\u00B9}\u00F3i\u00BE\u00CB\u0083\x1A\u00D1U\u00AA.\bZ\u00E8\u00B0\u00E67L\u00EEN\u008E\t\x16QH\u00C6\u00F6\u00F3/\u00EC=\u00E1\u00F9-C\u00C6\u00C39x\x19MS\u0088\x19E\u00AE\u009D\u00FF\u0095\u00A9\t\x15h\u00BE\u0084h\u00D3D\u0082{\u0098\u00D1[3\u00A2\u00B2iaV7&<w\u00F3Z\u00E6\u00DE\u00FF\u00DD\u00D7H\x1A\u00F7\u00D4F\u00EE\u00E6\u00AB\u008D\u00BCl\u00E7\u00F9\'\u00A7<{\u00D1\u00B8\u00A7ZB\u00AE#\x17o\u00A7\x18\u00DD\u009B\x03\u00FB\u00EACJ2\u00D7P\u00D5L\u00CD\u0089.\u008F|\u0092\\s\x0F\u0091\u00F5\r\u00F3%W]\u00BF\u00AD\t\u009C\x19\u00C2\u00F4\u0096.\u00C2\u00ED_\u00DF\u00F4\x15ph\u00B6ae\u00C3\u00E4.\u00D1E\u00D7(o\u00FBg\b"\u00FA\x07,,\u00F8n\x0E\u00D6\u00EF)\x00\x00\x00\x00IEND\u00AEB`\u0082';
var bannerBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x01\x19\x00\x00\x00V\b\x06\x00\x00\x00\u00FBi\u00E2\x1A\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x0E\u00B5IDATx\u009C\u00ED\u009D\u00FFq\u00DB\u00B8\x12\u00C7\u00917\u00F7\u00BF\u0098\n\u00C4T ^\x05V*\u00B0R\u0081\u00E9\n\u00A2\u00AB z\x15X\u00A9 r\x05\'WpT\x05\u00A1*8\u00A9\u0082\'U\u00C07\u009AY\u00CC\u00EC\u00E1@`\x01,(2\u00DE\u00CF\f\u00E7\u0092\u009C\u00CD\u009F\u00C0\x17\u008B\u00DD\u00C5\u00E2C\u00D7uJ\x10\x04!\x17\u00BF\u008D\u00F8\u00CD.\u0095R\u0085R\u00AA\u0082\u00BF\u0097p`Z\u00A5\u00D4\x05\u00FE\u00DE\u00C0\u009F\u00DB\u00FB\u00DC\u00AE \b6\u00C6b\u00C9\u0094 *\u00FA\u0098\'\u009E\u00EF\b\u00A2s\x13\u009C=\x12"A\x10\x06\u00E6\u009E"s\x13\u0096\u00B5Rj\u00C5 *>n\u00A2\u00B3\x03\u00C19e\u00BE\u0096 \b\u0088{\u0088L\r\u00E2\u00B2\u00B8\u00D3\u0087xSJm\u00C1\u00D2\x11\x04!3C\u0089L\x01\u00C2R\x0F`\u00B5P9+\u00A56`\u00E1\b\u0082\u0090\u0089!D\u00A6\u0086\u00CE<\x16q19\u0082\x00\u008Ae#\b\x19\u00C8)2\x15X\t\u00F7\u009A\x16\u0085\u00F2\x06b#>\x1BA`\u00E4?\u0099^\u00E6\u00CDr\u00F99!\u0081\u00B9\u00F1\b\u00D1\u00A8\u00F5\b\u00EEE\x10~\x19\u00B8-\u0099\x12"8S\x12\x17\x1Bo0\u00CD\u0093\u00D0\u00B7 $\u00C2)2+\u0098\x1E\u00CD\u0098?\u00CA\x19,\f\u009DdW\u00C11D\u00D8\u00BB\u0096\u00E4>AH\u0083Kdn\u009D\u00F1G\u00CF\u00FF\u00BB\u0082S\u00F51\u00F0\u009Cg\u00E4\x1F\u00D9[r\\*\u00B8n\x05\u00D1\u00AB\x1C\u00D6\u00D3\x15\u00C4S\u009C\u00C2\u0082\x10\t\u0087\u00C8\u00DC\u00AC\u0097\'\u00C7\u00FF?@^\u00CA\u009F\u0084s\u00BD\u0082\u00984\u0091S\x15m\u00E5\u00AC"D\u00CD\u00C5\u00B3\u0084\u00BA\x05!\u008ET\u00C7\u00AFO`\x14\b\u00C6\x1E\x04\u00A4\u008F\u00EFJ\u00A9\u008F`\u0099\u00A4,\x03h\u00E1\u009EVp\u00BEg\u00B0\u0088R\u00F9\x01\u00F7&\bB )"C\x11\x18\x05k\u0091\x14t\u00D2g\u00F0uhn\x02\u00F0\x19":\u00DCN\u00D6\x0B\u00DCc\t\u00D7\u00BD&\u009EO\u0084F\x10"\u0088\u009D.\u00B9|06~\x1F\u0081\x03\u00B5\x00\u00D1I\u009DF\u008D\u00E1Y\x04a2\u00C4X2\u00AB@\u0081Q0\x05\u00AA\b?\u0097\u0093\x0B\u00DC\u00BBk\u00DAF\u00A1\x19\u00C1\u00B3\b\u00C2d\b\x15\u00992\u00D2\x01:\u0087\u00CE\u00B9\x19\u00C1\u008B\u00A9\x13\u0085f\x06\u00EF\u00A0`\u00BC\'A\u00F8e\t\x15\u0099}B\x1E\u00CClD\x1D\u00B3\u0086\u0084\u00BBX\x16\x101\x13\x04\u00C1C\u0088\u00C8l\b\u00B9(6\u00E7\u00EA\x19,\u0087\u00CF#K\u00D9\u00AF\x13#OO0\u00FD\x12\x04\u00C1\x01\u00D5\u00F1[\u00C1Z$\nS\u00CA)\u00A9`\x1A\x17k\u009D]a\n)\u00CB\x0F\x04\u00A1\x07\u00AA%\x13"\x1A?\u00A0\u00E3\u00D6\u0096\u009A\u00BCc\u00A3M\u00B4Ff#\u00F13\t\u00C2h\u00A1X2\u00A1\u00E1j\u0093\u00F3\x04\u00C4\u00E6&\x14\u00DF\x12~_\u00C2\u00DA\u0082\u00D0\x03EdN\u0089\u008B\x11\u00A7\u00D2\x01\u00DB\u0084\u00F5O\x07\u0094t(\b\x02\u00C27]J)\u0097y\x05g\u00EFTF\u00F8\x14\u00A7\u00F4\u0083\u0088\u008C \u00D8\u00F1\u0089L\u0088\u00BF\u00E1\x00\u00FF\u00D5\u00D1\u00A4rb\u00AB\u0097\x1Bc\u00C9C(R\u00ECJ\x10,\u00B86w\u008B\u00B1b>L\u00FC%o\x13\u00FCO\u008F \u00ACR\u00BES\x10\x10.K&t1\u00E0\x03$\u00EBM9\x136\u00D5\u00F2\x12kF\x10\f\u00FA\x1C\u00BF\u00B7\x11\u00F9\u00EF\u0084\u0097u\u0080\u00DC\u0091)\u0096\u00B0\u00BC$\u00E6\u00CD\u00E4\x10\u00D9\n\u00BE\u0089\u00B9f\u00AA\x05\u00CBi\u00CA\u0091\u00AD\x12=\x1B~wz\x0B\u00E2\u00F7X0l\u00D9\u00B3-s\x03\u00DF{Z\u00D6\u00F2Md,\u00C7\u00BA\u00E3\u00A1\u00E89\u00FF\u0098\u008F&\u00F1\u00C9WL\u00CFVw]\u00B7\u00EF\u00BA\u00EEB\u00B8\u00E6\u00A9\u00EB\u00BAm\u00D7ue\u00E2\u00F5\u00A84\u0089\u00CFV\u00C2\u00FD\u009E\u0088\u00D7k\u0089\u00CF\u00C7A\x03\u00D7\u00AA<\u00D7\u00A2\u00B4\u0093\u0098\u00EFM\u00E1\u00D6&v]\u00D7-\x03\u00CE\u00BF$\u00B6#J\u009F\u00F5\u00B1\u00C1?\u00DFw\u0092\u0096\u00E1c\u009D&(0\u00D4\u00C6\u00E3b\u0097x\u00FDU@\u00E7\u00B3\u00B1\u008B\x14wj\x03\u00D7\u00C4\n\u00DA&\u00F1\u00FD6\u008E\u00CE\u00C5\u00CD\u00DE\u00F1.\u00B9D\u00A6N\u00FC\u00DE\rA\x10\u00A9"\u00D3\x11\u00DB\u00AF\u008F\x7F\u0088\u008C\u00CD\'S2\u00D5\u00CB}\u00AF\x0E\u00D0\u00D8Pv\x01>\u00AD?\x13\u00F3\u0092\u009E`\u00AA\x11R\u008E\u00A2\u008C\u00A8\u00B3\x13\u00EA\u00B3+\u00E0\u00BER\u0092\x1E\x15\u00F8\u00FE\u00FE\x1A\u00C8\u00FF\u00F7\b\u00ED8Gi\u008F\x02\u00A6??\x12\u00BF\u00F7\x03,\u00F9\u00E1\u00CA<g_\u0093g\x13\u00991\u00E4{L\u00D9y<\u008Fh\u0094Ed\u00B1u\u00D7=\u0084\u00D4\u00BD\u0089iT\u00A1"\u00C3\u00BDU\u00CE\u00E3@\u00FE\u009A\x19\\\u0087\u00B3MV ^\x0F\u008C\u00E7\u00FC\u00C6\u00B8f\u0090\u00B5\u0094IN\u0091IQ\u00FF-|\u0084M\u00C2\u00C3V\u0091\u00E5\x188>|\u00C8;\u00D4\x02\u00C3\u00BD\u00DB\u00C2,`\u00B4\u008F\u0089\u008A\u00CD\x03\u009E\u00B3f\u00EEP\u009A\u00A1\u00A2y3\u00C6\u00D2\x1Ee\u00E2\u00A2\\\x17OLB3\u00E3\\\u00E4l\x13\x19.\u00D30\u00B6~L\x05/k\x0E\u00EA\u008C\u00EF\u0087z>\u00BD\u00BA\u00FAk\u00E0=p={\u00C8yrn\u00E5;\'4\u0096\u0094=\u00AC\u00A8\u00D6L\u008EE\u00A4\u00FF\x1D8\u00F2\u00F4\u00C4\u00B4\x06/\u00A5&\x13\u0085\'\u00A6\u00F7\u00FD\u00C8%\u00E26\u0091\u00E1l\u00F0\u00A1fxat\u008A#Z\u00D1}\u00B3l\u00FE\u0087v$\u00D8\u00C0H\u00BA4:\u00F5\u00DA\x18)\u00F4=\u00D4p\u00B8D\u0087\u00CB\u008A\u00A36\u00C6%\u00F3\u00D6-6\x1E=\u00CF\u0095\u00D2\u0090(\u00DF\u0097*bWH}\u00A0d]\x1F\u00EE\u00B4\u00FA=\u00D5WA\u00A9\u00C9\u00C4\u00C17&A\u00DC\u00B0\u009C\'\u00D2\x03Meo\u009C\u00BF\u00EC\u00F1\u0084\u00EB\x7F\u00C7\x1E\u00FB\x16B\u00E9\x14\u00CF\u00FB\x06\u00CEa\u00F3\u00F8\u00EF\u008D\u00F0\u00EC\u00C9\u00E1\u008DO\u00F1\u00F2\u009BP"\x0B!\u00D7\u00D3!K\u00FD\u00AE\u00EA\u0080H\u0098+b@\t\u0091\u00BB\u00A8\t\u00D1\u0093\u0098\u00FB[B(\u00D9\u00BC\u00BF\u008B#\u00E2\u00E3\u00A3\u0085\u00F3\u009A\u00C7\u008A\x18Q\u00C5\u00A1\u00FB\u00D0\u00E8R\x11\u00F0\u00AE/\u00F0\u00ECK\u00F8\u00BD\n\u00EEqG\u00FC\u00FD\u00CE\u00F2Nc\u00FB\u00B6-]\u00C1\u00873\u0084\u00CD-2\u009D\x11\u00EA\u00D4\u00E7\u00C7\x1D}\u008F\u00FE\r\x13\u00D2\x01}\u00E1W\u00B3A\u00D8\u00C2\u00EB\u00DC\u00CF\u00EE\x0B\u00F1R\u00AF\u00D7zB\u0094\u00AE\u009C\u00A6\u00C6#\x02+\u00C2\u00F5}\u00EF\u00D6\x1CH\u00CC\u0083\x12\u00B2^{\u00CE\u00B1F\x1D\u00D4\u0095\x1B\u00E2\u00C3\u0095\u00DFS\x04\u00FE~\u00A8\u00C8P\u00F3\u0090ZO\n\u00C22@\u00ACl}/\x06\u00F3\u00FB\u00F8p\u0086\u00B0sD\u0096\u00B0Y\u00AB3S\u00E7\u0096\u00B0\u009BiR\u0087\u00F8\t|S\x0E\u00D3\u00E98\u00B7\u00F8\x13\u00B8\u00CDo\u009F\u0099I1\u00BD\u00AF\u00F0M\\\x19\u00BD[\u00D8\x1C\x0Fs\u0080\x15\u00F0K\u008FO\u00C6\u00E7Sy#\u00F8t\x1E=\u00CFJ\u00C9\u00F8~\x01_\u00C5\u00BA\u00A7\rn\u00E1\x1A_2\u00FAa.h\u0091o\x1F)\u00CEk\u008A\u00FF\u00EA\b\u00CF\u00EFzg\r\u00FC\fe\x1F1\u00AEP\u00F4K\u008A\u00BF2u\x07I\n\u00D8af\u00BE\u00BCow\f\u0099\u00E3\x0F\u00B0\u00CC\x14\u00FDpAyn\u00EA\u00A6w\x1Bht\u00AFP\u00BFgI\u00E8\u008C\x05A\u009C\u00F5\x1E\u00E4\u00BE\x06\u00EDj\u00CC\u00D4%\x0F\u008F\u00D0\u0098o90\x1D\u00F2\u00BD\u00ADQ\u0089\u00D3=\u00F1\\1T\u00846\u0090\u00B2J\u009F\u00D2\u00BE\u00A8\u00CBpZb\u00B4\u008B\u00B3oEG\u009B\u0086\x10\x19\u00E5\u00B1\x12rz\u00DA]\u00E0\x0F\u0090\u00C3\u0089\u00E8\u00B3d(E\u00D9\u00A9\x1F\u00F6\x02\u00A2Q\x07tj\u00CA\u00C8\u00BA7\u00FE\x1Bs\u00AE&r\u00F7\u00CE\x05\fP/\u00B0\u008E\u00EE\x04\u0082\u0093\u0092\u00BFQ\u00A0`\x01>\u00D6D\x0B)v\x1D\x1E\u00A5\u00B3\x1F\x03\u00D7\u00A0QD\u00863\u0089p\x11\u00DBOL\u0091\u00C9\u00B5i\u00D9\x13\u00FA\u00C0ca\u00866\u00E8\u00CFa\u00C5\u00B8D\u0086\u00E2\u00B1\u00CF\x1D\u009E\u00A5L\u0095t\u00A7\u00F2\u0089\u00CC\u00C2\u00D3v8rL\u00E6 8\u00A7\u0084\u0088\u00D8\x02,%\u00F3x!\x0Ev9\u00BFI\u00A8\u0095v!XV)\u0099\u00C46\u00A2f\x1E\u00A6\u00C8\u00E4\u00CC\u00B4\u00F5\t\u00D8\x01r\x1F\u009E\u00C1\u009Fp;>A\u008D\u009A\u00DB\u00F1\u0087\u00E5w\u008E\u00F0s\u00FAg>\u00C2\u00DF\u00BF\u0080\u009F\u00C2\u00B7\u00E5\u00C9\u00EAN\u00C2G\x11\u0099\u009C+\u00AB)KG\u00F6=\x7F\u00EE\u00C3%Z\u009B\u00C4\u00A9\x06f\x06\u00A2p\u008F\x1D1r^3f\x19\x0Ew\u0085\x03\u00CA7\n~\x07CM\u0097\u0094\u00A33\x1FAL\u0096\u00D0\x18\u00F5\u00CB\u00BE\x18/\u00DE6\x1A\u009A\u00A5\x00.h\u00EE\u00AE\u00E7\u00F2\u009F\x1Db\u00B3\x1C\u0099u5\x14\x14K\u00C0\x14\x16\u00DFfx>\u00CBh\u0099\u00B8\u00A1\u009E\u00C9\u00D3\u00C0\u00F5{^3\u00AF\u00C7\x1B\u00C3R\x1A\u00CA`\x10l\x1D\u0099"\u0093\u00F3%\u00DAF\u00EF+X\x13+\x18\u00B9;d\u00C6\u00FE\u0084\u00BF\u009F@Hl\u00A3i\x05\u00A2\u00D2\u00A1\u00E3\'\u00FAs\u008B\u00CE\u00DF\u00F7\u00F2\u00EE\u00F1q)VJN\u00F1\u00F3E\x1D\x0E\u0096Q\u00D2g\u00CD\u00CC<\u00E7\u00D5{\u0091\x7Fa\u00B4jR\u0096\u009D\u0084p\x1E@\u00D0b\u0092\u00DE\u00B8w\x01\u00B9D\u00ACI\u00F3ro\u0091iA@^\x1C\u00E6\u00FB\x1C|&\u00B6H\u00C8\u00CC3\u0097^\u00C0\u00D2\u0082\u009F=\u00A6e\u00CE\u00E7u\t\t\u00C5\u00CC}\b\u00EC@TQZ\x11F#\u009B\u00A0P\u00A6L\u0094\u0090\u00E9\x1E\x06\u0087\u00DFaz\u00EC\x0B\x1B\u00BB\u00F0\t\x1B\x07g\u00B8F\u00CA\u00D4\u0084\u00D2\u00CEB\u009F\u0083\u0092I\x1D\u00F3n[\u00F8.l\f9]\u00B2u\u0098\u0087\f\u00CE\u00A9>l\u00CE\u00DD\\\u00CB\u00F8\x15\u00A1QR\x1A\x00u\u00F4,\u00C1\u00FA\u00BB\x10FwJc~1\u00AC\u00C3\x0E\u0096t\u00F8x\u00F2\\\u00BBD\u00D7o\u00D1\u00D2\u0090\x0F0\u00AD}\x06_Z\u0088\u00A5\u0093sO\u00AF\u00EF\u00D0>R\u00FDc\'B\u0084\u00CD\u0096\u00BB\u00E5\u0082\x12\u00E9\u0089\x1DD9}h\u00FF\x12\u0099\u009C\u00A52\u0087X\u00B3\x11JJ\u00A9\u00CDT(\u0096\x01\u00D5\u009B\u00AF\u009Dq3\u00F8\u009D\x13J`\u00C3\x14\x03\u008C\u00FC\u00AE\u00F3\u00EF\u00A0^\u008E\u00CD\u00BF\u00D6\u00A0\u00BC\u0098\n\u00FCt\u009C>\x1C\x1Fz\u00ED\u00D4\x1B\x04\x19>\x06\u00E4)Q\u00A0D\u00A6\u00B6\u00C4A\u00AF&\u00AEyK\u0089\u0086\u00D5\u0091\u00A9\x07\u00FF\u00C2\x14\u0099\u00DC\u00B5b\u00C7V\u00C8*\u00E7\u00F3\u00FA>05d\u00F9\u0097\u00C3\u00A2\u00D1e\x03L+m\x06\u00D3\u00C4\u00BF\u00A1\u00E3j\u00B1Y\r \u00AA}\u00F7\u00BAA\u00F7\u00F9\x15\u00DA\u0082k\u00E4N\tU\u00F7q@\u0091H\u00F3\u00D0)\x16+\u00E8\u00EC\u00DC\x03.%*3C\x19\u00BD6\nx\u008F\u0094\x1D5B\u00F2\u00ACl\u00B4\\\u00F9c\u00E6\u0096(\u00EF\u00AD\u009A]\u00AE\u00E7\u00A5\u008C\x00\'\u0088X<\x11~\u00F6\x05:\u00DC\x1E5\u00FE\u0092\u00F8\u00BB\u00FAg\u00EA\x1CN=\x0B\x0B\u00CB\u00D60\u0095\u00A5"\u00DE\x1C:\u00CB\x06\u009E\u00AB1\u008A\u00A2\u00AF\u0088\u008D|*\u0085\u00EA\u00F7\u00E0\u00DF\u00F1\u00B9\x07f0\u00B0\x1C\u008D\u0081\u00A8\f\x1C$8r\u0093\u00B6p\u00CD\u00A4<\u00B2\u00A1E\u00A6\u0084\u00977\u0096\u00A9S\u00AE\u00F9<\u00D5B\u00DA\x10\u0085BA\u00E3\u00FC\x1Aq/W\u00B4d\x7F\u00A8\u00A5\x135\x12\b\u00B3|\u0087\u0089~\u00AE\u0098gS\x13\u00DB\u00CD\u00A0\x06\x01\u00A1\u00B0H\u00E8\'W\u00C6"[:\u008B<\u00DA\x02\u00B69~S\u00BC\u00FD\x14\u00C62\u00F2\u00B09\u00B6,PE\u00E6\u00D4\u0093d\u00C8\u0089\u00CE=\u00CA\u00ED\u008B\u00C1`\u008B)g\r\u0095\u00F3\u00C4\u00B6\u0083i\u00C0z\u00CDMj4\f\u0093<m\u00B5\u0089L\u00EEL\u00D3\u00B14\u008A\u009CV[\u00C8\u00E8\u00BA\u00CD\u00D8\u00F0\u00DE\u00D0\u00886d\u00E2\u009A.\u00CDY%X(\x14\u00A6\u00B8\u0099^\u009Dy\u0080{\u00CE`\u00DD\u00EDR\u009C\u00F0\u00B6mj\u009B\u008C\r\u00A3\x1C\u0091%\u00C3]\x1C\x1A\x13*\u00A4z\u00E4\u00A7N\u009D(\x1C\u00D1y)9\x15\u00D7\x00k\u00A7&\u00DC\u00AB\u00F6\x01}\u00CF\u00D4\u009E^3\u00AF\u00CA\u00CE\u0089.\u00C1\u00C1]\x15\u00F19\u00E3\u00D2\x07]\u009D2x\u00DAd\u00B3dr\u00CFq\u00C72\u0087\x0E\u00A9\u00E6\x1F\u00C21\u00D2J\u00AA\u00A1\u0091p\u0084\r_Q6\u00B4\nXF\u00D0\x10\x0FJC\u00D6\u0082\u00B5\u00F6,\u00ED\u0088\u00E1u \'v.t\u00F63W\u00D2\u00DB\x19\u00DEq\u00CE\u00B5U\u00D1\u00D9\u00C06\u0091\u00B9d\u00CCO\x18\u008B%\u00A3\u00E7\u00F29,\u0099\x14\x11\u00D5\u00E1\u00E6\u00D8\u00E9\u0093nlfc\u00A0X(!\u00F7M)\u00DF0C\u00F7\u00D1\u00C0s=\'\u008A\u00CD\x19\u0096%LY`0\x1B\u00C8\x07\u008A\u00FD\u00DEW\x10\u00AAj\u00A0\u00C1{\x1Fs\u00AF\u00B6\u00E9\u0092>Y\u008E\x02\u00D7c\u00F0\u00C9\u00E0iA\x0EK&u4\u00D1#\u00C6\x1A\u00AD\u00BBZ:\u00CC\u00D43Jd\u00B354j\u00C6j\u00E8\u00D4cKH\x144\u00A3w;8*\u00F4\\\u0095\u00C7\x04?\u00A3\u00B5k\u00BE{\u00F4\x05-8\u00DB\x1E\u00D7\u00B9N(\x1A\u00B7B\u008Bv}\u00DF\u009B\u00F2>0\u0094\u00CA\x7F\x14\x03@\u00D7\u00F4q\r\u00D0\u00FF\u00B0\u00E4\u00FB6\u00DC/\u0088i\u00E4\u00A1\x1C\u00D0|\u0094\u00D3\u00FF@\u00C5,gi}\u00F8\x04\u008E\x19\u0097)(\u00A3S_&\u00BE\u00D1\u00BE\u0089\u00B9\u00E1\u00FE\u00AF\u00F6|\u00A1\x14F[\u009A\u00EC\u00FB\u00E8\x13\x19\u0095I\b\u00AE\u00F0\u00F2J\u00C8F\x1D\x12S`\u0096\x019\x0BT\u00FE`\u00CCO\x10\u0084_\x02\u0097\u00C8\u00E4\u00E8\u0084\nR\u00B9\x15\u0098\u0087\u00B6}\u0091\u00CFh\u00CAqA\u00A6\u0099\u00AB\u0082\u00DD\x11e\u008B\u00EA\u00F4p\u009C\u009Ba+\u00C8\u00BDe\u008Ez\\G\x16=\x13\u0084Q\u00E0\x12\x19\u00D5\u00B3.&\u0095Oh\u00CEf\u009E\u00FF@H$Z\u00A1\u00BD\u0084[\u0087\t\u00A9\u00D7\u00F5\u00CC!\u008CjFXN\u00CC+\u00C0m\u00D7\x10\u0084w\u008FOdrX38\u0096_\u00A0\u00D8\u00BB\u00F6gl\u00D0\u00FC3\u00D5c\u00AE\u00AD\u00A5O\u0096\u00B54?\x13\u00CFmb^C\x10\u00DE=\u00CA\x11]\u00D24`]pZ3\u00B51\x1DZ\x1AE\u00A5\u00CC)\u00D4\x19Y-f\u00B9M\u0085\u00A6R\x15\n\u00E5\u00E12\u009E\u00B6\u00B2\u0089\u00DC\x16\u00C7w\x11\x18A\u00B0\u00E3\u00B3dT&k\u00E6\u00B3!\x165\u00AC\u00C8\u00FD\b\u00FF\u009E\u00BA\u00D6E[E;CpT\u0086\u00C8\u0099\u00F8b\x04\u00C1\x01\u00A52^\u008EE]f.\u00C9\x0E\u00A6Q+\u00A6\u00A4"\u009D\u009F\u00B1\x1F\u00C0\u008A\u00D9\u0088\u00C0\bB?\x14KF\x19\u00BE\x13.\u00FA\x1C\u00A5+\u00A8\u009E\u00A6\u00C0"i<\u0091%=\u009D\u00C2I]\u0087\u009ED1\u00EE\u00D0y\u00DFu\x04A\x00\u00A85~sT1\u00FF\u00DA\u00D3A\u00F1\u00B6\u00A8\x0B\x10\u0090\u00A5\u00A3\u00A2Y\t\u00E1h,\u0080}\u00FE\x11\u00CE\u00B5\x1DW\u0089&\t\u0082\u009F\u0090B\u00E2Q\u00EB\x16\b\u00E7\u00B4\x15\u008E\u00C2\tm/\u0084\u00B57f\u0096\u00ADML6\u00CC\x0E\u00EC\u00CD;\u00CFH\x15\x04\x12\u00A1\u00BB\x15\u00AC\u0099ka\u00CC@h\u00CCu\x10[\u00E3:>+\u00EA\x04S\x17\u00BD\x0B\u00A5\u00E9\u00D7\u00A9{\x12\u00FFby\u0095\u00CC^A\u00A0A\u00F5\u00C9`\u00CA\u00D4r|\x16\u008E0%\u00C2\x0ET=\r*@\u00DCb\u00AD\u0086\u009AXx9\u00E5^\x05A\u00E8!Fd\x14\u00CAG\u00C9-4\u00A9p\u00AF\u00BF:\x1BuZ\x04A\u00F0\x10\u00BB\u00B9[\u009B\u00C1\u00E9\u00B9`\u00AEV\u00C7-0W\u00E6\u00DA\u00A9\u0082\u00F0.H\u00D9AR\u00E7\u00B6p\u00B2`*&\u00B5\u00CE 0\u00E6\x02KA\x10\b\u00C4N\u00970+\x10\u009C\u00B1L\u009D\u00B8sa\u00F4^\u00C8"0\u0082\x10\x01\u0087\u00C8\u00A8\x11\u00F9h\n\u00A6e\t)\u00F7 \b\x02\u0082k\u00C3\u00FD\x16m\u00DC\u00C6\u0085\u009E:Q3j\u00F5t\u0086K`^E`\x04!\x1D.K\x06\u00C3]\fJ\u00A1\u00ED/\x1A\u00A3\u00D3\u00EBz\u00A85cm\x18\u009D\u00C9\u009B\u00B3\u00F2\u00BB \u00BC\x1Br\u0088\u008CBu|9\u008BB\r\u00C1\x01\u00ED/#\b\x02\x03\\\u00D3%\x13\u00BD\u00A8\u0091k_\u0099\u00DC\\\u00A1>\u00EFR\x04F\x10x\u00C9e\u00C9`\u00CA\u00C0\u008D\u00E5\u0087DoL\u00BE\x15\u00DF\u008B \u00E4a\b\u0091\u00D1\u008CIl\u00B4\u00B8\u00EC\u00C4r\x11\u0084\u00BC\f)2\u009A\x12\u00ED\u0093<\u00B4\u00CF\u00E6\b\u00E2\u00B2\x17\u00CBE\x10\u0086\u00E1\x1E"\u0083\u00A9@lV\x19\x05\u00E7\b\x16\u008B\u00ADJ\u009E \b\u0099\u00B9\u00B7\u00C8`J\u00B4m\u00A9\u00AB\x12\u009E\u008B+\u00DA\u00E5\u00A0\u00B5\u0084\u00BC\x05A\x18\u00981\u0089L\x1F8\x19\x0Foe\u008A\u00B7\u00ED|\u00EF[\u009A\n\u00C2h\u0099\u0082\u00C8\b\u00820U\u0094R\u00FF\x07\u00D9\x17)\t\bz\u008B\u0083\x00\x00\x00\x00IEND\u00AEB`\u0082';
var table1252 = {
    "€": 128,
    "‚": 130,
    "ƒ": 131,
    "„": 132,
    "…": 133,
    "†": 134,
    "‡": 135,
    "ˆ": 136,
    "‰": 137,
    "Š": 138,
    "‹": 139,
    "Œ": 140,
    "Ž": 142,
    "‘": 145,
    "’": 146,
    "“": 147,
    "”": 148,
    "•": 149,
    "–": 150,
    "—": 151,
    "˜": 152,
    "™": 153,
    "š": 154,
    "›": 155,
    "œ": 156,
    "ž": 158,
    "Ÿ": 159,
    "¡": 161,
    "¢": 162,
    "£": 163,
    "¤": 164,
    "¥": 165,
    "¦": 166,
    "§": 167,
    "¨": 168,
    "©": 169,
    "ª": 170,
    "«": 171,
    "¬": 172,
    "�­": 173,
    "®": 174,
    "¯": 175,
    "°": 176,
    "±": 177,
    "²": 178,
    "³": 179,
    "´": 180,
    "µ": 181,
    "¶": 182,
    "·": 183,
    "¸": 184,
    "¹": 185,
    "º": 186,
    "»": 187,
    "¼": 188,
    "½": 189,
    "¾": 190,
    "¿": 191,
    "À": 192,
    "Á": 193,
    "Â": 194,
    "Ã": 195,
    "Ä": 196,
    "Å": 197,
    "Æ": 198,
    "Ç": 199,
    "È": 200,
    "É": 201,
    "Ê": 202,
    "Ë": 203,
    "Ì": 204,
    "Í": 205,
    "Î": 206,
    "Ï": 207,
    "Ð": 208,
    "Ñ": 209,
    "Ò": 210,
    "Ó": 211,
    "Ô": 212,
    "Õ": 213,
    "Ö": 214,
    "×": 215,
    "Ø": 216,
    "Ù": 217,
    "Ú": 218,
    "Û": 219,
    "Ü": 220,
    "Ý": 221,
    "Þ": 222,
    "ß": 223,
    "à": 224,
    "á": 225,
    "â": 226,
    "ã": 227,
    "ä": 228,
    "å": 229,
    "æ": 230,
    "ç": 231,
    "è": 232,
    "é": 233,
    "ê": 234,
    "ë": 235,
    "ì": 236,
    "í": 237,
    "î": 238,
    "ï": 239,
    "ð": 240,
    "ñ": 241,
    "ò": 242,
    "ó": 243,
    "ô": 244,
    "õ": 245,
    "ö": 246,
    "÷": 247,
    "ø": 248,
    "ù": 249,
    "ú": 250,
    "û": 251,
    "ü": 252,
    "ý": 253,
    "þ": 254,
    "ÿ": 255
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var getOS = function () {
    if ($.os.indexOf('Win') != -1)
        return 'Win';
    return 'Mac';
};
var getAssetsPath = function () {
    var nameNoSpaces = 'Caspion'.replace(/\s+/g, '');
    return ($.fileName.toString().replace("".concat(nameNoSpaces, "_v1.1.0.jsx"), '') +
        "".concat(nameNoSpaces, "_v1.1.0 Assets"));
};
var openFs = function (path) {
    var folder = Folder(path);
    var cmd = getOS() === 'Win'
        ? 'explorer ' + Folder.decode(folder.fsName)
        :
            'open "' + Folder.execute(folder.fsName) + '"';
    system.callSystem(cmd);
};
var createFolder = function (folderObj) {
    if (!folderObj.exists)
        folderObj.create();
    return folderObj;
};
var readPrefs = function () {
    var docsFolder = File(Folder.myDocuments.toString()).toString();
    var file = File(docsFolder + '/Caspion/Prefs/Prefs.json');
    file.open('r');
    var stringData = file.read();
    file.close();
    return stringData;
};
var parsePrefs = function () {
    var stringData = readPrefs();
    var parsedData = JSON.parse(stringData);
    return parsedData;
};
var setUpPrefs = function () {
    var docsFolder = File(Folder.myDocuments.toString()).toString();
    createFolder(Folder(docsFolder + '/Caspion'));
    createFolder(Folder(docsFolder + '/Caspion/Prefs'));
    var myJSON = File(docsFolder + '/Caspion/Prefs/Prefs.json');
    var boilerplatePrefs = {
        version: '1.1.0',
        iconsLabelIndex: 5,
        locsLabelIndex: 13,
        texLabelIndex: 2,
        showHelpTips: true
    };
    if (myJSON.exists) {
        var parsedPrefs = parsePrefs();
        parsedPrefs.version = '1.1.0';
        myJSON.open('w');
        myJSON.write(JSON.stringify(__assign(__assign({}, boilerplatePrefs), parsedPrefs), null, 2));
        myJSON.close();
    }
    else {
        myJSON.open('w');
        myJSON.write(JSON.stringify(boilerplatePrefs, null, 2));
        myJSON.close();
    }
};
var writePrefsToMemory = function (prefs) {
    var docsFolder = File(Folder.myDocuments.toString()).toString();
    createFolder(Folder(docsFolder + '/Caspion'));
    createFolder(Folder(docsFolder + '/Caspion/Prefs'));
    var myJSON = File(docsFolder + '/Caspion/Prefs/Prefs.json');
    var parsedPrefs = parsePrefs();
    myJSON.open('w');
    myJSON.write(JSON.stringify(__assign(__assign({}, parsedPrefs), prefs), null, 2));
    myJSON.close();
    return myJSON;
};
var writeBinaryImageDataToFile = function (binary, path) {
    var file = File(path);
    file.open('w');
    file.encoding = 'BINARY';
    file.write(binary);
    file.close();
    return file;
};
var createPathGrp = function (contents, name, hasFill, hasStroke, fillColor, strokeColor, strokeSize, vertices, inTangents, outTangents, pathClosed, position) {
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = name;
    var grpContents = contents
        .property(name)
        .property('Contents');
    var pathGrp = grpContents.addProperty('ADBE Vector Shape - Group');
    var pathProp = pathGrp.property('ADBE Vector Shape');
    var pathShape = new Shape();
    pathShape.vertices = vertices;
    pathShape.inTangents = inTangents;
    pathShape.outTangents = outTangents;
    pathShape.closed = pathClosed;
    pathProp.setValue(pathShape);
    if (hasStroke) {
        var strokeGrp = grpContents.addProperty('ADBE Vector Graphic - Stroke');
        var colorProp = strokeGrp.property('ADBE Vector Stroke Color');
        var mappedColor = strokeColor.map(function (c) { return c / 255; });
        colorProp.setValue(mappedColor);
        var strokeSizeProp = strokeGrp.property('ADBE Vector Stroke Width');
        strokeSizeProp.setValue(strokeSize);
    }
    if (hasFill) {
        var fillGrp = grpContents.addProperty('ADBE Vector Graphic - Fill');
        var colorProp = fillGrp.property('ADBE Vector Fill Color');
        var mappedColor = fillColor.map(function (c) { return c / 255; });
        colorProp.setValue(mappedColor);
    }
    var positionProp = grp
        .property('ADBE Vector Transform Group')
        .property('ADBE Vector Position');
    positionProp.setValue(position);
};
var createAnimatedMap = function (name, vertices, inTangents, outTangents) {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var shapeLayer = comp.layers.addShape();
    shapeLayer.name = name;
    var contents = shapeLayer.property('Contents');
    createPathGrp(contents, "".concat(name, "_Stroke"), false, true, [0, 0, 0], [255, 255, 255], 10, vertices, inTangents, outTangents, true, [0, 0]);
    createPathGrp(contents, "".concat(name, "_Fill"), true, false, [202, 5, 5], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    var fillOpacity = contents
        .property("".concat(name, "_Fill"))
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Fill')
        .property('ADBE Vector Fill Opacity');
    fillOpacity.setValueAtTime(0, 0);
    fillOpacity.setValueAtTime((1 / comp.frameRate) * 14, 50);
    fillOpacity.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    fillOpacity.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    var myStroke = contents
        .property("".concat(name, "_Stroke"))
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Stroke');
    var dashesProp = myStroke.property('ADBE Vector Stroke Dashes');
    var dashOne = dashesProp.addProperty('ADBE Vector Stroke Dash 1');
    dashOne.setValue(60);
    var gapOne = dashesProp.addProperty('ADBE Vector Stroke Gap 1');
    gapOne.setValue(25);
    var dashOffset = dashesProp.addProperty('ADBE Vector Stroke Offset');
    dashOffset.expression = 'time * -50';
    var lineCapProp = myStroke.property('ADBE Vector Stroke Line Cap');
    lineCapProp.setValue(2);
    var lineJoinProp = myStroke.property('ADBE Vector Stroke Line Join');
    lineJoinProp.setValue(2);
    var parentGrp = contents
        .property("".concat(name, "_Stroke"))
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 66)], [new KeyframeEase(0.5, 66)]);
};
var createIconCircle = function (contents, circleColorRgb, size) {
    var vertices = [
        [size, 0],
        [0, size],
        [-size, 0],
        [0, -size]
    ];
    var inTangents = [
        [0, -(size / 1.8)],
        [size / 1.8, 0],
        [0, size / 1.8],
        [-(size / 1.8), 0]
    ];
    var outTangents = [
        [0, size / 1.8],
        [-(size / 1.8), 0],
        [0, -(size / 1.8)],
        [size / 1.8, 0]
    ];
    createPathGrp(contents, 'Circle', true, false, circleColorRgb, circleColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
};
var getFontFromLanguage = function (lang) {
    if (lang === 'English') {
        return 'TradeGothicLT-BoldCondTwenty';
    }
    else if (lang === 'Hebrew') {
        return 'NarkisBlockCondensedMF-Bold';
    }
    else if (lang === 'Arabic') {
        return 'DroidArabicKufi-Bold';
    }
};
var getFontFromName = function (name) {
    if (name === 'Trade Gothic') {
        return 'TradeGothicLT-BoldCondTwenty';
    }
    else if (name === 'Narkis') {
        return 'NarkisBlockCondensedMF-Bold';
    }
    else if (name === 'Almoni') {
        return 'AlmoniNeueDL4.0AAA-Bold';
    }
    else if (name === 'Droid') {
        return 'DroidArabicKufi-Bold';
    }
    else if (name === 'Janna') {
        return 'JannaLT-Bold';
    }
};
var importGoogleMaps = function (location) {
    var keyState = ScriptUI.environment.keyboardState;
    var modKey = getOS() === 'Win' ? keyState.ctrlKey : keyState.metaKey;
    var whichMap = modKey ? 'Guide' : 'Clean';
    var mapItem = app.project.importFile(new ImportOptions(File("".concat(getAssetsPath(), "/Images/").concat(location, "_Map_").concat(whichMap, ".png"))));
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem))
        return;
    var mapLayer = comp.layers.add(mapItem);
    mapLayer.selected = true;
    app.executeCommand(2732);
};
var scaleWithOvershoot = function (layers) {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    if (layers.length === 0) {
        alert('No Layers Selected');
        return;
    }
    layers.forEach(function (sl) {
        var scaleProp = sl
            .property('ADBE Transform Group')
            .property('ADBE Scale');
        var origVal = scaleProp.value;
        var beforeKeys = 0;
        var numKeys = scaleProp.numKeys;
        for (var i = 1; i <= numKeys; i++) {
            var keyTime = scaleProp.keyTime(i);
            if (keyTime < comp.time)
                beforeKeys++;
        }
        scaleProp.setValueAtTime(comp.time, [0, 0]);
        scaleProp.setValueAtTime(comp.time + (1 / comp.frameRate) * 10, [
            origVal[0] + 3,
            origVal[1] + 3
        ]);
        scaleProp.setValueAtTime(comp.time + (1 / comp.frameRate) * 14, origVal);
        var easeIn = new KeyframeEase(0.5, 66);
        var easeOut = new KeyframeEase(0.75, 66);
        scaleProp.setTemporalEaseAtKey(beforeKeys + 1, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
        scaleProp.setTemporalEaseAtKey(beforeKeys + 2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
        scaleProp.setTemporalEaseAtKey(beforeKeys + 3, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
    });
};
var colorNameToRGB = function (name) {
    if (name === 'White') {
        return [255, 255, 255];
    }
    else if (name === 'Black') {
        return [0, 0, 0];
    }
    else if (name === 'Red') {
        return [197, 24, 24];
    }
};
var getLabelsFromPrefs = function () {
    $.appEncoding = 'CP1252';
    var sectionName = 'Label Preference Color Section 5';
    var prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;
    var keyName;
    var mypref;
    var resArray = [];
    for (var i = 1; i <= 16; i++) {
        keyName = 'Label Color ID 2 # ' + i.toString();
        mypref = app.preferences.getPrefAsString(sectionName, keyName, prefFile);
        var res = '';
        for (var j = 1; j < mypref.length; j++) {
            var charCode = mypref.charCodeAt(j);
            if (charCode > 254) {
                charCode = table1252[mypref[j]];
            }
            var newCode = charCode.toString(16).toUpperCase();
            if (newCode.toString().length === 1) {
                newCode = '0' + newCode;
            }
            res += newCode;
        }
        resArray.push(res);
    }
    return resArray;
};
var getLabelNamesFromPrefs = function () {
    var outputArray = [];
    var sectionName = 'Label Preference Text Section 7';
    var prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;
    for (var i = 1; i <= 16; i++) {
        var keyName = 'Label Text ID 2 # ' + i.toString();
        outputArray.push(app.preferences.getPrefAsString(sectionName, keyName, prefFile));
    }
    return outputArray;
};
var hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            Math.round(parseInt(result[1], 16)) / 255,
            Math.round(parseInt(result[2], 16)) / 255,
            Math.round(parseInt(result[3], 16)) / 255
        ]
        : null;
};
var rgbToHex = function (r, g, b) {
    var componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
};
var effectExists = function (matchName) {
    var fx = app.effects;
    var matches = fx.map(function (f) {
        return f.matchName;
    });
    alert(matches.toString());
    alert(matches.indexOf('Pseudo/textevo').toString());
    return matches.indexOf('Pseudo/textevo') > 0;
};
var introduceTextEvo = function () {
    var textevo = {
        binAsString: 'RIFX\x00\x00`\x0EFaFXhead\x00\x00\x00\x10\x00\x00\x00\x03\x00\x00\x00D\x00\x00\x00\x01\x01\x00\x00\x00LIST\x00\x00_\u00EAbescbeso\x00\x00\x008\x00\x00\x00\x01\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00]\u00A8\x00\x1D\u00F8R\x00\x00\x00\x00\x00d\x00d\x00d\x00d?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00FF\u00FF\u00FF\u00FFLIST\x00\x00\x00\u00ACtdsptdot\x00\x00\x00\x04\u00FF\u00FF\u00FF\u00FFtdpl\x00\x00\x00\x04\x00\x00\x00\x02LIST\x00\x00\x00@tdsitdix\x00\x00\x00\x04\u00FF\u00FF\u00FF\u00FFtdmn\x00\x00\x00(ADBE Effect Parade\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00@tdsitdix\x00\x00\x00\x04\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdsn\x00\x00\x00\bTextEvo\x00LIST\x00\x00\x00dtdsptdot\x00\x00\x00\x04\u00FF\u00FF\u00FF\u00FFtdpl\x00\x00\x00\x04\x00\x00\x00\x01LIST\x00\x00\x00@tdsitdix\x00\x00\x00\x04\u00FF\u00FF\u00FF\u00FFtdmn\x00\x00\x00(ADBE End of path sentinel\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00^nsspcfnam\x00\x00\x000\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\'jparTparn\x00\x00\x00\x04\x00\x00\x001tdmn\x00\x00\x00(Pseudo/textevo-0000\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00FF\u00FF\u00FF\u00FF\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0001\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nStrength\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0002\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nDelay\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C4z\x00\x00Dz\x00\x00\x00\x00\x00\x00B\u00C8\x00\x00?\u0080\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0003\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x07Direction\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x03\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pdnm\x00\x00\x00<Reading direction|reversed|Outward|Inward|Random|from index\x00tdmn\x00\x00\x00(Pseudo/textevo-0004\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nFrom index\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00F\x1C@\x00\x00\x00\x00\x00Dz\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0005\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nRandom Seed\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00F\x1C@\x00\x00\x00\x00\x00Dz\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0006\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rTransform\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0007\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rAnchorPoint\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0008\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nX\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0009\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nY\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0010\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nZ\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0011\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0012\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rPosition\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0013\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nX\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0014\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nY\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0015\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nZ\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0016\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0017\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rScale\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0018\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nScale\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00B\u00C8\x00\x00\x00\x02\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0019\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04Separate XYZ\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pdnm\x00\x00\x00\x01\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0020\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rSeparate XYZ\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0021\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nX\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00B\u00C8\x00\x00\x00\x02\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0022\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nY\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00B\u00C8\x00\x00\x00\x02\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0023\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nZ\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C6\u00EA`\x00F\u00EA`\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00B\u00C8\x00\x00\x00\x02\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0024\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0025\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0026\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rSkew\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0027\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03Angle\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0028\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03Axis\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0029\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0030\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rRotation\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0031\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03Rotation\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0032\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\r3D rotation\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0033\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03Rotation X\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0034\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03Rotation Y\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0035\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x03Rotation Z\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0036\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0037\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0038\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nOpacity\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00B\u00C8\x00\x00B\u00C8\x00\x00\x00\x02\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0039\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0040\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\rStyle\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0041\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nStroke Width\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C4z\x00\x00Dz\x00\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0042\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nLine Anchor\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00B\u00C8\x00\x00BH\x00\x00\x00\x02\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0043\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nTracking Amount\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C7}\u00E8\x00G}\u00E8\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0044\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06Line Spacing\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0045\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nCharacter Offset\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u00C7}\u00E8\x00G}\u00E8\x00\u00C2\u00C8\x00\x00B\u00C8\x00\x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0046\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\nCharacter Replace\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00G}\u00E8\x00\x00\x00\x00\x00E\u00CB \x00\x00\x00\x00\x00\x00\x02\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0047\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06Blur\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0048\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00pard\x00\x00\x00\u0094\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x0E\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x006\u00B8tdgptdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdmn\x00\x00\x00(Pseudo/textevo-0000\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00DAtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x03tdsn\x00\x00\x00\x01\x00\x00tdb4\x00\x00\x00|\u00DB\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x00\x00\x00\x02X?\x1A6\u00E2\u00EB\x1CC-?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x04\u00C0\u00C0\u00C0\u00FF\u00C0\u00C0\u00C0\x00\x00\x00\x00\u0080\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0001\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00F6tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\tStrength\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(@Y\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0002\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00F2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x06Delay\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\x00\x00\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0003\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D6tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\nDirection\x00tdb4\x00\x00\x00|\u00DB\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8?\x1A6\u00E2\u00EB\x1CC-?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0004\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00F8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x0BFrom index\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\x00\x00\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@\u008F@\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0005\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00F8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\fRandom Seed\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\x00\x00\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@\u008F@\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0006\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D6tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\nTransform\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0007\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\fAnchorPoint\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0008\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02X\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0009\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02Y\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0010\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02Z\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0011\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0012\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D6tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\tPosition\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0013\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02X\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0014\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02Y\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0015\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02Z\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0016\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0017\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x06Scale\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0018\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00F2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x06Scale\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(@Y\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0019\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00DAtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\rSeparate XYZ\x00\x00tdb4\x00\x00\x00|\u00DB\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8?\x1A6\u00E2\u00EB\x1CC-?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x04\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0020\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00DAtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\rSeparate XYZ\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0021\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02X\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(@Y\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0022\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02Y\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(@Y\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0023\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00EEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x02Z\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(@Y\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0024\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0025\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0026\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x05Skew\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0027\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x06Angle\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0028\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x05Axis\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0029\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0030\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D6tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\tRotation\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0031\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D6tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\tRotation\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0032\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\f3D rotation\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0033\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x0BRotation X\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0034\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x0BRotation Y\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0035\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x0BRotation Z\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0036\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0037\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0038\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00F4tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bOpacity\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(@Y\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\x00\x00\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0039\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(Pseudo/textevo-0040\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00D2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x06Style\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0041\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00FAtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\rStroke Width\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0042\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00F8tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\fLine Anchor\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(@I\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\x00\x00\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0043\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00FCtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x10Tracking Amount\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0044\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E2tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\rLine Spacing\x00\x00tdb4\x00\x00\x00|\u00DB\u0099\x00\x02\x00\x0F\x00\x03\u00FF\u00FF\u00FF\u00FF\x00\x00]\u00A8=\u009B|\u00DF\u00D9\u00D7\u00BD\u00BC?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x06\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x000\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0045\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00FEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x11Character Offset\x00\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\u00C0Y\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@Y\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0046\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00FEtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x12Character Replace\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\u00FF\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdum\x00\x00\x00\b\x00\x00\x00\x00\x00\x00\x00\x00tduM\x00\x00\x00\b@\u00B9d\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0047\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00DAtdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\x05Blur\x00\x00tdb4\x00\x00\x00|\u00DB\u0099\x00\x02\x00\x0F\x00\x03\u00FF\u00FF\u00FF\u00FF\x00\x00]\u00A8=\u009B|\u00DF\u00D9\u00D7\u00BD\u00BC?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00?\u00F0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x04\x06\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x000\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdmn\x00\x00\x00(Pseudo/textevo-0048\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00LIST\x00\x00\x00\u00E0tdbstdsb\x00\x00\x00\x04\x00\x00\x00\x01tdsn\x00\x00\x00\bTextEvo\x00tdb4\x00\x00\x00|\u00BD\u0099\x00\x01\x00\x01\x00\x00\x00\x01\x00\x04\x00\x00]\u00A8\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00cdat\x00\x00\x00(\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00tdpi\x00\x00\x00\x04\x00\x00\x00\x0Etdmn\x00\x00\x00(ADBE Group End\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00{"controlName":"TextEvo","matchname":"Pseudo/textevo","controlArray":[{"index":0,"name":"Strength","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":100,"smin":-100,"smax":100,"vmin":-100,"vmax":100,"precision":"0","percent":true,"pixel":false},{"index":1,"name":"Delay","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":1,"smin":0,"smax":100,"vmin":-1000,"vmax":1000,"precision":2,"percent":false,"pixel":false},{"index":2,"name":"Direction","hold":true,"parent":null,"type":"popup","keyframes":true,"invisible":false,"default":1,"options":"Reading direction|reversed|Outward|Inward|Random|from index"},{"index":3,"name":"From index","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":0,"smax":1000,"vmin":0,"vmax":10000,"precision":"0","percent":false,"pixel":false},{"index":4,"name":"Random Seed","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":0,"smax":1000,"vmin":0,"vmax":10000,"precision":0,"percent":false,"pixel":false},{"index":5,"name":"Transform","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"AnchorPoint","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"X","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":false,"pixel":false},{"index":1,"name":"Y","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":false,"pixel":false},{"index":2,"name":"Z","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":false,"pixel":false},{"type":"endgroup"},{"index":1,"name":"Position","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"X","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":false,"pixel":false},{"index":1,"name":"Y","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":false,"pixel":false},{"index":2,"name":"Z","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":false,"pixel":false},{"type":"endgroup"},{"index":2,"name":"Scale","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"Scale","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":100,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":true,"pixel":false},{"index":1,"name":"Separate XYZ","hold":true,"parent":null,"type":"checkbox","keyframes":true,"invisible":false,"default":false,"label":""},{"index":2,"name":"Separate XYZ","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"X","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":100,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":true,"pixel":false},{"index":1,"name":"Y","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":100,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":true,"pixel":false},{"index":2,"name":"Z","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":100,"smin":-100,"smax":100,"vmin":-30000,"vmax":30000,"precision":2,"percent":true,"pixel":false},{"type":"endgroup"},{"type":"endgroup"},{"index":3,"name":"Skew","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"Angle","hold":false,"parent":null,"type":"angle","keyframes":true,"default":0},{"index":1,"name":"Axis","hold":false,"parent":null,"type":"angle","keyframes":true,"default":0},{"type":"endgroup"},{"index":4,"name":"Rotation","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"Rotation","hold":false,"parent":null,"type":"angle","keyframes":true,"default":0},{"index":1,"name":"3D rotation","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"Rotation X","hold":false,"parent":null,"type":"angle","keyframes":true,"default":0},{"index":1,"name":"Rotation Y","hold":false,"parent":null,"type":"angle","keyframes":true,"default":0},{"index":2,"name":"Rotation Z","hold":false,"parent":null,"type":"angle","keyframes":true,"default":0},{"type":"endgroup"},{"type":"endgroup"},{"index":5,"name":"Opacity","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":100,"smin":0,"smax":100,"vmin":0,"vmax":100,"precision":2,"percent":true,"pixel":false},{"type":"endgroup"},{"index":6,"name":"Style","parent":null,"type":"group","container":null,"invisible":false},{"index":0,"name":"Stroke Width","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-1000,"vmax":1000,"precision":2,"percent":false,"pixel":false},{"index":1,"name":"Line Anchor","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":50,"smin":0,"smax":100,"vmin":0,"vmax":100,"precision":2,"percent":true,"pixel":false},{"index":2,"name":"Tracking Amount","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-65000,"vmax":65000,"precision":2,"percent":false,"pixel":false},{"index":3,"name":"Line Spacing","hold":false,"parent":null,"type":"point","keyframes":true,"invisible":false,"default_x":0,"default_y":0,"point_x":0,"point_y":0},{"index":4,"name":"Character Offset","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":-100,"smax":100,"vmin":-65000,"vmax":65000,"precision":2,"percent":false,"pixel":false},{"index":5,"name":"Character Replace","hold":false,"parent":null,"type":"slider","keyframes":true,"invisible":false,"default":0,"smin":0,"smax":6500,"vmin":0,"vmax":65000,"precision":2,"percent":false,"pixel":false},{"index":6,"name":"Blur","hold":false,"parent":null,"type":"point","keyframes":true,"invisible":false,"default_x":0,"default_y":0,"point_x":0,"point_y":0,"active":true},{"type":"endgroup"}]}',
        fileName: 'textevo.ffx',
        category: ''
    };
    textevo;
    {
        var textEvoData = new Object();
        textEvoData.defaultsSettings = {
            addKey: true,
            delay: 1.2,
            duration: 1,
            direction: 0,
            key1In: 0,
            key1Out: 0,
            key2In: 100,
            key2Out: 0,
            addExpression: false,
            autoAdjustDelay: true,
            expression: 'if(amp=.2,freq=1.5,decay=6,(n=0)<numKeys)if(n=nearestKey(time).index,key(n).time>time)n--;if(0==n)t=0;else t=time-key(n).time;if(0<n)v=velocityAtTime(key(n).time-thisComp.frameDuration/10),value+v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);else value;'
        };
        textEvoData.settingsFolder =
            Folder.myDocuments.absoluteURI + '/' + 'TextEvo';
        textEvoData.settingsPath =
            Folder.userData.absoluteURI + '/' + 'TextEvo';
        textEvoData.textPropMain = [
            [
                'ADBE Text Anchor Point 3D',
                'x=fx(8),y=fx(9),z=fx(10);v=[x,y,z];'
            ],
            ['ADBE Text Position 3D', 'x=fx(13),y=fx(14),z=fx(15);v=[x,y,z];'],
            [
                'ADBE Text Scale 3D',
                'if(fx(19).value){var x =fx(21);var y = fx(22); var z = fx(23); [x,y,z];}else{var xyz = fx(18);[xyz,xyz,xyz];}'
            ],
            ['ADBE Text Rotation', 'fx(31)'],
            ['ADBE Text Opacity', 'fx(38)'],
            ['ADBE Text Skew', 'fx(27)'],
            ['ADBE Text Skew Axis', 'fx(28)'],
            ['ADBE Text Stroke Width', 'fx(41)'],
            ['ADBE Text Line Anchor', 'fx(42)'],
            ['ADBE Text Tracking Amount', 'fx(43)'],
            ['ADBE Text Character Replace', 'fx(46)'],
            ['ADBE Text Character Offset', 'fx(45)'],
            ['ADBE Text Line Spacing', 'fx(44)'],
            ['ADBE Text Blur', 'fx(47)']
        ];
        textEvoData.textPropMainThreeD = [
            [
                'ADBE Text Anchor Point 3D',
                'x=fx(8),y=fx(9),z=fx(10);v=[x,y,z];'
            ],
            ['ADBE Text Position 3D', 'x=fx(13),y=fx(14),z=fx(15);v=[x,y,z];'],
            [
                'ADBE Text Scale 3D',
                'if(fx(19).value){var x =fx(21);var y = fx(22); var z = fx(23); [x,y,z];}else{var xyz = fx(18);[xyz,xyz,xyz];}'
            ],
            ['ADBE Text Rotation X', 'fx(33)'],
            ['ADBE Text Rotation Y', 'fx(34)'],
            ['ADBE Text Rotation', 'fx(35)'],
            ['ADBE Text Opacity', 'fx(38)'],
            ['ADBE Text Skew', 'fx(27)'],
            ['ADBE Text Skew Axis', 'fx(28)'],
            ['ADBE Text Stroke Width', 'fx(41)'],
            ['ADBE Text Line Anchor', 'fx(42)'],
            ['ADBE Text Tracking Amount', 'fx(43)'],
            ['ADBE Text Character Replace', 'fx(46)'],
            ['ADBE Text Character Offset', 'fx(45)'],
            ['ADBE Text Line Spacing', 'fx(44)'],
            ['ADBE Text Blur', 'fx(47)']
        ];
        textEvoData.ttExpression =
            '\nif(fx.active){\n    var v = fx(1);\n\nvar delay = fx(2);\nvar sens = parseInt(fx(3));\nvar demi = Math.ceil(textTotal / 2);\nvar fromIndex = fx(4);\nseedRandom(textIndex+fx(5),true);\n\nswitch (sens) {\n    case 1:\n        offset = (textIndex - 1) * thisComp.frameDuration * delay;\n        break;\n    case 2:\n        offset = (textTotal - textIndex) * thisComp.frameDuration * delay;\n        break;\n    case 3:\n        if (textTotal & 1) {\n            if (textIndex == demi) {\n                offset = 0\n            } else if (textIndex < demi) {\n                offset = (textTotal - textIndex - demi + 1) * thisComp.frameDuration * delay\n            } else {\n                offset = (textIndex - demi) * thisComp.frameDuration * delay\n            }\n        } else {\n            if (textIndex == demi || textIndex == demi + 1) {\n                offset = 0\n            } else if (textIndex < demi) {\n                offset = (textTotal - textIndex - demi) * thisComp.frameDuration * delay\n            } else {\n                offset = (textIndex - demi - 1) * thisComp.frameDuration * delay\n            }\n        }\n        break;\n    case 4:\n        if (textIndex <= textTotal / 2) {\n            offset = (textIndex - 1) * thisComp.frameDuration * delay\n        } else {\n            offset = (textTotal - textIndex) * thisComp.frameDuration * delay\n        }\n        break;\n    case 5:\n        offset = thisComp.frameDuration * random(delay * textTotal);\n        break;\n    case 6:\n        if (textIndex == fromIndex) {\n            offset = 0\n        } else if (textIndex < fromIndex) {\n            offset = (fromIndex - textIndex) * thisComp.frameDuration * delay\n        } else {\n            offset = (textIndex - fromIndex) * thisComp.frameDuration * delay\n        }\n        break\n}\nt = time - offset;\nv.valueAtTime(t)\n\t\n}else{\n    0;\n}\n';
        textEvoData.str = {};
        textEvoData.str.settingsAe =
            "Textevo and the DuAEF framework needs to be allowed to write files\nPlease, check the box called 'Allow Scripts to write files...' in the general preferences of After Effects.";
        textEvoData.str.removePreset =
            'Are you sure you want to delete this selection of presets? \nThis action is irreversible.';
        textEvoData.str.about =
            'Textevo is a text animation tool for after effects. It is mainly useful to break down text animation letters by letters, words by words or lines by lines. \n \n';
        textEvoData.str.about +=
            'Documentation : https://textevo.github.io/ \n \n';
        textEvoData.str.about +=
            'This script was made by Wlazinski Matthieu , with the help of the community: www.motion-cafe.com \n \n';
        textEvoData.str.about +=
            'This script makes use of DuAEF - The Duduf After Effects Framework, by Nicolas Dufresne and Contributors licensed under the GNU General Public License v3. \n \n';
        textEvoData.str.about +=
            'For more information: https://rainboxlab.org/ \n \nTo support Nicolas Dufresne: https://www.patreon.com/duduf \n';
    }
    function detectKeyState() {
        var touches = '';
        var keyState = ScriptUI.environment.keyboardState;
        if (keyState.shiftKey)
            touches += 'shift';
        if (keyState.altKey)
            touches += 'alt';
        if (keyState.ctrlKey)
            touches += 'ctrl';
        return touches;
    }
    function setKeyFrame(prop, value, time, easeIn, easeOut) {
        if (easeIn == 0) {
            easeIn = 0.1;
        }
        if (easeOut == 0) {
            easeOut = 0.1;
        }
        var easeInK = new KeyframeEase(0, easeIn);
        var easeOutK = new KeyframeEase(0, easeOut);
        prop.setValueAtTime(time, value);
        prop.setTemporalEaseAtKey(prop.nearestKeyIndex(time), [easeInK], [easeOutK]);
    }
    function addTextAnimatorProps(prop, nameFx, propArray) {
        for (var i = 0; i < propArray.length; i++) {
            var textProp = prop
                .property('ADBE Text Animator Properties')
                .addProperty(propArray[i][0]);
            textProp.expression =
                'var fx= effect("' + nameFx + '");' + propArray[i][1];
        }
    }
    function setTextAnimProps(layer, nameFx, threeD) {
        if (threeD == undefined) {
            threeD = layer.threeDPerChar;
        }
        var animTextMain = layer
            .property('ADBE Text Properties')
            .property('ADBE Text Animators')
            .addProperty('ADBE Text Animator');
        animTextMain.name = nameFx;
        var selectMainExpression = animTextMain
            .property('ADBE Text Selectors')
            .addProperty('ADBE Text Expressible Selector');
        selectMainExpression.name = 'textevo';
        selectMainExpression.property('ADBE Text Expressible Amount').expression =
            'var fx= effect("' + nameFx + '");' + textEvoData.ttExpression;
        if (threeD) {
            addTextAnimatorProps(animTextMain, nameFx, textEvoData.textPropMainThreeD);
        }
        else {
            addTextAnimatorProps(animTextMain, nameFx, textEvoData.textPropMain);
        }
        return selectMainExpression;
    }
    var writePresetFile = function (duBinaryFile, outputFileName) {
        var file = new File(outputFileName);
        if (file.exists)
            return file;
        if (!file.exists) {
            var folder = new Folder(file.path);
            if (!folder.exists) {
                folder.create();
            }
        }
        file.encoding = 'BINARY';
        if (file.open('w')) {
            var success = file.write(duBinaryFile.binAsString);
            file.close();
        }
        duBinaryFile = file;
        return file;
    };
    var getText = function (createTxt) {
        var comp = app.project.activeItem;
        if (createTxt == undefined)
            createTxt = false;
        if (comp == null)
            return null;
        if (app.project.activeItem.selectedLayers.length > 0 &&
            comp.selectedLayers[0]('ADBE Text Properties') !== null) {
            var ttext = comp.selectedLayers[0];
        }
        else if (createTxt) {
            var ttext = comp.layers.addText('Textevo');
            ttext.inPoint = comp.time;
        }
        else {
            return null;
        }
        return ttext;
    };
    var applyTextEvo = function () {
        var ttext = getText(true);
        if (ttext == null)
            return;
        app.executeCommand(2004);
        ttext.selected = true;
        var docsFolder = File(Folder.myDocuments.toString()).toString();
        var tePreset = writePresetFile(textevo, docsFolder + '/Caspion/Temp/TextEvo.ffx');
        ttext.applyPreset(tePreset);
        var tteProp = ttext('ADBE Effect Parade')(ttext('ADBE Effect Parade').numProperties);
        setTextAnimProps(ttext, tteProp.name);
        var currentTime = app.project.activeItem.time;
        if (detectKeyState().indexOf('alt')) {
            setKeyFrame(tteProp(1), 100, currentTime, 0, 0);
            setKeyFrame(tteProp(1), 0, currentTime + 1, 100, 0);
        }
        else {
            setKeyFrame(tteProp(1), 100, currentTime + 1, 0, 0);
            setKeyFrame(tteProp(1), 0, currentTime, 100, 0);
        }
        tteProp(2).setValue(1.2);
        app.executeCommand(2387);
    };
    applyTextEvo();
};
var generateCaspiQuote = function () {
    var quotes = ['1', '2', '3', '4'];
    var theQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(theQuote, 'Caspi Says:');
};
var createTvaiStroke = function () {
    app.beginUndoGroup('Caspion: Create Tunnel Stroke');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var layer = comp.layers.addShape();
    layer.name = 'Tunnel';
    var contents = layer.property('ADBE Root Vectors Group');
    var shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Tunnel_Stroke';
    var lineGrp = shapeGrp.property('ADBE Vectors Group');
    var pathGrp = lineGrp.addProperty('ADBE Vector Shape - Group');
    var linePath = pathGrp.property('ADBE Vector Shape');
    var size = comp.width;
    var myShape = new Shape();
    myShape.vertices = [
        [-(size / 2), 0],
        [size / 2, 0]
    ];
    myShape.closed = false;
    linePath.setValue(myShape);
    var myStroke = lineGrp.addProperty('ADBE Vector Graphic - Stroke');
    var strokeWidth = myStroke.property('ADBE Vector Stroke Width');
    strokeWidth.setValue(10);
    var dashesProp = myStroke.property('ADBE Vector Stroke Dashes');
    var dashOne = dashesProp.addProperty('ADBE Vector Stroke Dash 1');
    dashOne.setValue(25);
    var dashOffset = dashesProp.addProperty('ADBE Vector Stroke Offset');
    dashOffset.expression = 'time * effect("Speed")("Slider")';
    var slider = layer.effect.addProperty('ADBE Slider Control');
    slider.name = 'Speed';
    var sliderVal = slider.property('ADBE Slider Control-0001');
    sliderVal.setValue(-100);
    sliderVal.expression =
        'var endProp = content("Tunnel_Stroke").content("Trim Paths 1").end;\n' +
            'var speedSlider = effect("Speed")("Slider");\n' +
            'linear(endProp, 100, 0, 0, speedSlider)';
    var parentGrp = contents
        .property('Tunnel_Stroke')
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 88)], [new KeyframeEase(0.5, 88)]);
    layer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Group').selected = true;
    app.endUndoGroup();
};
var scaleWithOvershootQA = function () {
    app.beginUndoGroup('Caspion: Pop Animation');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var selLayers = comp.selectedLayers;
    if (selLayers.length === 0) {
        alert('No Layers Selected');
        return;
    }
    scaleWithOvershoot(selLayers);
    app.endUndoGroup();
};
var importLogos = function () {
    app.beginUndoGroup('Caspion: Import Logos');
    var idfItem = app.project.importFile(new ImportOptions(File("".concat(getAssetsPath(), "/Logos/IDF_Logo.png"))));
    var dotzItem = app.project.importFile(new ImportOptions(File("".concat(getAssetsPath(), "/Logos/Dotz_Logo.png"))));
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem))
        return;
    var idfLayer = comp.layers.add(idfItem);
    var padding = 200;
    var idfScale = idfLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    idfScale.setValue([4, 4]);
    var idfPos = idfLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    idfPos.setValue([comp.width - padding, 0 + padding]);
    var dotzLayer = comp.layers.add(dotzItem);
    var dotzScale = dotzLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    dotzScale.setValue([67, 67]);
    var dotzPos = dotzLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    dotzPos.setValue([0 + padding, 0 + padding]);
    app.endUndoGroup();
};
var createIllusText = function () {
    app.beginUndoGroup('Caspion: Create Illustration Text');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var textLayer = comp.layers.addText();
    var srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document');
    srcText.setValue('אילוסטרציה');
    var textDoc = srcText.value;
    textDoc.font = 'NarkisBlockCondensedMF-Bold';
    textDoc.fontSize = 100;
    textDoc.applyFill = true;
    textDoc.fillColor = [1, 1, 1];
    textDoc.applyStroke = false;
    textDoc.tracking = 0;
    srcText.setValue(textDoc);
    var boundingBox = textLayer.sourceRectAtTime(comp.time, false);
    var layerPos = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    var padding = 40;
    layerPos.setValue([-boundingBox.left + padding, comp.height - padding]);
    app.endUndoGroup();
};
var formatLayerName = function () {
    app.beginUndoGroup('Caspion: Format Layer Name');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var selLayers = comp.selectedLayers;
    if (selLayers.length === 0) {
        alert('No Layers Selected');
        return;
    }
    for (var i = 0; i < selLayers.length; i++) {
        var cur = selLayers[i];
        var name = cur.name;
        var capitalize = function (str) {
            return str
                .split(' ')
                .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
                .join(' ');
        };
        cur.name = capitalize(name).replace(/ /g, '_');
        if (cur instanceof AVLayer) {
            cur.source.name = cur.name;
        }
    }
    app.endUndoGroup();
};
var textReverse = function () {
    app.beginUndoGroup('Caspion: Reverse Text');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var selLayers = comp.selectedLayers;
    if (selLayers.length === 0) {
        alert('No Layers Selected');
        return;
    }
    for (var i = 0; i < selLayers.length; i++) {
        var curLayer = selLayers[i];
        if (curLayer instanceof TextLayer) {
            var srcTextProp = curLayer
                .property('ADBE Text Properties')
                .property('ADBE Text Document');
            var srcValue = srcTextProp.value.toString();
            var srcValueReverse = srcValue.split('').reverse().join('');
            srcTextProp.setValue(srcValueReverse.toString());
        }
    }
    app.endUndoGroup();
};
var createBg = function () {
    app.beginUndoGroup('Caspion: Create Background');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var layer = comp.layers.addShape();
    layer.name = 'BG';
    layer.label = 16;
    var contents = layer.property('ADBE Root Vectors Group');
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = 'Rectangle 1';
    var recGrp = grp.property('ADBE Vectors Group');
    var recShape = recGrp.addProperty('ADBE Vector Shape - Rect');
    var recSize = recShape.property('ADBE Vector Rect Size');
    recSize.setValue([comp.width, comp.height]);
    var gFill = recGrp.addProperty('ADBE Vector Graphic - G-Fill');
    var gradType = gFill.property('ADBE Vector Grad Type');
    gradType.setValue(2);
    var endPoint = gFill.property('ADBE Vector Grad End Pt');
    var endPointPos = comp.width >= comp.height ? [comp.width / 2, 0] : [0, comp.height / 2];
    endPoint.setValue(endPointPos);
    var fx = layer.property('ADBE Effect Parade');
    var tint = fx.addProperty('ADBE Tint');
    var tintBlack = tint.property('ADBE Tint-0001');
    var tintWhite = tint.property('ADBE Tint-0002');
    tintWhite.setValue([118 / 255, 15 / 255, 15 / 255]);
    tintBlack.setValue([25 / 255, 0, 0]);
    app.endUndoGroup();
};
var createIsraelMap = function () {
    app.beginUndoGroup('Caspion: Create Israel Map');
    var vertices = [
        [163.25, -515.875],
        [150.375, -508.625],
        [140.625, -513.75],
        [131.875, -477.625],
        [125.75, -463.25],
        [113, -462.875],
        [92.125, -456.625],
        [76.5, -469.375],
        [33.7499847412109, -465.25],
        [33.7499847412109, -438.75],
        [31.2500152587891, -391],
        [0.5, -393.5],
        [-174, 22.0001220703125],
        [-107.5, 199.5],
        [-102.5, 242.75],
        [-25.5000152587891, 450],
        [-18.4999847412109, 487],
        [-21.75, 498.25],
        [-12.9999694824219, 523.25],
        [14.7499542236328, 471.750061035156],
        [26.2499694824219, 422.000061035156],
        [32.5, 390.749938964844],
        [44.0000457763672, 366.750061035156],
        [43.6249389648438, 342.75],
        [45.625, 304.749938964844],
        [55.4999389648438, 282.750061035156],
        [54.4999847412109, 252.750061035156],
        [57.875, 225.625],
        [78.75, 178.000122070312],
        [90, 164.375],
        [88.75, 151.375],
        [99.625, 130.75],
        [112.375, 107.125],
        [112.625, 74.2498779296875],
        [104.125, 38.6246948242188],
        [120.125, 2.375],
        [124.25, -52.5],
        [141, -98.5],
        [131.5, -173],
        [141.25, -216.000122070312],
        [139, -267],
        [144, -315.375],
        [142, -342.5],
        [204.375, -395.625],
        [222, -430.5],
        [203.875, -467.75],
        [192.625, -515.5],
        [185.75, -531.75]
    ];
    var inTangents = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [15, 0],
        [136.345733642578, -103.107299804688],
        [-6, -14.5],
        [0, 0],
        [-3.99998474121094, -14.0000610351562],
        [-0.25001525878906, -5.5],
        [-0.74998474121094, -3],
        [0, 0],
        [-2.87495422363281, 8.62493896484375],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ];
    var outTangents = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [-10.6641082763672, 56.8751831054688],
        [20.5, 56.4998779296875],
        [6, 14.5],
        [0, 0],
        [0, 0],
        [0.24996948242188, 5.5],
        [0.75004577636719, 3],
        [0, 0],
        [0, 0],
        [1.27046203613281, -3.81146240234375],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ];
    createAnimatedMap('Israel_Map', vertices, inTangents, outTangents);
    app.endUndoGroup();
};
var createGazaMap = function () {
    app.beginUndoGroup('Caspion: Create Gaza Map');
    var vertices = [
        [209.749725341797, -480.25],
        [128.999969482422, -358],
        [34.9997253417969, -236.500030517578],
        [-200.499862670898, 27.0000915527344],
        [-384.75, 215.25],
        [-348.75, 282],
        [-339.25, 283.25],
        [-279.75, 480.25],
        [-229.25, 427.25],
        [-166.25, 394],
        [-113.000061035156, 327],
        [-61.4999694824219, 297.75],
        [-46.7499084472656, 256.5],
        [-65.5000915527344, 111.25],
        [-51.7500610351562, 94.25],
        [-40.7499694824219, 63.5],
        [-32.4999389648438, 42.5],
        [-7.5, 19.4994812011719],
        [21.7500915527344, -17.2499084472656],
        [41.2499694824219, -34.7502746582031],
        [78.0000915527344, -63.2501831054688],
        [87.5, -81.9997863769531],
        [110.499786376953, -95.9999694824219],
        [185.999847412109, -183.250061035156],
        [255.250091552734, -241.000427246094],
        [286.500091552734, -246.750015258789],
        [305.749969482422, -261.75],
        [334.749969482422, -272.75],
        [361.249969482422, -315],
        [376.999969482422, -342.75]
    ];
    var inTangents = [
        [0, 0],
        [16, -17],
        [20.0003051757812, -24.9999694824219],
        [26.1709289550781, -21.6585388183594],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-3, -10.75],
        [-6.25, 7],
        [-32.25, 16],
        [-4.99993896484375, 4.5],
        [-4.75006103515625, 2.75],
        [-1.75006103515625, 9.5],
        [0.7501220703125, 10.75],
        [-5.24990844726562, 2.5],
        [-8.00003051757812, 7],
        [-1.00006103515625, 3],
        [-6.25, 6.50033569335938],
        [-11.5, 7.50003051757812],
        [-5.74993896484375, 5.750244140625],
        [-5.25009155273438, 4.50042724609375],
        [-4.75021362304688, 5.99954223632812],
        [-13.4996948242188, 4.75009155273438],
        [-19.249755859375, 11.0000915527344],
        [-8.25, 4.25041198730469],
        [-3.5001220703125, 1.49983215332031],
        [-7.2498779296875, 5.25],
        [-3.5, 5],
        [-11.5, 8.5],
        [0, 0]
    ];
    var outTangents = [
        [0, 0],
        [-14.5387573242188, 15.4473876953125],
        [-19.9996643066406, 25.0000305175781],
        [-29.0001373291016, 23.9999084472656],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [5.75, -3.5],
        [6.25, -7],
        [32.2499694824219, -16],
        [4.99996948242188, -4.5],
        [4.75, -2.75],
        [-0.74993896484375, -10.75],
        [1.74981689453125, -9.5],
        [5.25003051757812, -2.5],
        [7.9998779296875, -7],
        [1.00003051757812, -3],
        [6.24990844726562, -6.49966430664062],
        [11.4999694824219, -7.50054931640625],
        [5.74990844726562, -5.749755859375],
        [5.24984741210938, -4.49981689453125],
        [4.74993896484375, -6.00039672851562],
        [13.5004577636719, -4.74996948242188],
        [19.2501220703125, -10.9999694824219],
        [8.2498779296875, -4.249755859375],
        [3.499755859375, -1.50028991699219],
        [7.25, -5.25],
        [3.5, -5],
        [11.5, -8.5],
        [0, 0]
    ];
    createAnimatedMap('Gaza_Map', vertices, inTangents, outTangents);
    app.endUndoGroup();
};
var createCountingText = function () {
    app.beginUndoGroup('Caspion: Counting Numbers');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var layer = comp.layers.addText();
    layer.name = 'Numbers';
    var fx = layer.property('ADBE Effect Parade');
    var numFx = fx.addProperty('ADBE Numbers2');
    var decPointsProp = numFx.property('ADBE Numbers2-0004');
    decPointsProp.setValue(0);
    var fillProp = numFx.property('ADBE Numbers2-0008');
    fillProp.setValue([255, 255, 255]);
    var sizeProp = numFx.property('ADBE Numbers2-0006');
    sizeProp.setValue(150);
    var numValProp = numFx.property('ADBE Numbers2-0003');
    numValProp.setValueAtTime(0, 0);
    numValProp.setValueAtTime((1 / comp.frameRate) * 40, 99);
    numValProp.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 20)]);
    numValProp.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 75)]);
    app.endUndoGroup();
};
var importIsraelGoogleMaps = function () {
    app.beginUndoGroup('Caspion: Import Israel Map');
    importGoogleMaps('Israel');
    app.endUndoGroup();
};
var importGazaGoogleMaps = function () {
    app.beginUndoGroup('Caspion: Import Gaza Map');
    importGoogleMaps('Gaza');
    app.endUndoGroup();
};
var createAnimatedFrame = function () {
    app.beginUndoGroup('Caspion: Animated Frame');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var layer = comp.layers.addShape();
    layer.name = 'Frame';
    var contents = layer.property('ADBE Root Vectors Group');
    var shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Frame';
    var xSlider = layer.effect.addProperty('ADBE Slider Control');
    xSlider.name = 'Size X';
    var xSliderProp = xSlider.property('ADBE Slider Control-0001');
    xSliderProp.setValue(100);
    var ySlider = layer.effect.addProperty('ADBE Slider Control');
    ySlider.name = 'Size Y';
    var ySliderProp = ySlider.property('ADBE Slider Control-0001');
    ySliderProp.setValue(100);
    var lineGrp = shapeGrp.property('ADBE Vectors Group');
    var rectGrp = lineGrp.addProperty('ADBE Vector Shape - Rect');
    var rectSize = rectGrp.property('ADBE Vector Rect Size');
    rectSize.expression =
        '[effect("Size X")("Slider"), effect("Size Y")("Slider")]';
    var myStroke = lineGrp.addProperty('ADBE Vector Graphic - Stroke');
    var strokeWidth = myStroke.property('ADBE Vector Stroke Width');
    strokeWidth.setValue(10);
    var strokeColor = myStroke.property('ADBE Vector Stroke Color');
    strokeColor.setValue([1, 1, 1]);
    var parentGrp = contents
        .property('Frame')
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 34)], [new KeyframeEase(0.5, 34)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 92)], [new KeyframeEase(0.5, 92)]);
    var trimPathsOffset = trimPathsGrp.property('ADBE Vector Trim Offset');
    trimPathsOffset.setValueAtTime(0, -324);
    trimPathsOffset.setValueAtTime((1 / comp.frameRate) * 32, 0);
    trimPathsOffset.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 24)], [new KeyframeEase(0.5, 24)]);
    trimPathsOffset.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 72)], [new KeyframeEase(0.5, 72)]);
    app.endUndoGroup();
};
var openProjectInFinder = function () {
    var containsHebrew = function (str) { return /[\u0590-\u05FF]/.test(str); };
    var writeSelectDialogToPrefs = function () {
        var selFolder = Folder.selectDialog('Select Project Folder');
        if (!selFolder)
            return;
        if (containsHebrew(selFolder.fsName)) {
            alert("Sorry, can't choose this folder beacuse it contains Hebrew characters");
            return;
        }
        writePrefsToMemory({ projectFolderPath: selFolder.fsName });
    };
    var keyState = ScriptUI.environment.keyboardState;
    var modKey = getOS() === 'Win' ? keyState.ctrlKey : keyState.metaKey;
    if (modKey) {
        writeSelectDialogToPrefs();
    }
    else {
        var parsedPrefs = parsePrefs();
        var path = parsedPrefs.projectFolderPath;
        if (!path) {
            var conf = confirm('No folder selected yet.\nWould you like to choose now?');
            if (conf)
                writeSelectDialogToPrefs();
        }
        else {
            openFs(path);
        }
    }
};
var createTatzaPath = function () {
    app.beginUndoGroup('Caspion: Location Mark');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var layer = comp.layers.addShape();
    layer.name = 'Location_Mark';
    var contents = layer.property('ADBE Root Vectors Group');
    var shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Location_Mark_Stroke';
    var lineGrp = shapeGrp.property('ADBE Vectors Group');
    var pathGrp = lineGrp.addProperty('ADBE Vector Shape - Group');
    var linePath = pathGrp.property('ADBE Vector Shape');
    var myShape = new Shape();
    var baseNum = Math.min(comp.width, comp.height) / 4;
    myShape.vertices = [
        [baseNum, -baseNum],
        [baseNum, baseNum],
        [-baseNum, baseNum],
        [-baseNum, -baseNum]
    ];
    myShape.closed = true;
    linePath.setValue(myShape);
    var myStroke = lineGrp.addProperty('ADBE Vector Graphic - Stroke');
    var strokeWidth = myStroke.property('ADBE Vector Stroke Width');
    strokeWidth.setValue(10);
    var dashesProp = myStroke.property('ADBE Vector Stroke Dashes');
    var dashOne = dashesProp.addProperty('ADBE Vector Stroke Dash 1');
    dashOne.setValue(25);
    var dashOffset = dashesProp.addProperty('ADBE Vector Stroke Offset');
    dashOffset.expression = 'time * effect("Speed")("Slider")';
    var slider = layer.effect.addProperty('ADBE Slider Control');
    slider.name = 'Speed';
    var sliderVal = slider.property('ADBE Slider Control-0001');
    sliderVal.setValue(-100);
    sliderVal.expression =
        'var endProp = content("Location_Mark_Stroke").content("Trim Paths 1").end;\n' +
            'var speedSlider = effect("Speed")("Slider");\n' +
            'linear(endProp, 100, 0, 0, speedSlider)';
    var parentGrp = contents
        .property('Location_Mark_Stroke')
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 88)], [new KeyframeEase(0.5, 88)]);
    layer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Group').selected = true;
    app.endUndoGroup();
};
var recScaleX = function () {
    app.beginUndoGroup('Caspion: Create Background');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var layer = comp.layers.addShape();
    layer.name = 'Rec';
    var xSlider = layer.effect.addProperty('ADBE Slider Control');
    xSlider.name = 'Size X';
    var xSliderProp = xSlider.property('ADBE Slider Control-0001');
    xSliderProp.setValue(100);
    var ySlider = layer.effect.addProperty('ADBE Slider Control');
    ySlider.name = 'Size Y';
    var ySliderProp = ySlider.property('ADBE Slider Control-0001');
    ySliderProp.setValue(100);
    var contents = layer.property('ADBE Root Vectors Group');
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = 'Rectangle 1';
    var recGrp = grp.property('ADBE Vectors Group');
    var recShape = recGrp.addProperty('ADBE Vector Shape - Rect');
    var recSize = recShape.property('ADBE Vector Rect Size');
    recSize.expression =
        '[effect("Size X")("Slider"), effect("Size Y")("Slider")]';
    var myFill = recGrp.addProperty('ADBE Vector Graphic - Fill');
    var fillColor = myFill.property('ADBE Vector Fill Color');
    fillColor.setValue([1, 1, 1]);
    var scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    scaleProp.setValueAtTime(0, [0, 100]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 14, [100, 100]);
    var ease1 = new KeyframeEase(0.5, 65);
    var ease2 = new KeyframeEase(0.5, 92);
    scaleProp.setTemporalEaseAtKey(1, [ease1, ease1, ease1], [ease1, ease1, ease1]);
    scaleProp.setTemporalEaseAtKey(2, [ease2, ease2, ease2], [ease2, ease2, ease2]);
    app.endUndoGroup();
};
var createTextOnLocation = function () {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var promptVal = prompt('Write Text Here:', '');
    app.beginUndoGroup('Caspion: Text On Location');
    var circleLayer = comp.layers.addShape();
    circleLayer.name = "".concat(promptVal, " - Circle");
    var circleContents = circleLayer.property('ADBE Root Vectors Group');
    var circleShapeGrp = circleContents.addProperty('ADBE Vector Group');
    circleShapeGrp.name = 'Circle';
    var circleInnerShapeGrp = circleShapeGrp.property('ADBE Vectors Group');
    var circleEllipseGrp = circleInnerShapeGrp.addProperty('ADBE Vector Shape - Ellipse');
    var circleEllipseSize = circleEllipseGrp.property('ADBE Vector Ellipse Size');
    circleEllipseSize.setValue([50.4149, 50.4149]);
    var circleStroke = circleInnerShapeGrp.addProperty('ADBE Vector Graphic - Stroke');
    var circleStrokeWidth = circleStroke.property('ADBE Vector Stroke Width');
    circleStrokeWidth.setValue(14);
    var circleScale = circleLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    circleScale.setValueAtTime(0, [0, 0]);
    circleScale.setValueAtTime((1 / comp.frameRate) * 7, [114.3096, 114.3096]);
    circleScale.setValueAtTime((1 / comp.frameRate) * 15, [92.2582, 92.2582]);
    circleScale.setValueAtTime((1 / comp.frameRate) * 22, [104.8933, 104.8933]);
    circleScale.setValueAtTime((1 / comp.frameRate) * 28, [98.3702, 98.3702]);
    circleScale.setValueAtTime((1 / comp.frameRate) * 36, [100, 100]);
    var scaleEase1 = new KeyframeEase(0.5, 56);
    var scaleEase2 = new KeyframeEase(0.5, 57);
    var scaleEase3 = new KeyframeEase(0.5, 52.5);
    var scaleEase4 = new KeyframeEase(0.5, 48);
    var scaleEase5 = new KeyframeEase(0.5, 45);
    var scaleEase6 = new KeyframeEase(0.5, 47);
    circleScale.setTemporalEaseAtKey(1, [scaleEase1, scaleEase1, scaleEase1], [scaleEase1, scaleEase1, scaleEase1]);
    circleScale.setTemporalEaseAtKey(2, [scaleEase2, scaleEase2, scaleEase2], [scaleEase2, scaleEase2, scaleEase2]);
    circleScale.setTemporalEaseAtKey(3, [scaleEase3, scaleEase3, scaleEase3], [scaleEase3, scaleEase3, scaleEase3]);
    circleScale.setTemporalEaseAtKey(4, [scaleEase4, scaleEase4, scaleEase4], [scaleEase4, scaleEase4, scaleEase4]);
    circleScale.setTemporalEaseAtKey(5, [scaleEase5, scaleEase5, scaleEase5], [scaleEase5, scaleEase5, scaleEase5]);
    circleScale.setTemporalEaseAtKey(6, [scaleEase6, scaleEase6, scaleEase6], [scaleEase6, scaleEase6, scaleEase6]);
    var circlePos = circleLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    circlePos.setValue([621.2241, 597.2879]);
    var lineLayer = comp.layers.addShape();
    lineLayer.name = "".concat(promptVal, " - Line");
    lineLayer.inPoint = (1 / comp.frameRate) * 3;
    var lineContents = lineLayer.property('ADBE Root Vectors Group');
    createPathGrp(lineContents, 'Line', false, true, [0, 0, 0], [255, 255, 255], 14, [
        [-311, 27.7985687255859],
        [-61.0000915527344, 28.0378570556641],
        [97, -206.037857055664]
    ], [
        [0, 0],
        [0, 0],
        [0, 0]
    ], [
        [0, 0],
        [0, 0],
        [0, 0]
    ], false, [0, 0]);
    var myStroke = lineContents
        .property('Line')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Stroke');
    var lineCapProp = myStroke.property('ADBE Vector Stroke Line Cap');
    lineCapProp.setValue(2);
    var lineJoinProp = myStroke.property('ADBE Vector Stroke Line Join');
    lineJoinProp.setValue(2);
    var parentGrp = lineContents
        .property('Line')
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 3, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 16, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 44)], [new KeyframeEase(0.5, 44)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 93)], [new KeyframeEase(0.5, 93)]);
    var linePos = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    linePos.setValue([852, 480.5379]);
    var lineAnchor = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    lineAnchor.setValue([-108, -89]);
    var recLayer = comp.layers.addShape();
    recLayer.name = "".concat(promptVal, " - Rectangle");
    recLayer.inPoint = (1 / comp.frameRate) * 12;
    var recContents = recLayer.property('ADBE Root Vectors Group');
    var recShapeGrp = recContents.addProperty('ADBE Vector Group');
    recShapeGrp.name = 'Rectangle';
    var recInnerShapeGrp = recShapeGrp.property('ADBE Vectors Group');
    var recRectangleGrp = recInnerShapeGrp.addProperty('ADBE Vector Shape - Rect');
    var recRectangleRoundness = recRectangleGrp.property('ADBE Vector Rect Roundness');
    recRectangleRoundness.setValue(32);
    var recFill = recInnerShapeGrp.addProperty('ADBE Vector Graphic - Fill');
    var recFillColor = recFill.property('ADBE Vector Fill Color');
    recFillColor.setValue([1, 1, 1]);
    var recRectangleSize = recLayer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Size');
    recRectangleSize.setValue([467, 169]);
    recRectangleSize.setValueAtTime((1 / comp.frameRate) * 12, [0, 169]);
    recRectangleSize.setValueAtTime((1 / comp.frameRate) * 41, [467, 169]);
    var easeOut = new KeyframeEase(0.5, 44);
    var easeIn = new KeyframeEase(0.5, 93);
    recRectangleSize.setTemporalEaseAtKey(1, [easeOut, easeOut], [easeOut, easeOut]);
    recRectangleSize.setTemporalEaseAtKey(2, [easeIn, easeIn], [easeIn, easeIn]);
    var recPos = recLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    recPos.setValue([1055.9803, 280.3122]);
    var textLayer = comp.layers.addText();
    textLayer.inPoint = (1 / comp.frameRate) * 12;
    var srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document');
    srcText.setValue(promptVal);
    var textDoc = srcText.value;
    textDoc.font = getFontFromLanguage('Hebrew');
    textDoc.fontSize = 145;
    textDoc.applyFill = true;
    textDoc.fillColor = [0, 0, 0];
    textDoc.applyStroke = false;
    textDoc.tracking = -20;
    srcText.setValue(textDoc);
    var posProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    var anchorProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    posProp.setValue([1055.9803, 280.3122]);
    anchorProp.setValue([158.4607, -28.3756]);
    var setMatteEffect = textLayer.effect.addProperty('ADBE Set Matte3');
    var setMatteLayer = setMatteEffect.property('ADBE Set Matte3-0001');
    setMatteLayer.setValue(2);
    app.endUndoGroup();
};
var createArrow = function () {
    app.beginUndoGroup('Caspion: Create Arrow');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var lineLayer = comp.layers.addShape();
    lineLayer.name = 'Arrow_Line';
    lineLayer.inPoint = (1 / comp.frameRate) * 7;
    var lineContents = lineLayer.property('ADBE Root Vectors Group');
    createPathGrp(lineContents, 'Arrow_Line', false, true, [0, 0, 0], [255, 255, 255], 73, [
        [-550, -68],
        [-204, -68]
    ], [
        [0, 0],
        [0, 0]
    ], [
        [0, 0],
        [0, 0]
    ], false, [0, 0]);
    var parentGrp = lineContents
        .property('Arrow_Line')
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 7, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 20, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 30)], [new KeyframeEase(0.5, 30)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 94)], [new KeyframeEase(0.5, 94)]);
    var linePos = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    linePos.setValue([588, 471.5]);
    var lineAnchor = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    lineAnchor.setValue([-372, -68]);
    var pointerLayer = comp.layers.addShape();
    pointerLayer.name = 'Arrow_Pointer';
    var pointerContents = pointerLayer.property('ADBE Root Vectors Group');
    createPathGrp(pointerContents, 'Arrow_Pointer', true, false, [255, 255, 255], [0, 0, 0], 0, [
        [-207.039474487305, -96],
        [-111.539505004883, -0.5],
        [-207.039352416992, 95]
    ], [
        [0, 0],
        [0, 0],
        [0, 0]
    ], [
        [0, 0],
        [0, 0],
        [0, 0]
    ], true, [0.5, -68.5]);
    var pointerPos = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    pointerPos.setValue([753.4605, 471.5]);
    pointerPos.dimensionsSeparated = true;
    var pointerAnchor = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    pointerAnchor.setValue([-206.5395, -69]);
    var pointerXPos = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Position_0');
    pointerXPos.setValueAtTime((1 / comp.frameRate) * 7, 410.4605);
    pointerXPos.setValueAtTime((1 / comp.frameRate) * 20, 753.4605);
    pointerXPos.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 30)], [new KeyframeEase(0.5, 30)]);
    pointerXPos.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 94)], [new KeyframeEase(0.5, 94)]);
    var pointerScale = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    pointerScale.setValueAtTime(0, [0, 0]);
    pointerScale.setValueAtTime((1 / comp.frameRate) * 7, [55.4514, 55.4514]);
    pointerScale.setValueAtTime((1 / comp.frameRate) * 20, [100, 100]);
    pointerScale.setTemporalEaseAtKey(1, [
        new KeyframeEase(0.5, 46),
        new KeyframeEase(0.5, 46),
        new KeyframeEase(0.5, 46)
    ], [
        new KeyframeEase(0.5, 46),
        new KeyframeEase(0.5, 46),
        new KeyframeEase(0.5, 46)
    ]);
    pointerScale.setTemporalEaseAtKey(2, [
        new KeyframeEase(0.5, 63),
        new KeyframeEase(0.5, 63),
        new KeyframeEase(0.5, 63)
    ], [
        new KeyframeEase(0.5, 30),
        new KeyframeEase(0.5, 30),
        new KeyframeEase(0.5, 30)
    ]);
    pointerScale.setTemporalEaseAtKey(3, [
        new KeyframeEase(0.5, 94),
        new KeyframeEase(0.5, 94),
        new KeyframeEase(0.5, 94)
    ], [
        new KeyframeEase(0.5, 94),
        new KeyframeEase(0.5, 94),
        new KeyframeEase(0.5, 94)
    ]);
    app.endUndoGroup();
};
var createMikra = function () {
    app.beginUndoGroup('Caspion: Create Mikra');
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    var bgLayer = comp.layers.addShape();
    bgLayer.name = 'Mikra_BG';
    var xSlider = bgLayer.effect.addProperty('ADBE Slider Control');
    xSlider.name = 'Size X';
    var xSliderProp = xSlider.property('ADBE Slider Control-0001');
    xSliderProp.setValue(1130);
    var ySlider = bgLayer.effect.addProperty('ADBE Slider Control');
    ySlider.name = 'Size Y';
    var ySliderProp = ySlider.property('ADBE Slider Control-0001');
    ySliderProp.setValue(360);
    var contents = bgLayer.property('ADBE Root Vectors Group');
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = 'Rectangle 1';
    var recGrp = grp.property('ADBE Vectors Group');
    var recShape = recGrp.addProperty('ADBE Vector Shape - Rect');
    var recSize = recShape.property('ADBE Vector Rect Size');
    recSize.expression =
        '[effect("Size X")("Slider"), effect("Size Y")("Slider")]';
    var myFill = recGrp.addProperty('ADBE Vector Graphic - Fill');
    var fillColor = myFill.property('ADBE Vector Fill Color');
    fillColor.setValue([1, 1, 1]);
    var shapeAnchorProp = grp
        .property('ADBE Vector Transform Group')
        .property('ADBE Vector Anchor');
    shapeAnchorProp.expression =
        'var size = content("Rectangle 1").content("Rectangle Path 1").size;\n[size[0] / 2, size[1] / 2]';
    var shapePosProp = grp
        .property('ADBE Vector Transform Group')
        .property('ADBE Vector Position');
    shapePosProp.expression = '[thisComp.width / 2, thisComp.height / 2]';
    var layerPos = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    layerPos.dimensionsSeparated = true;
    var layerXPos = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Position_0');
    layerXPos.setValue(comp.width);
    var layerYPos = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Position_1');
    layerYPos.setValueAtTime(0, comp.height + 450);
    layerYPos.setValueAtTime((1 / comp.frameRate) * 15, comp.height);
    layerYPos.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 88)]);
    var layerAnchor = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    layerAnchor.setValue([comp.width / 2, comp.height / 2]);
    var createIconGuide = function (index, pos) {
        var circleLayer = comp.layers.addShape();
        circleLayer.name = "Mikra_Icon_0".concat(index);
        circleLayer.parent = bgLayer;
        circleLayer.guideLayer = true;
        var circleContents = circleLayer.property('ADBE Root Vectors Group');
        var circleShapeGrp = circleContents.addProperty('ADBE Vector Group');
        circleShapeGrp.name = 'Circle';
        var circleInnerShapeGrp = circleShapeGrp.property('ADBE Vectors Group');
        var circleEllipseGrp = circleInnerShapeGrp.addProperty('ADBE Vector Shape - Ellipse');
        var circleEllipseSize = circleEllipseGrp.property('ADBE Vector Ellipse Size');
        circleEllipseSize.setValue([100, 100]);
        var myFill = circleInnerShapeGrp.addProperty('ADBE Vector Graphic - Fill');
        var fillColor = myFill.property('ADBE Vector Fill Color');
        fillColor.setValue([1, 0, 0]);
        var layerAnchor = circleLayer
            .property('ADBE Transform Group')
            .property('ADBE Anchor Point');
        layerAnchor.setValue([0, 0]);
        var layerPos = circleLayer
            .property('ADBE Transform Group')
            .property('ADBE Position');
        layerPos.setValue(pos);
        return circleLayer;
    };
    createIconGuide(1, [830, 292]);
    createIconGuide(2, [370, 292]);
    createIconGuide(3, [830, 442]);
    createIconGuide(4, [370, 442]);
    var createText = function (text, textPos) {
        var textLayer = comp.layers.addText();
        textLayer.parent = bgLayer;
        var srcText = textLayer
            .property('ADBE Text Properties')
            .property('ADBE Text Document');
        srcText.setValue(text);
        var textDoc = srcText.value;
        textDoc.font = 'NarkisBlockCondensedMF-Bold';
        textDoc.fontSize = 90;
        textDoc.applyFill = true;
        textDoc.fillColor = [0, 0, 0];
        textDoc.applyStroke = false;
        textDoc.tracking = -31;
        srcText.setValue(textDoc);
        var posProp = textLayer
            .property('ADBE Transform Group')
            .property('ADBE Position');
        var anchorProp = textLayer
            .property('ADBE Transform Group')
            .property('ADBE Anchor Point');
        posProp.setValue(textPos);
        anchorProp.setValue([80.8552, -18.3994]);
        return textLayer;
    };
    createText('טקסט 1', [682.3552, 292]);
    createText('טקסט 2', [222.1052, 292]);
    createText('טקסט 3', [682.3552, 442]);
    createText('טקסט 4', [222.1052, 442]);
    app.endUndoGroup();
};
var createText = function (text, font, animation, addTextEvo, addMask) {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    app.beginUndoGroup('Caspion: Create Text');
    var textLayer = comp.layers.addText();
    var srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document');
    srcText.setValue(text);
    var textDoc = srcText.value;
    textDoc.font = getFontFromName(font);
    textDoc.fontSize = 100;
    textDoc.applyFill = true;
    textDoc.fillColor = [1, 1, 1];
    textDoc.applyStroke = false;
    textDoc.tracking = 0;
    srcText.setValue(textDoc);
    if (addMask) {
        var id = app.findMenuCommandId('New Mask');
        app.executeCommand(id);
    }
    if (addTextEvo) {
        introduceTextEvo();
        var rtl = font !== 'Trade Gothic';
        var srcRect = textLayer.sourceRectAtTime(0, false);
        var propId = void 0;
        var propValue = void 0;
        if (animation === 'Y Position')
            (propId = 14), (propValue = Math.ceil(srcRect.height) + 1);
        else if (animation === 'X Position')
            (propId = 13),
                (propValue = rtl
                    ? -(Math.ceil(srcRect.width) + 1)
                    : Math.ceil(srcRect.width) + 1);
        else if (animation === 'Scale')
            (propId = 18), (propValue = 0);
        else if (animation === 'Opacity')
            (propId = 38), (propValue = 0);
        var theProp = textLayer
            .property('ADBE Effect Parade')
            .property('Pseudo/textevo')
            .property("Pseudo/textevo-00".concat(propId));
        theProp.setValue(propValue);
    }
    return textLayer;
};
var setUpIcon = function (name, circleColor, iconColor) {
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = name;
    layer.inPoint = comp.time;
    layer.label = parsePrefs().iconsLabelRandom
        ? Math.floor(Math.random() * 16) + 1
        : parsePrefs().iconsLabelIndex + 1;
    var contents = layer.property('Contents');
    var circleColorRgb = colorNameToRGB(circleColor);
    var iconColorRgb = colorNameToRGB(iconColor);
    return { layer: layer, contents: contents, circleColorRgb: circleColorRgb, iconColorRgb: iconColorRgb };
};
var iconAftermath = function (hasCircle, contents, circleColorRgb, scale, layer, circleSize) {
    if (circleSize === void 0) { circleSize = 180; }
    if (hasCircle)
        createIconCircle(contents, circleColorRgb, circleSize);
    if (scale)
        scaleWithOvershoot([layer]);
};
var createExplosionIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Boom', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createBigBoom = function () {
        var vertices = [
            [-84.9202270507812, 123.637664794922],
            [-31.8689270019531, 123.637664794922],
            [-76.7900543212891, 65.0281066894531],
            [-25.8812561035156, 97.1145477294922],
            [-29.7290954589844, 70.1620330810547],
            [-15.1866760253906, 85.1338653564453],
            [-6.62950134277344, 35.5111694335938],
            [1.07125854492188, 80.4296264648438],
            [44.7087097167969, 43.2092437744141],
            [17.7535095214844, 112.089065551758],
            [33.1576995849609, 103.958892822266],
            [24.6005249023438, 124.067077636719],
            [80.6456604003906, 124.067077636719],
            [55.403564453125, 103.10221862793],
            [85.3526000976562, 92.8373107910156],
            [63.1040496826172, 75.2956848144531],
            [129.841369628906, -32.941650390625],
            [43.42529296875, 21.3906555175781],
            [46.4191284179688, -15.8297271728516],
            [20.7500152587891, 24.8114776611328],
            [28.8777770996094, -124.067077636719],
            [-9.19633483886719, 4.70571899414062],
            [-34.0090179443359, -35.9381713867188],
            [-28.4480895996094, 12.8358917236328],
            [-108.876510620117, -84.7068634033203],
            [-70.3727111816406, 45.3466644287109],
            [-129.841369628906, 61.6045837402344],
            [-76.7900543212891, 97.5415496826172]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Big_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createLittleBoom = function () {
        var vertices = [
            [-10.4825592041016, 9.19902038574219],
            [9.19647216796875, 9.19902038574219],
            [17.3266448974609, 1.92526245117188],
            [7.48605346679688, 1.92526245117188],
            [11.7632904052734, -8.34260559082031],
            [3.20854187011719, -0.641845703125],
            [1.49571228027344, -9.19902038574219],
            [-1.92510986328125, -0.641845703125],
            [-10.4825592041016, -6.20518493652344],
            [-7.91546630859375, 2.35198974609375],
            [-17.3266448974609, 3.20867919921875]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Little_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-4.0612, 115.9381]);
    };
    var createCircleOne = function () {
        var vertices = [
            [5.5621337890625, 0.00120544433594],
            [-0.00120544433594, 5.5621337890625],
            [-5.5621337890625, 0.00120544433594],
            [-0.00120544433594, -5.5621337890625]
        ];
        var inTangents = [
            [0, -3.07241821289062],
            [3.07241821289062, 0],
            [0, 3.06973266601562],
            [-3.06973266601562, 0]
        ];
        var outTangents = [
            [0, 3.06973266601562],
            [-3.06973266601562, 0],
            [0, -3.07241821289062],
            [3.07241821289062, 0]
        ];
        createPathGrp(contents, 'Circle_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-124.4927, 13.475]);
    };
    var createCircleTwo = function () {
        var vertices = [
            [5.5621337890625, 0.00120544433594],
            [-0.00120544433594, 5.5621337890625],
            [-5.5621337890625, 0.00120544433594],
            [-0.00120544433594, -5.5621337890625]
        ];
        var inTangents = [
            [0, -3.07241821289062],
            [3.07241821289062, 0],
            [0, 3.06973266601562],
            [-3.06973266601562, 0]
        ];
        var outTangents = [
            [0, 3.06973266601562],
            [-3.06973266601562, 0],
            [0, -3.07241821289062],
            [3.07241821289062, 0]
        ];
        createPathGrp(contents, 'Circle_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [80.2173, -94.1219]);
    };
    var createCircleThree = function () {
        var vertices = [
            [5.5621337890625, 0.00120544433594],
            [-0.00120544433594, 5.5621337890625],
            [-5.5621337890625, 0.00120544433594],
            [-0.00120544433594, -5.5621337890625]
        ];
        var inTangents = [
            [0, -3.07241821289062],
            [3.07241821289062, 0],
            [0, 3.06973266601562],
            [-3.06973266601562, 0]
        ];
        var outTangents = [
            [0, 3.06973266601562],
            [-3.06973266601562, 0],
            [0, -3.07241821289062],
            [3.07241821289062, 0]
        ];
        createPathGrp(contents, 'Circle_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [94.976, 60.5347]);
    };
    createCircleThree();
    createCircleTwo();
    createCircleOne();
    createLittleBoom();
    createBigBoom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createTunnelIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Tunnel', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createInside = function () {
        var vertices = [
            [0, -75.4871215820312],
            [-75.4871215820312, -0.01185607910156],
            [-75.4871215820312, 75.4871215820312],
            [-18.8729705810547, 18.8729705810547],
            [-18.8729705810547, 0],
            [0, -18.8729705810547],
            [18.8705902099609, 0],
            [18.8705902099609, 18.8729705810547],
            [75.4871215820312, 75.4871215820312],
            [75.4871215820312, -0.01185607910156]
        ];
        var inTangents = [
            [41.6728515625, 0],
            [0, -41.6681213378906],
            [0, 0],
            [0, 0],
            [0, 0],
            [-10.4211730957031, 0],
            [0, -10.4211883544922],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [-41.6704864501953, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -10.4188079833984],
            [10.4188079833984, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -41.6704864501953]
        ];
        createPathGrp(contents, 'Tunnel_Inside', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createBorder = function () {
        var vertices = [
            [0.00009155273438, -91.1960754394531],
            [-0.00009155273438, -91.1960754394531],
            [-91.1960754394531, -0.00009155273438],
            [-91.1960754394531, 91.1960754394531],
            [91.1960754394531, 91.1960754394531],
            [91.1960754394531, -0.00009155273438]
        ];
        var inTangents = [
            [50.3661499023438, 0],
            [0, 0],
            [0, -50.3661499023438],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-50.3661499023438, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -50.3661499023438]
        ];
        createPathGrp(contents, 'Tunnel_Border', false, true, iconColorRgb, iconColorRgb, 6, vertices, inTangents, outTangents, true, [0, 0]);
    };
    createBorder();
    createInside();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createTerrorTunnelIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Terror_Tunnel', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createBigBoom = function () {
        var vertices = [
            [-33.0333709716797, 49.8754119873047],
            [-15.0133514404297, 34.6204986572266],
            [-27.6258697509766, 18.1576690673828],
            [-9.31216430664062, 29.7033386230469],
            [-10.6926116943359, 20.0048065185547],
            [-5.46522521972656, 25.3957672119141],
            [-2.38618469238281, 7.54121398925781],
            [0.3848876953125, 23.6990051269531],
            [16.0854644775391, 10.3062591552734],
            [6.16842651367188, 34.760009765625],
            [11.9305572509766, 32.1637420654297],
            [9.38737487792969, 36.8605346679688],
            [25.2387390136719, 46.2252044677734],
            [19.9361419677734, 31.8591461181641],
            [30.7105560302734, 28.1645812988281],
            [22.7068328857422, 21.8519287109375],
            [46.7179870605469, -17.0907897949219],
            [15.6266784667969, 2.45860290527344],
            [16.7025451660156, -10.9308624267578],
            [7.46315002441406, 3.68864440917969],
            [10.3955383300781, -49.8754119873047],
            [-3.307861328125, -3.54568481445312],
            [-12.2351531982422, -18.17041015625],
            [-10.2338409423828, -0.61894226074219],
            [-39.1696624755859, -35.7169799804688],
            [-25.3214721679688, 11.0775299072266],
            [-46.7179870605469, 16.9272613525391],
            [-27.6258697509766, 29.8575286865234]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Big_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [4.5148, 15.2649]);
    };
    var createLittleBoom = function () {
        var vertices = [
            [-3.77227783203125, 3.30880737304688],
            [3.31169128417969, 3.30880737304688],
            [6.23274230957031, 0.69418334960938],
            [2.69453430175781, 0.69418334960938],
            [4.23330688476562, -3.00007629394531],
            [1.15426635742188, -0.22750854492188],
            [0.53718566894531, -3.30880737304688],
            [-0.69317626953125, -0.22750854492188],
            [-3.77227783203125, -2.23257446289062],
            [-2.85247802734375, 0.84835815429688],
            [-6.23274230957031, 1.15670776367188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Little_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [2.978, 52.1255]);
    };
    var createCircleOne = function () {
        var vertices = [
            [2.00054931640625, 0],
            [-0.0045166015625, 2.00131225585938],
            [-2.00054931640625, 0],
            [-0.0045166015625, -2.00131225585938],
            [2.00054931640625, 0]
        ];
        var inTangents = [
            [0, 0],
            [1.10519409179688, 0],
            [0, 1.10557556152344],
            [-1.101806640625, 0],
            [0, -1.10519409179688]
        ];
        var outTangents = [
            [0, 1.10557556152344],
            [-1.101806640625, 0],
            [0, -1.10519409179688],
            [1.10519409179688, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Circle_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-40.3515, 15.2593]);
    };
    var createCircleTwo = function () {
        var vertices = [
            [1.61491394042969, 0.00094604492188],
            [0.00094604492188, 1.61491394042969],
            [-1.61491394042969, 0.00094604492188],
            [0.00094604492188, -1.61491394042969],
            [1.61491394042969, 0.00094604492188]
        ];
        var inTangents = [
            [0, 0],
            [0.88671875, 0],
            [0, 0.89234924316406],
            [-0.89422607421875, 0],
            [0, -0.89422607421875]
        ];
        var outTangents = [
            [0, 0.89234924316406],
            [-0.89422607421875, 0],
            [0, -0.89422607421875],
            [0.88671875, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Circle_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [33.3021, -23.4531]);
    };
    var createCircleThree = function () {
        var vertices = [
            [1.69389343261719, -0.00018310546875],
            [-0.00282287597656, 1.69276428222656],
            [-1.69389343261719, -0.00018310546875],
            [-0.00282287597656, -1.69276428222656],
            [1.69389343261719, -0.00018310546875]
        ];
        var inTangents = [
            [0, 0],
            [0.93635559082031, 0],
            [0, 0.93296813964844],
            [-0.93070983886719, 0],
            [0, -0.93635559082031]
        ];
        var outTangents = [
            [0, 0.93296813964844],
            [-0.93070983886719, 0],
            [0, -0.93635559082031],
            [0.93635559082031, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Circle_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [38.6104, 32.1923]);
    };
    var createBorder = function () {
        var vertices = [
            [2.404296875, -94.3845367431641],
            [-103.415161132812, 68.3920135498047],
            [-101.872634887695, 91.4246978759766],
            [-66.0935821533203, 94.3845367431641],
            [-66.0935821533203, 70.6358642578125],
            [0.896728515625, -59.9953308105469],
            [67.8851623535156, 70.6358642578125],
            [68.0152740478516, 94.3845367431641],
            [103.79997253418, 93.6354522705078],
            [103.79997253418, 64.1066131591797],
            [103.79997253418, 41.9918670654297],
            [2.404296875, -94.3845367431641]
        ];
        var inTangents = [
            [0, 0],
            [-7.53553771972656, -109.9228515625],
            [0, 0],
            [0, 0],
            [0, 0],
            [-59.2505798339844, -0.10641479492188],
            [-1.52786254882812, -72.6674499511719],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [66.1306762695312, 0]
        ];
        var outTangents = [
            [-66.1310577392578, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.52786254882812, -72.6674499511719],
            [67.3370208740234, 0.12297058105469],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [4.9156494140625, -87.4576263427734],
            [0, 0]
        ];
        createPathGrp(contents, 'Border', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createInsideR = function () {
        var vertices = [
            [-24.6310577392578, -21.1304931640625],
            [24.6310577392578, 21.1304931640625]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Inside_R', false, true, iconColorRgb, iconColorRgb, 0.85, vertices, inTangents, outTangents, true, [43.388, 73.2559]);
    };
    var createInsideL = function () {
        var vertices = [
            [26.6930847167969, -22.1788787841797],
            [-26.6930847167969, 22.1788787841797]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Inside_L', false, true, iconColorRgb, iconColorRgb, 0.85, vertices, inTangents, outTangents, true, [-39.4005, 72.2038]);
    };
    createInsideL();
    createInsideR();
    createBorder();
    createCircleThree();
    createCircleTwo();
    createCircleOne();
    createLittleBoom();
    createBigBoom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createTargetIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Target', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createLittleCircle = function () {
        var vertices = [
            [31.2296600341797, 0],
            [0, 31.2296600341797],
            [-31.2296600341797, 0],
            [0, -31.2296600341797]
        ];
        var inTangents = [
            [0, -17.2476654052734],
            [17.2476654052734, 0],
            [0, 17.2476654052734],
            [-17.2476654052734, 0]
        ];
        var outTangents = [
            [0, 17.2476654052734],
            [-17.2476654052734, 0],
            [0, -17.2476654052734],
            [17.2476654052734, 0]
        ];
        createPathGrp(contents, 'Little_Circle', false, true, iconColorRgb, iconColorRgb, 24, vertices, inTangents, outTangents, true, [2.2409, -0.9836]);
    };
    var createBigCircle = function () {
        var vertices = [
            [84.0924072265625, 0],
            [0, 84.0924072265625],
            [-84.0924072265625, 0],
            [0, -84.0924072265625]
        ];
        var inTangents = [
            [0, -46.4429473876953],
            [46.4429473876953, 0],
            [0, 46.4429473876953],
            [-46.4429473876953, 0]
        ];
        var outTangents = [
            [0, 46.4429473876953],
            [-46.4429473876953, 0],
            [0, -46.4429473876953],
            [46.4429473876953, 0]
        ];
        createPathGrp(contents, 'Big_Circle', false, true, iconColorRgb, iconColorRgb, 24, vertices, inTangents, outTangents, true, [2.2409, -2.9498]);
    };
    var createRecTop = function () {
        var vertices = [
            [11.7978515625, 8.88459777832031],
            [-11.7978515625, 8.88459777832031],
            [-11.7978515625, -8.88459777832031],
            [11.7978515625, -8.88459777832031]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Rec_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.9845, -100.2375]);
    };
    var createRecBottom = function () {
        var vertices = [
            [11.7978515625, 8.88459777832031],
            [-11.7978515625, 8.88459777832031],
            [-11.7978515625, -8.88459777832031],
            [11.7978515625, -8.88459777832031]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Rec_Bottom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.9845, 100.2375]);
    };
    var createRecRight = function () {
        var vertices = [
            [13.4363098144531, 11.8039245605469],
            [-13.4363098144531, 11.8039245605469],
            [-13.4363098144531, -11.8039245605469],
            [13.4363098144531, -11.8039245605469]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Rec_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [97.652, -1.0784]);
    };
    var createRecLeft = function () {
        var vertices = [
            [13.4363098144531, 11.8039245605469],
            [-13.4363098144531, 11.8039245605469],
            [-13.4363098144531, -11.8039245605469],
            [13.4363098144531, -11.8039245605469]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Rec_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-97.652, -1.0784]);
    };
    createRecLeft();
    createRecRight();
    createRecBottom();
    createRecTop();
    createBigCircle();
    createLittleCircle();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createSniperTargetIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Sniper_Target', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createOuterRing = function () {
        var vertices = [
            [0, -103.27001953125],
            [-103.27001953125, -0.00001525878906],
            [0, 103.269958496094],
            [103.27001953125, -0.00001525878906]
        ];
        var inTangents = [
            [57.0399780273438, 0],
            [0, -57.0400238037109],
            [-57.0399780273438, 0],
            [0, 57.0399932861328]
        ];
        var outTangents = [
            [-57.0399780273438, 0],
            [0, 57.0399932861328],
            [57.0399780273438, 0],
            [0, -57.0400238037109]
        ];
        createPathGrp(contents, 'Outer_Ring', false, true, iconColorRgb, iconColorRgb, 7, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createMiddleTR = function () {
        var vertices = [
            [17.1749877929688, 13.6750183105469],
            [1.82501220703125, 13.6750183105469],
            [-1.67498779296875, 17.1750183105469],
            [-13.2949829101562, 17.1750183105469],
            [-17.1749877929688, 13.2950134277344],
            [-17.1749877929688, 1.67501831054688],
            [-13.6749877929688, -1.82498168945312],
            [-13.6749877929688, -17.1750183105469]
        ];
        var inTangents = [
            [-1.6300048828125, -16.280029296875],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [2.1400146484375, 0],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-1.92999267578125, 0],
            [0, 0],
            [0, -2.1400146484375],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [16.280029296875, 1.6300048828125]
        ];
        createPathGrp(contents, 'Middle_Top_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [17.175, -17.175]);
    };
    var createMiddleBR = function () {
        var vertices = [
            [17.1749877929688, -13.6749877929688],
            [-13.6749877929688, 17.1749877929688],
            [-13.6749877929688, 1.82501220703125],
            [-17.1749877929688, -1.67498779296875],
            [-17.1749877929688, -13.2949829101562],
            [-13.2949829101562, -17.1749877929688],
            [-1.67498779296875, -17.1749877929688],
            [1.82501220703125, -13.6749877929688]
        ];
        var inTangents = [
            [0, 0],
            [16.280029296875, -1.6300048828125],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [0, 2.1400146484375],
            [0, 0],
            [-1.92999267578125, 0]
        ];
        var outTangents = [
            [-1.6300048828125, 16.2799682617188],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [2.1400146484375, 0],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        createPathGrp(contents, 'Middle_Bottom_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [17.175, 17.175]);
    };
    var createMiddleTL = function () {
        var vertices = [
            [17.1749877929688, 1.67501831054688],
            [17.1749877929688, 13.2950134277344],
            [13.2949829101562, 17.1750183105469],
            [1.67498779296875, 17.1750183105469],
            [-1.82501220703125, 13.6750183105469],
            [-17.1749877929688, 13.6750183105469],
            [13.6749877929688, -17.1750183105469],
            [13.6749877929688, -1.82498168945312]
        ];
        var inTangents = [
            [-1.92999267578125, 0],
            [0, 0],
            [0, -2.1400146484375],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [-16.280029296875, 1.6300048828125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-2.1400146484375, 0],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [1.6300048828125, -16.280029296875],
            [0, 0],
            [0, 1.92999267578125]
        ];
        createPathGrp(contents, 'Middle_Top_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-17.175, -17.175]);
    };
    var createMiddleBL = function () {
        var vertices = [
            [17.1749877929688, -13.2949829101562],
            [17.1749877929688, -1.67498779296875],
            [13.6749877929688, 1.82501220703125],
            [13.6749877929688, 17.1749877929688],
            [-17.1749877929688, -13.6749877929688],
            [-1.82501220703125, -13.6749877929688],
            [1.67498779296875, -17.1749877929688],
            [13.2949829101562, -17.1749877929688]
        ];
        var inTangents = [
            [-2.1400146484375, 0],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [1.6300048828125, 16.2799682617188],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-1.92999267578125, 0],
            [0, 0],
            [-16.280029296875, -1.6300048828125],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [0, 2.1400146484375]
        ];
        createPathGrp(contents, 'Middle_Bottom_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-17.175, 17.175]);
    };
    var createTopLeft = function () {
        var vertices = [
            [44.114990234375, -32.4349670410156],
            [35.614990234375, -32.4349670410156],
            [44.114990234375, -44.1150207519531],
            [-44.114990234375, 44.1150207519531],
            [-32.5150146484375, 44.1150207519531],
            [-32.5150146484375, 35.6949768066406],
            [-29.0150146484375, 32.1949768066406],
            [-25.5150146484375, 35.6949768066406],
            [-25.5150146484375, 44.1150207519531],
            [-12.9849853515625, 44.1150207519531],
            [-12.9849853515625, 35.6949768066406],
            [-9.4849853515625, 32.1949768066406],
            [-5.9849853515625, 35.6949768066406],
            [-5.9849853515625, 44.1150207519531],
            [5.9649658203125, 44.1150207519531],
            [44.114990234375, 5.96499633789062],
            [44.114990234375, -5.90499877929688],
            [35.614990234375, -5.90499877929688],
            [32.114990234375, -9.40499877929688],
            [35.614990234375, -12.9049987792969],
            [44.114990234375, -12.9049987792969],
            [44.114990234375, -25.4349670410156],
            [35.614990234375, -25.4349670410156],
            [32.114990234375, -28.9349670410156]
        ];
        var inTangents = [
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [1.79998779296875, -47.8400268554688],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.9300537109375, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [-20.260009765625, 1.67999267578125],
            [0, 0],
            [0, 0],
            [0, 1.92999267578125],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.92999267578125]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [-47.8400268554688, 1.800048828125],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.94000244140625, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.94000244140625, 0],
            [0, 0],
            [0, 0],
            [1.6800537109375, -20.260009765625],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.9300537109375]
        ];
        createPathGrp(contents, 'Top_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-47.615, -47.615]);
    };
    var createTopRight = function () {
        var vertices = [
            [44.114990234375, 44.1150207519531],
            [-44.114990234375, -44.1150207519531],
            [-44.114990234375, -32.4349670410156],
            [-35.614990234375, -32.4349670410156],
            [-32.114990234375, -28.9349670410156],
            [-35.614990234375, -25.4349670410156],
            [-44.114990234375, -25.4349670410156],
            [-44.114990234375, -12.9049987792969],
            [-35.614990234375, -12.9049987792969],
            [-32.114990234375, -9.40499877929688],
            [-35.614990234375, -5.90499877929688],
            [-44.114990234375, -5.90499877929688],
            [-44.114990234375, 5.96499633789062],
            [-5.9649658203125, 44.1150207519531],
            [5.9849853515625, 44.1150207519531],
            [5.9849853515625, 35.6949768066406],
            [9.4849853515625, 32.1949768066406],
            [12.9849853515625, 35.6949768066406],
            [12.9849853515625, 44.1150207519531],
            [25.5150146484375, 44.1150207519531],
            [25.5150146484375, 35.6949768066406],
            [29.0150146484375, 32.1949768066406],
            [32.5150146484375, 35.6949768066406],
            [32.5150146484375, 44.1150207519531]
        ];
        var inTangents = [
            [0, 0],
            [47.8400268554688, 1.800048828125],
            [0, 0],
            [0, 0],
            [0, -1.9300537109375],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [-1.6800537109375, -20.260009765625],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.94000244140625, 0],
            [0, -1.92999267578125],
            [0, 0]
        ];
        var outTangents = [
            [-1.79998779296875, -47.8400268554688],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.92999267578125],
            [0, 0],
            [0, 0],
            [20.260009765625, 1.67999267578125],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.9300537109375, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Top_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [47.615, -47.615]);
    };
    var createBottomRight = function () {
        var vertices = [
            [32.5150146484375, -44.114990234375],
            [32.5150146484375, -35.5350341796875],
            [29.0150146484375, -32.0350341796875],
            [25.5150146484375, -35.5350341796875],
            [25.5150146484375, -44.114990234375],
            [12.9849853515625, -44.114990234375],
            [12.9849853515625, -35.5350341796875],
            [9.4849853515625, -32.0350341796875],
            [5.9849853515625, -35.5350341796875],
            [5.9849853515625, -44.114990234375],
            [-5.9649658203125, -44.114990234375],
            [-44.114990234375, -5.96502685546875],
            [-44.114990234375, 6.06500244140625],
            [-35.614990234375, 6.06500244140625],
            [-32.114990234375, 9.56500244140625],
            [-35.614990234375, 13.0650024414062],
            [-44.114990234375, 13.0650024414062],
            [-44.114990234375, 25.594970703125],
            [-35.614990234375, 25.594970703125],
            [-32.114990234375, 29.094970703125],
            [-35.614990234375, 32.594970703125],
            [-44.114990234375, 32.594970703125],
            [-44.114990234375, 44.114990234375],
            [44.114990234375, -44.114990234375]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.9300537109375, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [20.260009765625, -1.67999267578125],
            [0, 0],
            [0, 0],
            [0, -1.94000244140625],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.94000244140625],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [-1.79998779296875, 47.8399658203125]
        ];
        var outTangents = [
            [0, 0],
            [0, 1.9300537109375],
            [-1.94000244140625, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [-1.6800537109375, 20.260009765625],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [47.8400268554688, -1.79998779296875],
            [0, 0]
        ];
        createPathGrp(contents, 'Bottom_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [47.615, 47.615]);
    };
    var createBottomLeft = function () {
        var vertices = [
            [-12, 53.6799926757812],
            [-3.5, 53.6799926757812],
            [-3.5, 41.6499633789062],
            [-41.6500244140625, 3.5],
            [-53.5999755859375, 3.5],
            [-53.5999755859375, 12.0799560546875],
            [-57.0999755859375, 15.5799560546875],
            [-60.5999755859375, 12.0799560546875],
            [-60.5999755859375, 3.5],
            [-73.1300048828125, 3.5],
            [-73.1300048828125, 12.0799560546875],
            [-76.6300048828125, 15.5799560546875],
            [-80.1300048828125, 12.0799560546875],
            [-80.1300048828125, 3.5],
            [-91.72998046875, 3.5],
            [-3.5, 91.72998046875],
            [-3.5, 80.2099609375],
            [-12, 80.2099609375],
            [-15.5, 76.7099609375],
            [-12, 73.2099609375],
            [-3.5, 73.2099609375],
            [-3.5, 60.6799926757812],
            [-12, 60.6799926757812],
            [-15.5, 57.1799926757812]
        ];
        var inTangents = [
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [1.6800537109375, 20.260009765625],
            [0, 0],
            [0, 0],
            [1.94000244140625, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.94000244140625, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [-47.8400268554688, -1.79998779296875],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.92999267578125]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [-20.260009765625, -1.67999267578125],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.9300537109375, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [1.79998779296875, 47.8399658203125],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.94000244140625],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.94000244140625]
        ];
        createPathGrp(contents, 'Bottom_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    createBottomLeft();
    createBottomRight();
    createTopRight();
    createTopLeft();
    createMiddleTR();
    createMiddleTL();
    createMiddleBR();
    createMiddleBL();
    createOuterRing();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createHouseBombingIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('House_Bombing', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createBigBoom = function () {
        var vertices = [
            [-65.4785614013672, 11.6502380371094],
            [-46.7796020507812, 30.3747711181641],
            [-41.9282989501953, -6.13673400878906],
            [-35.3073272705078, 23.1404266357422],
            [-27.1506805419922, 12.2839050292969],
            [-27.3102874755859, 22.6921997070312],
            [-6.7796630859375, 8.22352600097656],
            [-19.9213562011719, 26.7731628417969],
            [8.59579467773438, 29.0556945800781],
            [-25.2132263183594, 43.8180084228516],
            [-16.9149169921875, 46.38916015625],
            [-27.0269622802734, 50.4571990966797],
            [-7.27694702148438, 70.2383270263672],
            [-8.77116394042969, 53.9403381347656],
            [5.40626525878906, 60.8913421630859],
            [3.75502014160156, 46.8582153320312],
            [65.4785614013672, 32.2631683349609],
            [15.8456726074219, 20.9119873046875],
            [30.0387115478516, 8.85218811035156],
            [6.64564514160156, 14.1131896972656],
            [62.0597839355469, -35.4888305664062],
            [3.18807983398438, -3.53974914550781],
            [8.78913879394531, -26.6235809326172],
            [-6.46783447265625, -7.47137451171875],
            [-0.38529968261719, -70.2383270263672],
            [-32.7179718017578, -10.8102264404297],
            [-59.4163513183594, -26.0698394775391],
            [-53.4008026123047, 5.31996154785156]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Big_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [65.4645, -66.554]);
    };
    var createLittleBoom = function () {
        var vertices = [
            [-6.86579895019531, -0.90950012207031],
            [0.06964111328125, 6.03385925292969],
            [5.50318908691406, 6.34040832519531],
            [7.16470336914062, 0.75755310058594],
            [2.03269958496094, 2.86753845214844],
            [1.43251037597656, 0.45098876953125],
            [3.84906005859375, -3.16618347167969],
            [-0.37620544433594, -1.36036682128906],
            [-1.42988586425781, -6.34040832519531],
            [-3.54251098632812, -2.41905212402344],
            [-7.16470336914062, -5.43869018554688]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Little_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [30.675, -28.324]);
    };
    var createCircleOne = function () {
        var vertices = [
            [1.96058654785156, 1.96180725097656],
            [-1.96549987792969, 1.96180725097656],
            [-1.96046447753906, -1.9619140625],
            [1.96322631835938, -1.95953369140625]
        ];
        var inTangents = [
            [1.08480834960938, -1.08216857910156],
            [1.08718872070312, 1.0819091796875],
            [-1.08193969726562, 1.0819091796875],
            [-1.0819091796875, -1.08454895019531]
        ];
        var outTangents = [
            [-1.08454895019531, 1.08454895019531],
            [-1.08216857910156, -1.08718872070312],
            [1.08450317382812, -1.08480834960938],
            [1.08216857910156, 1.08480834960938]
        ];
        createPathGrp(contents, 'Circle_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [24.4686, -107.3976]);
    };
    var createCircleTwo = function () {
        var vertices = [
            [1.58273315429688, 1.58628845214844],
            [-1.58595275878906, 1.58364868164062],
            [-1.58595275878906, -1.58529663085938],
            [1.58537292480469, -1.58265686035156]
        ];
        var inTangents = [
            [0.87617492675781, -0.87612915039062],
            [0.87322998046875, 0.87322998046875],
            [-0.87348937988281, 0.87348937988281],
            [-0.87586975097656, -0.87586975097656]
        ];
        var outTangents = [
            [-0.87586975097656, 0.87322998046875],
            [-0.87348937988281, -0.87850952148438],
            [0.87850952148438, -0.87322998046875],
            [0.87586975097656, 0.87586975097656]
        ];
        createPathGrp(contents, 'Circle_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [134.5952, -73.0661]);
    };
    var createCircleThree = function () {
        var vertices = [
            [1.65907287597656, 1.6605224609375],
            [-1.66183471679688, 1.65788269042969],
            [-1.65919494628906, -1.66038513183594],
            [1.66171264648438, -1.66038513183594]
        ];
        var inTangents = [
            [0.91728210449219, -0.91702270507812],
            [0.91464233398438, 0.91728210449219],
            [-0.91461181640625, 0.91728210449219],
            [-0.91728210449219, -0.91438293457031]
        ];
        var outTangents = [
            [-0.91966247558594, 0.91464233398438],
            [-0.91702270507812, -0.91702270507812],
            [0.91966247558594, -0.91438293457031],
            [0.91464233398438, 0.919921875]
        ];
        createPathGrp(contents, 'Circle_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [85.2107, -13.3492]);
    };
    var createHouse = function () {
        var vertices = [
            [79.1449890136719, -26.2100219726562],
            [79.1449890136719, 101.669982910156],
            [21.9850158691406, 101.669982910156],
            [21.9850158691406, 34.0399780273438],
            [-21.9850158691406, 34.0399780273438],
            [-21.9850158691406, 101.669982910156],
            [-79.1449890136719, 101.669982910156],
            [-79.1449890136719, -26.2100219726562],
            [-71.5550231933594, -33.4600219726562],
            [-71.4250183105469, -33.5800170898438],
            [-0.00497436523438, -101.669982910156],
            [71.4150085449219, -33.5800170898438],
            [71.5450134277344, -33.4600219726562]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'House', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-32.845, 35.12]);
    };
    var createRoof = function () {
        var vertices = [
            [-32.849365234375, -89.4986877441406],
            [-137.056411743164, 9.88291931152344],
            [-120.251113891602, 9.88291931152344],
            [-32.849365234375, -73.8296356201172],
            [56.6365356445312, 9.88291931152344],
            [71.3576965332031, 9.88291931152344]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Roof', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    createRoof();
    createHouse();
    createCircleThree();
    createCircleTwo();
    createCircleOne();
    createLittleBoom();
    createBigBoom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createFireIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Fire', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createFireL = function () {
        var vertices = [
            [42.7799987792969, -19.1463470458984],
            [43.7399597167969, 35.3036651611328],
            [18.2900085449219, 60.0136871337891],
            [48.0299987792969, 70.8736724853516],
            [48.0299987792969, 109.133682250977],
            [24.8099670410156, 108.46369934082],
            [-48.0299987792969, 27.8136749267578],
            [-33.3800354003906, -28.3362884521484],
            [-23.6399841308594, -24.7063446044922],
            [-3.95999145507812, 26.1036529541016],
            [4.05996704101562, 19.7936553955078],
            [47.3799743652344, -109.096298217773],
            [48.0299987792969, -109.436325073242],
            [48.0299987792969, -7.54631042480469]
        ];
        var inTangents = [
            [0.72998046875, 4.1300048828125],
            [3.530029296875, -15.2999877929688],
            [15.3999633789062, -3.75],
            [-8.989990234375, 0.780029296875],
            [0, 0],
            [7.6400146484375, 0.97998046875],
            [4.05999755859375, 59.9000244140625],
            [-7.26995849609375, 11.1199951171875],
            [0.63995361328125, -5.55999755859375],
            [-19.3600463867188, -14.6499481201172],
            [1.92999267578125, 4.9200439453125],
            [-38.8299560546875, 22.8899536132812],
            [-0.22003173828125, 0.09002685546875],
            [0, 0]
        ];
        var outTangents = [
            [-9.29998779296875, 24.1800537109375],
            [-2.13995361328125, 9.84002685546875],
            [10.469970703125, 8.5999755859375],
            [0, 0],
            [-7.760009765625, 0.58001708984375],
            [-18.1799926757812, -2.35003662109375],
            [0, -27.0599975585938],
            [3.10003662109375, -4.60003662109375],
            [-1.72003173828125, 15.0800170898438],
            [4.16998291015625, 3.21002197265625],
            [-23.4299926757812, -60.1099853515625],
            [0.22003173828125, -0.1300048828125],
            [0, 0],
            [-2.60003662109375, -3.6500244140625]
        ];
        createPathGrp(contents, 'Fire_L', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-37.5212, 0.2258]);
    };
    var createFireR = function () {
        var vertices = [
            [80.0287933349609, 6.43951416015625],
            [17.8787689208984, -102.990478515625],
            [10.5087738037109, -109.210510253906],
            [10.5087738037109, -7.32049560546875],
            [40.2387542724609, 35.4194946289062],
            [10.5087738037109, 71.0994873046875],
            [10.5087738037109, 109.359497070312],
            [61.6287689208984, 88.6895141601562]
        ];
        var inTangents = [
            [11.97998046875, 28.6599731445312],
            [-14.4400024414062, 63.4299926757812],
            [3.94000244140625, -1.72998046875],
            [0, 0],
            [0, -17.3099975585938],
            [17.6300048828125, -1.52001953125],
            [0, 0],
            [-14.27001953125, 13.0700073242188]
        ];
        var outTangents = [
            [-16.7900390625, -43.6500244140625],
            [1.010009765625, -4.46002197265625],
            [0, 0],
            [9.94000244140625, 13.9799957275391],
            [0.55999755859375, 17.9199829101562],
            [0, 0],
            [18.6199951171875, -1.3599853515625],
            [22.25, -20.6400146484375]
        ];
        createPathGrp(contents, 'Fire_R', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    createFireR();
    createFireL();
    var offsetPaths = contents.addProperty('ADBE Vector Filter - Offset');
    var offsetAmt = offsetPaths.property('ADBE Vector Offset Amount');
    offsetAmt.setValue(0.5);
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createMoneyIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Money', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createBagTop = function () {
        var vertices = [
            [86.6700439453125, 67.9109954833984],
            [26.489990234375, 67.9109954833984],
            [24.489990234375, 59.5209808349609],
            [24.3699951171875, 59.2910003662109],
            [24.3199615478516, 59.2009735107422],
            [24.2999877929688, 59.1710052490234],
            [24.2799682617188, 59.1310272216797],
            [24.2599487304688, 59.1009979248047],
            [24.2500152587891, 59.0809783935547],
            [24.22998046875, 59.0410003662109],
            [24.1699829101562, 58.9410247802734],
            [24.1499633789062, 58.9109954833984],
            [13.4400024414062, 50.6210174560547],
            [4.5799560546875, 47.9910125732422],
            [4.5799560546875, 28.3610076904297],
            [11.699951171875, 31.1409759521484],
            [14.1499633789062, 33.7109832763672],
            [15, 35.3409881591797],
            [15.5499877929688, 37.0710296630859],
            [20.1599731445312, 40.3909759521484],
            [25.0799560546875, 37.4009857177734],
            [25.5199584960938, 34.4509735107422],
            [25.0299682617188, 32.6009979248047],
            [24.2899780273438, 30.7009735107422],
            [20.1499633789062, 24.7510375976562],
            [6.6099853515625, 18.1810150146484],
            [4.5899658203125, 17.8710174560547],
            [4.5899658203125, 12.1710052490234],
            [1.5699462890625, 7.45097351074219],
            [-4.030029296875, 8.28099060058594],
            [-5.780029296875, 12.1710052490234],
            [-5.780029296875, 17.9009857177734],
            [-19.77001953125, 24.0909881591797],
            [-24.02001953125, 29.9310150146484],
            [-25.5700073242188, 37.4509735107422],
            [-23.9700317382812, 44.8710174560547],
            [-19.3800048828125, 50.3909759521484],
            [-5.780029296875, 56.2610321044922],
            [-5.780029296875, 76.7809906005859],
            [-12.3800048828125, 73.1810150146484],
            [-14.6600341796875, 70.2709808349609],
            [-15.4600219726562, 68.5710296630859],
            [-15.6700439453125, 67.9109954833984],
            [-16.010009765625, 66.7709808349609],
            [-16.3200073242188, 66.0410003662109],
            [-16.4900512695312, 65.7410125732422],
            [-17.4000244140625, 64.6210174560547],
            [-20.4700317382812, 63.2310028076172],
            [-25.530029296875, 66.0010223388672],
            [-26.0900268554688, 67.9109954833984],
            [-86.6700439453125, 67.9109954833984],
            [-18.760009765625, -29.7890167236328],
            [-40.8200073242188, -74.1090240478516],
            [-5.60003662109375, -68.7290191650391],
            [31.3800048828125, -76.0589752197266],
            [11.22998046875, -30.9190216064453]
        ];
        var inTangents = [
            [-6.41015625, -40.1699829101562],
            [0, 0],
            [1.3599853515625, 2.55999755859375],
            [0.03997802734375, 0.07000732421875],
            [0.02000427246094, 0.030029296875],
            [0.01002502441406, 0.010009765625],
            [0.010009765625, 0.00994873046875],
            [0.010009765625, 0.010009765625],
            [0, 0.010009765625],
            [0.010009765625, 0.010009765625],
            [0.02003479003906, 0.02996826171875],
            [0.010009765625, 0.010009765625],
            [4.27996826171875, 1.69000244140625],
            [3, 0.719970703125],
            [0, 0],
            [-2.0799560546875, -1.53997802734375],
            [-0.64996337890625, -1.010009765625],
            [-0.23004150390625, -0.57000732421875],
            [-0.22001647949219, -0.57000732421875],
            [-2.03996276855469, -0.0899658203125],
            [-0.8800048828125, 1.8800048828125],
            [0.1400146484375, 1],
            [0.19000244140625, 0.5999755859375],
            [0.27996826171875, 0.62005615234375],
            [1.73004150390625, 1.69993591308594],
            [5.00001525878906, 0.89996337890625],
            [0.66998291015625, 0.0799560546875],
            [0, 0],
            [1.82000732421875, 0.84002685546875],
            [1.52001953125, -1.3399658203125],
            [0, -1.47996520996094],
            [0, 0],
            [3.82000732421875, -3.510009765625],
            [1.010009765625, -2.21002197265625],
            [-0.02001953125, -2.5899658203125],
            [-1.1199951171875, -2.29998779296875],
            [-1.9100341796875, -1.489990234375],
            [-4.760009765625, -1.23004150390625],
            [0, 0],
            [1.8299560546875, 1.76995849609375],
            [0.6199951171875, 1.07000732421875],
            [0.219970703125, 0.5799560546875],
            [0.05999755859375, 0.22003173828125],
            [0.1300048828125, 0.3699951171875],
            [0.1199951171875, 0.22998046875],
            [0.05999755859375, 0.0999755859375],
            [0.3599853515625, 0.3299560546875],
            [1.1600341796875, 0.0999755859375],
            [0.96002197265625, -1.84002685546875],
            [0.05999755859375, -0.66998291015625],
            [0, 0],
            [-28.4000244140625, 13.9500122070312],
            [-6.489990234375, 7.12005615234375],
            [-13.0399780273438, 1.58001708984375],
            [-8.760009765625, -1.77001953125],
            [16.0299682617188, -13.469970703125]
        ];
        var outTangents = [
            [0, 0],
            [-0.00999450683594, -2.90997314453125],
            [-0.0400390625, -0.0799560546875],
            [-0.02001953125, -0.02996826171875],
            [-0.00994873046875, -0.00994873046875],
            [0, -0.010009765625],
            [-0.010009765625, -0.010009765625],
            [0, -0.010009765625],
            [-0.01002502441406, -0.00994873046875],
            [-0.02001953125, -0.02996826171875],
            [0, -0.010009765625],
            [-2.3800048828125, -4.02996826171875],
            [-2.87005615234375, -1.1300048828125],
            [0, 0],
            [2.52001953125, 0.44000244140625],
            [0.96002197265625, 0.71002197265625],
            [0.33001708984375, 0.510009765625],
            [0.219970703125, 0.55999755859375],
            [0.72998046875, 1.90997314453125],
            [2.07000732421875, 0.09002685546875],
            [0.42999267578125, -0.90997314453125],
            [-0.0999755859375, -0.62994384765625],
            [-0.21002197265625, -0.6500244140625],
            [-0.989990234375, -2.2099609375],
            [-3.64996337890625, -3.61006164550781],
            [-0.66998291015625, -0.1300048828125],
            [0, 0],
            [0, -2.010009765625],
            [-1.8499755859375, -0.8499755859375],
            [-1.1099853515625, 0.98004150390625],
            [0, 0],
            [-5.0899658203125, 0.72003173828125],
            [-1.780029296875, 1.6500244140625],
            [-1.08001708984375, 2.3599853515625],
            [0.01995849609375, 2.550048828125],
            [1.05999755859375, 2.19000244140625],
            [3.92999267578125, 3.050048828125],
            [0, 0],
            [-2.44000244140625, -0.67999267578125],
            [-0.8900146484375, -0.85003662109375],
            [-0.30999755859375, -0.53997802734375],
            [-0.08001708984375, -0.22003173828125],
            [-0.1099853515625, -0.3800048828125],
            [-0.08001708984375, -0.25],
            [-0.04998779296875, -0.1099853515625],
            [-0.25, -0.41998291015625],
            [-0.83001708984375, -0.780029296875],
            [-2.07000732421875, -0.17999267578125],
            [-0.29998779296875, 0.5899658203125],
            [0, 0],
            [4.80999755859375, -39.1199951171875],
            [-17.4100341796875, -11.2899780273438],
            [7.969970703125, -8.75994873046875],
            [9.20001220703125, -1.3599853515625],
            [6.5999755859375, 1.32000732421875],
            [30.8800048828125, 12.7200317382812]
        ];
        createPathGrp(contents, 'Bag_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-0.184, -28.6153]);
    };
    var createBagBottom = function () {
        var vertices = [
            [85.8959808349609, -34.6953125],
            [26.0259857177734, -34.6953125],
            [26.1860198974609, -29.1353149414062],
            [19.0359954833984, -16.5453491210938],
            [4.39599609375, -11.3753051757812],
            [4.39599609375, -5.8553466796875],
            [2.64599609375, -1.96533203125],
            [-2.95399475097656, -1.14532470703125],
            [-5.96400451660156, -5.8553466796875],
            [-5.96400451660156, -11.8853149414062],
            [-8.62397766113281, -12.5053100585938],
            [-21.3139801025391, -20.3052978515625],
            [-25.2240142822266, -26.7653198242188],
            [-25.8640289306641, -28.6453247070312],
            [-26.2740020751953, -30.3953247070312],
            [-25.7140045166016, -33.3153076171875],
            [-24.6540069580078, -34.6953125],
            [-86.3839874267578, -34.6953125],
            [-16.5240020751953, 33.9246826171875]
        ];
        var inTangents = [
            [7.97998046875, 39.8299560546875],
            [0, 0],
            [0.199951171875, -1.84002685546875],
            [3.96003723144531, -3.07000732421875],
            [5.21000671386719, -0.4200439453125],
            [0, 0],
            [1.11004638671875, -0.97998046875],
            [1.8499755859375, 0.8499755859375],
            [0, 2.010009765625],
            [0, 0],
            [0.8699951171875, 0.239990234375],
            [3.29998779296875, 3.8599853515625],
            [0.92999267578125, 2.3599853515625],
            [0.19000244140625, 0.6400146484375],
            [0.05999755859375, 0.5999755859375],
            [-0.46002197265625, 0.88995361328125],
            [-0.41998291015625, 0.3900146484375],
            [0, 0],
            [-59.719970703125, -4.3599853515625]
        ];
        var outTangents = [
            [0, 0],
            [0.30999755859375, 1.8399658203125],
            [-0.5400390625, 5],
            [-4.17999267578125, 3.24005126953125],
            [0, 0],
            [0, 1.48004150390625],
            [-1.51995849609375, 1.34002685546875],
            [-1.82000732421875, -0.84002685546875],
            [0, 0],
            [-0.9000244140625, -0.16998291015625],
            [-4.8699951171875, -1.33001708984375],
            [-1.6400146484375, -1.9200439453125],
            [-0.239990234375, -0.6199951171875],
            [-0.16998291015625, -0.57000732421875],
            [-0.0999755859375, -1.010009765625],
            [0.27001953125, -0.530029296875],
            [0, 0],
            [-5.5400390625, 33.7799682617188],
            [88.6599731445312, 6.469970703125]
        ];
        createPathGrp(contents, 'Bag_Bottom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 70.701]);
    };
    var createDollarHideR = function () {
        var vertices = [
            [4.16851806640625, -4.86689758300781],
            [1.35610961914062, -6.91098022460938],
            [-5.7691650390625, -9.42826843261719],
            [-5.7691650390625, 9.42826843261719],
            [4.78903198242188, 3.86099243164062],
            [4.78903198242188, 3.86099243164062],
            [5.57273864746094, -2.02523803710938]
        ];
        var inTangents = [
            [0.73359680175781, 0.80404663085938],
            [1.02923583984375, 0.53718566894531],
            [2.43345642089844, 0.63986206054688],
            [0, 0],
            [-2.07383728027344, 3.6873779296875],
            [0, 0],
            [0.40325927734375, 1.96075439453125]
        ];
        var outTangents = [
            [-0.78718566894531, -0.86207580566406],
            [-2.24099731445312, -1.16860961914062],
            [0, 0],
            [3.94976806640625, -0.4464111328125],
            [0, 0],
            [0.99005126953125, -1.7613525390625],
            [-0.21873474121094, -1.06245422363281]
        ];
        createPathGrp(contents, 'Dollar_Hide_R', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [10.1704, 39.4956]);
    };
    var createDollarHideL = function () {
        var vertices = [
            [-3.44137573242188, -3.85603332519531],
            [-4.6640625, -0.5406494140625],
            [-4.25979614257812, 3.1234130859375],
            [-1.97811889648438, 5.63424682617188],
            [1.41264343261719, 7.38418579101562],
            [4.71511840820312, 8.53147888183594],
            [4.71511840820312, -8.53147888183594]
        ];
        var inTangents = [
            [1.81343078613281, -2.64773559570312],
            [0.1175537109375, -1.1973876953125],
            [-0.45584106445312, -1.12942504882812],
            [-0.9384765625, -0.63986206054688],
            [-1.17951965332031, -0.47418212890625],
            [-1.19985961914062, -0.3680419921875],
            [0, 0]
        ];
        var outTangents = [
            [-0.67904663085938, 0.99153137207031],
            [-0.1175537109375, 1.19985961914062],
            [0.43402099609375, 1.07635498046875],
            [1.05303955078125, 0.71624755859375],
            [0.98954772949219, 0.39830017089844],
            [0, 0],
            [-3.03115844726562, 0.64682006835938]
        ];
        createPathGrp(contents, 'Dollar_Hide_L', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-10.6841, 8.3408]);
    };
    createDollarHideL();
    createDollarHideR();
    createBagBottom();
    createBagTop();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createEarthIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Earth', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createEarthR = function () {
        var vertices = [
            [58.1924438476562, -0.4354248046875],
            [57.0443267822266, 5.90554809570312],
            [38.9890899658203, 51.4765777587891],
            [-5.35899353027344, 87.7577362060547],
            [-22.7527770996094, 93.5464324951172],
            [-21.0678558349609, 87.2618103027344],
            [-19.6371307373047, 85.8553924560547],
            [-4.00845336914062, 75.4323120117188],
            [-2.16415405273438, 73.0873870849609],
            [1.493408203125, 63.0185394287109],
            [3.46929931640625, 60.8610382080078],
            [13.2068786621094, 56.3894805908203],
            [15.2509307861328, 54.5205841064453],
            [25.7970428466797, 34.4469451904297],
            [25.0522766113281, 32.1288604736328],
            [18.6284637451172, 28.4102630615234],
            [-0.1943359375, 12.7470703125],
            [-3.3193359375, 11.1181488037109],
            [-13.5810852050781, 8.93836975097656],
            [-27.1385803222656, 6.30213928222656],
            [-33.6959533691406, 7.82444763183594],
            [-38.3866271972656, 6.4412841796875],
            [-45.8292846679688, 1.48245239257812],
            [-46.8552093505859, 0.06092834472656],
            [-46.486572265625, -4.885498046875],
            [-48.0623168945312, -6.58767700195312],
            [-48.6808471679688, -6.57035827636719],
            [-55.2673492431641, -3.48231506347656],
            [-56.2883758544922, -2.34300231933594],
            [-58.1360473632812, -10.1018829345703],
            [-57.2959594726562, -11.4621429443359],
            [-50.9706726074219, -14.4762420654297],
            [-49.0418090820312, -14.3656158447266],
            [-42.862060546875, -11.5278930664062],
            [-41.3239288330078, -10.9667053222656],
            [-36.3645629882812, -14.2791595458984],
            [-33.2613220214844, -20.4083709716797],
            [-26.5214385986328, -28.5073699951172],
            [-17.5975341796875, -35.5258178710938],
            [-11.1746673583984, -38.7924041748047],
            [1.94839477539062, -40.7814025878906],
            [3.58224487304688, -40.547119140625],
            [5.12971496582031, -41.6231384277344],
            [3.47175598144531, -47.7653045654297],
            [-0.34159851074219, -51.5414428710938],
            [-10.8114929199219, -66.1273345947266],
            [-13.0789184570312, -67.6866302490234],
            [-22.4831390380859, -69.7985534667969],
            [-31.5400238037109, -71.4832916259766],
            [-32.3686218261719, -70.3521728515625],
            [-33.8620452880859, -61.8134613037109],
            [-35.4440307617188, -60.7587585449219],
            [-44.3620910644531, -62.4606170654297],
            [-45.5333404541016, -63.6322937011719],
            [-45.5745239257812, -64.04345703125],
            [-45.7847137451172, -69.4008026123047],
            [-40.7543029785156, -70.7749786376953],
            [-36.7989501953125, -74.7138671875],
            [-34.7174377441406, -83.9402160644531],
            [-26.8762664794922, -80.7474212646484],
            [-26.2096862792969, -78.8478851318359],
            [-22.7572631835938, -73.6589965820312],
            [-20.2818450927734, -72.6346282958984],
            [-11.4599456787109, -73.1473388671875],
            [-11.1141815185547, -75.2111511230469],
            [-23.2258911132812, -87.6347351074219],
            [-24.4161987304688, -92.9336547851562],
            [-23.1510467529297, -93.4175567626953],
            [-15.0504760742188, -91.8339996337891],
            [-13.8084869384766, -91.1488494873047],
            [-12.5770874023438, -90.0476837158203],
            [-2.26483154296875, -73.8125305175781],
            [0.61763000488281, -69.2349700927734],
            [10.7674865722656, -60.1155395507812],
            [11.8638916015625, -59.1746673583984],
            [16.8042907714844, -60.2229766845703],
            [26.5838470458984, -66.2205352783203],
            [39.4373779296875, -67.7975158691406],
            [40.9861907958984, -66.8495483398438],
            [56.5180511474609, -27.4233551025391],
            [57.7838592529297, -18.0123443603516],
            [58.1924438476562, -16.9784851074219]
        ];
        var inTangents = [
            [0, -5.51435852050781],
            [0.2999267578125, -2.1182861328125],
            [9.65513610839844, -13.7343292236328],
            [18.1114196777344, -8.01153564453125],
            [6.18051147460938, -1.39389038085938],
            [-0.54313659667969, 2.01579284667969],
            [-0.56507873535156, 0.37791442871094],
            [-5.22984313964844, 3.44354248046875],
            [-0.36134338378906, 1.03182983398438],
            [-1.16903686523438, 3.37364196777344],
            [-1.0164794921875, 0.45289611816406],
            [-3.25886535644531, 1.46151733398438],
            [-0.47982788085938, 0.92884826660156],
            [-3.58561706542969, 6.65353393554688],
            [1.11892700195312, 0.60018920898438],
            [2.21653747558594, 1.08493041992188],
            [5.0087890625, 6.73587036132812],
            [1.36918640136719, 0.04425048828125],
            [3.34632873535156, 1.01744079589844],
            [4.553955078125, 0.65628051757812],
            [2.12057495117188, -0.72212219238281],
            [1.25637817382812, 1.85835266113281],
            [3.35432434082031, 0.35653686523438],
            [-0.09214782714844, 0.86386108398438],
            [-0.18873596191406, 1.64117431640625],
            [1.47946166992188, -0.30606079101562],
            [0.20237731933594, 0.02696228027344],
            [1.49710083007812, -2.53663635253906],
            [0.48805236816406, -0.53672790527344],
            [0.65072631835938, 2.48631286621094],
            [-0.56632995605469, 0.26898193359375],
            [-2.08880615234375, 1.04397583007812],
            [-0.64190673828125, -0.30099487304688],
            [-2.06559753417969, -0.93341064453125],
            [-0.52947998046875, -0.08172607421875],
            [-0.7860107421875, 3.6077880859375],
            [-1.62066650390625, 1.79360961914062],
            [-2.05130004882812, 2.84223937988281],
            [-3.59417724609375, 1.57955932617188],
            [-1.96292114257812, 1.35023498535156],
            [-0.53388977050781, -0.12432861328125],
            [-4.648193359375, -1.13015747070312],
            [-0.26271057128906, 0.9072265625],
            [2.29823303222656, 1.68341064453125],
            [1.34097290039062, 1.181884765625],
            [2.23178100585938, 5.75936889648438],
            [1.28253173828125, -0.1121826171875],
            [3.05024719238281, 1.78462219238281],
            [3.0343017578125, 0.5806884765625],
            [0.09181213378906, -0.51353454589844],
            [0.43003845214844, -2.85646057128906],
            [1.04217529296875, 0.22547912597656],
            [2.98091125488281, 0.5224609375],
            [0.05276489257812, 0.730224609375],
            [-0.001708984375, 0.1368408203125],
            [-1.12162780761719, 1.27218627929688],
            [-1.75344848632812, 0.22328186035156],
            [-0.32159423828125, 2.59217834472656],
            [-0.74772644042969, 3.19346618652344],
            [-2.61480712890625, -0.99839782714844],
            [0.00151062011719, -0.66424560546875],
            [-3.48078918457031, -1.44471740722656],
            [-0.80120849609375, -0.39053344726562],
            [-2.91993713378906, 2.10856628417969],
            [0.79801940917969, 0.99285888671875],
            [4.263427734375, 3.90444946289062],
            [-0.00808715820312, 1.83128356933594],
            [-0.47154235839844, -0.08834838867188],
            [-2.70272827148438, -0.51460266113281],
            [-0.3612060546875, -0.32060241699219],
            [-0.45504760742188, -0.29910278320312],
            [-1.53739929199219, -6.60020446777344],
            [-1.47259521484375, -1.26724243164062],
            [-3.3768310546875, -3.04737854003906],
            [-0.39982604980469, -0.26118469238281],
            [-1.06666564941406, 2.478271484375],
            [-4.66851806640625, 0.05780029296875],
            [-4.16716003417969, 1.44459533691406],
            [-0.36944580078125, -0.56878662109375],
            [-2.44090270996094, -14.2137145996094],
            [-0.42207336425781, -3.13720703125],
            [-0.55091857910156, -0.17929077148438]
        ];
        var outTangents = [
            [-1.02635192871094, 1.99403381347656],
            [-2.35748291015625, 16.6506958007812],
            [-11.3962860107422, 16.2110900878906],
            [-5.51731872558594, 2.44058227539062],
            [0.60333251953125, -2.25177001953125],
            [0.20086669921875, -0.7454833984375],
            [5.20509338378906, -3.48114013671875],
            [0.91337585449219, -0.60139465332031],
            [1.18016052246094, -3.36997985839844],
            [0.36834716796875, -1.06297302246094],
            [3.26234436035156, -1.45350646972656],
            [0.91767883300781, -0.41154479980469],
            [3.46910095214844, -6.71537780761719],
            [0.67857360839844, -1.25918579101562],
            [-2.17948913574219, -1.16905212402344],
            [-7.5579833984375, -3.69941711425781],
            [-0.80178833007812, -1.0782470703125],
            [-3.53895568847656, -0.1143798828125],
            [-4.43812561035156, -1.34939575195312],
            [-2.27775573730469, -0.3282470703125],
            [-2.02305603027344, 0.68894958496094],
            [-1.77780151367188, -2.62956237792969],
            [-0.78936767578125, -0.08390808105469],
            [0.17529296875, -1.64328002929688],
            [0.14651489257812, -1.27412414550781],
            [-0.19932556152344, 0.04122924804688],
            [-2.85862731933594, -0.38092041015625],
            [-0.20072937011719, 0.340087890625],
            [-0.64886474609375, -2.7593994140625],
            [-0.22834777832031, -0.87245178222656],
            [2.10984802246094, -1.00202941894531],
            [0.71551513671875, -0.35762023925781],
            [2.05223083496094, 0.96232604980469],
            [0.49722290039062, 0.22468566894531],
            [3.66647338867188, 0.56594848632812],
            [0.51197814941406, -2.34996032714844],
            [2.35398864746094, -2.60519409179688],
            [2.33544921875, -3.2359619140625],
            [2.19866943359375, -0.96627807617188],
            [4.11126708984375, -2.82801818847656],
            [0.53211975097656, 0.12937927246094],
            [0.94747924804688, 0.22062683105469],
            [0.70120239257812, -2.42144775390625],
            [-1.42683410644531, -1.04512023925781],
            [-4.61341857910156, -4.06608581542969],
            [-0.42141723632812, -1.08750915527344],
            [-3.34275817871094, 0.29237365722656],
            [-2.61154174804688, -1.52793884277344],
            [-0.81866455078125, -0.15666198730469],
            [-0.508544921875, 2.84455871582031],
            [-0.16374206542969, 1.08767700195312],
            [-2.95722961425781, -0.63984680175781],
            [-0.73666381835938, -0.12910461425781],
            [-0.00991821289062, -0.13739013671875],
            [0.02323913574219, -1.84211730957031],
            [0.96635437011719, -1.09605407714844],
            [2.43179321289062, -0.30966186523438],
            [0.37867736816406, -3.05218505859375],
            [2.65267944335938, 1.0882568359375],
            [1.0909423828125, 0.41654968261719],
            [-0.00848388671875, 3.74345397949219],
            [0.824951171875, 0.34239196777344],
            [3.04322814941406, 1.48335266113281],
            [1.11344909667969, -0.80406188964844],
            [-3.64215087890625, -4.53135681152344],
            [-1.8148193359375, -1.66201782226562],
            [0.00393676757812, -0.89347839355469],
            [2.70414733886719, 0.50666809082031],
            [0.50877380371094, 0.09687805175781],
            [0.4122314453125, 0.36587524414062],
            [5.87921142578125, 3.86447143554688],
            [0.44392395019531, 1.90574645996094],
            [3.44673156738281, 2.96607971191406],
            [0.35777282714844, 0.32286071777344],
            [2.365234375, 1.54510498046875],
            [4.29548645019531, -0.05317687988281],
            [1.91220092773438, -4.44282531738281],
            [0.93162536621094, -0.32296752929688],
            [7.85223388671875, 12.0886383056641],
            [0.53535461425781, 3.11747741699219],
            [0.04995727539062, 0.37117004394531],
            [0, 5.51434326171875]
        ];
        createPathGrp(contents, 'Earth_R', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [47.8895, 9.327]);
    };
    var createEarthTop = function () {
        var vertices = [
            [62.6916809082031, -8.84921264648438],
            [50.4791717529297, -9.67308044433594],
            [47.9909362792969, -9.15495300292969],
            [37.5060272216797, -0.266845703125],
            [35.2502593994141, 0.89439392089844],
            [19.6194458007812, 2.40928649902344],
            [11.0312652587891, 1.44229125976562],
            [9.19749450683594, 2.25553894042969],
            [5.36749267578125, 8.37841796875],
            [3.09194946289062, 9.80534362792969],
            [-10.3298797607422, 10.4018859863281],
            [-18.6793060302734, 8.27890014648438],
            [-22.7351837158203, 8.74395751953125],
            [-38.2134094238281, 13.682373046875],
            [-60.7212371826172, 18.6536712646484],
            [-62.6916809082031, 18.9071807861328]
        ];
        var inTangents = [
            [-39.3785705566406, -19.9376831054688],
            [4.04042053222656, 0.35565185546875],
            [0.81341552734375, -0.51103210449219],
            [2.8126220703125, -3.76457214355469],
            [0.97773742675781, -0.0849609375],
            [5.20516967773438, -0.55461120605469],
            [2.84991455078125, 0.4012451171875],
            [0.44985961914062, -0.73678588867188],
            [1.24192810058594, -2.06184387207031],
            [1.11912536621094, -0.041259765625],
            [4.47442626953125, -0.01866149902344],
            [2.74552917480469, 0.84988403320312],
            [1.28407287597656, -0.93939208984375],
            [5.56330871582031, -0.44746398925781],
            [7.36767578125, -2.27024841308594],
            [0.71247863769531, 0.32919311523438]
        ];
        var outTangents = [
            [-4.20672607421875, 1.17646789550781],
            [-0.95704650878906, -0.08424377441406],
            [-3.9237060546875, 2.46513366699219],
            [-0.57774353027344, 0.77328491210938],
            [-5.21485900878906, 0.45310974121094],
            [-2.94468688964844, 0.31375122070312],
            [-0.92608642578125, -0.13038635253906],
            [-1.25445556640625, 2.0545654296875],
            [-0.53950500488281, 0.89570617675781],
            [-4.47578430175781, 0.16500854492188],
            [-2.89755249023438, 0.0120849609375],
            [-1.49423217773438, -0.46253967285156],
            [-4.60592651367188, 3.36955261230469],
            [-7.72206115722656, 0.62110900878906],
            [-0.63917541503906, 0.19694519042969],
            [30.7510528564453, -38.3227081298828]
        ];
        createPathGrp(contents, 'Earth_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-18.0057, -86.6205]);
    };
    var createEarthL = function () {
        var vertices = [
            [57.4036102294922, 63.5877685546875],
            [57.5036468505859, 76.2877197265625],
            [57.7035980224609, 78.1377563476562],
            [56.4535980224609, 79.65771484375],
            [35.8136444091797, 80.40771484375],
            [51.5336151123047, 80.40771484375],
            [29.2736053466797, 79.2977294921875],
            [-58.8363800048828, -2.74224853515625],
            [-47.4363555908203, -77.7022705078125],
            [-45.7964019775391, -79.072265625],
            [-40.3563995361328, -80.1322631835938],
            [-39.8163604736328, -80.292236328125],
            [-40.2563629150391, -80.0222778320312],
            [-46.6163482666016, -74.572265625],
            [-35.8763580322266, -70.4322509765625],
            [-14.0363922119141, -73.322265625],
            [-9.80635070800781, -71.4622802734375],
            [-1.20637512207031, -57.3822631835938],
            [-0.14637756347656, -53.5222778320312],
            [-0.19636535644531, -40.292236328125],
            [13.9936370849609, -19.5222778320312],
            [0.75364685058594, -37.4622802734375],
            [14.7536468505859, -18.55224609375],
            [17.1136322021484, -18.2422485351562],
            [17.5736541748047, -19.812255859375],
            [17.9036102294922, -24.6922607421875],
            [21.6036224365234, -16.9322509765625],
            [27.4836273193359, -12.2222290039062],
            [39.3836517333984, -9.6722412109375],
            [42.1836395263672, -8.13226318359375],
            [44.3536224365234, -5.9222412109375],
            [54.5936126708984, 0.38775634765625],
            [55.4236297607422, 2.15771484375],
            [49.5836029052734, 14.207763671875],
            [49.6536102294922, 16.8577270507812],
            [50.0436248779297, 17.5777587890625],
            [61.2236175537109, 45.7677764892578],
            [61.2635955810547, 48.187744140625]
        ];
        var inTangents = [
            [1.44000244140625, -5.09002685546875],
            [-0.07000732421875, -4.22998046875],
            [-0.0999755859375, -0.6099853515625],
            [1.1300048828125, -0.1199951171875],
            [1.54998779296875, -0.77996826171875],
            [0, 0],
            [2.17999267578125, 0.32000732421875],
            [9.42999267578125, 43.1799926757812],
            [-13.1300048828125, 23.5800170898438],
            [-0.8399658203125, 0.1300048828125],
            [-1.8800048828125, 0.03997802734375],
            [-0.05999755859375, -0.1700439453125],
            [0.2099609375, -0.00994873046875],
            [1.97998046875, -2],
            [-4.34002685546875, -0.010009765625],
            [-7.22998046875, 1.280029296875],
            [-1.08001708984375, -1.89996337890625],
            [-2.92999267578125, -4.64996337890625],
            [0.02001953125, -1.42999267578125],
            [0.05999755859375, -4.4100341796875],
            [-0.6500244140625, -0.8699951171875],
            [-4.4100341796875, -5.97998046875],
            [-0.2900390625, -0.280029296875],
            [-0.77001953125, 0.15997314453125],
            [-0.02001953125, 0.54998779296875],
            [-0.30999755859375, 1.72003173828125],
            [-0.97998046875, -2.67999267578125],
            [-3.03997802734375, -0.45001220703125],
            [-3.97003173828125, -0.8599853515625],
            [-0.739990234375, -0.90997314453125],
            [-0.65997314453125, -0.780029296875],
            [-4.3499755859375, -0.58001708984375],
            [0.58001708984375, -1.14996337890625],
            [1.98004150390625, -4],
            [-0.7099609375, -0.8800048828125],
            [-0.1500244140625, -0.23002624511719],
            [-2.30999755859375, -9.96003723144531],
            [0.21002197265625, -0.83001708984375]
        ];
        var outTangents = [
            [-1.219970703125, 4.28997802734375],
            [0.00994873046875, 0.6199951171875],
            [0.1800537109375, 1.01995849609375],
            [-1.63995361328125, 0.1700439453125],
            [0, 0],
            [-2.08001708984375, -0.91998291015625],
            [-43.6300048828125, -6.39996337890625],
            [-5.760009765625, -26.3599853515625],
            [0.38995361328125, -0.7099609375],
            [1.82000732421875, -0.27996826171875],
            [0.11004638671875, -0.3399658203125],
            [0.0999755859375, 0.27996826171875],
            [-1.83001708984375, 2.1400146484375],
            [3.1199951171875, 2.66998291015625],
            [7.4599609375, 0.02001953125],
            [2.02001953125, -0.3599853515625],
            [2.699951171875, 4.7900390625],
            [0.77001953125, 1.22003173828125],
            [-0.07000732421875, 4.4100341796875],
            [-0.010009765625, 1.0999755859375],
            [4.42999267578125, 5.96002197265625],
            [0.239990234375, 0.33001708984375],
            [0.69000244140625, 0.66998291015625],
            [0.8599853515625, -0.16998291015625],
            [0.05999755859375, -1.58001708984375],
            [1.25, 2.58001708984375],
            [1.04998779296875, 2.90997314453125],
            [4, 0.6099853515625],
            [1.0899658203125, 0.239990234375],
            [0.65997314453125, 0.79998779296875],
            [2.72998046875, 3.22998046875],
            [1.16998291015625, 0.15997314453125],
            [-2.010009765625, 3.99005126953125],
            [-0.469970703125, 0.949951171875],
            [0.1700439453125, 0.21002197265625],
            [5.52001953125, 8.69000244140625],
            [0.19000244140625, 0.8399658203125],
            [-1.28997802734375, 5.1300048828125]
        ];
        createPathGrp(contents, 'Earth_L', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-44.2936, 25.6722]);
    };
    createEarthL();
    createEarthTop();
    createEarthR();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createKaboomIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Kaboom', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createExplosionPiece01 = function () {
        var vertices = [
            [47.7749938964844, -19.4231872558594],
            [51.7250061035156, -16.0232238769531],
            [51.9649963378906, -13.1432189941406],
            [48.9349670410156, -13.4831848144531],
            [32.8349914550781, -16.5732116699219],
            [30.2449645996094, -17.3332214355469],
            [30.5049743652344, -19.4231872558594],
            [-22.5249938964844, -19.4231872558594],
            [-26.4649963378906, -15.5531921386719],
            [-29.2350158691406, -14.7532043457031],
            [-29.5149841308594, -17.8031921386719],
            [-28.3349914550781, -19.4231872558594],
            [-112.214996337891, -19.4231872558594],
            [-89.9850158691406, -12.3731994628906],
            [-93.5650329589844, -13.9432067871094],
            [-65.5450134277344, -4.34323120117188],
            [-61.9850158691406, -3.41323852539062],
            [-35.1350402832031, 4.85678100585938],
            [-32.0249938964844, 6.19680786132812],
            [-25.3150329589844, 14.3168029785156],
            [-13.0550231933594, 14.2767639160156],
            [-9.35501098632812, 15.0267639160156],
            [9.31497192382812, 14.9468078613281],
            [12.6149749755859, 14.1667785644531],
            [16.6349792480469, 15.3667907714844],
            [31.8949890136719, 6.06680297851562],
            [35.1149597167969, 4.93679809570312],
            [41.0249938964844, 7.68679809570312],
            [61.6149597167969, -2.89321899414062],
            [65.7149963378906, -4.12319946289062],
            [89.6549377441406, -11.8432312011719],
            [93.9850158691406, -13.7032165527344],
            [106.404937744141, -14.2832336425781],
            [112.214996337891, -19.4231872558594]
        ];
        var inTangents = [
            [0, 0],
            [-1.23004150390625, -1.3499755859375],
            [0.9599609375, -0.97998046875],
            [0.92999267578125, 0.97998046875],
            [6.1500244140625, -3.05999755859375],
            [0.550048828125, 1.0400390625],
            [-0.53997802734375, 0.51995849609375],
            [0, 0],
            [1.19000244140625, -1.6300048828125],
            [1.16998291015625, 0.78997802734375],
            [-0.6700439453125, 1.1099853515625],
            [-0.44000244140625, 0.51995849609375],
            [0, 0],
            [-6.32000732421875, 3.27001953125],
            [-0.77996826171875, -1.77001953125],
            [-10.3200073242188, 6.08001708984375],
            [-0.91998291015625, -1.75],
            [-11.3399658203125, 6.17999267578125],
            [-0.300048828125, -1.7900390625],
            [-3.489990234375, -1.6300048828125],
            [-4.05999755859375, 1.74005126953125],
            [-1.16998291015625, -1.26995849609375],
            [-5.6199951171875, 5.92999267578125],
            [-1.38996887207031, -0.5999755859375],
            [-1.36997985839844, -0.280029296875],
            [-2, 6.95001220703125],
            [-1.5899658203125, -1.02001953125],
            [-2.17999267578125, -0.47998046875],
            [-4.12994384765625, 8.35003662109375],
            [-2.30999755859375, -1.3900146484375],
            [-4.39990234375, 10.27001953125],
            [-2.760009765625, -1.17999267578125],
            [-4, 2.1400146484375],
            [-1.35009765625, 2.07000732421875]
        ];
        var outTangents = [
            [1.3900146484375, 0.90997314453125],
            [0.8399658203125, 0.92999267578125],
            [-1.08001708984375, 1.09002685546875],
            [-4.6300048828125, -4.8699951171875],
            [-1.0999755859375, 0.55999755859375],
            [-0.469970703125, -0.8699951171875],
            [0, 0],
            [-1.44000244140625, 0.9599609375],
            [-0.71002197265625, 0.989990234375],
            [-1.27996826171875, -0.8599853515625],
            [0.3399658203125, -0.55999755859375],
            [0, 0],
            [4.010009765625, 6.219970703125],
            [1.8699951171875, -0.97003173828125],
            [4.8499755859375, 11.0599975585938],
            [1.6300048828125, -0.9599609375],
            [6.07000732421875, 11.56005859375],
            [1.62005615234375, -0.8800048828125],
            [0.67999267578125, 4.03997802734375],
            [4.07000732421875, 1.90997314453125],
            [1.510009765625, -0.63995361328125],
            [5.42999267578125, 5.9000244140625],
            [1.00001525878906, -1.05999755859375],
            [1.27001953125, 0.55999755859375],
            [7.1099853515625, 1.42999267578125],
            [0.47998046875, -1.69000244140625],
            [1.85003662109375, 1.20001220703125],
            [8.45001220703125, 1.8800048828125],
            [1.21002197265625, -2.44000244140625],
            [9.5899658203125, 5.760009765625],
            [1.22998046875, -2.8699951171875],
            [4.25, 1.82000732421875],
            [2.5, -1.3399658203125],
            [0, 0]
        ];
        createPathGrp(contents, 'Explosion_Piece_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.295, -14.0068]);
    };
    var createExplosionPiece02 = function () {
        var vertices = [
            [114.330078125, -45.4299926757812],
            [-76.75, -45.4299926757812],
            [-76.5800170898438, -45.3699951171875],
            [-75.010009765625, -42.9299926757812],
            [-77.8599853515625, -41.8099975585938],
            [-83.260009765625, -43.280029296875],
            [-93.989990234375, -40.4600219726562],
            [-96.8699951171875, -40.3099975585938],
            [-96.4400024414062, -43.3300170898438],
            [-93.4000244140625, -45.4299926757812],
            [-113.830017089844, -45.4299926757812],
            [-113.070007324219, -35.5599975585938],
            [-111.919982910156, -33.4299926757812],
            [-111.289978027344, -32.530029296875],
            [-28.75, -32.530029296875],
            [-28.0399780273438, -33.4299926757812],
            [-10.0599975585938, -39.52001953125],
            [-3.05999755859375, -37.75],
            [-1.75, -35.3699951171875],
            [-4.04998779296875, -34.1099853515625],
            [-9.84002685546875, -35.6300048828125],
            [-23.4299926757812, -32.530029296875],
            [-22.22998046875, -33.4299926757812],
            [30.2999877929688, -32.530029296875],
            [30.7999877929688, -33.4299926757812],
            [31.6199951171875, -34.010009765625],
            [40.6099853515625, -35.9400024414062],
            [48.0700073242188, -33.4299926757812],
            [49.3200073242188, -32.530029296875],
            [111.859985351562, -32.530029296875],
            [112.510009765625, -33.4299926757812],
            [114.75, -41.8400268554688]
        ];
        var inTangents = [
            [0.25, 1.13995361328125],
            [0, 0],
            [-0.05999755859375, -0.02001953125],
            [0.41998291015625, -1.27001953125],
            [1.3499755859375, 0.45001220703125],
            [1.83001708984375, 0.27001953125],
            [3.0999755859375, -2.71002197265625],
            [0.94000244140625, 1],
            [-0.989990234375, 0.8800048828125],
            [-1.04998779296875, 0.54998779296875],
            [0, 0],
            [-1.3499755859375, -3.11004638671875],
            [-0.44000244140625, -0.6700439453125],
            [-0.22003173828125, -0.28997802734375],
            [0, 0],
            [-0.25, 0.28997802734375],
            [-6.5999755859375, -1.08001708984375],
            [-2.27001953125, -0.85003662109375],
            [1.16998291015625, 0.199951171875],
            [0.3800048828125, -1.1600341796875],
            [2.02001953125, 0.28997802734375],
            [3.51995849609375, -2.3800048828125],
            [0.3900146484375, -0.3299560546875],
            [0, 0],
            [-0.26995849609375, 0.25994873046875],
            [-0.32000732421875, 0.15997314453125],
            [-3.89996337890625, -0.010009765625],
            [-2.3900146484375, -1.59002685546875],
            [-0.4100341796875, -0.3299560546875],
            [0, 0],
            [-0.199951171875, 0.30999755859375],
            [0.090087890625, 3.23004150390625]
        ];
        var outTangents = [
            [0, 0],
            [0.05999755859375, 0.01995849609375],
            [1.1700439453125, 0.44000244140625],
            [-0.45001220703125, 1.3499755859375],
            [-1.77001953125, -0.60003662109375],
            [-3.92999267578125, -0.55999755859375],
            [-0.96002197265625, 0.84002685546875],
            [-1.05999755859375, -1.11004638671875],
            [0.97003173828125, -0.8599853515625],
            [0, 0],
            [-0.76995849609375, 3.25994873046875],
            [0.33001708984375, 0.75],
            [0, 0],
            [0.20001220703125, 0.30999755859375],
            [0.219970703125, -0.29998779296875],
            [3.8699951171875, -4.52001953125],
            [2.3800048828125, 0.3800048828125],
            [1.08001708984375, 0.39996337890625],
            [-0.33001708984375, 0.97998046875],
            [-1.85003662109375, -0.62005615234375],
            [-4.64996337890625, -0.67999267578125],
            [-0.4100341796875, 0.26995849609375],
            [0, 0],
            [0.04998779296875, -0.3399658203125],
            [0.22003173828125, -0.23004150390625],
            [2.47003173828125, -1.239990234375],
            [2.510009765625, 0.03997802734375],
            [0.41998291015625, 0.27996826171875],
            [0, 0],
            [0.2301025390625, -0.28997802734375],
            [1.56005859375, -2.36004638671875],
            [-0.0400390625, -1.25]
        ];
        createPathGrp(contents, 'Explosion_Piece_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createExplosionPiece03 = function () {
        var vertices = [
            [105.625, -2.11001586914062],
            [103.244995117188, -4.64999389648438],
            [101.855102539062, -9.47000122070312],
            [63.6050415039062, -9.47000122070312],
            [68.0550537109375, -6.52999877929688],
            [69.0250244140625, -3.19998168945312],
            [65.625, -3.60000610351562],
            [53.6749877929688, -7.86996459960938],
            [46.0549926757812, -6.45999145507812],
            [43.3550415039062, -7.48001098632812],
            [43.864990234375, -9.47000122070312],
            [-101.974975585938, -9.47000122070312],
            [-103.114990234375, -5.67996215820312],
            [-105.945007324219, -1.92996215820312],
            [-114.234985351562, 9.47000122070312],
            [-94.9549560546875, 9.47000122070312],
            [-86.3150024414062, 6.88998413085938],
            [-76.8150024414062, 8.75003051757812],
            [-75.60498046875, 9.47000122070312],
            [114.234985351562, 9.47000122070312]
        ];
        var inTangents = [
            [4.9400634765625, 2.55999755859375],
            [0.239990234375, 1.57000732421875],
            [0.64990234375, 1.42999267578125],
            [0, 0],
            [-1.2900390625, -1.16998291015625],
            [1.18994140625, -1.41998291015625],
            [1.0499267578125, 0.96002197265625],
            [4.760009765625, 0.03997802734375],
            [2.58001708984375, -0.96002197265625],
            [0.469970703125, 1.20001220703125],
            [-0.5899658203125, 0.47003173828125],
            [0, 0],
            [0.20001220703125, -1.35003662109375],
            [1.74005126953125, -0.84002685546875],
            [0.8900146484375, -4.82000732421875],
            [0, 0],
            [-2.8699951171875, 0.02001953125],
            [-2.8599853515625, -1.10003662109375],
            [-0.29998779296875, -0.29998779296875],
            [0, 0]
        ];
        var outTangents = [
            [-1.1099853515625, -0.5699462890625],
            [-0.27001953125, -1.77996826171875],
            [0, 0],
            [1.64996337890625, 0.7900390625],
            [1.010009765625, 0.92999267578125],
            [-1.18994140625, 1.42999267578125],
            [-3.26995849609375, -2.989990234375],
            [-2.3499755859375, 0.03997802734375],
            [-1.239990234375, 0.47003173828125],
            [-0.35003662109375, -0.88995361328125],
            [0, 0],
            [-0.54998779296875, 1.16998291015625],
            [-0.29998779296875, 1.989990234375],
            [-4.42999267578125, 2.14996337890625],
            [0, 0],
            [2.739990234375, -1.80999755859375],
            [3.71002197265625, 0.02001953125],
            [0.489990234375, 0.17999267578125],
            [0, 0],
            [-0.8399658203125, -5.04998779296875]
        ];
        createPathGrp(contents, 'Explosion_Piece_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.235, -54.12]);
    };
    var createExplosionPiece04 = function () {
        var vertices = [
            [89.2799072265625, -1.41500854492188],
            [86.4100341796875, -4.19503784179688],
            [85.9998779296875, -7.78500366210938],
            [-33.8400268554688, -7.78500366210938],
            [-31.7200317382812, -7.15499877929688],
            [-30.0800170898438, -4.75503540039062],
            [-32.320068359375, -3.37503051757812],
            [-39.06005859375, -4.96499633789062],
            [-56.4700317382812, 1.25497436523438],
            [-59.27001953125, 1.87496948242188],
            [-59.3400268554688, -1.20498657226562],
            [-49.8800659179688, -7.78500366210938],
            [-85.9200439453125, -7.78500366210938],
            [-86.2600708007812, -4.54501342773438],
            [-89.5100708007812, -1.38504028320312],
            [-102.410034179688, 7.78500366210938],
            [43.2599487304688, 7.78500366210938],
            [44.8199462890625, 6.02499389648438],
            [65.8699951171875, 7.78500366210938],
            [102.410034179688, 7.78500366210938]
        ];
        var inTangents = [
            [6.5400390625, 0.3499755859375],
            [0.10986328125, 2.010009765625],
            [0.2100830078125, 1.15997314453125],
            [0, 0],
            [-0.70001220703125, -0.23004150390625],
            [0.3199462890625, -1.29998779296875],
            [2.33001708984375, 0.27996826171875],
            [1.1600341796875, 0.10003662109375],
            [4.51995849609375, -5.64996337890625],
            [1.1099853515625, 0.8599853515625],
            [-0.79998779296875, 1.01995849609375],
            [-3.66998291015625, 1.19000244140625],
            [0, 0],
            [0.0400390625, -1.0999755859375],
            [2.25, -0.1199951171875],
            [1.8499755859375, -5.300048828125],
            [0, 0],
            [-0.8800048828125, 0.39996337890625],
            [-5.9400634765625, -3.84002685546875],
            [0, 0]
        ];
        var outTangents = [
            [-1.949951171875, -0.10003662109375],
            [-0.06005859375, -1.22998046875],
            [0, 0],
            [0.7099609375, 0.19000244140625],
            [1.19000244140625, 0.38995361328125],
            [-0.260009765625, 1.030029296875],
            [-2.14996337890625, -0.69000244140625],
            [-6.8299560546875, -0.80999755859375],
            [-0.780029296875, 0.97998046875],
            [-1.20001220703125, -0.94000244140625],
            [2.57000732421875, -3.2900390625],
            [0, 0],
            [-0.19000244140625, 1.05999755859375],
            [-0.0899658203125, 2.3599853515625],
            [-6.14996337890625, 0.32000732421875],
            [0, 0],
            [0.02001953125, -0.80999755859375],
            [6.3599853515625, -2.91998291015625],
            [0, 0],
            [-2.02001953125, -5.60003662109375]
        ];
        createPathGrp(contents, 'Explosion_Piece_04', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.17, -70.155]);
    };
    var createExplosionPiece05 = function () {
        var vertices = [
            [71.4999389648438, -9.96499633789062],
            [49.0499877929688, -9.96499633789062],
            [45.2899780273438, -7.87496948242188],
            [40.8999633789062, -8.77499389648438],
            [40.0399780273438, -9.96499633789062],
            [21.3599853515625, -9.96499633789062],
            [26.3000030517578, -6.23501586914062],
            [27.8800048828125, -4.20498657226562],
            [27.4599761962891, -1.72500610351562],
            [24.9599609375, -1.97500610351562],
            [2.00994873046875, -7.41500854492188],
            [1.3299560546875, -7.24502563476562],
            [-1.71002197265625, -8.34500122070312],
            [-1.4000244140625, -9.96499633789062],
            [-39.9500122070312, -9.96499633789062],
            [-41.2100219726562, -8.30502319335938],
            [-44.9400024414062, -7.71499633789062],
            [-48.760009765625, -9.96499633789062],
            [-71.0900268554688, -9.96499633789062],
            [-86.0700073242188, 9.96499633789062],
            [-51.7100219726562, 9.96499633789062],
            [-44.8900146484375, 8.23501586914062],
            [-31.760009765625, 9.92501831054688],
            [-31.6500244140625, 9.96499633789062],
            [86.0700073242188, 9.96499633789062]
        ];
        var inTangents = [
            [7.4400634765625, 3.53997802734375],
            [0, 0],
            [1.22998046875, -0.81005859375],
            [1.260009765625, 1.8699951171875],
            [0.30000305175781, 0.3900146484375],
            [0, 0],
            [-1.52001953125, -1.54998779296875],
            [-0.48004150390625, -0.71002197265625],
            [0.83000183105469, -0.66998291015625],
            [0.6600341796875, 0.80999755859375],
            [8.6400146484375, -2.3800048828125],
            [0.21002197265625, -0.0899658203125],
            [0.44000244140625, 1.510009765625],
            [-0.3699951171875, 0.3900146484375],
            [0, 0],
            [0.40997314453125, -0.5699462890625],
            [1.53997802734375, 1.07000732421875],
            [1.29998779296875, 0.6300048828125],
            [0, 0],
            [1.22998046875, -8.82000732421875],
            [0, 0],
            [-2.41998291015625, 0.26995849609375],
            [-4.280029296875, -1.3900146484375],
            [-0.02996826171875, -0.010009765625],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-1.27001953125, 0.59002685546875],
            [-2, 1.30999755859375],
            [-0.27996826171875, -0.4100341796875],
            [0, 0],
            [1.760009765625, 0.95001220703125],
            [0.59996032714844, 0.61004638671875],
            [0.62001037597656, 0.91998291015625],
            [-0.88002014160156, 0.72003173828125],
            [-6.25, -7.77996826171875],
            [-0.22998046875, 0.05999755859375],
            [-1.3599853515625, 0.57000732421875],
            [-0.21002197265625, -0.719970703125],
            [0, 0],
            [-0.42999267578125, 0.53997802734375],
            [-1.1099853515625, 1.550048828125],
            [-1.239990234375, -0.8699951171875],
            [0, 0],
            [-8.05999755859375, 3.72998046875],
            [0, 0],
            [2.1099853515625, -0.9000244140625],
            [4.489990234375, -0.52001953125],
            [0.03997802734375, 0.010009765625],
            [0, 0],
            [-1.4100341796875, -9.30999755859375]
        ];
        createPathGrp(contents, 'Explosion_Piece_05', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.21, -87.235]);
    };
    var createExplosionPiece06 = function () {
        var vertices = [
            [45.1949768066406, 8.24830627441406],
            [40.8049621582031, 7.34828186035156],
            [31.1349792480469, -2.12174987792969],
            [-8.66500854492188, -10.8117523193359],
            [-41.3050231933594, 7.81825256347656],
            [-45.0350036621094, 8.40827941894531],
            [-59.2350158691406, 3.55830383300781],
            [-78.8450012207031, 11.4983062744141],
            [22.3349914550781, 11.4983062744141],
            [1.91494750976562, 8.70826721191406],
            [1.23495483398438, 8.87825012207031],
            [-1.80502319335938, 7.77827453613281],
            [0.03500366210938, 5.32826232910156],
            [10.5449523925781, 3.52827453613281],
            [26.2049865722656, 9.88825988769531],
            [27.4949645996094, 11.4983062744141],
            [78.8450012207031, 11.4983062744141]
        ];
        var inTangents = [
            [11.6599731445312, -7.6400146484375],
            [1.260009765625, 1.8699951171875],
            [3.78997802734375, 2.57000732421875],
            [14.2699584960938, -2.0699462890625],
            [8.03997802734375, -11.1699829101562],
            [1.53997802734375, 1.07000732421875],
            [4.5899658203125, 0.0699462890625],
            [4.8800048828125, -4.8900146484375],
            [0, 0],
            [7.52001953125, -2.07000732421875],
            [0.21002197265625, -0.0899658203125],
            [0.44000244140625, 1.510009765625],
            [-1.280029296875, 0.4200439453125],
            [-3.719970703125, 0.07000732421875],
            [-4.34002685546875, -4.42999267578125],
            [-0.3900146484375, -0.57000732421875],
            [0, 0]
        ];
        var outTangents = [
            [-1.99998474121094, 1.30999755859375],
            [-2.5799560546875, -3.78997802734375],
            [-12.0900268554688, -8.22998046875],
            [-13.2200317382812, 1.9200439453125],
            [-1.1099853515625, 1.550048828125],
            [-4.5400390625, -3.16998291015625],
            [-7.82000732421875, 0.02996826171875],
            [0, 0],
            [-5.83000183105469, -5.10003662109375],
            [-0.22998046875, 0.05999755859375],
            [-1.3599853515625, 0.57000732421875],
            [-0.40997314453125, -1.4000244140625],
            [3.3599853515625, -1.1099853515625],
            [5.9100341796875, 0.1199951171875],
            [0.47998046875, 0.489990234375],
            [0, 0],
            [-8.280029296875, -8.5400390625]
        ];
        createPathGrp(contents, 'Explosion_Piece_06', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.3051, -103.3583]);
    };
    var createExplosionPiece07 = function () {
        var vertices = [
            [21.7380218505859, -17.029052734375],
            [22.3280487060547, 0.55096435546875],
            [23.5980072021484, 11.9509887695312],
            [24.5480194091797, 13.5609741210938],
            [25.6380462646484, 13.781005859375],
            [26.3780364990234, 13.5809936523438],
            [26.3780364990234, 19.6909790039062],
            [24.5480194091797, 18.7509765625],
            [-13.7319488525391, 26.8109741210938],
            [-14.2419586181641, 27.490966796875],
            [-26.3319854736328, 21.781005859375],
            [-27.3219757080078, 20.0809936523438],
            [-21.3319854736328, -11.1790161132812],
            [-19.7220001220703, -26.1090087890625],
            [-18.2119903564453, -27.4590454101562],
            [-8.65199279785156, -26.4490356445312],
            [-7.17195129394531, -24.72900390625],
            [-8.21199035644531, -13.759033203125],
            [-6.64198303222656, -10.6790161132812],
            [-4.47200012207031, -13.1190185546875],
            [-3.51197814941406, -24.0989990234375],
            [-1.46199035644531, -26.01904296875],
            [-0.00196838378906, -25.9390258789062],
            [24.5480194091797, -26.0390014648438],
            [27.4780120849609, -26.2490234375],
            [27.0780487060547, -17.1589965820312],
            [25.3680267333984, -18.6090087890625],
            [24.5480194091797, -19.759033203125],
            [23.5980072021484, -19.9390258789062]
        ];
        var inTangents = [
            [-0.04998779296875, -1.41998291015625],
            [-0.30999755859375, -5.8599853515625],
            [-0.75, -3.760009765625],
            [-0.5, -0.30999755859375],
            [-0.44000244140625, 0.02996826171875],
            [-0.21002197265625, 0.1099853515625],
            [0, 0],
            [0.6199951171875, 0.28997802734375],
            [8.67999267578125, -11.2999877929688],
            [0.15997314453125, -0.22998046875],
            [4.6199951171875, 0.6199951171875],
            [-0.32000732421875, 1.0999755859375],
            [-1.260009765625, 10.5599975585938],
            [-0.489990234375, 4.97998046875],
            [-1.2099609375, -0.15997314453125],
            [-3.19000244140625, -0.28997802734375],
            [0.15997314453125, -1.32000732421875],
            [0.3699951171875, -3.64996337890625],
            [-1.78997802734375, -0.21002197265625],
            [-0.19000244140625, 1.3900146484375],
            [-0.1400146484375, 3.66998291015625],
            [-1.64996337890625, -0.1099853515625],
            [-0.489990234375, -0.02001953125],
            [-8.16998291015625, 0.51995849609375],
            [-0.97998046875, 0.08001708984375],
            [0, 0],
            [0.79998779296875, 0.67999267578125],
            [0.47003173828125, 0.22998046875],
            [0.3900146484375, 0]
        ];
        var outTangents = [
            [0.19000244140625, 5.86004638671875],
            [0.2099609375, 3.80999755859375],
            [0.1500244140625, 0.72998046875],
            [0.28997802734375, 0.16998291015625],
            [0.27996826171875, -0.02001953125],
            [0, 0],
            [-0.60003662109375, -0.33001708984375],
            [-12.6300048828125, -5.94000244140625],
            [-0.1800537109375, 0.22998046875],
            [-3.45001220703125, -3.1300048828125],
            [-1.21002197265625, -0.1600341796875],
            [2.96002197265625, -10.239990234375],
            [0.59002685546875, -4.97003173828125],
            [0.10003662109375, -1.07000732421875],
            [3.17999267578125, 0.4200439453125],
            [1.1300048828125, 0.10003662109375],
            [-0.4300537109375, 3.64996337890625],
            [-0.1400146484375, 1.41998291015625],
            [1.6099853515625, 0.20001220703125],
            [0.49005126953125, -3.6500244140625],
            [0.05999755859375, -1.3900146484375],
            [0.489990234375, 0.030029296875],
            [8.20001220703125, 0.47003173828125],
            [0.97998046875, -0.05999755859375],
            [0, 0],
            [-0.1300048828125, -0.05999755859375],
            [-0.1199951171875, -0.510009765625],
            [-0.25, -0.1199951171875],
            [-1.79998779296875, 0.030029296875]
        ];
        createPathGrp(contents, 'Explosion_Piece_07', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-11.703, 72.359]);
    };
    var createExplosionPiece08 = function () {
        var vertices = [
            [12.1455230712891, 19.8851165771484],
            [10.7055206298828, 13.9751434326172],
            [4.57551574707031, -25.1448516845703],
            [2.45552062988281, -27.4548492431641],
            [-12.2744598388672, -26.0248565673828],
            [-12.2744598388672, -19.7448883056641],
            [-11.3044281005859, -17.0648956298828],
            [-9.50444030761719, 11.2151336669922],
            [-9.45445251464844, 11.8050994873047],
            [-11.1844329833984, 13.7951507568359],
            [-12.2744598388672, 13.5751190185547],
            [-12.2744598388672, 18.7651214599609],
            [-1.61448669433594, 27.4951019287109],
            [10.9255523681641, 21.6951141357422]
        ];
        var inTangents = [
            [0.36004638671875, 1.22998046875],
            [0.45001220703125, 1.97998046875],
            [1.33001708984375, 13.1499633789062],
            [2.19000244140625, -0.2900390625],
            [4.91998291015625, -0.30999755859375],
            [0, 0],
            [-0.02001953125, -1.1199951171875],
            [-1.55999755859375, -9.3699951171875],
            [-0.02001953125, -0.27996826171875],
            [1.199951171875, -0.10003662109375],
            [0.28997802734375, 0.16998291015625],
            [0, 0],
            [-2.77996826171875, -3.8599853515625],
            [-4.79998779296875, 0.58001708984375]
        ];
        var outTangents = [
            [-0.55999755859375, -1.95001220703125],
            [-2.8800048828125, -12.9100341796875],
            [-0.1199951171875, -1.27001953125],
            [-4.89996337890625, 0.63995361328125],
            [0, 0],
            [0.8900146484375, 0.42999267578125],
            [0.15997314453125, 9.45001220703125],
            [0.01995849609375, 0.14996337890625],
            [-0.02001953125, 1.0400390625],
            [-0.44000244140625, 0.02996826171875],
            [0, 0],
            [4.17999267578125, 1.969970703125],
            [3.57000732421875, -3.260009765625],
            [1.19000244140625, -0.1400146484375]
        ];
        createPathGrp(contents, 'Explosion_Piece_08', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [26.5845, 72.3448]);
    };
    var createExplosionPiece09 = function () {
        var vertices = [
            [110.390014648438, 4.06050109863281],
            [108.9599609375, 3.26051330566406],
            [82.5899658203125, 0.56050109863281],
            [79.1700439453125, 0.11048889160156],
            [72.5299072265625, -4.05949401855469],
            [62.7899780273438, -4.05949401855469],
            [60.0599365234375, -3.28947448730469],
            [56.4199829101562, -4.05949401855469],
            [43.2399291992188, -4.05949401855469],
            [44.2999267578125, -2.77946472167969],
            [45.1399536132812, -1.09947204589844],
            [43.8399658203125, 0.89051818847656],
            [41.7699584960938, 0.21052551269531],
            [33.3999633789062, -1.34947204589844],
            [30.3799438476562, -1.90946960449219],
            [30.719970703125, -4.05949401855469],
            [10.7799682617188, -4.05949401855469],
            [10.8199615478516, -1.53947448730469],
            [8.12994384765625, -1.44950866699219],
            [6.5699462890625, -2.83946228027344],
            [4.53997802734375, -4.05949401855469],
            [-0.88006591796875, -4.05949401855469],
            [-2.300048828125, -3.29948425292969],
            [-5.300048828125, -3.74949645996094],
            [-5.4500732421875, -4.05949401855469],
            [-34.31005859375, -4.05949401855469],
            [-33.9900512695312, -1.92948913574219],
            [-36.570068359375, -1.14945983886719],
            [-38.6600341796875, -2.17948913574219],
            [-44.9700317382812, -0.38951110839844],
            [-48.0800170898438, -2.57951354980469],
            [-47.8400268554688, 0.66053771972656],
            [-46.8500366210938, -4.05949401855469],
            [-56.280029296875, -4.05949401855469],
            [-59.8600463867188, -3.25950622558594],
            [-62.6500244140625, -4.05949401855469],
            [-72.4100341796875, -4.05949401855469],
            [-78.9900512695312, 0.05049133300781],
            [-81.9400634765625, 0.71052551269531],
            [-97.7000732421875, -0.39945983886719],
            [-111.170043945312, 4.72053527832031],
            [111.170043945312, 4.72053527832031]
        ];
        var inTangents = [
            [0.179931640625, 0.1099853515625],
            [0.489990234375, 0.25],
            [9.1400146484375, -2.6099853515625],
            [1.099853515625, 1.1300048828125],
            [2.340087890625, 0.71002197265625],
            [3.37005615234375, -0.79998779296875],
            [0.9100341796875, -0.29998779296875],
            [1.00994873046875, 1.20001220703125],
            [0, 0],
            [-0.3299560546875, -0.47003173828125],
            [-0.02996826171875, -0.530029296875],
            [0.78997802734375, -0.280029296875],
            [0.59002685546875, 0.6300048828125],
            [4.47998046875, -2.1700439453125],
            [0.71002197265625, 1.29998779296875],
            [-0.58001708984375, 0.53997802734375],
            [0, 0],
            [0.73997497558594, -0.79998779296875],
            [0.91998291015625, 0.800048828125],
            [0.54998779296875, 0.41998291015625],
            [0.68000793457031, 0.28997802734375],
            [1.84002685546875, -0.78997802734375],
            [0.47003173828125, -0.30999755859375],
            [0.77001953125, 1.27001953125],
            [0.0400390625, 0.10003662109375],
            [0, 0],
            [0.47003173828125, -0.83001708984375],
            [1.11004638671875, 0.55999755859375],
            [0.719970703125, 0.280029296875],
            [1.82000732421875, -2.41998291015625],
            [1.30999755859375, 0.8599853515625],
            [-0.780029296875, 1.1400146484375],
            [-0.44000244140625, 0.44000244140625],
            [0, 0],
            [1.66998291015625, 0.55999755859375],
            [0.91998291015625, 0.22003173828125],
            [3.0999755859375, -0.95001220703125],
            [2.05999755859375, -2.0899658203125],
            [1.20001220703125, 0.3900146484375],
            [5.34002685546875, -0.8900146484375],
            [4.3599853515625, -2.95001220703125],
            [0, 0]
        ];
        var outTangents = [
            [-0.469970703125, -0.27996826171875],
            [-8.4400634765625, -4.28997802734375],
            [-1.25, 0.35003662109375],
            [-2.070068359375, -2.1300048828125],
            [-3.0899658203125, -0.94000244140625],
            [-0.9100341796875, 0.21002197265625],
            [-1.65997314453125, 0.53997802734375],
            [0, 0],
            [0.3800048828125, 0.3800048828125],
            [0.3900146484375, 0.57000732421875],
            [-0.02996826171875, 1.0999755859375],
            [-0.82000732421875, 0.29998779296875],
            [-3.45001220703125, -3.6400146484375],
            [-0.510009765625, -0.94000244140625],
            [-1.22003173828125, 0.5899658203125],
            [0, 0],
            [0.74000549316406, 0.80999755859375],
            [-0.82002258300781, 0.8800048828125],
            [-0.52996826171875, -0.449951171875],
            [-0.66998291015625, -0.52001953125],
            [-1.77001953125, -0.77001953125],
            [-0.469970703125, 0.20001220703125],
            [-1.15997314453125, 0.75],
            [-0.05999755859375, -0.1099853515625],
            [0, 0],
            [0.59002685546875, 0.55999755859375],
            [-0.57000732421875, 1.010009765625],
            [-0.699951171875, -0.35003662109375],
            [-2.77001953125, -1.0999755859375],
            [-0.77001953125, 1.02001953125],
            [-1.4000244140625, -0.9100341796875],
            [0.37994384765625, -0.54998779296875],
            [0, 0],
            [-0.95001220703125, 1.16998291015625],
            [-0.94000244140625, -0.30999755859375],
            [-3.3800048828125, -0.80999755859375],
            [-2.30999755859375, 0.71002197265625],
            [-0.8800048828125, 0.8900146484375],
            [-5.14996337890625, -1.6300048828125],
            [-4.66998291015625, 0.77996826171875],
            [0, 0],
            [-0.4600830078125, -0.3900146484375]
        ];
        createPathGrp(contents, 'Explosion_Piece_09', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.17, 109.5995]);
    };
    var createExplosionPiece10 = function () {
        var vertices = [
            [56.2900085449219, 6.40249633789062],
            [55.9999694824219, 6.04251098632812],
            [26.3699645996094, 4.48251342773438],
            [22.2300109863281, 4.09249877929688],
            [-22.3100280761719, 4.02249145507812],
            [-26.5700378417969, 4.33248901367188],
            [-56.0899963378906, 5.97250366210938],
            [-56.4100036621094, 6.40249633789062],
            [-57.8500061035156, 7.43252563476562],
            [-47.8800354003906, 7.43252563476562],
            [-46.9800109863281, 6.40249633789062],
            [-41.1900329589844, 3.94247436523438],
            [-34.8200378417969, 6.10250854492188],
            [-34.4400329589844, 6.40249633789062],
            [-33.8800354003906, 7.43252563476562],
            [-4.79000854492188, 7.43252563476562],
            [-5.43002319335938, 6.71249389648438],
            [-5.58004760742188, 6.40249633789062],
            [-4.45004272460938, 3.98251342773438],
            [1.68997192382812, 2.05252075195312],
            [10.6499938964844, 6.40249633789062],
            [11.1999816894531, 7.43252563476562],
            [29.9899597167969, 7.43252563476562],
            [30.5899963378906, 6.40249633789062],
            [31.4999694824219, 5.74252319335938],
            [43.1099548339844, 6.40249633789062],
            [43.9800109863281, 7.43252563476562],
            [57.8500061035156, 7.43252563476562]
        ];
        var inTangents = [
            [0.5, 0.59002685546875],
            [0.10003662109375, 0.1300048828125],
            [8.36004638671875, -8.95001220703125],
            [1.5, 2.239990234375],
            [10.1500244140625, -15.2999877929688],
            [1.82000732421875, 2.17999267578125],
            [7.7099609375, -11.3300170898438],
            [0.1099853515625, -0.1300048828125],
            [0.53997802734375, -0.1400146484375],
            [0, 0],
            [-0.32000732421875, 0.32000732421875],
            [-2.3299560546875, 0.07000732421875],
            [-1.91998291015625, -1.260009765625],
            [-0.1099853515625, -0.1099853515625],
            [-0.04998779296875, -0.3900146484375],
            [0, 0],
            [0.20001220703125, 0.33001708984375],
            [0.0400390625, 0.10003662109375],
            [-0.91998291015625, 0.5899658203125],
            [-2.260009765625, -0.010009765625],
            [-2.41998291015625, -2.6300048828125],
            [-0.05999755859375, -0.35003662109375],
            [0, 0],
            [-0.32000732421875, 0.29998779296875],
            [-0.3399658203125, 0.199951171875],
            [-2.94000244140625, -2.94000244140625],
            [-0.27001953125, -0.3699951171875],
            [0, 0]
        ];
        var outTangents = [
            [-0.10003662109375, -0.1099853515625],
            [-7.14996337890625, -9.79998779296875],
            [-1.79998779296875, 1.92999267578125],
            [-10.260009765625, -15.3399658203125],
            [-1.57000732421875, 2.35003662109375],
            [-5.8699951171875, -7],
            [-0.11004638671875, 0.15997314453125],
            [-0.45001220703125, 0.55999755859375],
            [0, 0],
            [0.280029296875, -0.3699951171875],
            [1.53997802734375, -1.53997802734375],
            [2.3599853515625, 0.09002685546875],
            [0.1400146484375, 0.0899658203125],
            [0.32000732421875, 0.29998779296875],
            [0, 0],
            [-0.22998046875, -0.1600341796875],
            [-0.05999755859375, -0.1099853515625],
            [-0.43994140625, -1.04998779296875],
            [1.86004638671875, -1.22003173828125],
            [3.66998291015625, 0.03997802734375],
            [0.29998779296875, 0.33001708984375],
            [0, 0],
            [0.05999755859375, -0.4000244140625],
            [0.25, -0.239990234375],
            [4.21002197265625, -2.58001708984375],
            [0.30999755859375, 0.30999755859375],
            [0, 0],
            [-0.57000732421875, -0.11004638671875]
        ];
        createPathGrp(contents, 'Explosion_Piece_10', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.24, 98.6225]);
    };
    var createExplosionPiece11 = function () {
        var vertices = [
            [-28.2727661132812, -16.1587066650391],
            [-12.9617767333984, -15.0856475830078],
            [-11.1519470214844, -14.5056610107422],
            [10.7643737792969, -14.50048828125],
            [12.3548583984375, -15.1910858154297],
            [27.89013671875, -16.0926666259766],
            [28.0570983886719, -15.0346527099609],
            [29.3995361328125, 12.6181793212891],
            [27.4664459228516, 14.8464813232422],
            [-11.2006225585938, 16.0031280517578],
            [-13.4854888916016, 13.60302734375],
            [-13.3447723388672, 5.39292907714844],
            [-15.3209991455078, 3.06687927246094],
            [-17.1083068847656, 5.36228942871094],
            [-17.1825256347656, 14.0453491210938],
            [-18.7181396484375, 15.6406860351562],
            [-28.2946319580078, 14.7857055664062],
            [-29.3617553710938, 12.9909362792969]
        ];
        var inTangents = [
            [-0.37297058105469, 9.92411804199219],
            [-5.18212890625, 1.77955627441406],
            [-0.54779052734375, -0.45645141601562],
            [-7.01991271972656, 5.82575988769531],
            [-0.77557373046875, -0.28988647460938],
            [-5.13633728027344, 2.48847961425781],
            [-0.00936889648438, -0.28410339355469],
            [-0.80064392089844, -9.198974609375],
            [1.64608764648438, -0.160888671875],
            [12.9140930175781, 0.37582397460938],
            [-0.14994812011719, 1.88972473144531],
            [-0.03488159179688, 2.73789978027344],
            [1.47885131835938, -0.06475830078125],
            [0.00318908691406, -1.26437377929688],
            [1.36764526367188, 0.15452575683594],
            [-0.02188110351562, -2.89396667480469],
            [3.19825744628906, 0.18855285644531],
            [-0.02896118164062, 0.79248046875]
        ];
        var outTangents = [
            [5.03211975097656, 2.60604858398438],
            [0.88777160644531, -0.30485534667969],
            [7.00350952148438, 5.83576965332031],
            [0.46510314941406, -0.38600158691406],
            [5.24858093261719, 1.96176147460938],
            [0.07981872558594, 0.49208068847656],
            [0.30409240722656, 9.22482299804688],
            [0.13887023925781, 1.59544372558594],
            [-12.8667144775391, 1.25765991210938],
            [-1.77713012695312, -0.05172729492188],
            [0.21607971191406, -2.72325134277344],
            [0.01731872558594, -1.35948181152344],
            [-1.31382751464844, 0.05751037597656],
            [-0.00729370117188, 2.89445495605469],
            [0.00852966308594, 1.12889099121094],
            [-3.18424987792969, -0.35984802246094],
            [-1.46568298339844, -0.08641052246094],
            [0.35122680664062, -9.61302185058594]
        ];
        createPathGrp(contents, 'Explosion_Piece_11', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.43, 19.2967]);
    };
    var createRing = function () {
        var vertices = [
            [0.954345703125, 8.27532958984375],
            [40.2836761474609, 4.97247314453125],
            [48.3975372314453, 2.07180786132812],
            [48.2118530273438, -4.63456726074219],
            [35.4246520996094, -8.20614624023438],
            [33.3566436767578, -8.59577941894531],
            [32.5840759277344, -11.2622528076172],
            [33.9565124511719, -11.8307189941406],
            [53.1769561767578, -6.84623718261719],
            [58.4500122070312, -3.84767150878906],
            [58.4181365966797, 1.57713317871094],
            [50.5038146972656, 5.53985595703125],
            [22.2700805664062, 10.9974670410156],
            [-25.7621154785156, 10.6130828857422],
            [-52.0310821533203, 4.97695922851562],
            [-58.5754547119141, 1.41197204589844],
            [-58.6000366210938, -3.68836975097656],
            [-50.9812774658203, -7.70611572265625],
            [-33.9304504394531, -11.8204345703125],
            [-32.4303588867188, -11.2254486083984],
            [-33.3431701660156, -8.56367492675781],
            [-40.4860534667969, -7.24737548828125],
            [-48.0166931152344, -4.76589965820312],
            [-48.1631164550781, 2.16665649414062],
            [-35.4322814941406, 5.88699340820312]
        ];
        var inTangents = [
            [-12.7251434326172, -0.14956665039062],
            [-13.2477569580078, 2.77262878417969],
            [-2.477294921875, 1.5625],
            [3.34788513183594, 1.85023498535156],
            [4.38568115234375, 0.75296020507812],
            [0.63351440429688, 0.26396179199219],
            [0.06996154785156, 0.90861511230469],
            [-0.51518249511719, -0.08920288085938],
            [-6.16804504394531, -2.58331298828125],
            [-1.56190490722656, -1.32672119140625],
            [2.25221252441406, -1.81340026855469],
            [2.81478881835938, -0.97090148925781],
            [9.58039855957031, -0.88519287109375],
            [15.9946136474609, 1.79556274414062],
            [8.47288513183594, 3.19692993164062],
            [1.90739440917969, 1.66923522949219],
            [-2.01943969726562, 1.790283203125],
            [-2.71833801269531, 0.9903564453125],
            [-5.77314758300781, 0.99385070800781],
            [0.12469482421875, -1.28619384765625],
            [1.7674560546875, -0.33840942382812],
            [2.37196350097656, -0.48283386230469],
            [2.34906005859375, -1.28373718261719],
            [-3.50865173339844, -2.0692138671875],
            [-4.39556884765625, -0.68196105957031]
        ];
        var outTangents = [
            [12.6242523193359, -0.31387329101562],
            [2.83430480957031, -0.59317016601562],
            [3.21640014648438, -2.02870178222656],
            [-3.96345520019531, -2.19044494628906],
            [-0.6932373046875, -0.11898803710938],
            [-1.26057434082031, -0.52525329589844],
            [-0.08302307128906, -1.07778930664062],
            [6.54255676269531, 1.13285827636719],
            [1.880126953125, 0.78742980957031],
            [2.21017456054688, 1.87742614746094],
            [-2.34068298339844, 1.88462829589844],
            [-9.15269470214844, 3.15702819824219],
            [-16.0165863037109, 1.47988891601562],
            [-8.93948364257812, -1.0035400390625],
            [-2.34539794921875, -0.88493347167969],
            [-2.03309631347656, -1.77922058105469],
            [2.20298767089844, -1.95297241210938],
            [5.52613830566406, -2.01325988769531],
            [0.52967834472656, -0.0911865234375],
            [-0.08737182617188, 0.90127563476562],
            [-2.37785339355469, 0.45524597167969],
            [-2.60350036621094, 0.52996826171875],
            [-3.58366394042969, 1.95843505859375],
            [3.91685485839844, 2.30996704101562],
            [11.7808990478516, 1.82777404785156]
        ];
        createPathGrp(contents, 'Ring', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.225, 30.9717]);
    };
    createRing();
    createExplosionPiece11();
    createExplosionPiece10();
    createExplosionPiece09();
    createExplosionPiece08();
    createExplosionPiece07();
    createExplosionPiece06();
    createExplosionPiece05();
    createExplosionPiece04();
    createExplosionPiece03();
    createExplosionPiece02();
    createExplosionPiece01();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createMedalIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Medal', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createTopCenter = function () {
        var vertices = [
            [-19.6257781982422, -1.31033325195312],
            [-19.6679992675781, -41.1187286376953],
            [-17.4409942626953, -43.3345489501953],
            [17.6442260742188, -43.3256683349609],
            [19.6681518554688, -41.3709564208984],
            [19.6239318847656, 38.9209442138672],
            [14.0281372070312, 43.1910705566406],
            [-14.2184143066406, 43.2376403808594],
            [-19.623291015625, 38.7232055664062]
        ];
        var inTangents = [
            [0, 13.3445129394531],
            [0.07769775390625, 13.2690887451172],
            [-1.76240539550781, -0.01217651367188],
            [-11.6949157714844, 0.05999755859375],
            [0.00318908691406, -1.62200927734375],
            [0.00860595703125, -26.7639923095703],
            [2.58595275878906, 0.63461303710938],
            [9.41059875488281, -2.33746337890625],
            [0.00111389160156, 2.71623229980469]
        ];
        var outTangents = [
            [0, -13.2695465087891],
            [-0.01040649414062, -1.77717590332031],
            [11.6946716308594, 0.08084106445312],
            [1.52314758300781, -0.0078125],
            [-0.0526123046875, 26.7638854980469],
            [-0.00083923339844, 2.61846923828125],
            [-9.4207763671875, -2.31193542480469],
            [-2.482421875, 0.61659240722656],
            [-0.0054931640625, -13.3445129394531]
        ];
        createPathGrp(contents, 'Top_Center', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-0.0022, -53.2999]);
    };
    var createMedalCircle = function () {
        var vertices = [
            [49.9103546142578, 0],
            [0, 49.9103546142578],
            [-49.9103546142578, 0],
            [0, -49.9103546142578]
        ];
        var inTangents = [
            [0, -27.5647277832031],
            [27.5647277832031, 0],
            [0, 27.5647277832031],
            [-27.5647277832031, 0]
        ];
        var outTangents = [
            [0, 27.5647277832031],
            [-27.5647277832031, 0],
            [0, -27.5647277832031],
            [27.5647277832031, 0]
        ];
        createPathGrp(contents, 'Medal_Circle', false, true, iconColorRgb, iconColorRgb, 8, vertices, inTangents, outTangents, true, [0.0308, 46.7243]);
    };
    var createTopR01 = function () {
        var vertices = [
            [-22.0496673583984, 29.9432373046875],
            [-22.0496673583984, 16.1437072753906],
            [-22.0888519287109, -27.7151489257812],
            [-19.9111633300781, -29.9430541992188],
            [20.1238861083984, -29.9365081787109],
            [22.0879821777344, -27.9779815673828],
            [22.0608825683594, -9.53533935546875],
            [21.0680084228516, -6.99064636230469],
            [-21.170654296875, 29.4073486328125]
        ];
        var inTangents = [
            [0.52090454101562, -0.31455993652344],
            [0, 4.48233032226562],
            [0.06849670410156, 14.6193695068359],
            [-1.80349731445312, -0.01126098632812],
            [-13.3448333740234, 0.06752014160156],
            [0.0242919921875, -1.57113647460938],
            [-0.02365112304688, -6.14767456054688],
            [0.86778259277344, -0.74525451660156],
            [14.0751037597656, -12.1378479003906]
        ];
        var outTangents = [
            [0, -4.83488464355469],
            [0, -14.6196746826172],
            [-0.008056640625, -1.7177734375],
            [13.3446655273438, 0.08332824707031],
            [1.57221984863281, -0.00794982910156],
            [-0.09503173828125, 6.14628601074219],
            [0.00389099121094, 1.00820922851562],
            [-14.0998992919922, 12.1089630126953],
            [-0.15742492675781, 0.1357421875]
        ];
        createPathGrp(contents, 'Top_R_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [46.3738, -47.002]);
    };
    var createTopR02 = function () {
        var vertices = [
            [-0.02409362792969, 7.46441650390625],
            [-20.2504577636719, 7.50099182128906],
            [-22.0826110839844, 5.64453125],
            [-22.0709686279297, -5.81597900390625],
            [-20.5231781005859, -7.50152587890625],
            [20.6045074462891, -7.48548889160156],
            [22.0787811279297, -6.20228576660156],
            [22.0841827392578, 6.15715026855469],
            [20.4273986816406, 7.47372436523438]
        ];
        var inTangents = [
            [6.81716918945312, 0],
            [6.74124145507812, -0.08357238769531],
            [-0.03924560546875, 1.45408630371094],
            [0.06205749511719, 3.81959533691406],
            [-1.36520385742188, -0.00509643554688],
            [-13.7092437744141, 0.02198791503906],
            [0.02250671386719, -1.21623229980469],
            [-0.09732055664062, -4.11796569824219],
            [0.94796752929688, 0.00242614746094]
        ];
        var outTangents = [
            [-6.74226379394531, 0],
            [-1.48716735839844, 0.0184326171875],
            [0.10310363769531, -3.81782531738281],
            [-0.01914978027344, -1.17739868164062],
            [13.7091064453125, 0.05119323730469],
            [0.95455932617188, -0.00152587890625],
            [-0.07627868652344, 4.11885070800781],
            [0.03363037109375, 1.422607421875],
            [-6.81712341308594, -0.01741027832031]
        ];
        createPathGrp(contents, 'Top_R_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [46.3726, -89.1189]);
    };
    var createTopL01 = function () {
        var vertices = [
            [22.0389251708984, 30.0352783203125],
            [8.10487365722656, 18.0421752929688],
            [-20.8432922363281, -6.91217041015625],
            [-22.0881958007812, -9.56674194335938],
            [-22.0818786621094, -28.2320098876953],
            [-20.4254608154297, -30.0352020263672],
            [20.2793731689453, -30.0049133300781],
            [22.0440826416016, -28.5579986572266],
            [22.0389251708984, -27.8842468261719]
        ];
        var inTangents = [
            [0, -19.6973724365234],
            [9.66777038574219, 8.29667663574219],
            [4.513427734375, 3.893310546875],
            [-0.01203918457031, 1.17427062988281],
            [0.05619812011719, 6.22142028808594],
            [-1.50576782226562, -0.00750732421875],
            [-13.5683441162109, 0.01399230957031],
            [0.26876831054688, -1.54013061523438],
            [0, -0.22488403320312]
        ];
        var outTangents = [
            [-4.89897155761719, -4.21601867675781],
            [-9.64668273925781, -8.32127380371094],
            [-0.8670654296875, -0.74409484863281],
            [0.06379699707031, -6.22128295898438],
            [-0.01145935058594, -1.26786804199219],
            [13.5680084228516, 0.06773376464844],
            [1.03623962402344, -0.00106811523438],
            [-0.0380859375, 0.21823120117188],
            [0, 19.111083984375]
        ];
        createPathGrp(contents, 'Top_L_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-46.3657, -46.9041]);
    };
    var createTopL02 = function () {
        var vertices = [
            [-0.20443725585938, 7.46730041503906],
            [-20.2047271728516, 7.49867248535156],
            [-22.0806427001953, 5.69866943359375],
            [-22.0654754638672, -5.98533630371094],
            [-20.5848999023438, -7.49403381347656],
            [20.5397644042969, -7.49919128417969],
            [22.0748901367188, -5.80177307128906],
            [22.0823516845703, 5.88299560546875],
            [20.4701080322266, 7.49595642089844]
        ];
        var inTangents = [
            [6.8916015625, -0.00001525878906],
            [6.6661376953125, -0.07014465332031],
            [-0.04808044433594, 1.5372314453125],
            [0.06776428222656, 3.89405822753906],
            [-1.19532775878906, -0.00361633300781],
            [-13.7080841064453, 0.05233764648438],
            [0.01737976074219, -1.16139221191406],
            [-0.08137512207031, -3.89353942871094],
            [1.26969909667969, 0.01112365722656]
        ];
        var outTangents = [
            [-6.6668701171875, 0.00001525878906],
            [-1.40322875976562, 0.0147705078125],
            [0.12171936035156, -3.89143371582031],
            [-0.0201416015625, -1.15721130371094],
            [13.7081604003906, 0.04154968261719],
            [1.38258361816406, -0.00527954101562],
            [-0.05827331542969, 3.89436340332031],
            [0.026611328125, 1.2733154296875],
            [-6.89106750488281, -0.06040954589844]
        ];
        createPathGrp(contents, 'Top_L_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-46.3792, -89.1218]);
    };
    var createBadgeTop = function () {
        var vertices = [
            [0, -26.1349792480469],
            [-40.9400024414062, 14.7049865722656],
            [-39.3300170898438, 26.1349792480469],
            [-15.4000244140625, 26.1349792480469],
            [-15.0800170898438, 22.3949890136719],
            [-20.6300048828125, 17.1050109863281],
            [-27.6099853515625, 11.0849914550781],
            [-28.7999877929688, 7.96499633789062],
            [-26.0999755859375, 6.38497924804688],
            [-10.8699951171875, 5.14498901367188],
            [-8.41998291015625, 3.44497680664062],
            [-2.6500244140625, -10.4150085449219],
            [-0.0999755859375, -12.8949890136719],
            [2.65997314453125, -10.3849792480469],
            [8.44000244140625, 3.46499633789062],
            [10.6699829101562, 5.13497924804688],
            [26.1300048828125, 6.38497924804688],
            [28.7999877929688, 8.00497436523438],
            [27.5900268554688, 11.1050109863281],
            [15.97998046875, 21.0450134277344],
            [15.0499877929688, 23.9250183105469],
            [15.5900268554688, 26.1349792480469],
            [39.3300170898438, 26.1349792480469],
            [40.9400024414062, 14.7049865722656]
        ];
        var inTangents = [
            [22.5599975585938, -0.010009765625],
            [0.02001953125, -22.52001953125],
            [-1.04998779296875, -3.6300048828125],
            [0, 0],
            [0.280029296875, 1.1500244140625],
            [1.95001220703125, 1.719970703125],
            [2.3499755859375, 1.97998046875],
            [-0.45001220703125, 1.3399658203125],
            [-1.19000244140625, 0.10003662109375],
            [-5.08001708984375, 0.3499755859375],
            [-0.489990234375, 1.25],
            [-1.94000244140625, 4.6099853515625],
            [-1.58001708984375, 0.05999755859375],
            [-0.52996826171875, -1.260009765625],
            [-1.8800048828125, -4.6300048828125],
            [-1.260009765625, -0.08001708984375],
            [-5.1500244140625, -0.39996337890625],
            [-0.41998291015625, -1.27996826171875],
            [0.97998046875, -0.84002685546875],
            [3.9100341796875, -3.260009765625],
            [-0.33001708984375, -1.2900390625],
            [-0.1700439453125, -0.739990234375],
            [0, 0],
            [0.010009765625, 3.96002197265625]
        ];
        var outTangents = [
            [-22.5599975585938, 0],
            [-0.010009765625, 3.96002197265625],
            [0, 0],
            [0.3699951171875, -1.30999755859375],
            [-0.5799560546875, -2.27996826171875],
            [-2.29998779296875, -2.0400390625],
            [-0.989990234375, -0.84002685546875],
            [0.44000244140625, -1.260009765625],
            [5.0799560546875, -0.39996337890625],
            [1.27996826171875, -0.09002685546875],
            [1.8499755859375, -4.64996337890625],
            [1.719970703125, -0.050048828125],
            [0.5, -1.17999267578125],
            [1.94000244140625, 4.6099853515625],
            [0.44000244140625, 1.0999755859375],
            [5.1600341796875, 0.34002685546875],
            [1.20001220703125, 0.10003662109375],
            [0.45001220703125, 1.34002685546875],
            [-3.8800048828125, 3.30999755859375],
            [-1, 0.8399658203125],
            [0.19000244140625, 0.72998046875],
            [0, 0],
            [1.04998779296875, -3.6300048828125],
            [-0.02001953125, -22.5399780273438]
        ];
        createPathGrp(contents, 'Badge_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 32.0657]);
    };
    var createBadgeBottom = function () {
        var vertices = [
            [22.6699829101562, -20.1601104736328],
            [15.97998046875, -14.4600982666016],
            [15.0499877929688, -11.5800933837891],
            [18.6300048828125, 3.46989440917969],
            [17.8099975585938, 6.47990417480469],
            [14.7000122070312, 6.28990173339844],
            [1.67999267578125, -1.66011047363281],
            [-1.71002197265625, -1.62013244628906],
            [-14.72998046875, 6.30986022949219],
            [-18.8400268554688, 4.39988708496094],
            [-16.5399780273438, -5.53010559082031],
            [-20.6300048828125, -18.4001007080078],
            [-15.0800170898438, -13.1101226806641],
            [-22.6500244140625, -20.1601104736328],
            [-40.9299926757812, -20.1601104736328],
            [-0.1099853515625, 20.1598968505859],
            [40.9299926757812, -20.1601104736328]
        ];
        var inTangents = [
            [0, 0],
            [2.25, -1.8800048828125],
            [-0.33001708984375, -1.2900390625],
            [-1.22003173828125, -5.010009765625],
            [1.030029296875, -0.780029296875],
            [1.02996826171875, 0.6300048828125],
            [4.280029296875, 2.739990234375],
            [1.24005126953125, -0.77996826171875],
            [4.3699951171875, -2.5999755859375],
            [0.05999755859375, 2.219970703125],
            [-0.77001953125, 3.3599853515625],
            [0.55999755859375, 2.27001953125],
            [1.95001220703125, 1.719970703125],
            [0.6800537109375, 0.58001708984375],
            [0, 0],
            [-22.3699951171875, -0.07000732421875],
            [-0.30999755859375, 22.3399658203125]
        ];
        var outTangents = [
            [-2.219970703125, 1.90997314453125],
            [-1, 0.8399658203125],
            [1.260009765625, 5],
            [0.29998779296875, 1.22998046875],
            [-1.08001708984375, 0.8199462890625],
            [-4.34002685546875, -2.6500244140625],
            [-1.28997802734375, -0.83001708984375],
            [-4.28997802734375, 2.71002197265625],
            [-2.050048828125, 1.22003173828125],
            [0.75, -3.22998046875],
            [0.5799560546875, -2.5400390625],
            [-0.5799560546875, -2.27996826171875],
            [-0.66998291015625, -0.59002685546875],
            [0, 0],
            [0.30999755859375, 22.25],
            [22.4299926757812, 0.07000732421875],
            [0, 0]
        ];
        createPathGrp(contents, 'Badge_Bottom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 67.5709]);
    };
    var createStar = function () {
        var vertices = [
            [-0.03280639648438, -19.7418823242188],
            [4.85893249511719, -8.06034851074219],
            [8.22979736328125, -5.68940734863281],
            [20.7470245361328, -4.65255737304688],
            [11.9583587646484, 2.85247802734375],
            [10.1097412109375, 8.45849609375],
            [12.7771759033203, 19.7235717773438],
            [2.48574829101562, 13.4673461914062],
            [-2.60737609863281, 13.5265197753906],
            [-12.8199615478516, 19.7418823242188],
            [-10.6107025146484, 10.3679809570312],
            [-13.4286651611328, 1.61775207519531],
            [-20.7470245361328, -4.62107849121094],
            [-8.6561279296875, -5.63725280761719],
            [-4.69219970703125, -8.54307556152344]
        ];
        var inTangents = [
            [-1.70582580566406, 4.06689453125],
            [-1.48457336425781, -3.74208068847656],
            [-1.72767639160156, -0.10037231445312],
            [-4.514892578125, -0.38665771484375],
            [2.91917419433594, -2.27029418945312],
            [-0.73185729980469, -2.46965026855469],
            [-0.93325805664062, -4.03036499023438],
            [3.21995544433594, 2.1405029296875],
            [1.80302429199219, -1.1954345703125],
            [3.72303771972656, -2.24662780761719],
            [-1.03599548339844, 2.861328125],
            [3.42240905761719, 2.28231811523438],
            [2.6507568359375, 2.2955322265625],
            [-3.904541015625, 0.16912841796875],
            [-0.73710632324219, 1.92506408691406]
        ];
        var outTangents = [
            [1.79029846191406, 4.24986267089844],
            [0.64048767089844, 1.61442565917969],
            [4.00653076171875, 0.23271179199219],
            [-3.14781188964844, 2.71051025390625],
            [-1.98603820800781, 1.54454040527344],
            [1.055419921875, 3.56153869628906],
            [-3.68768310546875, -2.22172546386719],
            [-1.84353637695312, -1.22552490234375],
            [-3.16787719726562, 2.100341796875],
            [0.77815246582031, -3.41921997070312],
            [1.38566589355469, -3.82705688476562],
            [-2.5255126953125, -1.68417358398438],
            [4.29475402832031, -0.378662109375],
            [2.13203430175781, -0.09233093261719],
            [1.379638671875, -3.60316467285156]
        ];
        createPathGrp(contents, 'Star', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.0308, 47.4115]);
    };
    createStar();
    createBadgeBottom();
    createBadgeTop();
    createTopL02();
    createTopL01();
    createTopR02();
    createTopR01();
    createMedalCircle();
    createTopCenter();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createSaluteWithM16Icon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Salute With M16', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createLegL = function () {
        var vertices = [
            [1.26661682128906, -60.8985595703125],
            [-15.2351531982422, -71.3491516113281],
            [-17.7493438720703, -73.2995147705078],
            [-17.7493438720703, 55.5501556396484],
            [0, 73.2995147705078],
            [17.7493438720703, 55.5501556396484],
            [17.7493438720703, -59.7161102294922]
        ];
        var inTangents = [
            [4.92034912109375, 3.11610412597656],
            [0, 0],
            [0.76791381835938, 0.71072387695312],
            [0, 0],
            [-9.80259704589844, 0],
            [0, 9.8026123046875],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-0.91482543945312, -0.57891845703125],
            [0, 0],
            [0, 9.80259704589844],
            [9.80259704589844, 0],
            [0, 0],
            [-5.37379455566406, 2.41490173339844]
        ];
        createPathGrp(contents, 'Leg_L', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-7.795, 109.7019]);
    };
    var createLegR = function () {
        var vertices = [
            [-13.471435546875, -51.7141723632812],
            [-17.7493438720703, -44.6425628662109],
            [-17.7493438720703, 74.2830047607422],
            [0, 92.0323638916016],
            [17.7493438720703, 74.2830047607422],
            [17.7493438720703, -89.1044464111328],
            [-0.8687744140625, -92.0323638916016]
        ];
        var inTangents = [
            [5.44528198242188, -17.4213562011719],
            [1.94796752929688, -1.96702575683594],
            [0, 0],
            [-9.80259704589844, 0],
            [0, 9.8026123046875],
            [0, 8.21038818359375],
            [0, 0]
        ];
        var outTangents = [
            [-0.83938598632812, 2.68569946289062],
            [0, 0],
            [0, 9.80259704589844],
            [9.80259704589844, 0],
            [0, -5.57232666015625],
            [0, 0],
            [-5.42303466796875, 17.3491058349609]
        ];
        createPathGrp(contents, 'Leg_R', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [32.9694, 90.969]);
    };
    var createSalute = function () {
        var vertices = [
            [4.81709289550781, 89.5789184570312],
            [21.651611328125, 63.106201171875],
            [18.9746398925781, 47.7003021240234],
            [28.7470550537109, 31.7853851318359],
            [31.0746154785156, 24.8972015380859],
            [61.5782775878906, -23.2684631347656],
            [7.75135803222656, -23.2684631347656],
            [-19.4773712158203, -31.2541046142578],
            [9.59449768066406, -47.7654113769531],
            [15.0103912353516, -53.0987091064453],
            [42.9673309326172, -31.6749877929688],
            [71.9192962646484, -60.626953125],
            [42.9673156738281, -89.5789184570312],
            [15.0095977783203, -68.1544036865234],
            [-5.01568603515625, -73.4892883300781],
            [-64.4324035644531, -39.7440185546875],
            [-71.8200836181641, -25.1759185791016],
            [-61.2900848388672, -12.689208984375],
            [4.81709289550781, 6.2830810546875]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [-0.86637878417969, 5.505615234375],
            [-5.06407165527344, 3.65771484375],
            [-1.33808898925781, 2.11314392089844],
            [-3.1455078125, 4.96720886230469],
            [6.19015502929688, 0],
            [0, 0],
            [0, 0],
            [-1.26901245117188, 2.14967346191406],
            [-13.3848419189453, 0],
            [0, 15.9895782470703],
            [15.9895782470703, 0],
            [3.31465148925781, -12.3390045166016],
            [7.02793884277344, -3.98965454101562],
            [0, 0],
            [-0.68531799316406, -5.89871215820312],
            [-5.69859313964844, -1.67082214355469],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-2.48161315917969, -4.5391845703125],
            [1.04743957519531, -6.65948486328125],
            [0.20965576171875, -2.42204284667969],
            [3.47586059570312, -5.48814392089844],
            [-6.04800415039062, 0],
            [0, 0],
            [0, 0],
            [2.32676696777344, -1.3214111328125],
            [3.31465148925781, 12.3382110595703],
            [15.9895629882812, 0],
            [0, -15.9895782470703],
            [-13.3848571777344, 0],
            [-4.09684753417969, -6.92630004882812],
            [0, 0],
            [-5.16415405273438, 2.93267822265625],
            [0.68531799316406, 5.89871215820312],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Salute', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-30.1907, -80.1631]);
    };
    var createRifleBottom = function () {
        var vertices = [
            [8.52272033691406, -21.0725555419922],
            [-3.04122924804688, -26.2367095947266],
            [-21.3988647460938, 2.63107299804688],
            [-18.7449188232422, 14.4539031982422],
            [-2.24314880371094, 24.9044952392578],
            [10.5191345214844, 20.2223815917969],
            [22.7294921875, -18.8379058837891]
        ];
        var inTangents = [
            [0, 0],
            [3.22172546386719, 2.630126953125],
            [0, 0],
            [-3.99758911132812, -2.53164672851562],
            [0, 0],
            [-1.68353271484375, 5.38412475585938],
            [0, 0]
        ];
        var outTangents = [
            [-4.40496826171875, -0.69245910644531],
            [0, 0],
            [-2.53164672851562, 3.99760437011719],
            [0, 0],
            [4.74723815917969, 3.00654602050781],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Rifle_Bottom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.4794, 16.3762]);
    };
    var createRifleTop = function () {
        var vertices = [
            [42.9505310058594, -65.376708984375],
            [34.0135345458984, -63.3699798583984],
            [28.8104705810547, -55.1540222167969],
            [24.0227355957031, -58.1859741210938],
            [15.0857238769531, -56.1792297363281],
            [17.0916748046875, -47.2422332763672],
            [21.8794097900391, -44.2102813720703],
            [-45.9629211425781, 62.9123077392578],
            [-39.2772216796875, 63.0314331054688],
            [-17.9678649902344, 66.3826141357422],
            [-17.9599151611328, 66.3571929931641],
            [19.8218383789062, 6.69985961914062],
            [17.8159027099609, -2.23715209960938],
            [10.4178924560547, -1.90362548828125],
            [44.9564819335938, -56.439697265625]
        ];
        var inTangents = [
            [3.02241516113281, 1.913818359375],
            [1.9154052734375, -3.02400207519531],
            [0, 0],
            [0, 0],
            [1.91462707519531, -3.02320861816406],
            [-3.02162170410156, -1.913818359375],
            [0, 0],
            [0, 0],
            [-2.268798828125, -0.35655212402344],
            [0, 0],
            [0, 0],
            [0, 0],
            [3.02162170410156, 1.913818359375],
            [2.09091186523438, -1.60014343261719],
            [0, 0]
        ];
        var outTangents = [
            [-3.02003479003906, -1.91302490234375],
            [0, 0],
            [0, 0],
            [-3.02081298828125, -1.91302490234375],
            [-1.91383361816406, 3.02162170410156],
            [0, 0],
            [0, 0],
            [2.17350769042969, -0.26126098632812],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.91383361816406, -3.02241516113281],
            [-2.35932922363281, -1.49452209472656],
            [0, 0],
            [1.91459655761719, -3.02241516113281]
        ];
        createPathGrp(contents, 'Rifle_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [55.8251, -115.7117]);
    };
    var createArmR = function () {
        var vertices = [
            [42.9001159667969, -21.2110443115234],
            [34.3077545166016, -43.5345153808594],
            [13.3716125488281, -10.4761505126953],
            [13.4335479736328, 1.80726623535156],
            [13.4335479736328, 1.80726623535156],
            [13.4819946289062, 11.4272155761719],
            [-26.0603332519531, 5.20768737792969],
            [-42.9702911376953, 17.5212860107422],
            [-30.6566925048828, 34.4312438964844],
            [26.0624084472656, 43.3515777587891],
            [43.1518249511719, 28.6651458740234]
        ];
        var inTangents = [
            [0.00634765625, 1.19595336914062],
            [5.30075073242188, 5.95112609863281],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.26901245117188, -8.06903076171875],
            [-8.06983947753906, -1.26901245117188],
            [0, 0],
            [0.04527282714844, 9.10139465332031]
        ];
        var outTangents = [
            [-0.04287719726562, -8.55583190917969],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-8.06903076171875, -1.26901245117188],
            [-1.26901245117188, 8.06983947753906],
            [0, 0],
            [9.00689697265625, 1.41751098632812],
            [-0.13575744628906, -26.9031372070312]
        ];
        createPathGrp(contents, 'Arm_R', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [41.1351, -48.5094]);
    };
    createArmR();
    createRifleTop();
    createRifleBottom();
    createSalute();
    createLegR();
    createLegL();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 250);
};
var createHoldingM16Icon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Holding M16', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createHead = function () {
        var vertices = [
            [6.97627258300781, -29.0202026367188],
            [30.0746154785156, -2.26789855957031],
            [11.0411529541016, 28.7313995361328],
            [7.3758544921875, 28.5957641601562],
            [7.44075012207031, 23.3938751220703],
            [9.35284423828125, 7.90188598632812],
            [-4.12532043457031, 0.444580078125],
            [-7.1417236328125, -0.658935546875],
            [-29.28173828125, -3.62628173828125],
            [-30.1573333740234, -3.26971435546875],
            [-24.2438201904297, -17.8755950927734],
            [-8.87918090820312, -28.5393218994141]
        ];
        var inTangents = [
            [-4.84263610839844, -1.12666320800781],
            [-0.87005615234375, -12.4499359130859],
            [12.4440765380859, -4.78849792480469],
            [1.09831237792969, 2.22492980957031],
            [-2.01524353027344, 2.11801147460938],
            [2.71945190429688, 5.05303955078125],
            [5.96452331542969, -0.23117065429688],
            [0.91070556640625, 1.36283874511719],
            [7.892333984375, -6.66741943359375],
            [0.49177551269531, -0.19548034667969],
            [-3.25444030761719, 4.2637939453125],
            [-3.67710876464844, 1.33392333984375]
        ];
        var outTangents = [
            [12.8216552734375, 2.9830322265625],
            [0.96536254882812, 13.8136444091797],
            [-1.05838012695312, 0.40727233886719],
            [-0.84976196289062, -1.72146606445312],
            [4.07612609863281, -4.28396606445312],
            [-2.86952209472656, -5.33198547363281],
            [-1.23983764648438, 0.04804992675781],
            [-5.71627807617188, -8.55445861816406],
            [0.514892578125, -5.59555053710938],
            [-0.15168762207031, 0.12814331054688],
            [3.96046447753906, -5.18876647949219],
            [3.67710876464844, -1.33392333984375]
        ];
        createPathGrp(contents, 'Head', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [7.6727, -141.6099]);
    };
    var createDude = function () {
        var vertices = [
            [2.48191833496094, -95.9456024169922],
            [8.11865234375, -96.3826141357422],
            [7.40386962890625, -99.8716125488281],
            [-15.1997680664062, -145.912261962891],
            [-16.2914428710938, -148.336761474609],
            [-13.1386566162109, -155.531280517578],
            [-5.89532470703125, -153.253997802734],
            [-2.78866577148438, -146.997283935547],
            [0.47964477539062, -145.982986450195],
            [3.49319458007812, -147.379989624023],
            [10.5910034179688, -144.64860534668],
            [8.81645202636719, -137.226638793945],
            [8.26963806152344, -136.843933105469],
            [3.94955444335938, -134.175491333008],
            [6.09907531738281, -129.07795715332],
            [43.9962463378906, -51.9627227783203],
            [45.0925140380859, -48.4789276123047],
            [13.3452606201172, -72.0634613037109],
            [12.3607330322266, -72.4694976806641],
            [12.6704711914062, -71.4424285888672],
            [21.3786468505859, -53.8238067626953],
            [24.2507171630859, -51.1800079345703],
            [67.0060577392578, -25.25],
            [74.5115203857422, -11.3147430419922],
            [66.0661010742188, 1.37937927246094],
            [52.0047149658203, 0.94245910644531],
            [2.38516235351562, -29.0924377441406],
            [-3.57156372070312, -36.1240692138672],
            [-13.8994903564453, -56.6540832519531],
            [-15.9002838134766, -59.1252746582031],
            [-10.7428436279297, -32.0974884033203],
            [-4.37030029296875, -23.2035064697266],
            [22.7684020996094, -6.88497924804688],
            [26.0327301025391, -2.315673828125],
            [35.9257354736328, 48.0699157714844],
            [51.5622863769531, 62.5437469482422],
            [53.3287200927734, 65.5629272460938],
            [53.3566741943359, 106.994537353516],
            [53.2862701416016, 139.069488525391],
            [37.474365234375, 155.995788574219],
            [18.7013092041016, 142.331024169922],
            [18.3207702636719, 136.347595214844],
            [18.3188018798828, 63.1739349365234],
            [17.4937286376953, 57.9589385986328],
            [0.38523864746094, 11.0348815917969],
            [-5.12496948242188, 8.48692321777344],
            [-6.75729370117188, 12.04931640625],
            [-8.92790222167969, 64.7892303466797],
            [-10.6932220458984, 72.1991577148438],
            [-40.3627319335938, 144.239959716797],
            [-58.2844696044922, 156.021270751953],
            [-74.0198211669922, 142.727508544922],
            [-72.7011566162109, 130.372528076172],
            [-45.8677978515625, 65.4484558105469],
            [-43.6541748046875, 55.1347351074219],
            [-41.8881072998047, -94.50830078125],
            [-19.0098419189453, -117.535873413086],
            [-9.21958923339844, -117.535873413086]
        ];
        var inTangents = [
            [0, 0],
            [-1.94786071777344, -0.89607238769531],
            [0.484375, 0.9913330078125],
            [0.26527404785156, 0.83950805664062],
            [7.54069519042969, 15.3438873291016],
            [-2.864013671875, 1.28038024902344],
            [-1.612060546875, -2.65528869628906],
            [-0.88058471679688, -2.15119934082031],
            [-1.5634765625, 0.98599243164062],
            [-1.04360961914062, 0.35789489746094],
            [-1.37428283691406, -2.59097290039062],
            [2.41548156738281, -1.83079528808594],
            [0.18328857421875, -0.12611389160156],
            [0.19444274902344, -1.52836608886719],
            [-0.82984924316406, -1.68888854980469],
            [-12.6224670410156, -25.7099304199219],
            [0.20097351074219, -1.66639709472656],
            [8.22520446777344, 10.9548492431641],
            [0.43684387207031, 0.05010986328125],
            [-0.19613647460938, -0.3673095703125],
            [-2.85240173339844, -5.897216796875],
            [-1.12796020507812, -0.684326171875],
            [-14.24267578125, -8.6583251953125],
            [0.33389282226562, -6.05508422851562],
            [5.19805908203125, -2.587158203125],
            [4.50033569335938, 2.69692993164062],
            [16.5215454101562, 10.0418701171875],
            [1.41326904296875, 2.8468017578125],
            [3.49148559570312, 6.818359375],
            [1.51042175292969, 0.23538208007812],
            [-1.69088745117188, -8.98770141601562],
            [-3.48048400878906, -2.06442260742188],
            [-9.06060791015625, -5.41552734375],
            [-0.42918395996094, -2.27430725097656],
            [-3.30380249023438, -16.7942199707031],
            [-9.1357421875, -0.82115173339844],
            [-0.00405883789062, -1.21308898925781],
            [0.00532531738281, -13.8105621337891],
            [0.17912292480469, -10.6890258789062],
            [8.752197265625, -0.81430053710938],
            [1.86041259765625, 8.58245849609375],
            [0.00192260742188, 1.99777221679688],
            [-0.01998901367188, 24.3912200927734],
            [0.63255310058594, 1.71409606933594],
            [5.52742004394531, 15.7032318115234],
            [2.17825317382812, -0.07603454589844],
            [0.05665588378906, -1.26605224609375],
            [0.68994140625, -17.5813751220703],
            [0.98220825195312, -2.38343811035156],
            [9.90864562988281, -24.005859375],
            [7.91908264160156, 0.5390625],
            [1.92573547363281, 7.4586181640625],
            [-1.67373657226562, 4.033203125],
            [-8.99371337890625, 21.6208801269531],
            [-0.20664978027344, 3.61180114746094],
            [0.17207336425781, 49.8846435546875],
            [-13.6530151367188, 0],
            [0, 0]
        ];
        var outTangents = [
            [1.63796997070312, -1.39561462402344],
            [0.90458679199219, -1.5482177734375],
            [-7.50534057617188, -15.3611450195312],
            [-0.39105224609375, -0.79573059082031],
            [-0.97561645507812, -3.08747863769531],
            [2.68342590332031, -1.19964599609375],
            [0.75440979003906, 1.843017578125],
            [1.20512390136719, 1.98503112792969],
            [0.92994689941406, -0.58648681640625],
            [2.880126953125, -0.9876708984375],
            [1.3626708984375, 2.569091796875],
            [-0.17716979980469, 0.13430786132812],
            [-1.44650268554688, 0.99522399902344],
            [-0.20146179199219, 1.58351135253906],
            [12.6306304931641, 25.7059631347656],
            [0.47175598144531, 0.96084594726562],
            [-11.4215240478516, -6.99687194824219],
            [-0.23098754882812, -0.25434875488281],
            [0.01890563964844, 0.21903991699219],
            [2.91123962402344, 5.86874389648438],
            [0.63836669921875, 1.31980895996094],
            [14.2503509521484, 8.64569091796875],
            [5.20680236816406, 3.165283203125],
            [-0.31797790527344, 5.76693725585938],
            [-4.71354675292969, 2.34599304199219],
            [-16.5838928222656, -9.93818664550781],
            [-2.74208068847656, -1.6666259765625],
            [-3.40632629394531, -6.86152648925781],
            [-0.45388793945312, -0.88633728027344],
            [1.73179626464844, 9.06065368652344],
            [0.74766540527344, 3.97407531738281],
            [9.07858276367188, 5.38493347167969],
            [1.80117797851562, 1.07655334472656],
            [3.1739501953125, 16.8184967041016],
            [1.79229736328125, 9.11074829101562],
            [2.56263732910156, 0.23033142089844],
            [0.04603576660156, 13.8103942871094],
            [-0.00411987304688, 10.6918640136719],
            [-0.14915466308594, 8.90084838867188],
            [-8.71617126464844, 0.81100463867188],
            [-0.41885375976562, -1.9322509765625],
            [-0.02346801757812, -24.3912048339844],
            [0.00146484375, -1.79689025878906],
            [-5.76374816894531, -15.6194000244141],
            [-1.15386962890625, -3.27806091308594],
            [-2.62229919433594, 0.09152221679688],
            [-0.78648376464844, 17.5771484375],
            [-0.10198974609375, 2.59927368164062],
            [-9.8951416015625, 24.0114135742188],
            [-3.28392028808594, 7.95599365234375],
            [-7.46565246582031, -0.50814819335938],
            [-1.10137939453125, -4.26580810546875],
            [8.97554016113281, -21.6284790039062],
            [1.39137268066406, -3.34489440917969],
            [2.85235595703125, -49.8547821044922],
            [-0.04670715332031, -13.5384063720703],
            [3.55496215820312, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Dude', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-0.7608, 14.6915]);
    };
    var createRifleBack = function () {
        var vertices = [
            [-19.9465179443359, -26.8941955566406],
            [-9.13104248046875, -20.3409576416016],
            [5.40673828125, -16.4241027832031],
            [8.14274597167969, -14.7249450683594],
            [19.1792602539062, 7.673828125],
            [15.6078338623047, 18.39990234375],
            [0.08184814453125, 26.0565490722656],
            [-10.7548370361328, 21.1861724853516],
            [-20.1502838134766, -25.8873901367188]
        ];
        var inTangents = [
            [-0.12326049804688, 0.58027648925781],
            [-3.46784973144531, -2.17796325683594],
            [-5.28610229492188, 0.43598937988281],
            [-0.61300659179688, -1.26153564453125],
            [-3.5963134765625, -7.50572204589844],
            [4.328857421875, -2.27334594726562],
            [5.24008178710938, -2.41299438476562],
            [1.02459716796875, 4.87553405761719],
            [3.10189819335938, 15.6973876953125]
        ];
        var outTangents = [
            [3.81257629394531, 2.3043212890625],
            [4.45852661132812, 2.8001708984375],
            [1.51838684082031, -0.12522888183594],
            [3.63777160644531, 7.48626708984375],
            [2.1099853515625, 4.40373229980469],
            [-5.10771179199219, 2.68232727050781],
            [-4.68959045410156, 2.15945434570312],
            [-3.29046630859375, -15.6578979492188],
            [-0.03903198242188, -0.19760131835938]
        ];
        createPathGrp(contents, 'Rifle_Back', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [54.531, 42.3738]);
    };
    var createShoulderR = function () {
        var vertices = [
            [-7.22785949707031, -14.3801116943359],
            [6.9459228515625, 14.3801116943359]
        ];
        var inTangents = [
            [4.79147338867188, 9.72248840332031],
            [1.79469299316406, -18.9131164550781]
        ];
        var outTangents = [
            [8.953369140625, 3.07568359375],
            [-4.83944702148438, -9.81979370117188]
        ];
        createPathGrp(contents, 'R_Shoulder', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [27.9637, -87.0391]);
    };
    createShoulderR();
    createRifleBack();
    createDude();
    createHead();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 200);
};
var createShootingM16Icon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Shooting M16', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createBoom = function () {
        var vertices = [
            [22.4373474121094, 2.12002563476562],
            [10.3540344238281, 22.0729827880859],
            [9.59526062011719, 23.8569030761719],
            [7.71046447753906, 23.2854309082031],
            [5.10099792480469, 20.9362945556641],
            [-11.1118316650391, 18.1293792724609],
            [-13.6685943603516, 18.4035491943359],
            [-13.4969787597656, 15.8827514648438],
            [-20.2327423095703, -3.61973571777344],
            [-22.3766937255859, -5.96400451660156],
            [-19.6738433837891, -7.06611633300781],
            [-4.28692626953125, -21.3797760009766],
            [-2.91255187988281, -23.9317626953125],
            [-0.80511474609375, -21.9953765869141],
            [13.2439575195312, -17.4006805419922],
            [16.3445281982422, -17.6454925537109],
            [15.5499725341797, -14.5028381347656],
            [16.5634155273438, -2.25100708007812],
            [22.4373474121094, 0.7132568359375]
        ];
        var inTangents = [
            [0, -0.46891784667969],
            [-1.08345031738281, -9.74613952636719],
            [0.76057434082031, -0.32994079589844],
            [0.54167175292969, 0.4923095703125],
            [0.87319946289062, 0.77926635742188],
            [6.02593994140625, -2.57423400878906],
            [0.94908142089844, 0.89285278320312],
            [-0.31077575683594, 0.8233642578125],
            [7.4769287109375, 4.5267333984375],
            [-0.39277648925781, 1.53253173828125],
            [-1.02090454101562, 0.15034484863281],
            [-1.87925720214844, 7.88792419433594],
            [-1.33116149902344, 0.27476501464844],
            [-0.53358459472656, -0.810302734375],
            [-5.62841796875, 2.06161499023438],
            [-1.03776550292969, -1.42489624023438],
            [0.467529296875, -0.97242736816406],
            [-3.1700439453125, -3.13618469238281],
            [-1.94834899902344, -1.00241088867188]
        ];
        var outTangents = [
            [-8.49044799804688, 3.94837951660156],
            [0.08229064941406, 0.74046325683594],
            [-0.73780822753906, 0.320068359375],
            [-0.86611938476562, -0.78712463378906],
            [-4.82075500488281, -4.30226135253906],
            [-0.78195190429688, 0.33404541015625],
            [-0.96417236328125, -0.90702819824219],
            [3.09626770019531, -8.20265197753906],
            [-0.92880249023438, -0.56233215332031],
            [0.3134765625, -1.22309875488281],
            [7.85887145996094, -1.15733337402344],
            [0.23316955566406, -0.97877502441406],
            [1.43870544433594, -0.29696655273438],
            [3.29055786132812, 4.99739074707031],
            [0.97059631347656, -0.35551452636719],
            [0.8892822265625, 1.22103881835938],
            [-2.49484252929688, 5.18888854980469],
            [1.66194152832031, 1.64418029785156],
            [0, 0.46891784667969]
        ];
        createPathGrp(contents, 'BOOOOOM', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [157.9753, -124.8603]);
    };
    var createDude = function () {
        var vertices = [
            [97.7233734130859, -132.352035522461],
            [93.1433563232422, -122.372055053711],
            [47.5833587646484, -77.9520111083984],
            [32.3134002685547, -74.1720428466797],
            [-4.30659484863281, -83.8120574951172],
            [-8.44660949707031, -83.9620208740234],
            [11.9434051513672, -72.8520355224609],
            [14.8433685302734, -68.0320434570312],
            [14.7534027099609, -7.20201110839844],
            [31.1820831298828, 40.3683319091797],
            [32.7733612060547, 48.9279327392578],
            [32.7534027099609, 129.797988891602],
            [19.0733642578125, 148.32795715332],
            [-1.11666870117188, 139.127944946289],
            [-3.09663391113281, 128.907974243164],
            [-4.13458251953125, 48.2178802490234],
            [-21.1566314697266, 1.46797180175781],
            [-26.6865997314453, -1.68205261230469],
            [-28.6466217041016, 2.65797424316406],
            [-30.8766021728516, 55.3379516601562],
            [-63.3246002197266, 137.658706665039],
            [-82.1966094970703, 148.607986450195],
            [-95.9761047363281, 122.927749633789],
            [-68.5666046142578, 56.5479736328125],
            [-66.2366485595703, 45.6779327392578],
            [-64.3864135742188, -107.572067260742],
            [-38.3266143798828, -129.952011108398],
            [-35.1466217041016, -127.952011108398],
            [-16.0866241455078, -118.782028198242],
            [-13.9666290283203, -120.682052612305],
            [-0.90664672851562, -133.552047729492],
            [43.0433807373047, -134.292037963867],
            [-0.09663391113281, -115.612045288086],
            [-0.02662658691406, -114.542037963867],
            [29.1133880615234, -106.842025756836],
            [34.6033782958984, -108.272018432617],
            [71.5733489990234, -144.382064819336]
        ];
        var inTangents = [
            [1.2100830078125, -13.7003173828125],
            [2.780029296875, -2.719970703125],
            [15.2100219726562, -14.7900390625],
            [5.739990234375, 1.489990234375],
            [12.1999664306641, 3.239990234375],
            [1.5799560546875, -0.70001220703125],
            [-6.780029296875, -3.58003234863281],
            [0.02001953125, -2.47001647949219],
            [0.03997802734375, -20.27001953125],
            [-5.11471557617188, -15.9060668945312],
            [-0.010009765625, -2.949951171875],
            [0.05999755859375, -26.9500122070312],
            [8.29002380371094, -2.03997802734375],
            [3.83003234863281, 7.29998779296875],
            [0, 3.54998779296875],
            [2.830078125, 26.5567321777344],
            [5.5, 15.6400146484375],
            [2.6099853515625, -0.28997802734375],
            [0.07000732421875, -1.52001953125],
            [0.69000244140625, -17.5599822998047],
            [10.2559814453125, -27.541259765625],
            [8.47998046875, 0.91998291015625],
            [-5.45314025878906, 10.6251831054688],
            [-9.21002197265625, 22.0999755859375],
            [-0.19000244140625, 3.7900390625],
            [0.20852661132812, 51.087890625],
            [-17.8699951171875, -1.69000244140625],
            [-0.92999267578125, -0.83001708984375],
            [-7.0999755859375, -1.5400390625],
            [-0.03997802734375, 1.66998291015625],
            [-11.4899749755859, 0.1500244140625],
            [-14.5168914794922, 0.16244506835938],
            [33.8269500732422, -0.08782958984375],
            [-0.02996826171875, -0.3599853515625],
            [-9.67999267578125, -2.70001220703125],
            [-1.71002197265625, 1.69000244140625],
            [-12.3799438476562, 11.9800415039062]
        ];
        var outTangents = [
            [-0.22998046875, 3.9000244140625],
            [-15.1599731445312, 14.8300170898438],
            [-4.32000732421875, 4.18992614746094],
            [-12.2200317382812, -3.16999816894531],
            [-1.300048828125, -0.3499755859375],
            [6.91998291015625, 3.77996826171875],
            [2.0799560546875, 1.0899658203125],
            [-0.1199951171875, 20.2799835205078],
            [3.34019470214844, 16.2983703613281],
            [1.03128051757812, 2.78964233398438],
            [0, 26.9600067138672],
            [-0.02001953125, 9.37994384765625],
            [-7.95997619628906, 1.95001220703125],
            [-1.69993591308594, -3.219970703125],
            [-0.84854125976562, -26.7967834472656],
            [-5.75202941894531, -15.5599060058594],
            [-1.0999755859375, -3.1300048828125],
            [-3.09002685546875, 0.33000183105469],
            [-0.83001708984375, 17.5499877929688],
            [-7.68003845214844, 28.2259979248047],
            [-3.31201171875, 7.94927978515625],
            [-11.6753082275391, -0.94918823242188],
            [9.13948059082031, -22.1198120117188],
            [1.469970703125, -3.53001403808594],
            [2.63003540039062, -51.0438079833984],
            [-0.24018859863281, -11.8699951171875],
            [1.469970703125, 0.13995361328125],
            [5.5, 4.8599853515625],
            [1.8599853515625, 0.39996337890625],
            [0.280029296875, -11.5599975585938],
            [14.5487213134766, -0.17153930664062],
            [-23.6508026123047, 24.0440673828125],
            [0.02001953125, 0.3599853515625],
            [9.72003173828125, 2.54998779296875],
            [2.33001708984375, 0.65997314453125],
            [12.260009765625, -12.1000366210938],
            [9.69221496582031, -10.1063842773438]
        ];
        createPathGrp(contents, 'Dude', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-81.9413, 21.3234]);
    };
    var createHead = function () {
        var vertices = [
            [-1.42767333984375, -29.2824554443359],
            [27.0469970703125, 16.6500854492188],
            [22.4419860839844, 19.4886322021484],
            [2.78680419921875, 19.6891174316406],
            [-12.4208221435547, 27.9941711425781],
            [-15.9774169921875, 28.0755767822266],
            [-30.8260192871094, -0.88401794433594],
            [-12.1605224609375, -26.8411712646484]
        ];
        var inTangents = [
            [-2.72029113769531, -0.07562255859375],
            [11.3855743408203, -20.5387878417969],
            [2.36567687988281, 0.03517150878906],
            [6.55215454101562, -0.07914733886719],
            [3.28643798828125, -5.85847473144531],
            [1.02951049804688, 0.65252685546875],
            [-0.9993896484375, 12.4810485839844],
            [-11.1153717041016, 5.10221862792969]
        ];
        var outTangents = [
            [25.0948791503906, 0.15899658203125],
            [-1.08035278320312, 1.94888305664062],
            [-6.54927062988281, -0.09738159179688],
            [-6.54437255859375, 0.07905578613281],
            [-1.39726257324219, 2.49079895019531],
            [-10.6141357421875, -6.72738647460938],
            [0.97526550292969, -12.1798553466797],
            [3.87062072753906, -1.77670288085938]
        ];
        createPathGrp(contents, 'Head', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-89.6458, -140.138]);
    };
    var createM16 = function () {
        var vertices = [
            [-12.9834594726562, 6.16433715820312],
            [-10.8552703857422, 8.93498229980469],
            [-15.9564208984375, 17.7403259277344],
            [-49.0567016601562, 17.8067169189453],
            [-51.1778106689453, -4.41748046875],
            [-47.1505584716797, -5.063232421875],
            [20.3086700439453, -6.43336486816406],
            [24.1109466552734, -10.5628204345703],
            [28.2076110839844, -17.4921112060547],
            [34.5418395996094, -15.7282867431641],
            [35.9488372802734, -10.1120910644531],
            [39.5309143066406, -6.78620910644531],
            [45.4974517822266, -6.86512756347656],
            [51.1715393066406, -1.2642822265625],
            [46.3067169189453, 4.73138427734375],
            [42.4691467285156, 5.04736328125],
            [-10.9418487548828, 6.06922912597656]
        ];
        var inTangents = [
            [0.94337463378906, -0.04486083984375],
            [-0.488525390625, -0.8592529296875],
            [4.73100280761719, -0.08964538574219],
            [11.1007232666016, 0],
            [4.105712890625, 7.35101318359375],
            [-1.3074951171875, 0.02960205078125],
            [-22.4884796142578, 0.31431579589844],
            [0.35108947753906, 3.11279296875],
            [-3.3111572265625, 1.16780090332031],
            [-1.7572021484375, -1.83062744140625],
            [0.19479370117188, -1.96577453613281],
            [-2.66436767578125, 0.31793212890625],
            [-1.98336791992188, -0.11308288574219],
            [-0.14085388183594, -3.03759765625],
            [3.02801513671875, -0.63429260253906],
            [1.28245544433594, -0.02529907226562],
            [17.8036956787109, -0.33912658691406]
        ];
        var outTangents = [
            [0.92024230957031, 1.18341064453125],
            [2.22064208984375, 3.90597534179688],
            [-10.9964752197266, 0.2083740234375],
            [2.15007019042969, -7.26405334472656],
            [1.28271484375, -0.9642333984375],
            [22.4854736328125, -0.50895690917969],
            [3.30455017089844, -0.04618835449219],
            [-0.3568115234375, -3.16374206542969],
            [2.53384399414062, -0.89366149902344],
            [1.530517578125, 1.59446716308594],
            [-0.28462219238281, 2.87260437011719],
            [1.96543884277344, -0.23452758789062],
            [3.20458984375, 0.18270874023438],
            [0.1322021484375, 2.85107421875],
            [-1.24714660644531, 0.26124572753906],
            [-17.803466796875, 0.35110473632812],
            [-0.54940795898438, 0.01046752929688]
        ];
        createPathGrp(contents, 'M16', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [74.9752, -120.9183]);
    };
    createM16();
    createHead();
    createDude();
    createBoom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 250);
};
var createRocketIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Rocket', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createRocket = function () {
        var vertices = [
            [-43.5300140380859, 119.984497070312],
            [-34.4872131347656, 87.4645690917969],
            [97.7692565917969, -68.9322052001953],
            [121.544967651367, -138.406066894531],
            [56.9946136474609, -103.416275024414],
            [-75.2580413818359, 52.9786071777344],
            [-105.83464050293, 67.2960357666016],
            [-121.544967651367, 84.930419921875],
            [-88.7843017578125, 92.3727416992188],
            [-94.1649475097656, 107.981201171875],
            [-91.528564453125, 110.241882324219],
            [-88.2521362304688, 113.009826660156],
            [-85.5840911865234, 115.240631103516],
            [-71.0854339599609, 107.333633422852],
            [-58.3045959472656, 138.406066894531]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Rocket', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-20, 0]);
    };
    createRocket();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 200);
};
var createRocketLauncherIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Rocket Launcher', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createRocket = function () {
        var vertices = [
            [-70.6373901367188, 50.3896942138672],
            [-55.3504486083984, 33.3243713378906],
            [72.1864776611328, -22.0354614257812],
            [107.559906005859, -57.1524810791016],
            [57.7544097900391, -55.2878723144531],
            [-69.7796478271484, 0.07196044921875],
            [-92.691162109375, -0.41835021972656],
            [-107.559906005859, 5.58389282226562],
            [-89.8646850585938, 19.9709777832031],
            [-97.8370971679688, 27.8487854003906],
            [-96.9118499755859, 30.0176696777344],
            [-95.7527160644531, 32.6878356933594],
            [-94.7980499267578, 34.8480834960938],
            [-83.5979766845703, 34.4001617431641],
            [-85.1724395751953, 57.1524810791016]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Rocket', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.0056, -42.3866]);
    };
    var createLauncher = function () {
        var vertices = [
            [-91.5698547363281, 25.0742797851562],
            [-91.4781188964844, 9.99700927734375],
            [-87.5562438964844, 0.5897216796875],
            [-75.8984069824219, -5.76177978515625],
            [-77.6433410644531, 1.654296875],
            [-63.2323303222656, -1.70001220703125],
            [-39.2351989746094, -22.4977416992188],
            [-38.8774719238281, -22.0803833007812],
            [-37.4565124511719, -22.9257202148438],
            [80.7858581542969, -76.11376953125],
            [91.3073425292969, -71.711669921875],
            [80.5113220214844, -65.165771484375],
            [-0.24533081054688, -23.4327392578125],
            [-0.24795532226562, -23.4321899414062],
            [-18.8473205566406, 4.2061767578125],
            [16.0020446777344, 76.7611083984375],
            [-87.1478576660156, 76.7611083984375],
            [-91.5698547363281, 26.2882690429688]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [-4.966796875, 5.486572265625],
            [-4.0162353515625, 0.25640869140625],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.5145263671875, 0.2308349609375],
            [0, 0],
            [-1.8870849609375, -4.19647216796875],
            [3.9248046875, -1.76336669921875],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, -12.5452117919922],
            [0, 0],
            [4.29974365234375, -4.75421142578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.43353271484375, -0.32818603515625],
            [0, 0],
            [3.9237060546875, -1.7659912109375],
            [1.8856201171875, 4.19384765625],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Launcher', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-15.9957, 22.7779]);
    };
    createLauncher();
    createRocket();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createMaskIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Mask', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createMaskBottom = function () {
        var vertices = [
            [86.159912109375, 49.6799926757812],
            [76.9599609375, 45.0700073242188],
            [70.6300048828125, 51.3999633789062],
            [62.47998046875, 43.260009765625],
            [37.6900024414062, 43.260009765625],
            [38.3499755859375, 50.4400024414062],
            [-0.58001708984375, 89.3699951171875],
            [-39.510009765625, 50.4400024414062],
            [-38.8499755859375, 43.260009765625],
            [-62.47998046875, 43.260009765625],
            [-70.6300048828125, 51.3999633789062],
            [-76.9600219726562, 45.0700073242188],
            [-86.1599731445312, 49.6799926757812],
            [-54.7100219726562, 100.690002441406],
            [-43.5800170898438, 95.3200073242188],
            [-47.0399780273438, 90.3299560546875],
            [-38.5999755859375, 83.0499877929688],
            [-2.05999755859375, 104.760009765625],
            [-2.05999755859375, 104.909973144531],
            [-0.00001525878906, 104.859985351562],
            [2.05999755859375, 104.909973144531],
            [2.05999755859375, 104.760009765625],
            [38.5999755859375, 83.0499877929688],
            [47.0399780273438, 90.3299560546875],
            [43.5800170898438, 95.3200073242188],
            [54.7100219726562, 100.690002441406]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -2.45001220703125],
            [21.5, 0],
            [0, 21.5],
            [-0.4300537109375, 2.3299560546875],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-34.9099731445312, -14.5800170898438],
            [0, 0],
            [0, 0],
            [0, 0],
            [-27.7899780273438, -1.82000732421875],
            [0, 0],
            [-0.67997741699219, 0.02001953125],
            [-0.70001220703125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.42999267578125, 2.3299560546875],
            [0, 21.5],
            [-21.510009765625, 0],
            [0, -2.45001220703125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.70001220703125, 0],
            [0, 0],
            [0.68000793457031, 0.02001953125],
            [27.7999877929688, -1.82000732421875],
            [0, 0],
            [0, 0],
            [0, 0],
            [34.8999633789062, -14.5800170898438]
        ];
        createPathGrp(contents, 'Mask_Bottom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createMaskMiddle = function () {
        var vertices = [
            [76.9599609375, 45.0700073242188],
            [70.6300048828125, 51.3999633789062],
            [61.6099853515625, 42.3900146484375],
            [69.280029296875, 11.7000122070312],
            [82.330078125, -2.489990234375],
            [85.179931640625, -36.3099975585938],
            [67.3800048828125, -36.3099975585938],
            [67.780029296875, -26.8500366210938],
            [56.27001953125, 4.6099853515625],
            [34.4099884033203, 9.969970703125],
            [20.97998046875, -9.97003173828125],
            [6.08001708984375, -36.3099975585938],
            [-8.1500244140625, -36.3099975585938],
            [-23.0499877929688, -9.97003173828125],
            [-36.469970703125, 9.969970703125],
            [-58.3400268554688, 4.6099853515625],
            [-69.8499755859375, -26.8500366210938],
            [-69.4600219726562, -36.3099975585938],
            [-85.1799926757812, -36.3099975585938],
            [-82.3300170898438, -2.489990234375],
            [-69.280029296875, 11.7000122070312],
            [-61.6099853515625, 42.3900146484375],
            [-70.6300048828125, 51.3999633789062],
            [-76.9600219726562, 45.0700073242188],
            [-86.1599731445312, 49.6799926757812],
            [-83.6599731445312, 69.2799682617188],
            [-34.6599731445312, 69.2799682617188],
            [-39.510009765625, 50.4400024414062],
            [-0.58001708984375, 11.510009765625],
            [38.3499755859375, 50.4400024414062],
            [33.4900054931641, 69.2799682617188],
            [83.659912109375, 69.2799682617188],
            [86.159912109375, 49.6799926757812]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-7.2900390625, 9.969970703125],
            [1.91015625, 13.8699951171875],
            [0, 0],
            [-0.090087890625, -3.3699951171875],
            [6.90997314453125, -9.21002197265625],
            [8.05003356933594, 3.46002197265625],
            [7.67999267578125, 7.2900390625],
            [0.9599609375, 14.989990234375],
            [0, 0],
            [7.51995849609375, -7.14996337890625],
            [8.04998779296875, -3.45001220703125],
            [6.9000244140625, 9.20001220703125],
            [-0.3800048828125, 14.5800170898438],
            [-0.19000244140625, 2.91998291015625],
            [0, 0],
            [-5.02996826171875, -6.8800048828125],
            [0, 0],
            [-5.3699951171875, -4.22003173828125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-3.34002685546875, -10.739990234375],
            [0, 0],
            [0, 6.8299560546875],
            [-21.510009765625, 0],
            [0, -21.5],
            [3.10002136230469, -5.5899658203125],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [5.3699951171875, -4.22003173828125],
            [0, 0],
            [5.0198974609375, -6.8800048828125],
            [0, 0],
            [0.2000732421875, 2.91998291015625],
            [0.3798828125, 14.5800170898438],
            [-6.9000244140625, 9.20001220703125],
            [-8.06001281738281, -3.45001220703125],
            [-7.51994323730469, -7.14996337890625],
            [0, 0],
            [-0.9599609375, 14.989990234375],
            [-7.66998291015625, 7.2900390625],
            [-8.06005859375, 3.46002197265625],
            [-6.90997314453125, -9.21002197265625],
            [0, 0],
            [0.0899658203125, -3.3699951171875],
            [-1.9100341796875, 13.8699951171875],
            [7.2900390625, 9.969970703125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-3.09002685546875, -5.5899658203125],
            [0, -21.5],
            [21.5, 0],
            [0, 6.8299560546875],
            [0, 0],
            [3.340087890625, -10.72998046875],
            [0, 0]
        ];
        createPathGrp(contents, 'Mask_Middle', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createMaskTop = function () {
        var vertices = [
            [81.93994140625, -55.0400390625],
            [55.0900268554688, -72.2999877929688],
            [4.3599853515625, -104.799987792969],
            [4.3599853515625, -104.910034179688],
            [0, -104.890014648438],
            [-4.3599853515625, -104.910034179688],
            [-4.3599853515625, -104.799987792969],
            [-55.0900268554688, -72.2999877929688],
            [-81.9400024414062, -55.0400390625],
            [-85.5399780273438, -10.2900390625],
            [-67.2999877929688, -10.2900390625],
            [-69.8499755859375, -26.8500366210938],
            [-62.1799926757812, -56],
            [-40.6900024414062, -58.6900024414062],
            [-8.09002685546875, -37.2100219726562],
            [-22.719970703125, -10.2900390625],
            [20.6400146484375, -10.2900390625],
            [6.02001953125, -37.2100219726562],
            [38.6300201416016, -58.6900024414062],
            [60.1099853515625, -56],
            [67.780029296875, -26.8500366210938],
            [65.22998046875, -10.2900390625],
            [85.5400390625, -10.2900390625]
        ];
        var inTangents = [
            [3.0400390625, 15.4800415039062],
            [0, 0],
            [21.9800415039062, 0.6099853515625],
            [0, 0],
            [1.489990234375, -0.010009765625],
            [1.41998291015625, 0],
            [0, 0],
            [2.36004638671875, -27.6600341796875],
            [3.83001708984375, -19.5699462890625],
            [-2.48004150390625, -11.6399536132812],
            [0, 0],
            [-0.1700439453125, 6.71002197265625],
            [-6.52001953125, 3.8299560546875],
            [-6.90997314453125, -0.3800048828125],
            [0.77001953125, -15.719970703125],
            [7.52996826171875, -7.0999755859375],
            [0, 0],
            [0.760009765625, 15.5],
            [-25.0900421142578, 1.39996337890625],
            [-6.51995849609375, -3.84002685546875],
            [-0.3900146484375, -14.5799560546875],
            [1.77001953125, -4.6099853515625],
            [0, 0]
        ];
        var outTangents = [
            [-3.8299560546875, -19.5699462890625],
            [-2.36004638671875, -27.6600341796875],
            [0, 0],
            [-1.40997314453125, 0],
            [-1.489990234375, -0.010009765625],
            [0, 0],
            [-21.9800415039062, 0.6099853515625],
            [0, 0],
            [-3.03997802734375, 15.4800415039062],
            [0, 0],
            [-1.77001953125, -4.6099853515625],
            [0.3800048828125, -14.5799560546875],
            [6.52001953125, -3.84002685546875],
            [25.0700073242188, 1.39996337890625],
            [-0.75994873046875, 15.5],
            [0, 0],
            [-7.52001953125, -7.0999755859375],
            [-0.760009765625, -15.719970703125],
            [6.90000915527344, -0.3800048828125],
            [6.52001953125, 3.8299560546875],
            [0.169921875, 6.71002197265625],
            [0, 0],
            [2.469970703125, -11.6300048828125]
        ];
        createPathGrp(contents, 'Mask_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createCircle01 = function () {
        var vertices = [
            [6.71333312988281, 0.00129699707031],
            [-0.00129699707031, 6.71333312988281],
            [-6.71333312988281, 0.00129699707031],
            [-0.00129699707031, -6.71333312988281]
        ];
        var inTangents = [
            [0, -3.70932006835938],
            [3.70932006835938, 0],
            [0, 3.70672607421875],
            [-3.70672607421875, 0]
        ];
        var outTangents = [
            [0, 3.70672607421875],
            [-3.70672607421875, 0],
            [0, -3.70932006835938],
            [3.70932006835938, 0]
        ];
        createPathGrp(contents, 'Circle_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-13.0482, 29.3444]);
    };
    var createCircle02 = function () {
        var vertices = [
            [6.71188354492188, 0.00129699707031],
            [0.00013732910156, 6.71333312988281],
            [-6.71188354492188, 0.00129699707031],
            [0.00013732910156, -6.71333312988281]
        ];
        var inTangents = [
            [0, -3.70932006835938],
            [3.70643615722656, 0],
            [0, 3.70672607421875],
            [-3.70960998535156, 0]
        ];
        var outTangents = [
            [0, 3.70672607421875],
            [-3.70960998535156, 0],
            [0, -3.70932006835938],
            [3.70643615722656, 0]
        ];
        createPathGrp(contents, 'Circle_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [10.9279, 29.3444]);
    };
    var createCircle03 = function () {
        var vertices = [
            [6.71333312988281, -0.00013732910156],
            [-0.00129699707031, 6.71188354492188],
            [-6.71333312988281, -0.00013732910156],
            [-0.00129699707031, -6.71188354492188]
        ];
        var inTangents = [
            [0, -3.70932006835938],
            [3.70932006835938, 0],
            [0, 3.70932006835938],
            [-3.70672607421875, 0]
        ];
        var outTangents = [
            [0, 3.70932006835938],
            [-3.70672607421875, 0],
            [0, -3.70932006835938],
            [3.70932006835938, 0]
        ];
        createPathGrp(contents, 'Circle_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-13.0482, 70.0031]);
    };
    var createCircle04 = function () {
        var vertices = [
            [6.71188354492188, -0.00013732910156],
            [0.00013732910156, 6.71188354492188],
            [-6.71188354492188, -0.00013732910156],
            [0.00013732910156, -6.71188354492188]
        ];
        var inTangents = [
            [0, -3.70932006835938],
            [3.70643615722656, 0],
            [0, 3.70932006835938],
            [-3.70960998535156, 0]
        ];
        var outTangents = [
            [0, 3.70932006835938],
            [-3.70960998535156, 0],
            [0, -3.70932006835938],
            [3.70643615722656, 0]
        ];
        createPathGrp(contents, 'Circle_04', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [10.9279, 70.0031]);
    };
    var createCircle05 = function () {
        var vertices = [
            [6.71333312988281, 0.00013732910156],
            [-0.00129699707031, 6.71188354492188],
            [-6.71333312988281, 0.00013732910156],
            [-0.00129699707031, -6.71188354492188]
        ];
        var inTangents = [
            [0, -3.70960998535156],
            [3.70932006835938, 0],
            [0, 3.70932006835938],
            [-3.70672607421875, 0]
        ];
        var outTangents = [
            [0, 3.70932006835938],
            [-3.70672607421875, 0],
            [0, -3.70960998535156],
            [3.70932006835938, 0]
        ];
        createPathGrp(contents, 'Circle_05', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [23.2011, 49.4813]);
    };
    var createCircle06 = function () {
        var vertices = [
            [6.71333312988281, 0.00013732910156],
            [-0.00129699707031, 6.71188354492188],
            [-6.71333312988281, 0.00013732910156],
            [-0.00129699707031, -6.71188354492188]
        ];
        var inTangents = [
            [0, -3.70960998535156],
            [3.70643615722656, 0],
            [0, 3.70932006835938],
            [-3.70672607421875, 0]
        ];
        var outTangents = [
            [0, 3.70932006835938],
            [-3.70672607421875, 0],
            [0, -3.70960998535156],
            [3.70643615722656, 0]
        ];
        createPathGrp(contents, 'Circle_06', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-0.1961, 49.4813]);
    };
    var createCircle07 = function () {
        var vertices = [
            [6.71188354492188, 0.00013732910156],
            [-0.00013732910156, 6.71188354492188],
            [-6.71188354492188, 0.00013732910156],
            [-0.00013732910156, -6.71188354492188]
        ];
        var inTangents = [
            [0, -3.70960998535156],
            [3.70960998535156, 0],
            [0, 3.70932006835938],
            [-3.70643615722656, 0]
        ];
        var outTangents = [
            [0, 3.70932006835938],
            [-3.70643615722656, 0],
            [0, -3.70960998535156],
            [3.70960998535156, 0]
        ];
        createPathGrp(contents, 'Circle_07', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-24.3636, 49.4813]);
    };
    createCircle07();
    createCircle06();
    createCircle05();
    createCircle04();
    createCircle03();
    createCircle02();
    createCircle01();
    createMaskTop();
    createMaskMiddle();
    createMaskBottom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 160);
};
var createShoeIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Shoe', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createSole = function () {
        var vertices = [
            [-117.953872680664, -4.52000427246094],
            [-115.888549804688, -15.2752075195312],
            [-112.247116088867, -13.2851715087891],
            [-69.5648193359375, -13.9685668945312],
            [5.97535705566406, -2.22113037109375],
            [56.7619323730469, 1.00537109375],
            [104.860275268555, -9.38253784179688],
            [111.726058959961, -12.6094207763672],
            [114.68928527832, -12.3582305908203],
            [113.425506591797, 1.38914489746094],
            [99.5922241210938, 7.00787353515625],
            [55.9788513183594, 14.5531005859375],
            [24.0476379394531, 14.8462066650391],
            [-17.0269622802734, 6.49905395507812],
            [-41.7108917236328, 1.25091552734375],
            [-43.7506866455078, 2.58619689941406],
            [-45.3443298339844, 6.39071655273438],
            [-53.0701751708984, 10.8340301513672],
            [-82.6657867431641, 9.10623168945312],
            [-113.880874633789, 7.46218872070312],
            [-117.953872680664, 5.60911560058594]
        ];
        var inTangents = [
            [0, 3.37637329101562],
            [-1.299072265625, 3.84393310546875],
            [-1.6591796875, 0.22999572753906],
            [-14.2542724609375, -0.77374267578125],
            [-25.0114440917969, -5.05073547363281],
            [-17.0786743164062, 1.10966491699219],
            [-15.4459686279297, 6.15965270996094],
            [-2.24411010742188, 1.16294860839844],
            [-0.98036193847656, -0.67973327636719],
            [5.45751953125, -2.88510131835938],
            [4.77725219726562, -1.42738342285156],
            [14.8088989257812, -1.01922607421875],
            [10.6443481445312, 0.7432861328125],
            [13.2646942138672, 4.97607421875],
            [8.34584045410156, 1.2039794921875],
            [0.357666015625, -1.0361328125],
            [0.66720581054688, -1.19355773925781],
            [3.50968933105469, 0.08552551269531],
            [9.86358642578125, 0.60722351074219],
            [10.4382934570312, -0.12229919433594],
            [0.82417297363281, 1.79498291015625]
        ];
        var outTangents = [
            [0.50224304199219, -3.43074035644531],
            [0.87516784667969, 2.03787231445312],
            [14.1925048828125, -1.96737670898438],
            [25.5827484130859, 1.38865661621094],
            [16.7454071044922, 3.3814697265625],
            [16.5615081787109, -1.07608032226562],
            [2.34556579589844, -0.93539428710938],
            [1.12493896484375, -0.58297729492188],
            [4.84431457519531, 3.35891723632812],
            [-4.41719055175781, 2.33514404296875],
            [-14.23095703125, 4.25210571289062],
            [-10.6472930908203, 0.73281860351562],
            [-14.0476989746094, -0.98097229003906],
            [-7.9375, -2.9776611328125],
            [-1.12916564941406, -0.16290283203125],
            [-0.4482421875, 1.29843139648438],
            [-1.6712646484375, 2.98966979980469],
            [-9.88594055175781, -0.24093627929688],
            [-10.3990936279297, -0.64019775390625],
            [-1.69552612304688, 0.01983642578125],
            [0, -3.37637329101562]
        ];
        createPathGrp(contents, 'Sole', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 84.6094]);
    };
    var createShoe = function () {
        var vertices = [
            [-63.4697723388672, -88.7600555419922],
            [-31.6182861328125, -90.7322235107422],
            [-19.0197143554688, -90.9511260986328],
            [-11.8643493652344, -83.3431091308594],
            [-7.36891174316406, -47.3194732666016],
            [-9.72427368164062, -44.6190795898438],
            [-34.8381042480469, -42.0498809814453],
            [-37.9995574951172, -38.6858215332031],
            [-33.8128662109375, -36.2358703613281],
            [-19.7066040039062, -38.2097015380859],
            [-7.98193359375, -38.5293273925781],
            [-5.97909545898438, -36.8377838134766],
            [-4.01644897460938, -19.9449920654297],
            [-5.77940368652344, -17.8988189697266],
            [-22.5050659179688, -16.6015930175781],
            [-26.8337860107422, -16.0354309082031],
            [-29.5537567138672, -12.3440093994141],
            [-26.2047729492188, -10.3218231201172],
            [-6.72482299804688, -11.7926025390625],
            [-3.47663879394531, -8.68110656738281],
            [-3.56147766113281, -0.21173095703125],
            [-5.13908386230469, 2.09254455566406],
            [-16.7415161132812, 12.8620910644531],
            [-17.1759948730469, 17.6464996337891],
            [-12.2184600830078, 16.7810974121094],
            [-1.99415588378906, 7.21928405761719],
            [1.54403686523438, 7.44094848632812],
            [7.46783447265625, 12.8902893066406],
            [7.49052429199219, 15.6586761474609],
            [0.63320922851562, 23.9925079345703],
            [0.89820861816406, 28.4180145263672],
            [5.46794128417969, 27.4529571533203],
            [11.5121154785156, 19.9258575439453],
            [14.9077911376953, 19.8846588134766],
            [23.9677429199219, 30.5923004150391],
            [23.8940887451172, 34.2213134765625],
            [20.0493011474609, 39.9458923339844],
            [20.3161468505859, 44.4056243896484],
            [24.4394836425781, 44.0361633300781],
            [27.4727172851562, 39.4250030517578],
            [30.0780029296875, 39.2401580810547],
            [57.5707702636719, 51.3814086914062],
            [81.9106597900391, 52.1761016845703],
            [101.68962097168, 58.4779968261719],
            [111.924057006836, 76.3477325439453],
            [109.867034912109, 78.9725646972656],
            [81.3997497558594, 87.8923950195312],
            [36.3198547363281, 91.026611328125],
            [-3.65234375, 85.1174774169922],
            [-55.5857543945312, 76.7474670410156],
            [-85.1920166015625, 75.1356811523438],
            [-107.681045532227, 76.2807006835938],
            [-110.718338012695, 74.1529693603516],
            [-111.309127807617, 52.8823699951172],
            [-99.6194152832031, 14.5199737548828],
            [-93.3800048828125, -17.5247955322266],
            [-105.373306274414, -75.4790496826172],
            [-103.789413452148, -80.1505737304688],
            [-70.1427917480469, -88.7652435302734]
        ];
        var inTangents = [
            [-2.224365234375, 0],
            [-10.5888824462891, 1.18009948730469],
            [-4.21623229980469, -0.59513854980469],
            [-0.2872314453125, -4.55430603027344],
            [-1.64030456542969, -11.9889678955078],
            [2.02626037597656, -0.04658508300781],
            [8.27334594726562, -1.84687805175781],
            [-0.30451965332031, -2.37367248535156],
            [-2.53048706054688, 0.41496276855469],
            [-4.73728942871094, 0.44309997558594],
            [-3.90800476074219, 0.09669494628906],
            [-0.13697814941406, -1.16648864746094],
            [-0.65519714355469, -5.63081359863281],
            [1.3958740234375, -0.11906433105469],
            [1.42387390136719, -0.2838134765625],
            [5.54763793945312, -0.78582763671875],
            [-0.33427429199219, -1.59321594238281],
            [-1.59323120117188, 0.10955810546875],
            [-6.52456665039062, 0.07780456542969],
            [-0.10722351074219, -3.15069580078125],
            [-0.68951416015625, -2.84197998046875],
            [0.80049133300781, -0.55136108398438],
            [3.45457458496094, -4.03692626953125],
            [-1.46257019042969, -1.29032897949219],
            [-1.77224731445312, 2.05194091796875],
            [-3.82321166992188, 2.75653076171875],
            [-1.2275390625, -1.25823974609375],
            [-2.03681945800781, -1.74565124511719],
            [1.13252258300781, -1.00782775878906],
            [2.09088134765625, -2.93865966796875],
            [-1.77079772949219, -1.3515625],
            [-1.41262817382812, 1.82441711425781],
            [-2.29718017578125, 2.28880310058594],
            [-1.30357360839844, -1.43376159667969],
            [-2.76441955566406, -3.79606628417969],
            [0.98257446289062, -1.28785705566406],
            [1.21209716796875, -1.95271301269531],
            [-1.26138305664062, -1.37957763671875],
            [-1.13456726074219, 1.55343627929688],
            [-0.981689453125, 1.55613708496094],
            [-1.01873779296875, -1.33198547363281],
            [-11.0283813476562, 0.08941650390625],
            [-8.0853271484375, -1.29800415039062],
            [-6.02519226074219, -3.88130187988281],
            [-0.65882873535156, -7.55032348632812],
            [1.12841796875, -0.52101135253906],
            [9.775390625, -2.08670043945312],
            [15.1212158203125, 0.66557312011719],
            [13.1834716796875, 2.93569946289062],
            [17.4875335693359, 1.74110412597656],
            [9.87939453125, 0.10018920898438],
            [7.45780944824219, -1.0584716796875],
            [0.39620971679688, 1.8245849609375],
            [-0.89712524414062, 7.12522888183594],
            [-5.38334655761719, 12.3388214111328],
            [-0.07237243652344, 11.0943298339844],
            [7.384033203125, 18.6164398193359],
            [-2.80863952636719, 1.65252685546875],
            [-12.0031280517578, -0.19635009765625]
        ];
        var outTangents = [
            [10.7021942138672, 0.70347595214844],
            [4.17495727539062, -0.46528625488281],
            [4.42198181152344, 0.62417602539062],
            [0.76322937011719, 12.1017761230469],
            [0.29025268554688, 2.12152099609375],
            [-8.43339538574219, 0.19387817382812],
            [-1.89813232421875, 0.42373657226562],
            [0.24540710449219, 1.91297912597656],
            [4.68858337402344, -0.76885986328125],
            [3.90956115722656, -0.36566162109375],
            [1.24273681640625, -0.03074645996094],
            [0.66114807128906, 5.63011169433594],
            [0.15467834472656, 1.32936096191406],
            [-5.57205200195312, 0.47529602050781],
            [-1.44111633300781, 0.20413208007812],
            [-1.80357360839844, 0.35948181152344],
            [0.38385009765625, 1.82957458496094],
            [6.49659729003906, -0.44673156738281],
            [3.22514343261719, -0.0384521484375],
            [0.09617614746094, 2.82597351074219],
            [0.29362487792969, 1.21026611328125],
            [-4.39390563964844, 3.02645874023438],
            [-1.74305725097656, 2.03689575195312],
            [1.56375122070312, 1.37959289550781],
            [3.07220458984375, -3.55702209472656],
            [1.35762023925781, -0.97883605957031],
            [1.87136840820312, 1.91818237304688],
            [1.17146301269531, 1.00395202636719],
            [-2.71473693847656, 2.41574096679688],
            [-1.0975341796875, 1.54251098632812],
            [1.5303955078125, 1.16806030273438],
            [1.97061157226562, -2.54505920410156],
            [1.17074584960938, -1.16648864746094],
            [3.14907836914062, 3.46365356445312],
            [1.01138305664062, 1.38880920410156],
            [-1.39210510253906, 1.82464599609375],
            [-0.93161010742188, 1.50080871582031],
            [1.21400451660156, 1.3277587890625],
            [1.08389282226562, -1.48408508300781],
            [0.80679321289062, -1.27886962890625],
            [6.9393310546875, 9.07316589355469],
            [8.11904907226562, -0.06582641601562],
            [6.91777038574219, 1.11058044433594],
            [6.49931335449219, 4.18667602539062],
            [0.143310546875, 1.64244079589844],
            [-9.103759765625, 4.20329284667969],
            [-14.8861236572266, 3.17768859863281],
            [-13.5029449462891, -0.59434509277344],
            [-17.1444396972656, -3.81770324707031],
            [-9.85301208496094, -0.98098754882812],
            [-7.49765014648438, -0.07601928710938],
            [-1.80288696289062, 0.25587463378906],
            [-1.53399658203125, -7.06416320800781],
            [1.6949462890625, -13.4617767333984],
            [4.45439147949219, -10.2095794677734],
            [0.13168334960938, -20.1869812011719],
            [-1.17718505859375, -2.96791076660156],
            [10.3807525634766, -6.10774230957031],
            [2.22377014160156, 0.036376953125]
        ];
        createPathGrp(contents, 'Shoe', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-2.439, -8.6185]);
    };
    createShoe();
    createSole();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createHelmetIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Helmet', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createHelmetTop = function () {
        var vertices = [
            [93.7057037353516, 14.1942749023438],
            [37.8857574462891, -52.6957397460938],
            [-2.05424499511719, -56.0557250976562],
            [-72.3142547607422, -37.2957153320312],
            [-105.034286499023, 2.644287109375],
            [-111.984237670898, 56.644287109375],
            [-35.8542327880859, 56.644287109375],
            [-74.3742523193359, 7.16424560546875],
            [-59.8942718505859, 5.2642822265625],
            [-38.0742645263672, 33.5042724609375],
            [-34.9442596435547, 29.394287109375],
            [-34.5342864990234, 18.5042724609375],
            [-36.6442718505859, 2.2542724609375],
            [-23.2442474365234, 0.5142822265625],
            [-21.2842864990234, 15.604248046875],
            [-25.8442840576172, 35.374267578125],
            [-32.2242279052734, 41.2342529296875],
            [-19.6542816162109, 56.644287109375],
            [46.8557281494141, 56.644287109375],
            [51.3657379150391, 55.5842895507812],
            [111.995742797852, 36.3342895507812]
        ];
        var inTangents = [
            [2.2900390625, 5.969970703125],
            [38.5, 18.77001953125],
            [17.8099975585938, -2.40997314453125],
            [30.3200073242188, -18.2900390625],
            [7.70001220703125, -23.0900268554688],
            [-0.27001953125, -23.5800170898438],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.5, 1.55999755859375],
            [0.58001708984375, 4.41998291015625],
            [0, 0],
            [0, 0],
            [0, 0],
            [4.0400390625, -5.46002197265625],
            [2.88995361328125, -2.13995361328125],
            [0, 0],
            [0, 0],
            [-1.5899658203125, 0.16998291015625],
            [-0.02001953125, 8.16998291015625]
        ];
        var outTangents = [
            [-2.280029296875, -5.969970703125],
            [0, 0],
            [-17.7999877929688, 2.4000244140625],
            [0, 0],
            [-2.67999267578125, 8.03997802734375],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.59002685546875, -1.17999267578125],
            [0.8499755859375, -2.84002685546875],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.010009765625, 7.72003173828125],
            [-1.3599853515625, 1.77001953125],
            [0, 0],
            [0, 0],
            [1.4100341796875, -0.52001953125],
            [13.4700927734375, -1.45001220703125],
            [0.02001953125, -7.17999267578125]
        ];
        createPathGrp(contents, 'Helmet_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.0043, -48.5843]);
    };
    var createHelmetMiddle = function () {
        var vertices = [
            [105.168762207031, -39.0099792480469],
            [-21.6211547851562, -39.0099792480469],
            [-25.8411865234375, -29.7900085449219],
            [-32.2211303710938, -23.9300231933594],
            [-17.7711791992188, -6.22000122070312],
            [-16.43115234375, 3.92001342773438],
            [-62.2311401367188, 9.87997436523438],
            [-63.671142578125, -1.18002319335938],
            [-33.2211303710938, -5.13998413085938],
            [-59.5911865234375, -39.0099792480469],
            [-109.941162109375, -39.0099792480469],
            [-107.071166992188, 26.3899841308594],
            [-97.7811889648438, 39.0099792480469],
            [-2.0711669921875, 39.0099792480469],
            [7.578857421875, 30.3600158691406],
            [21.048828125, 13.9999694824219],
            [20.6888427734375, 39.0099792480469],
            [31.6588134765625, 39.0099792480469],
            [30.9088134765625, 7.49996948242188],
            [51.3688354492188, -9.57998657226562],
            [111.998840332031, -28.8299865722656]
        ];
        var inTangents = [
            [3.7000732421875, 3.4599609375],
            [0, 0],
            [2.05999755859375, -2.77996826171875],
            [2.88995361328125, -2.13995361328125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-6.55999755859375, -20.6599731445312],
            [-4.39996337890625, -3.90997314453125],
            [0, 0],
            [-1.93998718261719, 2],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-13.47998046875, 1.44000244140625],
            [-0.02001953125, 8.16998291015625]
        ];
        var outTangents = [
            [0, 0],
            [-0.760009765625, 3.3699951171875],
            [-1.3599853515625, 1.77001953125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-2.65997314453125, 19],
            [1.25, 3.95001220703125],
            [0, 0],
            [3.52003479003906, -3],
            [3.54998779296875, -3.6700439453125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [13.4700927734375, -1.45001220703125],
            [0.010009765625, -3.17999267578125]
        ];
        createPathGrp(contents, 'Helmet_Middle', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.0012, 16.58]);
    };
    var createHelmetBottom = function () {
        var vertices = [
            [89.9184722900391, -2.84226989746094],
            [90.6384429931641, 11.9577178955078],
            [71.1484527587891, 20.6177520751953],
            [45.1684722900391, -7.90226745605469],
            [44.5884552001953, -32.3522796630859],
            [34.1984405517578, -32.3522796630859],
            [33.8584747314453, -9.10227966308594],
            [5.46846008300781, -12.4722747802734],
            [20.8684844970703, -25.9422454833984],
            [26.3784942626953, -32.3522796630859],
            [-94.5115203857422, -32.3522796630859],
            [-93.7815399169922, -29.9122772216797],
            [-72.0115203857422, -10.0622406005859],
            [-47.4715423583984, -6.69224548339844],
            [37.2284698486328, 2.92774963378906],
            [66.0984649658203, 31.8077545166016],
            [94.2484283447266, 14.2977447509766]
        ];
        var inTangents = [
            [4.3299560546875, 5.4100341796875],
            [0.9700927734375, -1.38995361328125],
            [5.23004150390625, 1.07000732421875],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-3.6700439453125, 3.78997802734375],
            [-2.1500244140625, 2.6300048828125],
            [0, 0],
            [-0.260009765625, -0.79998779296875],
            [-8.45001220703125, -1.95001220703125],
            [-16.3599853515625, 0.47998046875],
            [0, 0],
            [-9.52001953125, -3.69000244140625],
            [-1.0799560546875, 6.5]
        ];
        var outTangents = [
            [3.6099853515625, 9.20001220703125],
            [-4.5098876953125, 6.489990234375],
            [-8.5, -1.75],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.26995849609375, -1.32000732421875],
            [0, 0],
            [0.22998046875, 0.82000732421875],
            [2.3800048828125, 7.5],
            [7.82000732421875, 1.79998779296875],
            [0, 0],
            [0, 0],
            [9.1400146484375, 3.52996826171875],
            [0.77001953125, -4.60003662109375]
        ];
        createPathGrp(contents, 'Helmet_Bottom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-13.2885, 72.8823]);
    };
    createHelmetBottom();
    createHelmetMiddle();
    createHelmetTop();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createIconFromId = function (id, circleColor, iconColor, hasCircle, scale) {
    app.beginUndoGroup("Caspion: Create Icon - ".concat(id));
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    switch (id) {
        case 'Boom':
            createExplosionIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Tunnel':
            createTunnelIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Terror Tunnel':
            createTerrorTunnelIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Target':
            createTargetIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Sniper Target':
            createSniperTargetIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'House Bombing':
            createHouseBombingIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Fire':
            createFireIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Money':
            createMoneyIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Earth':
            createEarthIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Kaboom':
            createKaboomIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Medal':
            createMedalIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Salute With M16':
            createSaluteWithM16Icon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Holding M16':
            createHoldingM16Icon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Shooting M16':
            createShootingM16Icon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Rocket':
            createRocketIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Rocket Launcher':
            createRocketLauncherIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Mask':
            createMaskIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Shoe':
            createShoeIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Helmet':
            createHelmetIcon(circleColor, iconColor, hasCircle, scale);
            break;
    }
    app.endUndoGroup();
};
var getColorsFromMitug = function (mitug) {
    if (mitug === 'Gaza') {
        return { bg: [255, 255, 255], pri: [22, 39, 92] };
    }
    else if (mitug === 'Lebanon') {
        return { bg: [1, 25, 1], pri: [255, 255, 255] };
    }
    else if (mitug === 'Pakmaz') {
        return { bg: [255, 255, 255], pri: [53, 33, 28] };
    }
};
var createLocationBG = function (id, size, mitug) {
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = "".concat(id, "_BG");
    var contents = layer.property('ADBE Root Vectors Group');
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = "".concat(id, "_BG");
    var recGrp = grp.property('ADBE Vectors Group');
    recGrp.addProperty('ADBE Vector Shape - Rect');
    var fillGrp = recGrp.addProperty('ADBE Vector Graphic - Fill');
    var fillProp = fillGrp.property('ADBE Vector Fill Color');
    fillProp.setValue(getColorsFromMitug(mitug).bg.map(function (c) { return c / 255; }));
    var roundProp = recGrp
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Roundness');
    roundProp.setValue(25.7054);
    var sizeProp = recGrp
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Size');
    sizeProp.setValue(size);
    return layer;
};
var createLocationText = function (lang, text, fontSize, tracking, leading, textPos, textAnchor, mitug) {
    var comp = app.project.activeItem;
    var textLayer = comp.layers.addText();
    var srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document');
    srcText.setValue(text);
    var textDoc = srcText.value;
    textDoc.font = getFontFromLanguage(lang);
    textDoc.fontSize = fontSize;
    textDoc.applyFill = true;
    textDoc.fillColor = getColorsFromMitug(mitug).pri.map(function (c) { return c / 255; });
    textDoc.applyStroke = false;
    textDoc.tracking = tracking;
    if (leading) {
        textDoc.leading = leading;
    }
    srcText.setValue(textDoc);
    var posProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    var anchorProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    posProp.setValue(textPos);
    anchorProp.setValue(textAnchor);
    return textLayer;
};
var createIconBase = function (name) {
    var comp = app.project.activeItem;
    var iconLayer = comp.layers.addShape();
    iconLayer.name = "".concat(name, "_Icon");
    return iconLayer;
};
var setLayerTransform = function (layer, pos, anchor, scale) {
    var posProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    posProp.setValue(pos);
    var anchorProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    anchorProp.setValue(anchor);
    var scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    scaleProp.setValue([scale, scale]);
    return layer;
};
var createLocationIconFromId = function (id, iconPos, iconAnchor, iconScale, mitug) {
    switch (id) {
        case 'Kindergarden':
            return createKindergardenIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Medical Clinic':
            return createMedicalIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Sports':
            return createSportsIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'University':
            return createUniversityIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Mosque':
            return createMosqueIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'U.N. Building':
            return createUNBuildingIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Diplomatic Building':
            return createDiplomaticBuildingIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Gas Station':
            return createGasStationIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Government Building':
            return createGovernmentBuildingIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Pumping Station':
            return createPumpingStationIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Police':
            return createPoliceIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Water Facility':
            return createWaterFacilityIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Residential Neighborhood':
            return createResidentialNeighborhoodIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Amusement Park':
            return createAmusementParkIcon(iconPos, iconAnchor, iconScale, id, mitug);
    }
};
var createLocation = function (argsArr, inputLang, mitug) {
    var _a = argsArr.find(function (args) { return args.lang === inputLang; }), bgSize = _a.bgSize, fontSize = _a.fontSize, lang = _a.lang, text = _a.text, textAnchor = _a.textAnchor, textPos = _a.textPos, tracking = _a.tracking, leading = _a.leading, iconAnchor = _a.iconAnchor, iconPos = _a.iconPos, iconScale = _a.iconScale, iconId = _a.iconId;
    var bgLayer = createLocationBG(iconId, bgSize, mitug);
    var iconLayer = createLocationIconFromId(iconId, iconPos, iconAnchor, iconScale, mitug);
    var textLayer = createLocationText(lang, text, fontSize, tracking, leading, textPos, textAnchor, mitug);
    iconLayer.parent = textLayer.parent = bgLayer;
    bgLayer.label =
        iconLayer.label =
            textLayer.label =
                parsePrefs().locsLabelRandom
                    ? Math.floor(Math.random() * 16) + 1
                    : parsePrefs().locsLabelIndex + 1;
    iconLayer.selected = textLayer.selected = false;
    bgLayer.selected = true;
};
var createKindergardenIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createHouseMiddleHide = function () {
        var vertices = [
            [0, 5.30056762695312],
            [0, 5.30056762695312],
            [-4.27423095703125, 1.02633666992188],
            [-4.27423095703125, -1.02633666992188],
            [0, -5.30056762695312],
            [0, -5.30056762695312],
            [4.27423095703125, -1.02633666992188],
            [4.27423095703125, 1.02633666992188]
        ];
        var inTangents = [
            [2.360595703125, 0],
            [0, 0],
            [0, 2.360595703125],
            [0, 0],
            [-2.360595703125, 0],
            [0, 0],
            [0, -2.360595703125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-2.360595703125, 0],
            [0, 0],
            [0, -2.360595703125],
            [0, 0],
            [2.360595703125, 0],
            [0, 0],
            [0, 2.360595703125]
        ];
        createPathGrp(contents, 'House_Middle_Hide', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [76.8601, -5.7216]);
    };
    var createLadderL = function () {
        var vertices = [
            [-0.56208801269531, 13.8012847900391],
            [0.56208801269531, 13.8012847900391],
            [0.56208801269531, -13.8012847900391],
            [-0.56208801269531, -13.8012847900391]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_L', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [57.6522, 11.2183]);
    };
    var createLadderR = function () {
        var vertices = [
            [-0.56208801269531, 13.8012847900391],
            [0.56208801269531, 13.8012847900391],
            [0.56208801269531, -13.8012847900391],
            [-0.56208801269531, -13.8012847900391]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_R', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [62.2776, 11.2183]);
    };
    var createLadder06 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_06', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 0.3872]);
    };
    var createLadder05 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_05', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 4.9116]);
    };
    var createLadder04 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 9.4359]);
    };
    var createLadder03 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 13.9603]);
    };
    var createLadder02 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 18.4846]);
    };
    var createLadder01 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 23.009]);
    };
    var createSlide = function () {
        var vertices = [
            [9.17953491210938, 8.79170227050781],
            [-1.21762084960938, -1.0423583984375],
            [-11.4797973632812, -13.2806091308594],
            [-11.5624084472656, -13.2882843017578],
            [-11.5624084472656, -8.4593505859375],
            [-5.71575927734375, 0.44515991210938],
            [9.17953491210938, 13.2882843017578],
            [11.5624084472656, 11.0399932861328]
        ];
        var inTangents = [
            [1.31709289550781, 0],
            [2.26652526855469, 6.09716796875],
            [6.39698791503906, 1.84429931640625],
            [0.02792358398438, 0.00700378417969],
            [0, 0],
            [-1.45497131347656, -3.91241455078125],
            [-10.1202392578125, 0],
            [0, 1.24160766601562]
        ];
        var outTangents = [
            [-6.41560363769531, 0],
            [-1.81275939941406, -4.87202453613281],
            [-0.02792358398438, -0.00796508789062],
            [0, 0],
            [3.10542297363281, 1.55914306640625],
            [2.12690734863281, 5.72172546386719],
            [1.31709289550781, 0],
            [0, -1.24160766601562]
        ];
        createPathGrp(contents, 'Slide', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [102.5002, 11.7313]);
    };
    var createHouseTop = function () {
        var vertices = [
            [-0.16940307617188, -6.54544067382812],
            [-21.2740783691406, 5.97430419921875],
            [-21.1046600341797, 6.59190368652344],
            [21.1046600341797, 6.59190368652344],
            [21.2740783691406, 5.97430419921875],
            [0.16940307617188, -6.54544067382812]
        ];
        var inTangents = [
            [0.10444641113281, -0.06195068359375],
            [0, 0],
            [-0.33763122558594, 0],
            [0, 0],
            [0, 0],
            [0.29039001464844, 0.17225646972656]
        ];
        var outTangents = [
            [0, 0],
            [-0.29039001464844, 0.17225646972656],
            [0, 0],
            [0.33763122558594, 0],
            [0, 0],
            [-0.10444641113281, -0.06195068359375]
        ];
        createPathGrp(contents, 'House_Top', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [77.4369, -25.2672]);
    };
    var createHouseMiddle = function () {
        var vertices = [
            [12.7078552246094, 10.8105163574219],
            [-12.7078552246094, 10.8105163574219],
            [-12.7078552246094, -10.8105163574219],
            [12.7078552246094, -10.8105163574219]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'House_Middle', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [76.8601, -6.6124]);
    };
    var createHouseBottom = function () {
        var vertices = [
            [12.7078399658203, -9.78457641601562],
            [7.62483215332031, -9.78457641601562],
            [-7.62483215332031, -9.78457641601562],
            [-12.7078399658203, -9.78457641601562],
            [-12.7078399658203, -4.70140075683594],
            [-12.7078399658203, 9.78457641601562],
            [-7.62483215332031, 9.78457641601562],
            [-7.62483215332031, 2.92341613769531],
            [0, -4.70140075683594],
            [0, -4.70140075683594],
            [7.62483215332031, 2.92341613769531],
            [7.62483215332031, 9.78457641601562],
            [12.7078399658203, 9.78457641601562],
            [12.7078399658203, -9.78457641601562]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-4.21107482910156, 0],
            [0, 0],
            [0, -4.21107482910156],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -4.21107482910156],
            [0, 0],
            [4.21107482910156, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'House_Bottom', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [76.8601, 15.235]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [85.5764, -0.8716]);
    };
    createHouseMiddleHide();
    createLadderL();
    createLadderR();
    createLadder06();
    createLadder05();
    createLadder04();
    createLadder03();
    createLadder02();
    createLadder01();
    createSlide();
    createHouseTop();
    createHouseMiddle();
    createHouseBottom();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createKindergardenLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'גן ילדים',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [getOS() === 'Win' ? 75.0863 : -75.0863, -19.0808],
            bgSize: [296, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Kindergarden'
        },
        {
            lang: 'English',
            text: 'Kindergarden',
            fontSize: 77.3332,
            tracking: -26,
            textPos: [1019.7664, 549.906],
            textAnchor: [getOS() === 'Win' ? 180.7664 : -180.7664, -21.344],
            bgSize: [495, 106],
            iconPos: [773.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Kindergarden'
        },
        {
            lang: 'Arabic',
            text: 'روضة أطفال',
            fontSize: 60,
            tracking: -23,
            textPos: [916.7816, 538.4697],
            textAnchor: [getOS() === 'Win' ? 171.7816 : -171.7816, -22.2803],
            bgSize: [466, 92],
            iconPos: [1141.2014, 539.5034],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'Kindergarden'
        }
    ];
    createLocation(args, lang, mitug);
};
var createMedicalIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createCross = function () {
        var vertices = [
            [23.6100158691406, -8.60000610351562],
            [23.6100158691406, 8.60000610351562],
            [8.58999633789062, 8.60000610351562],
            [8.58999633789062, 23.6399841308594],
            [-8.58999633789062, 23.6399841308594],
            [-8.58999633789062, 8.60000610351562],
            [-23.6100158691406, 8.60000610351562],
            [-23.6100158691406, -8.60000610351562],
            [-8.58999633789062, -8.60000610351562],
            [-8.58999633789062, -23.6399841308594],
            [8.58999633789062, -23.6399841308594],
            [8.58999633789062, -8.60000610351562]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Cross', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [86.0601, -1.0216]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [85.5764, -0.8716]);
    };
    createCross();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createMedicalLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מרפאה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [getOS() === 'Win' ? 75.0863 : -75.0863, -19.0808],
            bgSize: [296, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Medical Clinic'
        },
        {
            lang: 'English',
            text: 'Medical Clinic',
            fontSize: 77.3332,
            tracking: -31,
            textPos: [1011.831, 537.0827],
            textAnchor: [getOS() === 'Win' ? 182.081 : -182.081, -27.9173],
            bgSize: [484, 106],
            iconPos: [779, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 97,
            iconId: 'Medical Clinic'
        },
        {
            lang: 'Arabic',
            text: 'عيادة',
            fontSize: 64,
            tracking: -21,
            textPos: [919.4213, 540.4375],
            textAnchor: [getOS() === 'Win' ? 80.6712 : -80.6712, -16.3125],
            bgSize: [284, 91],
            iconPos: [1049.9514, 538.2534],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'Medical Clinic'
        }
    ];
    createLocation(args, lang, mitug);
};
var createSportsIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createBallBorder = function () {
        var vertices = [
            [26.9803924560547, 0],
            [0, 26.9803924560547],
            [-26.9803924560547, 0],
            [0, -26.9803924560547]
        ];
        var inTangents = [
            [0, -14.9008636474609],
            [14.9008636474609, 0],
            [0, 14.9008636474609],
            [-14.9008636474609, 0]
        ];
        var outTangents = [
            [0, 14.9008636474609],
            [-14.9008636474609, 0],
            [0, -14.9008636474609],
            [14.9008636474609, 0]
        ];
        createPathGrp(contents, 'Ball_Border', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 4, vertices, inTangents, outTangents, true, [177.6914, -0.8718]);
    };
    var createBallPattern01 = function () {
        var vertices = [
            [-2.0587158203125, -7.95933532714844],
            [-9.53825378417969, -3.40415954589844],
            [-5.0865478515625, 7.95933532714844],
            [9.53825378417969, 7.95933532714844],
            [8.969482421875, -2.07745361328125]
        ];
        var inTangents = [
            [7.33279418945312, 2.37643432617188],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [186.5702, -19.2442]);
    };
    var createBallPattern02 = function () {
        var vertices = [
            [-4.03433227539062, -7.84432983398438],
            [3.20297241210938, -8.99632263183594],
            [7.81706237792969, 2.06472778320312],
            [-1.34603881835938, 8.99632263183594],
            [-7.81706237792969, 4.27694702148438]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [158.4209, -6.8679]);
    };
    var createBallPattern03 = function () {
        var vertices = [
            [-10.4224853515625, -7.16879272460938],
            [4.99301147460938, -1.26144409179688],
            [10.4224853515625, 7.16879272460938],
            [-1.47776794433594, 2.66761779785156]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [164.2615, 19.1702]);
    };
    var createBallPattern04 = function () {
        var vertices = [
            [4.08897399902344, -9.21754455566406],
            [-8.051025390625, -5.53053283691406],
            [-8.051025390625, 5.67800903320312],
            [2.32806396484375, 9.21754455566406],
            [8.051025390625, 0.9586181640625]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [178.5192, 6.774]);
    };
    var createBallPattern05 = function () {
        var vertices = [
            [3.44915771484375, -10.29736328125],
            [-3.88815307617188, 3.47108459472656],
            [-1.09207153320312, 10.29736328125],
            [3.88815307617188, 1.25888061523438]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_05', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [200.8771, 4.5565]);
    };
    var createBallPattern06 = function () {
        var vertices = [
            [-9.75572204589844, 4.17427062988281],
            [-4.83880615234375, -0.86390686035156],
            [9.75572204589844, -4.17427062988281],
            [0.74287414550781, 2.04646301269531]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_06', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [187.4469, 22.1648]);
    };
    var createBallLine01 = function () {
        var vertices = [
            [0.380126953125, 9.05567932128906],
            [-1.5057373046875, 8.93757629394531],
            [-0.380126953125, -9.05567932128906],
            [1.5057373046875, -8.93757629394531]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [182.0461, -6.8678]);
    };
    var createBallLine02 = function () {
        var vertices = [
            [-4.1038818359375, -3.21076965332031],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.57388305664062, 0.58863830566406],
            [0, 0]
        ];
        var inTangents = [
            [0, 0],
            [0.49453735351562, 0.60525512695312],
            [0, 0],
            [0, 0],
            [0, 0],
            [-5.08003234863281, -3.9765625]
        ];
        var outTangents = [
            [-4.1038818359375, -3.21076965332031],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.57388305664062, 0.58863830566406],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [166.771, -2.0904]);
    };
    var createBallLine03 = function () {
        var vertices = [
            [-10.4728546142578, 5.2987060546875],
            [-11.1888122558594, 3.54937744140625],
            [10.4728546142578, -5.2987060546875],
            [11.1888122558594, -3.54937744140625]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [170.6526, -18.076]);
    };
    var createBallLine04 = function () {
        var vertices = [
            [8.58975219726562, 1.38580322265625],
            [-8.68569946289062, 0.50007629394531],
            [-8.58975219726562, -1.38580322265625],
            [8.68569946289062, -0.50007629394531]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [192.2395, 7.8806]);
    };
    var createBallLine05 = function () {
        var vertices = [
            [1.67181396484375, 6.34220886230469],
            [-3.41006469726562, -5.60409545898438],
            [-1.67181396484375, -6.34220886230469],
            [3.41006469726562, 5.60409545898438]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_05', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [181.0608, 17.3929]);
    };
    var createBallLine06 = function () {
        var vertices = [
            [-2.19033813476562, 6.61068725585938],
            [-3.88798522949219, 5.77662658691406],
            [2.19033813476562, -6.61068725585938],
            [3.88798522949219, -5.77662658691406]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_06', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [169.884, 14.0742]);
    };
    var createBallLine07 = function () {
        var vertices = [
            [4.63255310058594, 6.99728393554688],
            [-6.07925415039062, -5.7830810546875],
            [-4.63255310058594, -6.99728393554688],
            [6.07925415039062, 5.7830810546875]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_07', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [199.4093, -7.2617]);
    };
    var createBallLine08 = function () {
        var vertices = [
            [-0.67536926269531, 9.75965881347656],
            [-1.21418762207031, -9.70799255371094],
            [0.67536926269531, -9.75965881347656],
            [1.21418762207031, 9.70799255371094]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_08', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [157.1978, 6.2585]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [177.6913, -0.8716]);
    };
    createBallLine08();
    createBallLine07();
    createBallLine06();
    createBallLine05();
    createBallLine04();
    createBallLine03();
    createBallLine02();
    createBallLine01();
    createBallPattern06();
    createBallPattern05();
    createBallPattern04();
    createBallPattern03();
    createBallPattern02();
    createBallPattern01();
    createBallBorder();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createSportsLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מתחם ספורט ופנאי',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [812.8363, 540.1692],
            textAnchor: [getOS() === 'Win' ? 75.0863 : -75.0863, -19.0808],
            bgSize: [480, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Sports'
        },
        {
            lang: 'English',
            text: 'Sports and\nRecreation Complex',
            fontSize: 59,
            tracking: -31,
            leading: 53,
            textPos: [1001.1015, 542.921],
            textAnchor: [getOS() === 'Win' ? 201.1015 : -201.1015, 9.921],
            bgSize: [555, 134],
            iconPos: [743.8515, 536.0034],
            iconAnchor: [177.6913, -0.8716],
            iconScale: 100,
            iconId: 'Sports'
        },
        {
            lang: 'Arabic',
            text: 'ملعب رياضة',
            fontSize: 64,
            tracking: -19,
            textPos: [918.5146, 540.4375],
            textAnchor: [getOS() === 'Win' ? 173.2645 : -173.2645, -16.3125],
            bgSize: [466, 92],
            iconPos: [1141.5318, 540.1284],
            iconAnchor: [177.6913, -0.8716],
            iconScale: 83,
            iconId: 'Sports'
        }
    ];
    createLocation(args, lang, mitug);
};
var createUniversityIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createCoverL = function () {
        var vertices = [
            [14.0190734863281, 19.1502380371094],
            [-14.0190734863281, 17.6841888427734],
            [-9.80418395996094, -17.8674468994141],
            [-5.03953552246094, -19.1502380371094],
            [-10.9037170410156, 11.0869750976562]
        ];
        var inTangents = [
            [-2.19906616210938, -2.93209838867188],
            [5.31442260742188, -1.83256530761719],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Cover_L', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [91.8363, -1.761]);
    };
    var createPaperL = function () {
        var vertices = [
            [12.3697662353516, -10.0790710449219],
            [-5.58930969238281, -20.3414001464844],
            [-12.3697662353516, 10.4455871582031],
            [12.3697662353516, 20.3414001464844]
        ];
        var inTangents = [
            [0, 0],
            [10.4065246582031, 2.35177612304688],
            [0, 0],
            [-6.04743957519531, -5.13116455078125]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Paper_L', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [95.5015, -2.9521]);
    };
    var createCoverR = function () {
        var vertices = [
            [-14.0190734863281, 19.1502380371094],
            [14.0190734863281, 17.6841888427734],
            [9.80418395996094, -17.8674468994141],
            [5.03953552246094, -19.1502380371094],
            [10.9037170410156, 11.0869750976562]
        ];
        var inTangents = [
            [2.19906616210938, -2.93209838867188],
            [-5.31442260742188, -1.83256530761719],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Cover_R', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [126.4342, -1.761]);
    };
    var createPaperR = function () {
        var vertices = [
            [-12.3697662353516, -10.0790710449219],
            [5.58930969238281, -20.3414001464844],
            [12.3697662353516, 10.4455871582031],
            [-12.3697662353516, 20.3414001464844]
        ];
        var inTangents = [
            [0, 0],
            [-10.4065246582031, 2.35177612304688],
            [0, 0],
            [6.04743957519531, -5.13116455078125]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Paper_R', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [122.769, -2.9521]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [110.002, -0.8716]);
    };
    createCoverL();
    createPaperL();
    createCoverR();
    createPaperR();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createUniversityLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'אוניברסיטה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [907.7467, 539.0399],
            textAnchor: [getOS() === 'Win' ? 102.9967 : -102.9967, -20.21],
            bgSize: [344, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'University'
        },
        {
            lang: 'English',
            text: 'University',
            fontSize: 77,
            tracking: -29,
            textPos: [1006.8615, 543.4595],
            textAnchor: [getOS() === 'Win' ? 130.8615 : -130.8615, -21.2905],
            bgSize: [388, 106],
            iconPos: [826.9122, 539.0034],
            iconAnchor: [110.002, -0.8716],
            iconScale: 97,
            iconId: 'University'
        },
        {
            lang: 'Arabic',
            text: 'جامعة',
            fontSize: 64,
            tracking: -19,
            textPos: [920.9957, 540.4375],
            textAnchor: [getOS() === 'Win' ? 90.2456 : -90.2456, -16.3125],
            bgSize: [302, 92],
            iconPos: [1058.9747, 540.1284],
            iconAnchor: [110.002, -0.8716],
            iconScale: 83,
            iconId: 'University'
        }
    ];
    createLocation(args, lang, mitug);
};
var createMosqueIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createMosqueB = function () {
        var vertices = [
            [60.780029296875, 19.469970703125],
            [60.780029296875, 22.0799560546875],
            [52.6599731445312, 22.0799560546875],
            [52.6599731445312, 19.469970703125],
            [47.3099975585938, 19.469970703125],
            [47.3099975585938, 22.0799560546875],
            [39.219970703125, 22.0799560546875],
            [39.1900024414062, 21.5199584960938],
            [39.1900024414062, 19.469970703125],
            [33.8400268554688, 19.469970703125],
            [33.8400268554688, 22.0700073242188],
            [25.719970703125, 22.0700073242188],
            [25.719970703125, 19.469970703125],
            [21.719970703125, 19.469970703125],
            [21.719970703125, 24.1499633789062],
            [21.75, 24.7000122070312],
            [64.739990234375, 24.7000122070312],
            [64.780029296875, 24.489990234375],
            [64.7900390625, 19.469970703125]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0.1700439453125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.010009765625, -0.20001220703125],
            [0, 0],
            [0, 0.04998779296875],
            [0, 1.6700439453125]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.00994873046875, -0.2099609375],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0.17999267578125],
            [0, 0],
            [0.02001953125, -0.10003662109375],
            [0, -1.67999267578125],
            [0, 0]
        ];
        createPathGrp(contents, 'Mosque_Bottom', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createMosqueM = function () {
        var vertices = [
            [64.7900390625, 19.469970703125],
            [64.760009765625, 10.8900146484375],
            [64.280029296875, 9.8499755859375],
            [62.0800170898438, 7.6400146484375],
            [59.0399780273438, 6.3599853515625],
            [58.6699829101562, 6.3299560546875],
            [58.6699829101562, 4.28997802734375],
            [55.5399780273438, 4.28997802734375],
            [55.530029296875, 6.239990234375],
            [53.5499877929688, 4.6400146484375],
            [53.5499877929688, 4.28997802734375],
            [50.52001953125, 4.28997802734375],
            [50.5, 6.27996826171875],
            [47.8599853515625, 6.27996826171875],
            [47.7899780273438, 5.8699951171875],
            [47.780029296875, 4.28997802734375],
            [45.1799926757812, 4.28997802734375],
            [45.1699829101562, 6.26995849609375],
            [41.8300170898438, 6.26995849609375],
            [41.8200073242188, 4.28997802734375],
            [39.1900024414062, 4.28997802734375],
            [39.1699829101562, 6.26995849609375],
            [36.4000244140625, 6.26995849609375],
            [36.4000244140625, 4.28997802734375],
            [33.27001953125, 4.28997802734375],
            [33.260009765625, 6.26995849609375],
            [30.97998046875, 6.26995849609375],
            [30.9600219726562, 4.28997802734375],
            [27.780029296875, 4.28997802734375],
            [27.780029296875, 6.3599853515625],
            [26.8900146484375, 6.3599853515625],
            [24.9199829101562, 7.15997314453125],
            [22.3499755859375, 9.69000244140625],
            [21.7100219726562, 11.219970703125],
            [21.719970703125, 19.469970703125],
            [25.719970703125, 19.469970703125],
            [25.719970703125, 13.6699829101562],
            [29.469970703125, 9.04998779296875],
            [30.4600219726562, 9.14996337890625],
            [33.8400268554688, 13.9400024414062],
            [33.8400268554688, 19.469970703125],
            [39.1900024414062, 19.469970703125],
            [39.1900024414062, 13.469970703125],
            [43.0800170898438, 9.010009765625],
            [43.8400268554688, 9.1099853515625],
            [47.3099975585938, 13.9099731445312],
            [47.3099975585938, 19.469970703125],
            [52.6599731445312, 19.469970703125],
            [52.6599731445312, 13.5899658203125],
            [56.489990234375, 9.02996826171875],
            [57.3599853515625, 9.1300048828125],
            [60.780029296875, 13.9599609375],
            [60.780029296875, 19.469970703125]
        ];
        var inTangents = [
            [0, 0],
            [0.030029296875, 2.8599853515625],
            [0.25, 0.280029296875],
            [0.67999267578125, 0.78997802734375],
            [1.2900390625, -0.21002197265625],
            [0.1400146484375, 0.010009765625],
            [0, 0],
            [0, 0],
            [0, -0.6500244140625],
            [-0.010009765625, 1.8699951171875],
            [0, 0],
            [0, 0],
            [0, -0.67999267578125],
            [0, 0],
            [0, 0.1300048828125],
            [0, 0.530029296875],
            [0, 0],
            [0, -0.65997314453125],
            [0, 0],
            [0, 0.6500244140625],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0.00994873046875, 0.6500244140625],
            [0, 0],
            [0, 0],
            [0.27996826171875, 0.030029296875],
            [0.55999755859375, -0.5899658203125],
            [0.8800048828125, -0.82000732421875],
            [0, -0.6300048828125],
            [0, -2.75],
            [0, 0],
            [-0.00994873046875, 1.94000244140625],
            [-2.0999755859375, 0.42999267578125],
            [-0.30999755859375, -0.1099853515625],
            [0, -2.260009765625],
            [0, 0],
            [0, 0],
            [-0.010009765625, 2],
            [-1.95001220703125, 0.25994873046875],
            [-0.24005126953125, -0.08001708984375],
            [0, -2.26995849609375],
            [0, -1.8599853515625],
            [0, 0],
            [-0.00994873046875, 1.96002197265625],
            [-2.05999755859375, 0.36004638671875],
            [-0.26995849609375, -0.09002685546875],
            [0.00994873046875, -2.28997802734375],
            [0, -1.8399658203125]
        ];
        var outTangents = [
            [0, -2.8599853515625],
            [0, -0.35003662109375],
            [-0.70001220703125, -0.760009765625],
            [-0.82000732421875, -0.95001220703125],
            [-0.1099853515625, 0.010009765625],
            [0, 0],
            [0, 0],
            [0, 0.6400146484375],
            [-1.99005126953125, 0.27001953125],
            [0, 0],
            [0, 0],
            [-0.010009765625, 0.6500244140625],
            [0, 0],
            [-0.02996826171875, -0.14996337890625],
            [-0.00994873046875, -0.530029296875],
            [0, 0],
            [0, 0.6600341796875],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0, 0.6500244140625],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0.6500244140625],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0, 0],
            [-0.33001708984375, 0],
            [-0.79998779296875, -0.09002685546875],
            [-0.82000732421875, 0.8699951171875],
            [-0.4599609375, 0.41998291015625],
            [0.00994873046875, 2.75],
            [0, 0],
            [0, -1.92999267578125],
            [0, -2.1300048828125],
            [0.31005859375, -0.05999755859375],
            [2.13995361328125, 0.75],
            [0, 0],
            [0, 0],
            [0, -2],
            [0, -1.97998046875],
            [0.25, -0.0400390625],
            [2.15997314453125, 0.71002197265625],
            [0.010009765625, 1.85003662109375],
            [0, 0],
            [0, -1.9599609375],
            [0, -2.0799560546875],
            [0.280029296875, -0.04998779296875],
            [2.1600341796875, 0.739990234375],
            [-0.010009765625, 1.83001708984375],
            [0, 0]
        ];
        createPathGrp(contents, 'Mosque_Middle', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createMosqueT = function () {
        var vertices = [
            [58.75, -1.8900146484375],
            [58.3400268554688, -2.4100341796875],
            [57.6699829101562, -5.510009765625],
            [46.780029296875, -16.5800170898438],
            [44.6300048828125, -18.2000122070312],
            [44.5800170898438, -18.3699951171875],
            [44.3900146484375, -19.6799926757812],
            [48.6900024414062, -23.3699951171875],
            [43.75, -22.7100219726562],
            [41.8499755859375, -27.02001953125],
            [45.469970703125, -30.1900024414062],
            [38.5800170898438, -27.5400390625],
            [38.3400268554688, -23.280029296875],
            [42.5999755859375, -19.6799926757812],
            [42.4099731445312, -18.4000244140625],
            [42.239990234375, -18.1000366210938],
            [38.989990234375, -16.3699951171875],
            [38.2000122070312, -16.1000366210938],
            [28.5900268554688, -4.67999267578125],
            [28.0499877929688, -1.94000244140625],
            [26.3200073242188, -0.29998779296875],
            [27.780029296875, 4.28997802734375],
            [27.780029296875, 1.54998779296875],
            [30.9600219726562, 4.28997802734375],
            [31.010009765625, 1.5999755859375],
            [31.6900024414062, 0.16998291015625],
            [32.5599975585938, 0.19000244140625],
            [33.22998046875, 1.6300048828125],
            [33.27001953125, 4.28997802734375],
            [36.4000244140625, 4.28997802734375],
            [36.4099731445312, 2.1400146484375],
            [37.27001953125, 0.16998291015625],
            [38.2999877929688, 0.16998291015625],
            [39.1300048828125, 1.8299560546875],
            [39.1900024414062, 4.28997802734375],
            [41.8200073242188, 4.28997802734375],
            [41.8599853515625, 1.6400146484375],
            [43.0900268554688, 0.02996826171875],
            [43.9099731445312, 0.05999755859375],
            [45.1500244140625, 1.79998779296875],
            [45.1799926757812, 4.28997802734375],
            [47.780029296875, 4.28997802734375],
            [47.780029296875, 2.1400146484375],
            [48.6900024414062, 0.1300048828125],
            [49.6300048828125, 0.1300048828125],
            [50.4600219726562, 1.6099853515625],
            [50.52001953125, 4.28997802734375],
            [53.5499877929688, 4.28997802734375],
            [53.5700073242188, 2.1199951171875],
            [54.0599975585938, 0.3599853515625],
            [55.0800170898438, 0.3800048828125],
            [55.510009765625, 1.489990234375],
            [55.5399780273438, 4.28997802734375],
            [58.6699829101562, 4.28997802734375],
            [58.6699829101562, 1.52996826171875],
            [58.8699951171875, 1.45001220703125],
            [60.1699829101562, -0.25]
        ];
        var inTangents = [
            [0.8699951171875, 0.25],
            [0.04998779296875, 0.20001220703125],
            [0.32000732421875, 1],
            [5.67999267578125, 1.66998291015625],
            [0.8699951171875, 0.33001708984375],
            [0.010009765625, 0.05999755859375],
            [0.07000732421875, 0.449951171875],
            [-0.780029296875, 2.04998779296875],
            [1.57000732421875, 0.989990234375],
            [-0.3199462890625, 1.6099853515625],
            [-2.1199951171875, 0.3499755859375],
            [1.25, -2.5899658203125],
            [-0.530029296875, -1.45001220703125],
            [-2.05999755859375, -0.47003173828125],
            [0.07000732421875, -0.40997314453125],
            [0.08001708984375, -0.05999755859375],
            [1.3599853515625, -0.08001708984375],
            [0.260009765625, -0.1099853515625],
            [1.42999267578125, -5.300048828125],
            [0.17999267578125, -0.9100341796875],
            [0.05999755859375, -0.87005615234375],
            [-1.10003662109375, -0.44000244140625],
            [0, 0],
            [0, 0],
            [-0.04998779296875, 0.8900146484375],
            [-0.28997802734375, 0.45001220703125],
            [-0.22998046875, -0.3900146484375],
            [-0.02996826171875, -0.5],
            [0.010009765625, -0.8900146484375],
            [0, 0],
            [-0.00994873046875, 0.719970703125],
            [-0.55999755859375, 0.53997802734375],
            [-0.27996826171875, -0.4000244140625],
            [-0.03997802734375, -0.5799560546875],
            [0.010009765625, -0.83001708984375],
            [0, 0],
            [-0.04998779296875, 0.87994384765625],
            [-0.6600341796875, 0.33001708984375],
            [-0.219970703125, -0.1199951171875],
            [-0.0400390625, -0.77001953125],
            [0.010009765625, -0.8399658203125],
            [0, 0],
            [0.00994873046875, 0.719970703125],
            [-0.5999755859375, 0.53997802734375],
            [-0.260009765625, -0.34002685546875],
            [-0.0400390625, -0.510009765625],
            [0.010009765625, -0.90997314453125],
            [0, 0],
            [-0.07000732421875, 0.719970703125],
            [-0.260009765625, 0.53997802734375],
            [-0.36004638671875, -0.6300048828125],
            [-0.02001953125, -0.3800048828125],
            [0, -0.94000244140625],
            [0, 0],
            [0, 0],
            [-0.05999755859375, 0.01995849609375],
            [0.0400390625, 0.8299560546875]
        ];
        var outTangents = [
            [-0.16998291015625, -0.04998779296875],
            [-0.24005126953125, -1.02996826171875],
            [-1.77996826171875, -5.5],
            [-0.9300537109375, -0.27996826171875],
            [-0.03997802734375, -0.010009765625],
            [-0.05999755859375, -0.42999267578125],
            [2.0799560546875, -0.48004150390625],
            [-1.96002197265625, 1.47998046875],
            [-1.42999267578125, -0.89996337890625],
            [0.36004638671875, -1.82000732421875],
            [-2.3499755859375, -1.19000244140625],
            [-0.6700439453125, 1.3800048828125],
            [0.719970703125, 1.98004150390625],
            [-0.0699462890625, 0.4599609375],
            [-0.01995849609375, 0.1099853515625],
            [-1.03997802734375, 0.6600341796875],
            [-0.260009765625, 0.010009765625],
            [-5.1400146484375, 2.1700439453125],
            [-0.24005126953125, 0.89996337890625],
            [-1.1199951171875, 0.239990234375],
            [-0.04998779296875, 0.87994384765625],
            [0, 0],
            [0, 0],
            [0, -0.90997314453125],
            [0.02996826171875, -0.489990234375],
            [0.25, -0.3900146484375],
            [0.280029296875, 0.45001220703125],
            [0.050048828125, 0.8800048828125],
            [0, 0],
            [0, -0.780029296875],
            [0, -0.719970703125],
            [0.3499755859375, -0.34002685546875],
            [0.35003662109375, 0.510009765625],
            [0.07000732421875, 0.81005859375],
            [0, 0],
            [-0.010009765625, -0.8900146484375],
            [0.0400390625, -0.72003173828125],
            [0.219970703125, -0.1099853515625],
            [0.70001220703125, 0.3599853515625],
            [0.03997802734375, 0.82000732421875],
            [0, 0],
            [0, -0.719970703125],
            [0, -0.81005859375],
            [0.32000732421875, -0.2900390625],
            [0.33001708984375, 0.4599609375],
            [0.05999755859375, 0.8800048828125],
            [0, 0],
            [-0.010009765625, -0.719970703125],
            [0.05999755859375, -0.60003662109375],
            [0.30999755859375, -0.6400146484375],
            [0.20001220703125, 0.3399658203125],
            [0.02001953125, 0.92999267578125],
            [0, 0],
            [0, 0],
            [0.09002685546875, -0.02996826171875],
            [0.8699951171875, -0.260009765625],
            [-0.02996826171875, -0.82000732421875]
        ];
        createPathGrp(contents, 'Mosque_Top', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [43.3989, 0]);
    };
    createMosqueT();
    createMosqueM();
    createMosqueB();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createMosqueLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מסגד',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [907.9708, 539.3514],
            textAnchor: [getOS() === 'Win' ? 45.7208 : -45.7208, -19.8985],
            bgSize: [238, 110],
            iconPos: [1016.1489, 539.5],
            iconAnchor: [43.3989, 0],
            iconScale: 100,
            iconId: 'Mosque'
        },
        {
            lang: 'English',
            text: 'Mosque',
            fontSize: 77,
            tracking: -29,
            textPos: [1007.486, 548.998],
            textAnchor: [getOS() === 'Win' ? 101.486 : -101.486, -21.252],
            bgSize: [325, 106],
            iconPos: [857.3072, 538.8489],
            iconAnchor: [43.3989, 0],
            iconScale: 97,
            iconId: 'Mosque'
        },
        {
            lang: 'Arabic',
            text: 'مسجد',
            fontSize: 64,
            tracking: -19,
            textPos: [920.9957, 540.4375],
            textAnchor: [getOS() === 'Win' ? 90.2456 : -90.2456, -16.3125],
            bgSize: [306, 92],
            iconPos: [1060.6942, 539.6018],
            iconAnchor: [43.3989, 0],
            iconScale: 83,
            iconId: 'Mosque'
        }
    ];
    createLocation(args, lang, mitug);
};
var createUNBuildingIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createGlobeRing01 = function () {
        var vertices = [
            [24.3528594970703, 0],
            [0, 24.3528594970703],
            [-24.3528594970703, 0],
            [0, -24.3528594970703]
        ];
        var inTangents = [
            [0, -13.4497222900391],
            [13.4497222900391, 0],
            [0, 13.4497222900391],
            [-13.4497222900391, 0]
        ];
        var outTangents = [
            [0, 13.4497222900391],
            [-13.4497222900391, 0],
            [0, -13.4497222900391],
            [13.4497222900391, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_01', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 1, vertices, inTangents, outTangents, true, [42.5417, -5.6811]);
    };
    var createGlobeRing02 = function () {
        var vertices = [
            [19.5955657958984, 0],
            [0, 19.5955657958984],
            [-19.5955657958984, 0],
            [0, -19.5955657958984]
        ];
        var inTangents = [
            [0, -10.8223266601562],
            [10.8223266601562, 0],
            [0, 10.8223266601562],
            [-10.8223266601562, 0]
        ];
        var outTangents = [
            [0, 10.8223266601562],
            [-10.8223266601562, 0],
            [0, -10.8223266601562],
            [10.8223266601562, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_02', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [42.5417, -5.6811]);
    };
    var createGlobeRing03 = function () {
        var vertices = [
            [14.9681243896484, 0],
            [0, 14.9681243896484],
            [-14.9681243896484, 0],
            [0, -14.9681243896484]
        ];
        var inTangents = [
            [0, -8.26666259765625],
            [8.26666259765625, 0],
            [0, 8.26666259765625],
            [-8.26666259765625, 0]
        ];
        var outTangents = [
            [0, 8.26666259765625],
            [-8.26666259765625, 0],
            [0, -8.26666259765625],
            [8.26666259765625, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_03', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [42.5417, -5.6811]);
    };
    var createGlobeRing04 = function () {
        var vertices = [
            [9.63478088378906, 0],
            [0, 9.63478088378906],
            [-9.63478088378906, 0],
            [0, -9.63478088378906]
        ];
        var inTangents = [
            [0, -5.32115173339844],
            [5.32115173339844, 0],
            [0, 5.32115173339844],
            [-5.32115173339844, 0]
        ];
        var outTangents = [
            [0, 5.32115173339844],
            [-5.32115173339844, 0],
            [0, -5.32115173339844],
            [5.32115173339844, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_04', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [42.5417, -5.6811]);
    };
    var createGlobeRing05 = function () {
        var vertices = [
            [-9.75123596191406, 0],
            [9.75123596191406, 0]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_05', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [57.3002, -5.6811]);
    };
    var createGlobeRing06 = function () {
        var vertices = [
            [-9.75123596191406, 0],
            [9.75123596191406, 0]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_06', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [27.7831, -5.6811]);
    };
    var createGlobeRing07 = function () {
        var vertices = [
            [0, -9.75123596191406],
            [0, 9.75123596191406]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_07', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [42.5417, 9.0775]);
    };
    var createGlobeRing08 = function () {
        var vertices = [
            [0, -9.75123596191406],
            [0, 9.75123596191406]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_08', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [42.5417, -20.4397]);
    };
    var createGlobeRing09 = function () {
        var vertices = [
            [-6.839599609375, -6.839599609375],
            [6.839599609375, 6.839599609375]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_09', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [53.0331, 4.8104]);
    };
    var createGlobeRing10 = function () {
        var vertices = [
            [-6.89515686035156, -6.89515686035156],
            [6.89515686035156, 6.89515686035156]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_10', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [32.1058, -16.117]);
    };
    var createGlobeRing11 = function () {
        var vertices = [
            [6.89517211914062, -6.89517211914062],
            [-6.89517211914062, 6.89517211914062]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_11', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [32.1058, 4.7548]);
    };
    var createGlobeRing12 = function () {
        var vertices = [
            [6.83961486816406, -6.83961486816406],
            [-6.83961486816406, 6.83961486816406]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Ring_12', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 0.75, vertices, inTangents, outTangents, true, [53.0331, -16.1725]);
    };
    var createCountries = function () {
        var vertices = [
            [-1.96661376953125, 3.48243713378906],
            [-1.59661865234375, 3.46241760253906],
            [0.943359375, 4.60243225097656],
            [1.27337646484375, 5.28242492675781],
            [1.3233642578125, 5.79243469238281],
            [1.3533935546875, 5.87245178222656],
            [1.39337158203125, 6.44245910644531],
            [1.0833740234375, 6.92243957519531],
            [0.80340576171875, 6.89247131347656],
            [0.443359375, 7.11244201660156],
            [0.37335205078125, 7.30244445800781],
            [1.03338623046875, 8.18244934082031],
            [1.17340087890625, 8.17243957519531],
            [1.42340087890625, 8.25245666503906],
            [1.203369140625, 8.57246398925781],
            [-0.62664794921875, 9.12245178222656],
            [-0.83660888671875, 9.49244689941406],
            [-1.1866455078125, 9.72242736816406],
            [-1.756591796875, 10.6524200439453],
            [-1.99664306640625, 10.9424591064453],
            [-2.0166015625, 11.3924713134766],
            [-1.35662841796875, 12.3724517822266],
            [0.01336669921875, 13.2624664306641],
            [1.3133544921875, 13.4924468994141],
            [2.3533935546875, 13.2624664306641],
            [3.473388671875, 13.5124664306641],
            [4.75335693359375, 14.7024688720703],
            [5.223388671875, 15.3324737548828],
            [5.18341064453125, 16.0724639892578],
            [5.8433837890625, 17.2824249267578],
            [5.973388671875, 17.3124542236328],
            [6.46337890625, 17.7924346923828],
            [6.8634033203125, 18.4124298095703],
            [7.8333740234375, 18.8024444580078],
            [8.1033935546875, 18.8824615478516],
            [10.3233642578125, 17.7224273681641],
            [13.9334106445312, 14.8824615478516],
            [15.2633666992188, 13.7524566650391],
            [15.8788604736328, 13.0981597900391],
            [15.8233642578125, 12.2924346923828],
            [15.5333862304688, 12.4924468994141],
            [15.453369140625, 12.1524200439453],
            [15.2833862304688, 11.0124664306641],
            [14.96337890625, 10.5324249267578],
            [14.3133544921875, 10.7424468994141],
            [14.1734008789062, 11.2424468994141],
            [12.8933715820312, 9.95246887207031],
            [12.2633666992188, 9.25245666503906],
            [12.1533813476562, 8.98243713378906],
            [11.8533935546875, 7.76246643066406],
            [11.5733642578125, 7.70246887207031],
            [11.2733764648438, 8.03242492675781],
            [11.1033935546875, 8.12245178222656],
            [11.0233764648438, 7.94245910644531],
            [11.0534057617188, 7.68244934082031],
            [11.473388671875, 5.68244934082031],
            [10.6834106445312, 5.23243713378906],
            [10.493408203125, 5.53242492675781],
            [10.1533813476562, 5.94245910644531],
            [9.66339111328125, 6.09242248535156],
            [9.39337158203125, 5.96241760253906],
            [9.5733642578125, 5.76246643066406],
            [10.223388671875, 5.26246643066406],
            [10.743408203125, 4.88246154785156],
            [11.1633911132812, 4.19245910644531],
            [12.0534057617188, 3.51246643066406],
            [12.5233764648438, 3.22242736816406],
            [12.8034057617188, 3.13246154785156],
            [13.5033569335938, 3.10243225097656],
            [14.6333618164062, 2.72242736816406],
            [14.8233642578125, 2.36244201660156],
            [13.9334106445312, 1.65242004394531],
            [13.5534057617188, 1.26246643066406],
            [12.8533935546875, -0.02757263183594],
            [12.7533569335938, -0.29753112792969],
            [13.0133666992188, -0.41752624511719],
            [16.0333862304688, -0.41752624511719],
            [16.96337890625, -1.36753845214844],
            [16.7833862304688, -3.04753112792969],
            [16.8233642578125, -4.50755310058594],
            [16.5333862304688, -4.89756774902344],
            [16.3233642578125, -5.09757995605469],
            [15.7733764648438, -6.85752868652344],
            [15.3533935546875, -7.59757995605469],
            [15.203369140625, -8.27757263183594],
            [14.973388671875, -8.82756042480469],
            [14.723388671875, -8.86753845214844],
            [14.5633544921875, -8.89756774902344],
            [14.1433715820312, -9.67753601074219],
            [13.6433715820312, -10.3375701904297],
            [13.193359375, -10.7575531005859],
            [13.1033935546875, -11.5775604248047],
            [13.2733764648438, -11.7475433349609],
            [14.0833740234375, -11.6475677490234],
            [14.6633911132812, -11.4975433349609],
            [14.9334106445312, -11.4675750732422],
            [15.0233764648438, -11.2875823974609],
            [15.9033813476562, -10.3775482177734],
            [16.2933959960938, -10.1175384521484],
            [16.7333984375, -9.90757751464844],
            [17.21337890625, -9.59757995605469],
            [18.2333984375, -8.38755798339844],
            [18.3833618164062, -8.25755310058594],
            [19.0233764648438, -8.15757751464844],
            [19.493408203125, -8.00755310058594],
            [20.473388671875, -4.92753601074219],
            [20.493408203125, -4.84757995605469],
            [20.8933715820312, -5.82756042480469],
            [19.9033813476562, -8.65757751464844],
            [20.0833740234375, -9.20756530761719],
            [20.1134033203125, -9.78758239746094],
            [18.6033935546875, -11.8875579833984],
            [17.96337890625, -12.4375457763672],
            [17.703369140625, -12.8675384521484],
            [17.1233520507812, -13.4775238037109],
            [16.5633544921875, -14.0575408935547],
            [16.443359375, -14.2575531005859],
            [16.4234008789062, -14.8975677490234],
            [17.0133666992188, -15.4875335693359],
            [16.5833740234375, -15.9575653076172],
            [16.193359375, -15.5675506591797],
            [15.8634033203125, -15.4375457763672],
            [15.8634033203125, -15.7175750732422],
            [15.5333862304688, -16.0175628662109],
            [15.223388671875, -16.3175506591797],
            [14.5433959960938, -17.4175262451172],
            [13.8133544921875, -17.8675384521484],
            [13.7833862304688, -17.8875579833984],
            [12.5933837890625, -18.5775604248047],
            [11.6033935546875, -18.4975433349609],
            [10.493408203125, -18.4875335693359],
            [9.6033935546875, -18.8975677490234],
            [8.67340087890625, -18.5875701904297],
            [9.87335205078125, -18.0675506591797],
            [10.0433959960938, -17.7175750732422],
            [10.1233520507812, -17.4975433349609],
            [10.7833862304688, -17.0475311279297],
            [11.1533813476562, -16.0975799560547],
            [11.3433837890625, -15.7075653076172],
            [11.5433959960938, -15.1275482177734],
            [11.6033935546875, -14.6475677490234],
            [11.7633666992188, -14.0675506591797],
            [12.2333984375, -13.8775482177734],
            [13.0333862304688, -14.0075531005859],
            [13.6433715820312, -13.2275238037109],
            [13.6033935546875, -13.0375823974609],
            [12.6734008789062, -12.0675506591797],
            [12.3433837890625, -12.0475311279297],
            [12.3634033203125, -12.4875335693359],
            [12.3733520507812, -12.9175262451172],
            [11.8933715820312, -13.4975433349609],
            [11.443359375, -13.7075653076172],
            [10.8933715820312, -14.0975799560547],
            [9.93341064453125, -15.0975799560547],
            [9.5933837890625, -15.0275726318359],
            [9.78338623046875, -14.7575531005859],
            [10.1533813476562, -14.0375823974609],
            [10.193359375, -13.8075408935547],
            [10.9133911132812, -12.9875335693359],
            [10.8333740234375, -12.9175262451172],
            [9.3333740234375, -13.8675384521484],
            [9.2333984375, -14.0675506591797],
            [9.40338134765625, -14.1375579833984],
            [9.77337646484375, -14.1775360107422],
            [9.743408203125, -14.3975677490234],
            [9.3133544921875, -14.6075286865234],
            [8.6033935546875, -14.3475799560547],
            [8.3333740234375, -14.3975677490234],
            [6.243408203125, -15.2175750732422],
            [6.02337646484375, -14.6275482177734],
            [8.5933837890625, -13.5475311279297],
            [10.3333740234375, -12.4575653076172],
            [11.3133544921875, -11.5075531005859],
            [11.3634033203125, -11.4675750732422],
            [11.3933715820312, -10.7675628662109],
            [8.92340087890625, -8.28758239746094],
            [8.1033935546875, -7.56755065917969],
            [7.92340087890625, -7.56755065917969],
            [7.25335693359375, -7.54753112792969],
            [7.0933837890625, -7.30754089355469],
            [7.3333740234375, -7.17753601074219],
            [7.5733642578125, -7.10752868652344],
            [7.46337890625, -6.83757019042969],
            [6.76336669921875, -6.13755798339844],
            [6.21337890625, -5.97752380371094],
            [6.02337646484375, -6.43754577636719],
            [5.53338623046875, -6.09757995605469],
            [5.55340576171875, -5.25755310058594],
            [5.473388671875, -4.97752380371094],
            [4.89337158203125, -5.08757019042969],
            [4.12335205078125, -5.53758239746094],
            [4.04339599609375, -5.82756042480469],
            [4.203369140625, -6.34757995605469],
            [4.14337158203125, -6.58757019042969],
            [3.87335205078125, -6.56755065917969],
            [3.40338134765625, -6.13755798339844],
            [3.01336669921875, -5.95756530761719],
            [2.53338623046875, -6.03758239746094],
            [1.0833740234375, -6.04753112792969],
            [0.28338623046875, -5.87754821777344],
            [-0.026611328125, -6.06755065917969],
            [-0.07659912109375, -6.17753601074219],
            [-0.24664306640625, -6.09757995605469],
            [-1.546630859375, -4.92753601074219],
            [-2.03662109375, -4.95756530761719],
            [-2.86663818359375, -4.77757263183594],
            [-3.11663818359375, -4.73753356933594],
            [-3.69659423828125, -4.75755310058594],
            [-4.06658935546875, -4.86753845214844],
            [-4.86663818359375, -5.45756530761719],
            [-6.32659912109375, -5.25755310058594],
            [-6.49664306640625, -5.15757751464844],
            [-7.07659912109375, -5.50755310058594],
            [-7.71661376953125, -5.02757263183594],
            [-8.19659423828125, -4.75755310058594],
            [-7.7666015625, -4.53758239746094],
            [-8.19659423828125, -4.26756286621094],
            [-9.35662841796875, -3.93754577636719],
            [-9.556640625, -3.76756286621094],
            [-10.3366088867188, -1.86753845214844],
            [-11.0866088867188, -0.33757019042969],
            [-11.1666259765625, -0.16752624511719],
            [-11.6566162109375, 1.00245666503906],
            [-11.5166015625, 1.32246398925781],
            [-11.4465942382812, 1.63246154785156],
            [-12.1566162109375, 1.76246643066406],
            [-13.306640625, 1.08247375488281],
            [-13.3865966796875, 1.29243469238281],
            [-14.1766357421875, 2.04243469238281],
            [-14.9266357421875, 3.73243713378906],
            [-14.9066162109375, 4.17243957519531],
            [-15.3366088867188, 5.02247619628906],
            [-16.1866455078125, 5.22242736816406],
            [-16.5166015625, 4.98243713378906],
            [-17.2066040039062, 4.91242980957031],
            [-17.4266357421875, 5.20246887207031],
            [-18.1766357421875, 4.86244201660156],
            [-18.4366455078125, 4.75245666503906],
            [-19.1866455078125, 5.22242736816406],
            [-19.306640625, 5.35243225097656],
            [-19.53662109375, 5.41242980957031],
            [-19.6866455078125, 5.19245910644531],
            [-19.5166015625, 5.02247619628906],
            [-19.306640625, 4.84242248535156],
            [-19.5665893554688, 4.73243713378906],
            [-20.53662109375, 4.89247131347656],
            [-20.8666381835938, 5.54243469238281],
            [-20.8766479492188, 6.33247375488281],
            [-20.6766357421875, 7.40242004394531],
            [-20.3566284179688, 8.32246398925781],
            [-20.03662109375, 8.56245422363281],
            [-19.8265991210938, 8.23243713378906],
            [-19.9066162109375, 7.83247375488281],
            [-19.8366088867188, 7.55244445800781],
            [-19.526611328125, 7.60243225097656],
            [-19.1766357421875, 7.97242736816406],
            [-18.6365966796875, 8.00245666503906],
            [-18.3466186523438, 8.02247619628906],
            [-17.5765991210938, 8.70246887207031],
            [-16.6066284179688, 9.65242004394531],
            [-15.5966186523438, 10.2924346923828],
            [-15.306640625, 10.4924468994141],
            [-14.0966186523438, 11.4024200439453],
            [-13.7266235351562, 11.6224517822266],
            [-12.5765991210938, 12.9024200439453],
            [-12.6066284179688, 13.2224273681641],
            [-12.1666259765625, 13.6824493408203],
            [-11.7666015625, 13.7124176025391],
            [-11.1866455078125, 13.3824615478516],
            [-11.1866455078125, 12.7024688720703],
            [-10.9465942382812, 12.7624664306641],
            [-10.53662109375, 12.9924468994141],
            [-9.74664306640625, 12.9924468994141],
            [-8.97662353515625, 12.7124176025391],
            [-8.37664794921875, 12.5124664306641],
            [-7.6466064453125, 12.5024566650391],
            [-7.22662353515625, 11.7724761962891],
            [-7.4166259765625, 11.4624176025391],
            [-7.94659423828125, 10.0424346923828],
            [-8.99664306640625, 9.06245422363281],
            [-9.056640625, 8.09242248535156],
            [-9.10662841796875, 8.28242492675781],
            [-9.48663330078125, 7.09242248535156],
            [-9.776611328125, 6.24244689941406],
            [-9.82659912109375, 5.73243713378906],
            [-9.74664306640625, 5.47242736816406],
            [-9.9266357421875, 4.54243469238281],
            [-10.1766357421875, 4.24244689941406],
            [-11.026611328125, 2.16242980957031],
            [-11.1266479492188, 1.64247131347656],
            [-11.1866455078125, 1.21241760253906],
            [-10.8766479492188, 0.66242980957031],
            [-10.3366088867188, -0.01756286621094],
            [-9.8865966796875, -0.34757995605469],
            [-8.78662109375, -0.40757751464844],
            [-8.3865966796875, -0.22752380371094],
            [-8.45660400390625, 0.34242248535156],
            [-8.6566162109375, 0.53242492675781],
            [-8.6766357421875, 1.06245422363281],
            [-8.546630859375, 1.27247619628906],
            [-8.756591796875, 1.31245422363281],
            [-8.83660888671875, 1.47242736816406],
            [-8.33660888671875, 1.46241760253906],
            [-8.1566162109375, 1.29243469238281],
            [-7.46661376953125, 1.06245422363281],
            [-7.3966064453125, 1.00245666503906],
            [-6.3966064453125, 1.43244934082031],
            [-5.8865966796875, 1.74244689941406],
            [-5.53662109375, 1.91242980957031],
            [-5.256591796875, 2.13246154785156],
            [-4.62664794921875, 2.76246643066406],
            [-4.506591796875, 2.53242492675781],
            [-4.37664794921875, 2.35243225097656],
            [-4.24664306640625, 2.58247375488281],
            [-4.09661865234375, 3.51246643066406],
            [-3.78662109375, 3.48243713378906],
            [-3.22662353515625, 2.25245666503906],
            [-3.026611328125, 1.91242980957031],
            [-2.7666015625, 2.13246154785156],
            [-2.49664306640625, 2.52247619628906],
            [-2.556640625, 3.18244934082031]
        ];
        var inTangents = [
            [-0.82000732421875, 0.83001708984375],
            [-0.1500244140625, -0.1199951171875],
            [-0.94000244140625, -0.15997314453125],
            [0.19000244140625, -0.3399658203125],
            [-0.3699951171875, -0.1400146484375],
            [0.010009765625, -0.010009765625],
            [-0.19000244140625, -0.21002197265625],
            [0.22003173828125, -0.010009765625],
            [0.0899658203125, 0.02996826171875],
            [0, -0.27996826171875],
            [0.010009765625, -0.05999755859375],
            [-0.739990234375, 0.010009765625],
            [-0.07000732421875, 0],
            [-0.02001953125, -0.22003173828125],
            [0.19000244140625, -0.0400390625],
            [0, 0],
            [0.1199951171875, -0.09002685546875],
            [0.1300048828125, -0.05999755859375],
            [0.17999267578125, -0.30999755859375],
            [0.1199951171875, -0.04998779296875],
            [-0.1500244140625, -0.09002685546875],
            [-0.16998291015625, -0.34002685546875],
            [-0.6400146484375, -0.02001953125],
            [-0.4599609375, 0.07000732421875],
            [0, 0],
            [-0.4000244140625, 0.01995849609375],
            [0, 0],
            [-0.1500244140625, -0.21002197265625],
            [0.0899658203125, -0.25],
            [-0.46002197265625, -0.13995361328125],
            [-0.03997802734375, -0.010009765625],
            [-0.02996826171875, -0.2099609375],
            [0, 0],
            [-0.260009765625, -0.4000244140625],
            [-0.1099853515625, 0.01995849609375],
            [-0.63995361328125, 0.60003662109375],
            [-1.24005126953125, 0.90997314453125],
            [-0.42999267578125, 0.3900146484375],
            [0, 0],
            [0, 0],
            [0.1400146484375, 0.04998779296875],
            [0.030029296875, 0.12005615234375],
            [0.02996826171875, 0.3800048828125],
            [0.15997314453125, 0.1199951171875],
            [0.09002685546875, -0.28997802734375],
            [0.05999755859375, -0.21002197265625],
            [0.4100341796875, 0.40997314453125],
            [0, 0],
            [0, 0.10003662109375],
            [-0.02001953125, 0.449951171875],
            [0.10003662109375, -0.10003662109375],
            [0.0999755859375, -0.1099853515625],
            [0.08001708984375, 0.02001953125],
            [0.010009765625, 0.07000732421875],
            [-0.05999755859375, 0.09002685546875],
            [0.02996826171875, 0.70001220703125],
            [0.39996337890625, -0.219970703125],
            [-0.030029296875, -0.14996337890625],
            [0.219970703125, -0.05999755859375],
            [0.16998291015625, -0.02996826171875],
            [0.030029296875, 0.1400146484375],
            [-0.0999755859375, 0.01995849609375],
            [-0.1300048828125, 0.28997802734375],
            [-0.1500244140625, 0.16998291015625],
            [-0.07000732421875, 0.27996826171875],
            [-0.59002685546875, 0],
            [-0.05999755859375, 0.27001953125],
            [-0.11004638671875, -0.05999755859375],
            [-0.25, 0.09002685546875],
            [-0.42999267578125, 0],
            [0.1400146484375, 0.22003173828125],
            [0.39996337890625, 0.10003662109375],
            [0.04998779296875, 0.199951171875],
            [0.45001220703125, 0.30999755859375],
            [-0.04998779296875, 0.1099853515625],
            [-0.0999755859375, 0],
            [0, 0],
            [0, 0],
            [0.1099853515625, 0.55999755859375],
            [0.010009765625, 0.489990234375],
            [0.25, 0.02001953125],
            [0.030029296875, 0.11004638671875],
            [0.17999267578125, 0.5899658203125],
            [0.27996826171875, 0.20001220703125],
            [-0.239990234375, 0.32000732421875],
            [0.07000732421875, 0.19000244140625],
            [0.0999755859375, -0.08001708984375],
            [0.030029296875, 0.07000732421875],
            [0.04998779296875, 0.32000732421875],
            [0.1300048828125, 0.260009765625],
            [0.23004150390625, 0.09002685546875],
            [-0.20001220703125, 0.21002197265625],
            [-0.05999755859375, 0.05999755859375],
            [-0.29998779296875, -0.489990234375],
            [-0.34002685546875, 0.44000244140625],
            [-0.08001708984375, -0.0799560546875],
            [0, -0.05999755859375],
            [-0.469970703125, -0.1300048828125],
            [-0.10003662109375, -0.1400146484375],
            [-0.19000244140625, 0.010009765625],
            [-0.1500244140625, -0.15997314453125],
            [-0.36004638671875, -0.3900146484375],
            [-0.02996826171875, -0.05999755859375],
            [-0.21002197265625, 0.1500244140625],
            [-0.10003662109375, -0.25],
            [-0.239990234375, -1.04998779296875],
            [0, 0],
            [-0.010009765625, -0.02996826171875],
            [0.40997314453125, 0.9200439453125],
            [-0.29998779296875, 0.1300048828125],
            [0.1300048828125, 0.1600341796875],
            [0.58001708984375, 0.6400146484375],
            [0.15997314453125, 0.260009765625],
            [0.07000732421875, 0.15997314453125],
            [0.34002685546875, 0.0999755859375],
            [0.1400146484375, 0.239990234375],
            [0.05999755859375, 0.030029296875],
            [-0.17999267578125, 0.19000244140625],
            [-0.20001220703125, 0.19000244140625],
            [0, 0],
            [0, 0],
            [0.13995361328125, 0.05999755859375],
            [-0.010009765625, 0.10003662109375],
            [0.19000244140625, 0],
            [-0.02001953125, 0.17999267578125],
            [0.26995849609375, 0.3399658203125],
            [0.35003662109375, -0.02001953125],
            [0.010009765625, 0.010009765625],
            [0.41998291015625, 0.19000244140625],
            [0.29998779296875, -0.1300048828125],
            [0.29998779296875, 0.1300048828125],
            [0.3599853515625, 0.17999267578125],
            [0, 0],
            [-0.38995361328125, -0.19000244140625],
            [0.1400146484375, -0.22998046875],
            [-0.1099853515625, 0],
            [-0.21002197265625, -0.1500244140625],
            [-0.02001953125, -0.3499755859375],
            [-0.16998291015625, -0.08001708984375],
            [0.0899658203125, -0.25],
            [-0.1300048828125, -0.14996337890625],
            [-0.03997802734375, -0.20001220703125],
            [-0.260009765625, 0.20001220703125],
            [-0.28997802734375, -0.1500244140625],
            [-0.0899658203125, -0.34002685546875],
            [0.03997802734375, -0.03997802734375],
            [0.32000732421875, -0.32000732421875],
            [0.0999755859375, 0.1199951171875],
            [-0.1300048828125, 0.0999755859375],
            [0.11004638671875, 0.13995361328125],
            [0.1600341796875, 0.19000244140625],
            [0.20001220703125, -0.010009765625],
            [0.1199951171875, 0.25],
            [0.38995361328125, 0.27001953125],
            [0.08001708984375, -0.17999267578125],
            [-0.16998291015625, -0.03997802734375],
            [0.1500244140625, -0.3299560546875],
            [-0.0899658203125, -0.030029296875],
            [-0.3900146484375, -0.1500244140625],
            [0.030029296875, -0.02001953125],
            [0.5, 0.32000732421875],
            [-0.030029296875, 0.09002685546875],
            [-0.07000732421875, -0.02001953125],
            [-0.0999755859375, 0.14996337890625],
            [0.05999755859375, 0.05999755859375],
            [0.1400146484375, -0.10003662109375],
            [0.1400146484375, -0.37994384765625],
            [0.08001708984375, 0.0400390625],
            [0.7099609375, 0.22003173828125],
            [0, 0],
            [-0.83001708984375, -0.46002197265625],
            [-0.52996826171875, -0.44000244140625],
            [-0.22998046875, -0.41998291015625],
            [-0.02001953125, -0.00994873046875],
            [0.3599853515625, -0.3599853515625],
            [0.82000732421875, -0.8399658203125],
            [0, 0],
            [0.02996826171875, 0.04998779296875],
            [-0.02001953125, -0.1199951171875],
            [0.22003173828125, -0.1300048828125],
            [-0.1099853515625, 0.010009765625],
            [-0.04998779296875, -0.11004638671875],
            [0.07000732421875, -0.0799560546875],
            [0.23004150390625, -0.239990234375],
            [0.19000244140625, 0.00994873046875],
            [0.1099853515625, 0.15997314453125],
            [0.15997314453125, -0.1099853515625],
            [-0.2900390625, -0.29998779296875],
            [0.16998291015625, -0.0400390625],
            [0.17999267578125, 0.1600341796875],
            [0.27001953125, 0.1300048828125],
            [-0.1099853515625, 0.1500244140625],
            [-0.02996826171875, 0.1800537109375],
            [0.10003662109375, 0.05999755859375],
            [0.07000732421875, -0.05999755859375],
            [0.09002685546875, -0.21002197265625],
            [0.17999267578125, 0.0400390625],
            [0.15997314453125, 0.030029296875],
            [0, 0],
            [0.260009765625, -0.05999755859375],
            [-0.030029296875, 0.27996826171875],
            [0.05999755859375, 0.01995849609375],
            [0.0400390625, -0.05999755859375],
            [0.47003173828125, -0.35003662109375],
            [0.16998291015625, 0.17999267578125],
            [0, 0],
            [0.08001708984375, 0.05999755859375],
            [0.2099609375, -0.1199951171875],
            [0.1099853515625, 0.07000732421875],
            [0.27001953125, 0.20001220703125],
            [0.42999267578125, -0.53997802734375],
            [0.1199951171875, 0],
            [0, 0],
            [0.239990234375, -0.1199951171875],
            [0.1300048828125, -0.15997314453125],
            [0.010009765625, -0.25994873046875],
            [0.19000244140625, -0.02996826171875],
            [0.44000244140625, 0.03997802734375],
            [0.030029296875, -0.07000732421875],
            [0.07000732421875, -0.72003173828125],
            [0, 0],
            [0.03997802734375, -0.050048828125],
            [0.1400146484375, -0.4000244140625],
            [-0.17999267578125, -0.05999755859375],
            [0.0899658203125, -0.1300048828125],
            [0.34002685546875, 0.1199951171875],
            [0, 0],
            [0.07000732421875, -0.010009765625],
            [0.280029296875, -0.22998046875],
            [0.09002685546875, -0.6300048828125],
            [-0.03997802734375, -0.1400146484375],
            [0.3900146484375, -0.21002197265625],
            [0.300048828125, -0.01995849609375],
            [0.05999755859375, 0.16998291015625],
            [0, 0],
            [0.22003173828125, 0],
            [0.1600341796875, 0.32000732421875],
            [0.08001708984375, -0.04998779296875],
            [0.1400146484375, -0.3299560546875],
            [0.050048828125, -0.03997802734375],
            [0.09002685546875, 0.08001708984375],
            [0.02001953125, 0.08001708984375],
            [-0.08001708984375, 0.02996826171875],
            [0.02001953125, 0.1400146484375],
            [0.0899658203125, 0.010009765625],
            [0.29998779296875, -0.1500244140625],
            [-0.01995849609375, -0.19000244140625],
            [-0.04998779296875, -0.24005126953125],
            [-0.14996337890625, -0.3399658203125],
            [-0.0999755859375, -0.30999755859375],
            [-0.16998291015625, 0.02001953125],
            [0.010009765625, 0.1500244140625],
            [0.02996826171875, 0.12994384765625],
            [-0.10003662109375, 0.07000732421875],
            [-0.09002685546875, -0.0899658203125],
            [-0.0899658203125, -0.15997314453125],
            [-0.17999267578125, 0.239990234375],
            [-0.0999755859375, -0.1500244140625],
            [-0.2900390625, -0.20001220703125],
            [-0.1199951171875, -0.55999755859375],
            [-0.53997802734375, 0.07000732421875],
            [-0.07000732421875, -0.1099853515625],
            [-0.59002685546875, -0.0699462890625],
            [-0.0999755859375, -0.1199951171875],
            [-0.3900146484375, -0.42999267578125],
            [0.1099853515625, -0.0999755859375],
            [0, 0],
            [-0.1400146484375, -0.12994384765625],
            [0, 0],
            [-0.3399658203125, 0.25994873046875],
            [-0.0400390625, -0.1700439453125],
            [-0.17999267578125, 0],
            [-0.25994873046875, -0.02001953125],
            [-0.21002197265625, 0.25],
            [-0.2099609375, 0.010009765625],
            [-0.239990234375, 0.010009765625],
            [0.22998046875, 0.43994140625],
            [0.05999755859375, 0.11004638671875],
            [0, 0],
            [0, 0],
            [-0.28997802734375, 0.30999755859375],
            [0.02001953125, 0.0400390625],
            [0.260009765625, 0.280029296875],
            [-0.010009765625, 0.32000732421875],
            [0.07000732421875, 0.16998291015625],
            [-0.0899658203125, 0.08001708984375],
            [0.32000732421875, 0.1099853515625],
            [-0.03997802734375, 0.17999267578125],
            [0.45001220703125, 0.6199951171875],
            [-0.1199951171875, 0.2099609375],
            [0.0400390625, 0.1400146484375],
            [-0.3399658203125, 0.09002685546875],
            [0, 0.4100341796875],
            [-0.32000732421875, -0.0899658203125],
            [-0.3699951171875, -0.01995849609375],
            [-0.05999755859375, -0.21002197265625],
            [0.16998291015625, -0.16998291015625],
            [0.05999755859375, -0.05999755859375],
            [-0.20001220703125, -0.17999267578125],
            [0.04998779296875, -0.11004638671875],
            [0.0699462890625, 0],
            [-0.07000732421875, -0.0999755859375],
            [-0.1400146484375, 0.21002197265625],
            [-0.0999755859375, -0.01995849609375],
            [0, 0],
            [-0.030029296875, 0.02001953125],
            [-0.4000244140625, 0.02996826171875],
            [-0.09002685546875, -0.22998046875],
            [-0.19000244140625, 0.05999755859375],
            [0.02996826171875, -0.27001953125],
            [-0.2099609375, 0.010009765625],
            [0, 0.09002685546875],
            [-0.13995361328125, -0.01995849609375],
            [0.050048828125, -0.10003662109375],
            [-0.010009765625, -0.32000732421875],
            [-0.010009765625, 0.1099853515625],
            [0.05999755859375, 0.52001953125],
            [-0.1400146484375, 0.04998779296875],
            [-0.07000732421875, -0.09002685546875],
            [-0.1099853515625, -0.10003662109375],
            [0.23004150390625, -0.22003173828125]
        ];
        var outTangents = [
            [0.1300048828125, -0.1300048828125],
            [0.739990234375, 0.62005615234375],
            [0.3900146484375, 0.05999755859375],
            [-0.0999755859375, 0.1700439453125],
            [0.02001953125, 0.010009765625],
            [-0.23004150390625, 0.21002197265625],
            [0.1400146484375, 0.14996337890625],
            [-0.0899658203125, 0.010009765625],
            [-0.21002197265625, -0.05999755859375],
            [0, 0.07000732421875],
            [-0.12994384765625, 0.530029296875],
            [0, 0],
            [0.0899658203125, 0.010009765625],
            [0.01995849609375, 0.15997314453125],
            [0, 0],
            [0, 0.1199951171875],
            [-0.1099853515625, 0.08001708984375],
            [-0.41998291015625, 0.1700439453125],
            [-0.07000732421875, 0.12005615234375],
            [-0.29998779296875, 0.1400146484375],
            [0.3800048828125, 0.239990234375],
            [0.2900390625, 0.5999755859375],
            [0.44000244140625, 0.01995849609375],
            [0, 0],
            [0.3900146484375, 0.010009765625],
            [0, 0],
            [0.1800537109375, 0.0899658203125],
            [0.20001220703125, 0.25994873046875],
            [-0.1500244140625, 0.45001220703125],
            [0.03997802734375, 0.010009765625],
            [0.22998046875, 0.0899658203125],
            [0, 0],
            [0.4599609375, -0.0999755859375],
            [0.08001708984375, 0.1199951171875],
            [0.8499755859375, -0.1700439453125],
            [1.1199951171875, -1.04998779296875],
            [0.469970703125, -0.34002685546875],
            [0, 0],
            [0, 0],
            [-0.0799560546875, 0.09002685546875],
            [-0.1400146484375, -0.04998779296875],
            [-0.0999755859375, -0.3699951171875],
            [-0.02001953125, -0.21002197265625],
            [-0.239990234375, -0.17999267578125],
            [-0.04998779296875, 0.1400146484375],
            [-0.46002197265625, -0.46002197265625],
            [0, 0],
            [-0.1199951171875, -0.0400390625],
            [0, -0.42999267578125],
            [0.010009765625, -0.1700439453125],
            [-0.1199951171875, 0.0899658203125],
            [-0.03997802734375, 0.050048828125],
            [-0.08001708984375, -0.030029296875],
            [-0.010009765625, -0.09002685546875],
            [0.3800048828125, -0.6199951171875],
            [-0.02001953125, -0.46002197265625],
            [-0.11004638671875, 0.05999755859375],
            [0.04998779296875, 0.27001953125],
            [-0.16998291015625, 0.03997802734375],
            [-0.1099853515625, 0.030029296875],
            [-0.02996826171875, -0.13995361328125],
            [0.29998779296875, -0.05999755859375],
            [0.0899658203125, -0.21002197265625],
            [0.19000244140625, -0.20001220703125],
            [0.14996337890625, -0.57000732421875],
            [0.219970703125, -0.010009765625],
            [0.030029296875, -0.14996337890625],
            [0.25, 0.1400146484375],
            [0.3800048828125, -0.1199951171875],
            [0.239990234375, 0.010009765625],
            [-0.2099609375, -0.3399658203125],
            [-0.22003173828125, -0.05999755859375],
            [-0.10003662109375, -0.5],
            [0.0400390625, -0.1199951171875],
            [-0.08001708984375, -0.05999755859375],
            [0, 0],
            [0, 0],
            [-0.03997802734375, -0.55999755859375],
            [-0.0999755859375, -0.48004150390625],
            [-0.010009765625, -0.27001953125],
            [-0.1199951171875, -0.010009765625],
            [-0.15997314453125, -0.5899658203125],
            [-0.0899658203125, -0.30999755859375],
            [-0.1600341796875, -0.1099853515625],
            [0.17999267578125, -0.22998046875],
            [-0.04998779296875, -0.1300048828125],
            [-0.07000732421875, 0.05999755859375],
            [-0.1199951171875, -0.26995849609375],
            [-0.04998779296875, -0.280029296875],
            [-0.08001708984375, -0.16998291015625],
            [-0.25994873046875, -0.09002685546875],
            [0.04998779296875, -0.05999755859375],
            [0.4000244140625, -0.4000244140625],
            [0.1500244140625, 0.239990234375],
            [0.05999755859375, -0.09002685546875],
            [0.04998779296875, 0.050048828125],
            [0.03997802734375, 0.56005859375],
            [0.15997314453125, 0.03997802734375],
            [0.0999755859375, 0.15997314453125],
            [0.22998046875, 0],
            [0.3499755859375, 0.4000244140625],
            [0.03997802734375, 0.04998779296875],
            [0.17999267578125, 0.30999755859375],
            [0.27001953125, -0.199951171875],
            [0.39996337890625, 1.010009765625],
            [0.010009765625, 0.02996826171875],
            [0, 0],
            [-0.25, -0.96002197265625],
            [-0.0999755859375, -0.239990234375],
            [0.30999755859375, -0.1300048828125],
            [-0.5400390625, -0.67999267578125],
            [-0.19000244140625, -0.21002197265625],
            [-0.08001708984375, -0.1400146484375],
            [-0.1300048828125, -0.25],
            [-0.239990234375, -0.08001708984375],
            [-0.03997802734375, -0.07000732421875],
            [-0.3800048828125, -0.21002197265625],
            [0.19000244140625, -0.20001220703125],
            [0, 0],
            [0, 0],
            [-0.0899658203125, 0.09002685546875],
            [-0.1400146484375, -0.08001708984375],
            [0, -0.219970703125],
            [-0.21002197265625, -0.010009765625],
            [0.03997802734375, -0.53997802734375],
            [-0.20001220703125, -0.24005126953125],
            [-0.00994873046875, 0],
            [-0.22003173828125, -0.52996826171875],
            [-0.3599853515625, -0.16998291015625],
            [-0.3900146484375, 0.16998291015625],
            [-0.2900390625, -0.1400146484375],
            [0, 0],
            [0.40997314453125, 0.1500244140625],
            [0.1600341796875, 0.08001708984375],
            [-0.0400390625, 0.07000732421875],
            [0.32000732421875, 0.010009765625],
            [0.29998779296875, 0.219970703125],
            [0.02001953125, 0.1700439453125],
            [0.260009765625, 0.1199951171875],
            [-0.07000732421875, 0.16998291015625],
            [0.1400146484375, 0.1700439453125],
            [0.04998779296875, 0.32000732421875],
            [0.25, -0.19000244140625],
            [0.32000732421875, 0.15997314453125],
            [0.02001953125, 0.05999755859375],
            [-0.29998779296875, 0.33001708984375],
            [-0.09002685546875, 0.0999755859375],
            [-0.0999755859375, -0.1400146484375],
            [0.2099609375, -0.1600341796875],
            [-0.15997314453125, -0.19000244140625],
            [-0.1199951171875, -0.1300048828125],
            [-0.26995849609375, 0.010009765625],
            [-0.20001220703125, -0.42999267578125],
            [-0.1300048828125, -0.0899658203125],
            [-0.07000732421875, 0.17999267578125],
            [0.3800048828125, 0.0999755859375],
            [-0.04998779296875, 0.10003662109375],
            [0.42999267578125, 0.1400146484375],
            [-0.030029296875, 0.01995849609375],
            [-0.5, -0.32000732421875],
            [-0.07000732421875, -0.04998779296875],
            [0.02996826171875, -0.08001708984375],
            [0.1300048828125, 0.03997802734375],
            [0.05999755859375, -0.07000732421875],
            [-0.12005615234375, -0.1199951171875],
            [-0.219970703125, 0.14996337890625],
            [-0.0400390625, 0.10003662109375],
            [-0.67999267578125, -0.32000732421875],
            [0, 0],
            [0.8900146484375, 0.260009765625],
            [0.5999755859375, 0.3399658203125],
            [0.35003662109375, 0.2900390625],
            [0.010009765625, 0.010009765625],
            [0.38995361328125, 0.34002685546875],
            [-0.82000732421875, 0.82000732421875],
            [0, 0],
            [-0.04998779296875, 0.07000732421875],
            [-0.239990234375, -0.32000732421875],
            [-0.0999755859375, 0.04998779296875],
            [0.02001953125, 0.1300048828125],
            [0.09002685546875, -0.010009765625],
            [0.04998779296875, 0.1199951171875],
            [-0.22998046875, 0.23004150390625],
            [-0.15997314453125, 0.1600341796875],
            [-0.29998779296875, -0.02001953125],
            [-0.1500244140625, 0.1400146484375],
            [-0.27001953125, 0.19000244140625],
            [0.199951171875, 0.20001220703125],
            [-0.20001220703125, 0.03997802734375],
            [-0.219970703125, -0.20001220703125],
            [-0.12994384765625, -0.0699462890625],
            [0.1099853515625, -0.14996337890625],
            [0.010009765625, -0.0799560546875],
            [-0.0899658203125, -0.03997802734375],
            [-0.14996337890625, 0.1500244140625],
            [-0.08001708984375, 0.17999267578125],
            [-0.15997314453125, -0.02996826171875],
            [0, 0],
            [-0.27001953125, 0.01995849609375],
            [-0.16998291015625, 0.03997802734375],
            [0.010009765625, -0.04998779296875],
            [-0.07000732421875, -0.030029296875],
            [-0.3499755859375, 0.48004150390625],
            [-0.19000244140625, 0.14996337890625],
            [0, 0],
            [-0.05999755859375, 0.07000732421875],
            [-0.19000244140625, -0.1199951171875],
            [-0.1300048828125, 0.09002685546875],
            [-0.27001953125, -0.19000244140625],
            [-0.54998779296875, -0.39996337890625],
            [-0.030029296875, 0.03997802734375],
            [0, 0],
            [-0.1400146484375, 0.25],
            [-0.16998291015625, 0.07000732421875],
            [0.1300048828125, 0.15997314453125],
            [-0.010009765625, 0.22003173828125],
            [-0.3900146484375, 0.07000732421875],
            [-0.05999755859375, 0],
            [-0.28997802734375, 0.6199951171875],
            [0, 0],
            [0.02996826171875, 0.07000732421875],
            [-0.22998046875, 0.3599853515625],
            [-0.03997802734375, 0.1400146484375],
            [0.15997314453125, 0.05999755859375],
            [-0.21002197265625, 0.30999755859375],
            [0, 0],
            [0.010009765625, 0.0899658203125],
            [-0.46002197265625, 0.04998779296875],
            [-0.52996826171875, 0.41998291015625],
            [-0.01995849609375, 0.1400146484375],
            [0.09002685546875, 0.4100341796875],
            [-0.27001953125, 0.14996337890625],
            [-0.2099609375, 0.02001953125],
            [0, 0],
            [0.07000732421875, 0.22003173828125],
            [-0.30999755859375, 0.00994873046875],
            [-0.05999755859375, -0.1099853515625],
            [-0.25, 0.15997314453125],
            [-0.01995849609375, 0.050048828125],
            [-0.05999755859375, 0.05999755859375],
            [-0.07000732421875, -0.05999755859375],
            [-0.02996826171875, -0.1199951171875],
            [0.0899658203125, -0.0400390625],
            [-0.02996826171875, -0.1300048828125],
            [-0.34002685546875, -0.03997802734375],
            [-0.239990234375, 0.1300048828125],
            [0.02001953125, 0.27001953125],
            [0.06005859375, 0.3499755859375],
            [0.1199951171875, 0.300048828125],
            [0.04998779296875, 0.16998291015625],
            [0.21002197265625, -0.02001953125],
            [-0.02001953125, -0.1300048828125],
            [-0.030029296875, -0.11004638671875],
            [0.1199951171875, -0.08001708984375],
            [0.1199951171875, 0.1199951171875],
            [0.1600341796875, 0.260009765625],
            [0.1300048828125, -0.16998291015625],
            [0.20001220703125, 0.28997802734375],
            [0.3499755859375, 0.25],
            [0.1300048828125, 0.55999755859375],
            [0.16998291015625, -0.01995849609375],
            [0.280029296875, 0.46002197265625],
            [0.1500244140625, 0.02001953125],
            [0.3900146484375, 0.41998291015625],
            [0.1099853515625, 0.12005615234375],
            [0, 0],
            [0.1600341796875, -0.15997314453125],
            [0, 0],
            [-0.3499755859375, -0.30999755859375],
            [0.12005615234375, -0.10003662109375],
            [0.05999755859375, 0.2099609375],
            [0.260009765625, 0],
            [0.300048828125, 0.010009765625],
            [0.1500244140625, -0.17999267578125],
            [0.24005126953125, -0.010009765625],
            [0.47998046875, -0.010009765625],
            [-0.04998779296875, -0.11004638671875],
            [0, 0],
            [0, 0],
            [-0.25, -0.25],
            [0.0400390625, -0.04998779296875],
            [-0.17999267578125, -0.3199462890625],
            [-0.22998046875, -0.239990234375],
            [0.010009765625, -0.16998291015625],
            [-0.050048828125, -0.1099853515625],
            [0.25, -0.2099609375],
            [-0.15997314453125, -0.04998779296875],
            [0.1600341796875, -0.8800048828125],
            [-0.1199951171875, -0.16998291015625],
            [0.08001708984375, -0.1500244140625],
            [-0.0999755859375, -0.3499755859375],
            [0.3900146484375, -0.0899658203125],
            [0, -0.30999755859375],
            [0.3499755859375, -0.03997802734375],
            [0.15997314453125, 0],
            [0.05999755859375, 0.199951171875],
            [-0.07000732421875, 0.07000732421875],
            [-0.17999267578125, 0.1700439453125],
            [0.07000732421875, 0.04998779296875],
            [-0.03997802734375, 0.1099853515625],
            [-0.1600341796875, -0.010009765625],
            [0.14996337890625, 0.20001220703125],
            [0.04998779296875, -0.0699462890625],
            [0, 0],
            [0.02001953125, -0.02001953125],
            [0.2099609375, 0.45001220703125],
            [0.25, -0.02001953125],
            [0.07000732421875, 0.15997314453125],
            [0.15997314453125, -0.05999755859375],
            [-0.030029296875, 0.20001220703125],
            [0.1500244140625, 0],
            [0, -0.0999755859375],
            [0.12005615234375, 0.02001953125],
            [-0.219970703125, 0.3499755859375],
            [0.010009765625, 0.219970703125],
            [0.04998779296875, -0.47998046875],
            [-0.02001953125, -0.1400146484375],
            [0.15997314453125, -0.04998779296875],
            [0.0999755859375, 0.1300048828125],
            [0.300048828125, 0.25994873046875],
            [-0.77996826171875, 0.760009765625]
        ];
        createPathGrp(contents, 'Countries', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [40.8466, -4.9677]);
    };
    var createLeavesBottom = function () {
        var vertices = [
            [-1.5426025390625, -2.90618896484375],
            [-5.06126403808594, -2.27105712890625],
            [-7.72442626953125, -0.44499206542969],
            [-14.6716918945312, 1.79066467285156],
            [-19.6311645507812, 0.13734436035156],
            [-21.1605072021484, -1.07827758789062],
            [-21.6513824462891, -1.59149169921875],
            [-21.4805908203125, -1.60198974609375],
            [-12.7521362304688, -1.19941711425781],
            [-7.36050415039062, -3.34884643554688],
            [-0.25161743164062, -3.42961120605469],
            [0.21852111816406, -3.43392944335938],
            [8.27430725097656, -3.03363037109375],
            [12.6231231689453, -1.23184204101562],
            [21.4823760986328, -1.61882019042969],
            [21.6513824462891, -1.6915283203125],
            [20.5843353271484, -0.57797241210938],
            [13.9676971435547, 1.78520202636719],
            [8.42359924316406, 0.02639770507812],
            [5.59861755371094, -1.92887878417969],
            [2.90748596191406, -2.99165344238281],
            [1.52449035644531, -2.91026306152344],
            [1.64552307128906, -2.75624084472656],
            [8.67779541015625, 1.92601013183594],
            [9.29112243652344, 2.47666931152344],
            [9.30422973632812, 2.87635803222656],
            [8.19692993164062, 3.85305786132812],
            [7.82725524902344, 3.76889038085938],
            [5.60935974121094, 1.56367492675781],
            [1.26345825195312, -1.83741760253906],
            [0.782958984375, -2.10330200195312],
            [-0.86323547363281, -2.08726501464844],
            [-4.585205078125, 0.60670471191406],
            [-7.79916381835938, 3.70709228515625],
            [-8.37434387207031, 3.73445129394531],
            [-9.33277893066406, 2.84864807128906],
            [-9.309814453125, 2.45840454101562],
            [-3.78005981445312, -1.71142578125],
            [-1.78782653808594, -2.71876525878906]
        ];
        var inTangents = [
            [-0.06221008300781, 0.14717102050781],
            [1.08723449707031, -0.61717224121094],
            [0.8873291015625, -0.60932922363281],
            [2.56846618652344, 0.04902648925781],
            [1.52511596679688, 0.93228149414062],
            [0.45265197753906, 0.47712707519531],
            [0.16267395019531, 0.16999816894531],
            [-0.04476928710938, -0.02484130859375],
            [-2.97096252441406, 1.23451232910156],
            [-1.85975646972656, 0.56399536132812],
            [-2.37739562988281, -0.69680786132812],
            [-0.159912109375, 0.04757690429688],
            [-2.64692687988281, -0.96038818359375],
            [-1.44488525390625, -0.61174011230469],
            [-2.88951110839844, 1.58641052246094],
            [-0.09181213378906, 0.03919982910156],
            [0.39077758789062, -0.30340576171875],
            [2.52021789550781, 0.11747741699219],
            [1.70918273925781, 1.02659606933594],
            [0.96514892578125, 0.61799621582031],
            [0.99560546875, 0.10934448242188],
            [0.45401000976562, -0.08193969726562],
            [-0.05653381347656, -0.02413940429688],
            [-2.11749267578125, -1.90090942382812],
            [-0.20770263671875, -0.17979431152344],
            [0.14921569824219, -0.14970397949219],
            [0.37405395507812, -0.32003784179688],
            [0.10435485839844, 0.10401916503906],
            [0.75851440429688, 0.71467590332031],
            [1.61178588867188, 0.92501831054688],
            [0.14503479003906, 0.1087646484375],
            [0.56636047363281, -0.31735229492188],
            [1.15519714355469, -1.01734924316406],
            [1.0360107421875, -1.069580078125],
            [0.22010803222656, 0.18675231933594],
            [0.31181335449219, 0.30390930175781],
            [-0.15017700195312, 0.13822937011719],
            [-2.01907348632812, 1.15673828125],
            [-0.6812744140625, 0.30191040039062]
        ];
        var outTangents = [
            [-1.28279113769531, -0.27584838867188],
            [-0.93899536132812, 0.53302001953125],
            [-2.09239196777344, 1.43687438964844],
            [-1.82156372070312, -0.03477478027344],
            [-0.55876159667969, -0.341552734375],
            [-0.16342163085938, -0.17227172851562],
            [0.07872009277344, -0.08645629882812],
            [2.84303283691406, 1.57759094238281],
            [1.78683471679688, -0.74247741699219],
            [2.36599731445312, -0.717529296875],
            [0.16143798828125, 0.04731750488281],
            [2.73190307617188, -0.81292724609375],
            [1.47712707519531, 0.53594970703125],
            [3.01594543457031, 1.27690124511719],
            [0.03672790527344, -0.02017211914062],
            [-0.29743957519531, 0.4813232421875],
            [-1.94499206542969, 1.51010131835938],
            [-1.99737548828125, -0.09310913085938],
            [-0.98408508300781, -0.591064453125],
            [-0.82827758789062, -0.53036499023438],
            [-0.47064208984375, -0.05168151855469],
            [-0.02178955078125, 0.12335205078125],
            [2.63424682617188, 1.12530517578125],
            [0.2044677734375, 0.18354797363281],
            [0.15341186523438, 0.13278198242188],
            [-0.34852600097656, 0.34965515136719],
            [-0.17532348632812, 0.15000915527344],
            [-0.73841857910156, -0.73602294921875],
            [-1.34341430664062, -1.26577758789062],
            [-0.15888977050781, -0.0911865234375],
            [-0.55781555175781, -0.41830444335938],
            [-1.34712219238281, 0.75486755371094],
            [-1.1185302734375, 0.98506164550781],
            [-0.20652770996094, 0.21322631835938],
            [-0.33261108398438, -0.28221130371094],
            [-0.15650939941406, -0.15254211425781],
            [1.70698547363281, -1.57112121582031],
            [0.64643859863281, -0.370361328125],
            [0.08030700683594, -0.03558349609375]
        ];
        createPathGrp(contents, 'Leaves_Bottom', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [42.645, 25.1974]);
    };
    var createLeavesL01 = function () {
        var vertices = [
            [9.62973022460938, 3.20268249511719],
            [8.46005249023438, 3.40142822265625],
            [5.79318237304688, 4.05937194824219],
            [0.04823303222656, 5.010986328125],
            [-7.1656494140625, 2.41044616699219],
            [-9.49266052246094, -0.23033142089844],
            [-9.62846374511719, -0.58232116699219],
            [-9.08831787109375, -0.09481811523438],
            [-4.41754150390625, 1.91220092773438],
            [-0.626708984375, 2.26451110839844],
            [4.097412109375, 2.88265991210938],
            [5.03617858886719, 2.983642578125],
            [4.695556640625, 2.75975036621094],
            [3.02729797363281, 2.23374938964844],
            [0.0655517578125, -0.58547973632812],
            [-1.78814697265625, -4.07244873046875],
            [-2.33210754394531, -5.01205444335938],
            [-0.64726257324219, -3.78605651855469],
            [3.34732055664062, -0.06655883789062],
            [9.29742431640625, 3.06814575195312]
        ];
        var inTangents = [
            [-0.12490844726562, -0.12162780761719],
            [0.373291015625, -0.08697509765625],
            [0.88677978515625, -0.2279052734375],
            [1.96138000488281, -0.02679443359375],
            [2.1038818359375, 1.69680786132812],
            [0.61676025390625, 1.01997375488281],
            [-0.01309204101562, 0.17744445800781],
            [-0.17437744140625, -0.15267944335938],
            [-1.72163391113281, -0.28482055664062],
            [-1.26708984375, -0.08355712890625],
            [-1.54983520507812, -0.39926147460938],
            [-0.34132385253906, 0.03204345703125],
            [0.11636352539062, 0.03964233398438],
            [0.53829956054688, 0.24136352539062],
            [0.73236083984375, 1.20741271972656],
            [0.65892028808594, 1.140380859375],
            [0.16569519042969, 0.32797241210938],
            [-0.53036499023438, -0.44642639160156],
            [-1.26957702636719, -1.30314636230469],
            [-2.29457092285156, -0.45454406738281]
        ];
        var outTangents = [
            [-0.39927673339844, 0.1435546875],
            [-0.89166259765625, 0.20774841308594],
            [-1.88752746582031, 0.48509216308594],
            [-2.72747802734375, 0.03727722167969],
            [-0.92539978027344, -0.74635314941406],
            [-0.05685424804688, -0.09402465820312],
            [0.19586181640625, 0.17701721191406],
            [1.33998107910156, 1.17324829101562],
            [1.25509643554688, 0.2076416015625],
            [1.58724975585938, 0.10466003417969],
            [0.2950439453125, 0.07600402832031],
            [-0.07200622558594, -0.18121337890625],
            [-1.3223876953125, -0.59292602539062],
            [-0.55178833007812, -0.18798828125],
            [-0.68382263183594, -1.12738037109375],
            [-0.1798095703125, -0.31120300292969],
            [0.60646057128906, 0.3541259765625],
            [1.39347839355469, 1.17292785644531],
            [1.65214538574219, 1.69581604003906],
            [0.09867858886719, 0.01954650878906]
        ];
        createPathGrp(contents, 'Leaves_L_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [24.8022, 18.1959]);
    };
    var createLeavesL02 = function () {
        var vertices = [
            [-0.05331420898438, -6.95353698730469],
            [0.76380920410156, -5.98823547363281],
            [4.06298828125, 0.14447021484375],
            [5.48579406738281, 3.86239624023438],
            [7.72804260253906, 6.82810974121094],
            [7.81379699707031, 6.95353698730469],
            [6.55714416503906, 6.63601684570312],
            [2.27296447753906, 5.81797790527344],
            [-3.56852722167969, 2.86773681640625],
            [-6.92413330078125, -1.26992797851562],
            [-7.81379699707031, -3.92195129394531],
            [-7.0863037109375, -2.73982238769531],
            [-3.72756958007812, 0.144775390625],
            [0.44599914550781, 2.24311828613281],
            [3.67295837402344, 4.44793701171875],
            [4.67337036132812, 5.07290649414062],
            [4.75038146972656, 4.98960876464844],
            [4.36604309082031, 4.6710205078125],
            [1.78317260742188, 1.03851318359375],
            [0.94166564941406, -2.77896118164062],
            [-0.04457092285156, -6.80378723144531]
        ];
        var inTangents = [
            [0.00433349609375, 0.08697509765625],
            [-0.25466918945312, -0.31449890136719],
            [-0.70059204101562, -2.26516723632812],
            [-0.59719848632812, -1.19355773925781],
            [-0.96115112304688, -0.82722473144531],
            [-0.04888916015625, -0.07255554199219],
            [0.40823364257812, 0.0804443359375],
            [1.42985534667969, 0.26303100585938],
            [1.69319152832031, 1.49861145019531],
            [0.84931945800781, 1.59501647949219],
            [0.12202453613281, 0.94692993164062],
            [-0.26666259765625, -0.376953125],
            [-1.31214904785156, -0.74165344238281],
            [-1.37908935546875, -0.72439575195312],
            [-1.02452087402344, -0.81044006347656],
            [-0.37104797363281, -0.14501953125],
            [-0.02566528320312, 0.02775573730469],
            [0.12106323242188, 0.11369323730469],
            [0.52471923828125, 1.45057678222656],
            [0.20155334472656, 1.28883361816406],
            [0.54560852050781, 1.2886962890625]
        ];
        var outTangents = [
            [0.33741760253906, 0.30819702148438],
            [1.48640441894531, 1.83558654785156],
            [0.39190673828125, 1.26712036132812],
            [0.565185546875, 1.12956237792969],
            [0.02366638183594, 0.02035522460938],
            [-0.448486328125, -0.1146240234375],
            [-1.42640686035156, -0.28108215332031],
            [-2.23779296875, -0.41166687011719],
            [-1.35147094726562, -1.19615173339844],
            [-0.44174194335938, -0.82957458496094],
            [0.24118041992188, 0.39497375488281],
            [0.87725830078125, 1.24006652832031],
            [1.3575439453125, 0.76730346679688],
            [1.16494750976562, 0.61192321777344],
            [0.30873107910156, 0.24421691894531],
            [0.02566528320312, -0.02775573730469],
            [-0.12844848632812, -0.1058349609375],
            [-1.10450744628906, -1.03733825683594],
            [-0.44711303710938, -1.23605346679688],
            [-0.21438598632812, -1.37091064453125],
            [-0.0115966796875, -0.02740478515625]
        ];
        createPathGrp(contents, 'Leaves_L_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [17.5583, 12.8008]);
    };
    var createLeavesL03 = function () {
        var vertices = [
            [-5.51641845703125, -6.52627563476562],
            [-5.40325927734375, -7.00582885742188],
            [-4.87104797363281, -5.08854675292969],
            [-2.465087890625, -1.80894470214844],
            [0.72305297851562, 1.60063171386719],
            [2.25048828125, 3.84196472167969],
            [2.7652587890625, 4.418701171875],
            [2.57429504394531, 3.90438842773438],
            [1.41481018066406, 0.09991455078125],
            [1.72637939453125, -3.37167358398438],
            [2.1864013671875, -7.73007202148438],
            [2.54263305664062, -6.99494934082031],
            [3.49296569824219, -2.60908508300781],
            [4.10908508300781, 3.32801818847656],
            [5.18571472167969, 6.889404296875],
            [5.51641845703125, 7.73007202148438],
            [4.83348083496094, 7.25187683105469],
            [0.60678100585938, 4.48922729492188],
            [-3.71060180664062, 0.35781860351562],
            [-5.38922119140625, -4.13322448730469],
            [-5.51641845703125, -5.42637634277344]
        ];
        var inTangents = [
            [0, 0.36663818359375],
            [-0.05099487304688, 0.21607971191406],
            [-0.26921081542969, -0.58847045898438],
            [-0.94303894042969, -0.98655700683594],
            [-0.9658203125, -1.2276611328125],
            [-0.56088256835938, -0.71148681640625],
            [-0.21501159667969, -0.23954772949219],
            [0.07835388183594, 0.12570190429688],
            [0.128173828125, 1.35089111328125],
            [-0.23042297363281, 1.14450073242188],
            [0.19171142578125, 1.54835510253906],
            [-0.08370971679688, -0.2266845703125],
            [-0.17622375488281, -1.49226379394531],
            [-0.29212951660156, -1.97032165527344],
            [-0.6256103515625, -1.10758972167969],
            [-0.0714111328125, -0.31379699707031],
            [0.2325439453125, 0.15190124511719],
            [1.38824462890625, 0.95100402832031],
            [1.1566162109375, 1.67491149902344],
            [0.21646118164062, 1.62812805175781],
            [0.11799621582031, 0.42315673828125]
        ];
        var outTangents = [
            [0.03108215332031, -0.13172912597656],
            [0.1094970703125, 0.71005249023438],
            [0.57667541503906, 1.26052856445312],
            [1.0753173828125, 1.12495422363281],
            [0.56063842773438, 0.71261596679688],
            [0.13941955566406, 0.17684936523438],
            [-0.01454162597656, -0.26309204101562],
            [-0.72636413574219, -1.16535949707031],
            [-0.11199951171875, -1.18052673339844],
            [0.28401184082031, -1.41064453125],
            [0.21403503417969, 0.26530456542969],
            [0.52322387695312, 1.41682434082031],
            [0.23335266113281, 1.97607421875],
            [0.18405151367188, 1.24142456054688],
            [0.1441650390625, 0.25523376464844],
            [-0.22740173339844, -0.15975952148438],
            [-1.40922546386719, -0.92050170898438],
            [-1.66133117675781, -1.1380615234375],
            [-0.938232421875, -1.35867309570312],
            [-0.05726623535156, -0.43075561523438],
            [0, -0.36663818359375]
        ];
        createPathGrp(contents, 'Leaves_L_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [12.9322, 6.4299]);
    };
    var createLeavesL04 = function () {
        var vertices = [
            [-4.09584045410156, -4.75411987304688],
            [-3.55296325683594, -7.47735595703125],
            [-3.17689514160156, -8.42605590820312],
            [-1.85321044921875, -2.21159362792969],
            [0.04086303710938, 3.47206115722656],
            [0.5311279296875, 5.14390563964844],
            [0.58291625976562, 4.99542236328125],
            [1.07099914550781, -0.93013000488281],
            [2.87586975097656, -4.20664978027344],
            [3.86186218261719, -6.46217346191406],
            [4.00604248046875, -6.80473327636719],
            [4.0870361328125, -6.45597839355469],
            [3.64801025390625, -2.16007995605469],
            [2.02409362792969, 3.90925598144531],
            [1.73124694824219, 8.050048828125],
            [1.74334716796875, 8.15220642089844],
            [1.67965698242188, 8.42161560058594],
            [1.48881530761719, 8.25285339355469],
            [-1.22006225585938, 4.71076965332031],
            [-3.96566772460938, -1.94976806640625],
            [-4.09584045410156, -2.89805603027344]
        ];
        var inTangents = [
            [0, 0.61868286132812],
            [-0.24186706542969, 0.89532470703125],
            [-0.92333984375, -1.96034240722656],
            [-0.2105712890625, 0.289794921875],
            [-0.3154296875, -2.001953125],
            [-0.23789978027344, -0.53765869140625],
            [0.01417541503906, 0.04420471191406],
            [-0.81269836425781, 1.92301940917969],
            [-0.68145751953125, 1.04695129394531],
            [-0.20616149902344, 0.80564880371094],
            [-0.1134033203125, 0.09144592285156],
            [-0.00483703613281, -0.1162109375],
            [0.23762512207031, -1.42364501953125],
            [0.6197509765625, -2.00080871582031],
            [-0.19972229003906, -1.4012451171875],
            [0.00233459472656, -0.03361511230469],
            [0.12554931640625, -0.0384521484375],
            [0.04374694824219, 0.07679748535156],
            [0.98484802246094, 1.111572265625],
            [0.33782958984375, 2.45870971679688],
            [0.10176086425781, 0.30789184570312]
        ];
        var outTangents = [
            [0.12611389160156, -0.91867065429688],
            [0.08808898925781, -0.32608032226562],
            [-0.373046875, 2.24990844726562],
            [0.85823059082031, 1.82212829589844],
            [0.09022521972656, 0.57264709472656],
            [0.10914611816406, -0.04327392578125],
            [-0.65507507324219, -2.04283142089844],
            [0.48828125, -1.15534973144531],
            [0.45565795898438, -0.70005798339844],
            [0.03013610839844, -0.11778259277344],
            [0.12709045410156, 0.09617614746094],
            [0.06040954589844, 1.45291137695312],
            [-0.34652709960938, 2.07606506347656],
            [-0.42332458496094, 1.36666870117188],
            [0.00485229492188, 0.03401184082031],
            [-0.006591796875, 0.09516906738281],
            [-0.09521484375, 0.0291748046875],
            [-0.74226379394531, -1.30337524414062],
            [-1.69529724121094, -1.91343688964844],
            [-0.04342651367188, -0.31600952148438],
            [0, -0.61868286132812]
        ];
        createPathGrp(contents, 'Leaves_L_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [11.5116, -2.4915]);
    };
    var createLeavesL05 = function () {
        var vertices = [
            [-1.9451904296875, 8.49269104003906],
            [-3.05316162109375, 4.36766052246094],
            [-3.88247680664062, 1.89277648925781],
            [-3.26730346679688, -5.50765991210938],
            [-1.56593322753906, -8.28431701660156],
            [-1.34294128417969, -8.49269104003906],
            [-1.42633056640625, -8.21701049804688],
            [-2.11505126953125, -5.41160583496094],
            [-1.72535705566406, -1.10726928710938],
            [-1.72337341308594, 2.351806640625],
            [-1.8887939453125, 4.40396118164062],
            [-1.85488891601562, 4.63853454589844],
            [-1.65142822265625, 3.87413024902344],
            [0.28630065917969, -0.07432556152344],
            [2.9615478515625, -2.68963623046875],
            [4.10906982421875, -4.09150695800781],
            [4.28794860839844, -4.27537536621094],
            [4.02378845214844, -2.86585998535156],
            [1.64967346191406, 1.94110107421875],
            [-0.98637390136719, 5.95925903320312],
            [-1.83094787597656, 8.31199645996094]
        ];
        var inTangents = [
            [0.10946655273438, -0.03987121582031],
            [0.49330139160156, 1.33967590332031],
            [0.23397827148438, 0.83993530273438],
            [-1.09388732910156, 2.39401245117188],
            [-0.665283203125, 0.86532592773438],
            [-0.12155151367188, 0.02616882324219],
            [0.04377746582031, -0.08045959472656],
            [0.02145385742188, -0.99346923828125],
            [-0.17115783691406, -1.43028259277344],
            [0.11227416992188, -1.15367126464844],
            [0.05213928222656, -0.68429565429688],
            [-0.01699829101562, -0.111572265625],
            [-0.02943420410156, 0.23951721191406],
            [-0.99057006835938, 1.14909362792969],
            [-0.91929626464844, 0.84344482421875],
            [-0.28639221191406, 0.5465087890625],
            [-0.13546752929688, 0.02447509765625],
            [0.11154174804688, -0.46055603027344],
            [1.04637145996094, -1.47804260253906],
            [0.73075866699219, -1.43699645996094],
            [0.1607666015625, -0.82772827148438]
        ];
        var outTangents = [
            [-0.14335632324219, -1.43978881835938],
            [-0.30075073242188, -0.81675720214844],
            [-0.70881652832031, -2.5445556640625],
            [0.45480346679688, -0.99533081054688],
            [0.06072998046875, -0.0789794921875],
            [0.05459594726562, 0.1187744140625],
            [-0.476318359375, 0.87541198730469],
            [-0.03135681152344, 1.45176696777344],
            [0.13827514648438, 1.15548706054688],
            [-0.06646728515625, 0.68296813964844],
            [-0.00460815429688, 0.06050109863281],
            [0.17457580566406, -0.26704406738281],
            [0.18955993652344, -1.54258728027344],
            [0.81771850585938, -0.94857788085938],
            [0.449951171875, -0.412841796875],
            [0.034423828125, -0.065673828125],
            [-0.03790283203125, 0.48768615722656],
            [-0.43106079101562, 1.77970886230469],
            [-0.92591857910156, 1.30790710449219],
            [-0.38124084472656, 0.74967956542969],
            [-0.01222229003906, 0.06295776367188]
        ];
        createPathGrp(contents, 'Leaves_L_05', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [13.3015, -11.6646]);
    };
    var createLeavesL06 = function () {
        var vertices = [
            [4.16140747070312, -4.32292175292969],
            [2.70564270019531, -0.39640808105469],
            [-0.30155944824219, 2.60163879394531],
            [-3.94992065429688, 6.51652526855469],
            [-4.00489807128906, 6.10552978515625],
            [-4.05502319335938, 3.29716491699219],
            [-3.73553466796875, -1.948486328125],
            [0.6591796875, -6.50303649902344],
            [0.80560302734375, -6.51652526855469],
            [0.2686767578125, -6.01025390625],
            [-1.43159484863281, -2.66246032714844],
            [-2.97003173828125, 2.99853515625],
            [-2.99508666992188, 3.31510925292969],
            [-1.63282775878906, 1.16677856445312],
            [0.74464416503906, -0.84907531738281],
            [2.49949645996094, -2.17222595214844],
            [4.07627868652344, -4.18301391601562]
        ];
        var inTangents = [
            [-0.02861022949219, 0.04652404785156],
            [0.86326599121094, -1.16342163085938],
            [1.12757873535156, -0.86822509765625],
            [0.83895874023438, -1.70286560058594],
            [-0.01547241210938, 0.11479187011719],
            [0.08027648925781, 0.93522644042969],
            [-0.53269958496094, 1.71441650390625],
            [-2.15213012695312, 0.85517883300781],
            [-0.08158874511719, 0.00688171386719],
            [0.17088317871094, -0.15742492675781],
            [0.2620849609375, -1.25444030761719],
            [0.70573425292969, -1.83499145507812],
            [-0.07463073730469, -0.13442993164062],
            [-0.55622863769531, 0.64607238769531],
            [-0.84561157226562, 0.60934448242188],
            [-0.56019592285156, 0.47573852539062],
            [-0.37263488769531, 0.79037475585938]
        ];
        var outTangents = [
            [-0.01522827148438, 1.49026489257812],
            [-0.85284423828125, 1.14938354492188],
            [-1.42205810546875, 1.094970703125],
            [-0.09635925292969, -0.17135620117188],
            [0.12657165527344, -0.9390869140625],
            [-0.15144348144531, -1.76414489746094],
            [0.69676208496094, -2.24241638183594],
            [0.02912902832031, -0.01158142089844],
            [-0.19871520996094, 0.18756103515625],
            [-0.98220825195312, 0.90480041503906],
            [-0.40104675292969, 1.91954040527344],
            [-0.03363037109375, 0.08743286132812],
            [0.36219787597656, -0.79095458984375],
            [0.68832397460938, -0.79949951171875],
            [0.59440612792969, -0.42832946777344],
            [0.66537475585938, -0.5650634765625],
            [0.02314758300781, -0.04910278320312]
        ];
        createPathGrp(contents, 'Leaves_L_06', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [16.4495, -18.2098]);
    };
    var createLeavesL07 = function () {
        var vertices = [
            [-4.17100524902344, 4.55682373046875],
            [-4.07272338867188, 4.06521606445312],
            [-3.32907104492188, 1.741943359375],
            [0.10238647460938, -2.70309448242188],
            [3.97865295410156, -4.53408813476562],
            [4.18447875976562, -4.49908447265625],
            [3.40406799316406, -3.74851989746094],
            [0.76048278808594, -0.32672119140625],
            [-3.16716003417969, 3.72064208984375]
        ];
        var inTangents = [
            [0.35923767089844, -0.30035400390625],
            [-0.04328918457031, 0.13681030273438],
            [-0.2332763671875, 0.77877807617188],
            [-1.65338134765625, 1.08668518066406],
            [-1.33607482910156, 0.51719665527344],
            [-0.1002197265625, -0.08792114257812],
            [0.24722290039062, -0.2607421875],
            [0.79241943359375, -1.20518493652344],
            [1.50350952148438, -1.16122436523438]
        ];
        var outTangents = [
            [-0.05070495605469, -0.23202514648438],
            [0.24530029296875, -0.77525329589844],
            [0.57597351074219, -1.9228515625],
            [1.20527648925781, -0.79216003417969],
            [0.05001831054688, -0.01936340332031],
            [-0.26254272460938, 0.25129699707031],
            [-0.99644470214844, 1.05093383789062],
            [-1.05476379394531, 1.60415649414062],
            [-0.33148193359375, 0.25602722167969]
        ];
        createPathGrp(contents, 'Leaves_L_07', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [19.7543, -23.4899]);
    };
    var createLeavesR01 = function () {
        var vertices = [
            [2.35147094726562, -5.00604248046875],
            [-0.12419128417969, -0.5479736328125],
            [-4.29124450683594, 2.61524963378906],
            [-4.91368103027344, 2.81001281738281],
            [-5.15522766113281, 2.92898559570312],
            [-4.20048522949219, 2.8829345703125],
            [1.34844970703125, 2.21803283691406],
            [5.69708251953125, 1.62689208984375],
            [9.45152282714844, -0.42916870117188],
            [8.70838928222656, 0.85618591308594],
            [9.6314697265625, -0.49569702148438],
            [2.12156677246094, 4.81301879882812],
            [-3.403564453125, 4.60934448242188],
            [-7.70596313476562, 3.54408264160156],
            [-9.36454772949219, 3.26910400390625],
            [-9.6314697265625, 3.16670227050781],
            [-9.30085754394531, 3.04461669921875],
            [-5.42356872558594, 1.59385681152344],
            [-3.83642578125, 0.33906555175781],
            [-0.133056640625, -3.14447021484375],
            [1.98100280761719, -4.84419250488281]
        ];
        var inTangents = [
            [-0.19926452636719, 0.00923156738281],
            [0.87486267089844, -1.43760681152344],
            [1.89836120605469, -0.38601684570312],
            [0.20620727539062, -0.069091796875],
            [0.12176513671875, -0.06076049804688],
            [-0.283935546875, 0.07080078125],
            [-1.86299133300781, 0.11872863769531],
            [-1.42713928222656, 0.37602233886719],
            [-1.06620788574219, 1.02386474609375],
            [-0.10836791992188, -0.02462768554688],
            [0.354248046875, -0.41119384765625],
            [2.66644287109375, -0.52204895019531],
            [1.83155822753906, 0.37240600585938],
            [1.42813110351562, 0.37858581542969],
            [0.55397033691406, 0.08439636230469],
            [0.08198547363281, 0.09645080566406],
            [-0.11381530761719, 0.02580261230469],
            [-1.20283508300781, 0.7281494140625],
            [-0.49302673339844, 0.46075439453125],
            [-1.26504516601562, 1.12870788574219],
            [-0.74067687988281, 0.5216064453125]
        ];
        var outTangents = [
            [-1.01164245605469, 1.42694091796875],
            [-0.97476196289062, 1.60176086425781],
            [-0.21197509765625, 0.04310607910156],
            [-0.06260681152344, 0.02098083496094],
            [0.36923217773438, 0.10606384277344],
            [1.8228759765625, -0.45458984375],
            [1.461669921875, -0.09315490722656],
            [1.42575073242188, -0.37565612792969],
            [0.03848266601562, -0.03695678710938],
            [-0.25877380371094, 0.49411010742188],
            [-1.75932312011719, 2.04208374023438],
            [-1.85116577148438, 0.3624267578125],
            [-1.44935607910156, -0.29470825195312],
            [-0.54612731933594, -0.144775390625],
            [-0.08836364746094, -0.01345825195312],
            [0.09037780761719, -0.09841918945312],
            [1.35813903808594, -0.30790710449219],
            [0.5833740234375, -0.3531494140625],
            [1.23820495605469, -1.15713500976562],
            [0.67555236816406, -0.60273742675781],
            [0.09013366699219, -0.0634765625]
        ];
        createPathGrp(contents, 'Leaves_R_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [60.4651, 18.2267]);
    };
    var createLeavesR02 = function () {
        var vertices = [
            [-4.82673645019531, 5.17518615722656],
            [-3.35458374023438, 4.21664428710938],
            [1.30171203613281, 1.3953857421875],
            [5.56390380859375, -1.08804321289062],
            [7.55921936035156, -3.51188659667969],
            [7.77986145019531, -3.84367370605469],
            [7.69612121582031, -3.30874633789062],
            [5.11041259765625, 1.33073425292969],
            [1.93330383300781, 4.14959716796875],
            [-2.8807373046875, 5.96675109863281],
            [-7.12675476074219, 6.79588317871094],
            [-7.79087829589844, 6.94485473632812],
            [-6.65213012695312, 5.71392822265625],
            [-4.726318359375, 2.0528564453125],
            [-3.56584167480469, -1.25286865234375],
            [-0.45758056640625, -6.36566162109375],
            [0.00189208984375, -6.92088317871094],
            [0.06951904296875, -6.94485473632812],
            [-0.36279296875, -5.687255859375],
            [-1.19479370117188, -1.34013366699219],
            [-2.77720642089844, 2.89942932128906],
            [-4.60519409179688, 4.8966064453125]
        ];
        var inTangents = [
            [0.0311279296875, -0.15626525878906],
            [-0.43928527832031, 0.37451171875],
            [-1.65185546875, 0.77885437011719],
            [-1.27970886230469, 1.06988525390625],
            [-0.49995422363281, 0.9443359375],
            [-0.13671875, 0.09457397460938],
            [0.04458618164062, -0.16629028320312],
            [1.18905639648438, -1.36137390136719],
            [1.16447448730469, -0.82235717773438],
            [1.71028137207031, -0.32655334472656],
            [1.39808654785156, -0.36444091796875],
            [0.23347473144531, -0.02906799316406],
            [-0.34800720214844, 0.43461608886719],
            [-0.46914672851562, 1.3101806640625],
            [-0.40029907226562, 1.09698486328125],
            [-1.26515197753906, 1.5650634765625],
            [-0.15377807617188, 0.18455505371094],
            [-0.04719543457031, 0.01626586914062],
            [0.12660217285156, -0.41658020019531],
            [0.2596435546875, -1.45245361328125],
            [0.93705749511719, -1.25956726074219],
            [0.68482971191406, -0.59686279296875]
        ];
        var outTangents = [
            [0.56324768066406, -0.23922729492188],
            [1.400634765625, -1.19412231445312],
            [1.49153137207031, -0.7032470703125],
            [0.81718444824219, -0.68319702148438],
            [0.05699157714844, -0.107666015625],
            [0.04017639160156, 0.20265197753906],
            [-0.47264099121094, 1.76284790039062],
            [-0.93763732910156, 1.07351684570312],
            [-1.44902038574219, 1.02330017089844],
            [-1.41650390625, 0.27046203613281],
            [-0.21626281738281, 0.05636596679688],
            [0.41580200195312, -0.38639831542969],
            [0.8778076171875, -1.09625244140625],
            [0.39369201660156, -1.09945678710938],
            [0.69651794433594, -1.90869140625],
            [0.15101623535156, -0.18681335449219],
            [0.00607299804688, -0.00729370117188],
            [-0.14988708496094, 0.43331909179688],
            [-0.43124389648438, 1.41903686523438],
            [-0.26992797851562, 1.510009765625],
            [-0.54118347167969, 0.72744750976562],
            [-0.08132934570312, 0.07089233398438]
        ];
        createPathGrp(contents, 'Leaves_R_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [67.6777, 12.7751]);
    };
    var createLeavesR03 = function () {
        var vertices = [
            [5.45854187011719, -7.01773071289062],
            [3.23170471191406, 0.97407531738281],
            [-1.65428161621094, 5.15473937988281],
            [-5.33309936523438, 7.56483459472656],
            [-5.50033569335938, 7.65788269042969],
            [-5.3828125, 7.22618103027344],
            [-3.92970275878906, 1.83210754394531],
            [-3.1817626953125, -4.748291015625],
            [-2.29434204101562, -7.65678405761719],
            [-2.21311950683594, -7.57122802734375],
            [-1.67683410644531, -3.12677001953125],
            [-1.58424377441406, 1.26753234863281],
            [-2.62362670898438, 3.94332885742188],
            [-2.75810241699219, 4.18278503417969],
            [-2.80305480957031, 4.33642578125],
            [-2.32029724121094, 3.880615234375],
            [-1.58108520507812, 2.80490112304688],
            [0.74949645996094, -0.11529541015625],
            [3.77574157714844, -3.3502197265625],
            [5.39280700683594, -6.83285522460938]
        ];
        var inTangents = [
            [-0.07101440429688, 0.04429626464844],
            [1.8804931640625, -2.34974670410156],
            [1.81216430664062, -1.17750549316406],
            [1.18701171875, -0.8634033203125],
            [0.07122802734375, -0.03919982910156],
            [-0.07121276855469, 0.11799621582031],
            [-0.20614624023438, 1.87368774414062],
            [-0.4317626953125, 2.17230224609375],
            [-0.43168640136719, 0.9237060546875],
            [0.004150390625, -0.03866577148438],
            [-0.3123779296875, -1.4639892578125],
            [0.32682800292969, -1.47044372558594],
            [0.5390625, -0.81727600097656],
            [0.04217529296875, -0.08122253417969],
            [0.025634765625, -0.08978271484375],
            [-0.12040710449219, 0.16561889648438],
            [-0.22006225585938, 0.37419128417969],
            [-0.86726379394531, 0.89935302734375],
            [-0.91358947753906, 1.16749572753906],
            [-0.20396423339844, 1.31687927246094]
        ];
        var outTangents = [
            [0.24684143066406, 2.94059753417969],
            [-1.36468505859375, 1.70523071289062],
            [-1.22930908203125, 0.79876708984375],
            [-0.04420471191406, 0.03215026855469],
            [-0.04306030273438, -0.1864013671875],
            [1.00166320800781, -1.65951538085938],
            [0.24142456054688, -2.19438171386719],
            [0.19882202148438, -1.00035095214844],
            [0.08467102050781, -0.00971984863281],
            [-0.16342163085938, 1.52278137207031],
            [0.31184387207031, 1.46153259277344],
            [-0.20960998535156, 0.94308471679688],
            [-0.05029296875, 0.07626342773438],
            [-0.01510620117188, 0.02909851074219],
            [0.2286376953125, -0.12730407714844],
            [0.25584411621094, -0.35191345214844],
            [0.63844299316406, -1.08564758300781],
            [1.02522277832031, -1.06314086914062],
            [0.81007385253906, -1.03520202636719],
            [0.00959777832031, -0.06190490722656]
        ];
        createPathGrp(contents, 'Leaves_R_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [72.3323, 6.4485]);
    };
    var createLeavesR04 = function () {
        var vertices = [
            [-4.01884460449219, -6.85884094238281],
            [-3.97528076171875, -6.82807922363281],
            [-1.97880554199219, -2.74751281738281],
            [-0.28765869140625, 1.90133666992188],
            [-0.53575134277344, 4.7900390625],
            [-0.59837341308594, 5.14125061035156],
            [-0.41767883300781, 4.82888793945312],
            [0.16596984863281, 2.4278564453125],
            [1.55812072753906, -1.58554077148438],
            [3.1290283203125, -5.89813232421875],
            [3.19915771484375, -8.11869812011719],
            [3.19772338867188, -8.41194152832031],
            [3.456787109375, -7.87014770507812],
            [4.07588195800781, -2.95790100097656],
            [0.88703918457031, 5.083251953125],
            [-1.49514770507812, 8.224853515625],
            [-1.71063232421875, 8.406494140625],
            [-1.75724792480469, 8.1939697265625],
            [-2.413330078125, 2.59912109375],
            [-4.01701354980469, -4.52609252929688],
            [-4.10008239746094, -6.54832458496094]
        ];
        var inTangents = [
            [-0.08990478515625, 0.10328674316406],
            [-0.0015869140625, -0.00788879394531],
            [-0.75045776367188, -1.31953430175781],
            [-0.19125366210938, -1.684814453125],
            [0.27458190917969, -0.9466552734375],
            [-0.036376953125, -0.14447021484375],
            [-0.03683471679688, 0.107421875],
            [-0.14817810058594, 0.81120300292969],
            [-0.59463500976562, 1.29296875],
            [-0.27543640136719, 1.52845764160156],
            [0.10301208496094, 0.74443054199219],
            [0, 0.13690185546875],
            [-0.05290222167969, -0.17279052734375],
            [0.13298034667969, -1.67597961425781],
            [2.12222290039062, -2.27394104003906],
            [0.65196228027344, -1.155029296875],
            [0.125244140625, 0.03385925292969],
            [-0.0137939453125, 0.07223510742188],
            [0.60981750488281, 1.82275390625],
            [0.29559326171875, 2.42852783203125],
            [-0.02780151367188, 0.67626953125]
        ];
        var outTangents = [
            [0.02601623535156, 0.01785278320312],
            [0.30792236328125, 1.53544616699219],
            [0.82579040527344, 1.45198059082031],
            [0.11117553710938, 0.97935485839844],
            [-0.03083801269531, 0.10630798339844],
            [0.13165283203125, -0.07415771484375],
            [0.26815795898438, -0.7822265625],
            [0.25758361816406, -1.41012573242188],
            [0.64122009277344, -1.39430236816406],
            [0.13291931152344, -0.73762512207031],
            [-0.01063537597656, -0.07679748535156],
            [0.17156982421875, 0.18020629882812],
            [0.49031066894531, 1.60127258300781],
            [-0.23828125, 3.00311279296875],
            [-0.89582824707031, 0.95986938476562],
            [-0.04728698730469, 0.08378601074219],
            [-0.09178161621094, -0.02481079101562],
            [0.36940002441406, -1.9344482421875],
            [-0.77592468261719, -2.31924438476562],
            [-0.08168029785156, -0.67109680175781],
            [0.00413513183594, -0.10055541992188]
        ];
        createPathGrp(contents, 'Leaves_R_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [73.7413, -2.4803]);
    };
    var createLeavesR05 = function () {
        var vertices = [
            [-4.28227233886719, -4.31887817382812],
            [-2.08685302734375, -1.90487670898438],
            [0.83148193359375, 1.45405578613281],
            [1.68397521972656, 4.04383850097656],
            [1.86067199707031, 4.574951171875],
            [1.85874938964844, 3.97325134277344],
            [1.62715148925781, 0.55183410644531],
            [1.98890686035156, -3.20143127441406],
            [1.78346252441406, -7.41619873046875],
            [1.28652954101562, -8.4788818359375],
            [1.56031799316406, -8.29598999023438],
            [4.1876220703125, -2.44035339355469],
            [3.72413635253906, 2.47090148925781],
            [2.40789794921875, 6.26698303222656],
            [1.94795227050781, 8.47749328613281],
            [1.85856628417969, 8.39698791503906],
            [-0.4561767578125, 3.61061096191406],
            [-2.96641540527344, -0.16142272949219],
            [-4.28836059570312, -4.18690490722656]
        ];
        var inTangents = [
            [-0.00242614746094, 0.04405212402344],
            [-0.78118896484375, -0.74850463867188],
            [-0.76780700683594, -1.29937744140625],
            [-0.11264038085938, -0.9197998046875],
            [-0.1292724609375, -0.169677734375],
            [0.01356506347656, 0.19969177246094],
            [0.02987670898438, 1.14167785644531],
            [-0.13165283203125, 1.25051879882812],
            [0.48245239257812, 1.38471984863281],
            [0.20561218261719, 0.35444641113281],
            [-0.05770874023438, -0.07553100585938],
            [-0.32402038574219, -2.20420837402344],
            [0.49752807617188, -1.604736328125],
            [0.3807373046875, -1.28570556640625],
            [0.0970458984375, -0.74681091308594],
            [0.00724792480469, 0.03692626953125],
            [1.02413940429688, 1.47502136230469],
            [0.727294921875, 1.33158874511719],
            [0.2373046875, 1.40843200683594]
        ];
        var outTangents = [
            [0.51774597167969, 1.02067565917969],
            [1.07514953613281, 1.03016662597656],
            [0.47459411621094, 0.80316162109375],
            [0.02214050292969, 0.18081665039062],
            [0, -0.20060729980469],
            [-0.0775146484375, -1.14059448242188],
            [-0.03298950195312, -1.26089477539062],
            [0.14878845214844, -1.4134521484375],
            [-0.12628173828125, -0.36247253417969],
            [0.1708984375, 0.00294494628906],
            [1.33383178710938, 1.74601745605469],
            [0.2469482421875, 1.67996215820312],
            [-0.39680480957031, 1.27986145019531],
            [-0.21481323242188, 0.72541809082031],
            [-0.074951171875, 0.01078796386719],
            [-0.3526611328125, -1.79829406738281],
            [-0.86135864257812, -1.24057006835938],
            [-0.68980407714844, -1.26296997070312],
            [-0.00715637207031, -0.04244995117188]
        ];
        createPathGrp(contents, 'Leaves_R_05', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [71.9413, -11.6729]);
    };
    var createLeavesR06 = function () {
        var vertices = [
            [-0.71839904785156, -6.48236083984375],
            [0.05299377441406, -6.24517822265625],
            [4.01638793945312, -0.88473510742188],
            [4.04035949707031, 3.70222473144531],
            [4.03929138183594, 6.30398559570312],
            [3.99964904785156, 6.48236083984375],
            [3.05204772949219, 5.06747436523438],
            [1.15525817871094, 3.2379150390625],
            [-2.7701416015625, -0.52804565429688],
            [-4.13966369628906, -3.71652221679688],
            [-4.12908935546875, -4.3048095703125],
            [-3.48143005371094, -3.22918701171875],
            [-0.53984069824219, -0.720458984375],
            [2.45329284667969, 2.26325988769531],
            [3.05296325683594, 3.36381530761719],
            [2.76177978515625, 2.35993957519531],
            [1.53250122070312, -2.28080749511719],
            [0.15425109863281, -5.61395263671875]
        ];
        var inTangents = [
            [0.33169555664062, 0.32127380371094],
            [-0.21505737304688, -0.11418151855469],
            [-0.38458251953125, -2.47984313964844],
            [0.1468505859375, -1.52886962890625],
            [-0.091064453125, -0.86732482910156],
            [0.07626342773438, -0.06869506835938],
            [0.349853515625, 0.44740295410156],
            [0.7059326171875, 0.53334045410156],
            [1.08480834960938, 1.48837280273438],
            [0.18499755859375, 1.17929077148438],
            [-0.07302856445312, 0.23158264160156],
            [-0.25181579589844, -0.32205200195312],
            [-1.05723571777344, -0.74446105957031],
            [-0.74444580078125, -1.24711608886719],
            [-0.23039245605469, -0.42477416992188],
            [0.11776733398438, 0.29351806640625],
            [0.3253173828125, 1.56977844238281],
            [0.77723693847656, 0.98054504394531]
        ];
        var outTangents = [
            [0.32905578613281, 0.02264404296875],
            [2.174560546875, 1.15460205078125],
            [0.23698425292969, 1.528076171875],
            [-0.08343505859375, 0.86865234375],
            [0.00556945800781, 0.05305480957031],
            [-0.30685424804688, -0.48162841796875],
            [-0.54765319824219, -0.70033264160156],
            [-1.45689392089844, -1.10072326660156],
            [-0.69883728027344, -0.95881652832031],
            [-0.02790832519531, -0.17793273925781],
            [0.24166870117188, 0.37449645996094],
            [0.81121826171875, 1.03750610351562],
            [1.17022705078125, 0.82403564453125],
            [0.19721984863281, 0.33038330078125],
            [-0.06825256347656, -0.41053771972656],
            [-0.6005859375, -1.49681091308594],
            [-0.24783325195312, -1.19589233398438],
            [-0.24055480957031, -0.303466796875]
        ];
        createPathGrp(contents, 'Leaves_R_06', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [68.7883, -18.2064]);
    };
    var createLeavesR07 = function () {
        var vertices = [
            [-4.20046997070312, -4.54922485351562],
            [2.09407043457031, -0.64251708984375],
            [3.17494201660156, 1.491943359375],
            [4.20046997070312, 4.54922485351562],
            [3.4547119140625, 3.98297119140625],
            [0.93881225585938, 1.85874938964844],
            [-1.33389282226562, -1.06263732910156],
            [-4.10279846191406, -4.41996765136719]
        ];
        var inTangents = [
            [0.03228759765625, 0.04336547851562],
            [-1.57551574707031, -2.12297058105469],
            [-0.26155090332031, -0.76164245605469],
            [-0.460205078125, -1.032470703125],
            [0.21815490722656, 0.18138122558594],
            [0.78477478027344, 0.77313232421875],
            [0.72686767578125, 0.99691772460938],
            [1.05636596679688, 1.00932312011719]
        ];
        var outTangents = [
            [2.3983154296875, 0.84513854980469],
            [0.48289489746094, 0.65068054199219],
            [0.34120178222656, 0.99354553222656],
            [-0.35404968261719, -0.13674926757812],
            [-0.8438720703125, -0.70164489746094],
            [-0.88754272460938, -0.8743896484375],
            [-0.8565673828125, -1.1748046875],
            [-0.03854370117188, -0.03681945800781]
        ];
        createPathGrp(contents, 'Leaves_R_07', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [65.5815, -23.4541]);
    };
    var createGlobePiece01 = function () {
        var vertices = [
            [0.33377075195312, 0.26670837402344],
            [-0.70953369140625, 0.39602661132812],
            [-1.20834350585938, 0.36669921875],
            [-1.359619140625, 0.12828063964844],
            [-1.14173889160156, -0.02891540527344],
            [0.00439453125, -0.37783813476562],
            [0.26420593261719, -0.42607116699219],
            [1.07464599609375, -0.34286499023438],
            [1.36334228515625, -0.18037414550781],
            [1.12831115722656, -0.05020141601562],
            [0.87074279785156, 0.10490417480469]
        ];
        var inTangents = [
            [0.25471496582031, 0.014892578125],
            [0.36373901367188, -0.24067687988281],
            [0.1634521484375, 0.06973266601562],
            [-0.02175903320312, 0.12045288085938],
            [-0.10073852539062, 0.03811645507812],
            [-0.34341430664062, 0.23942565917969],
            [-0.08770751953125, -0.03800964355469],
            [-0.27201843261719, -0.0081787109375],
            [-0.00836181640625, -0.17265319824219],
            [0.09053039550781, -0.02090454101562],
            [0.06282043457031, -0.08755493164062]
        ];
        var outTangents = [
            [-0.30441284179688, -0.04043579101562],
            [-0.12896728515625, 0.08534240722656],
            [-0.10321044921875, -0.04403686523438],
            [0.02169799804688, -0.12007141113281],
            [0.37530517578125, -0.14198303222656],
            [0.07794189453125, -0.05435180664062],
            [0.26304626464844, 0.114013671875],
            [0.12480163574219, 0.00375366210938],
            [0.00733947753906, 0.15155029296875],
            [-0.10446166992188, 0.02412414550781],
            [-0.11566162109375, 0.16122436523438]
        ];
        createPathGrp(contents, 'Globe_Piece_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [46.2798, -27.3924]);
    };
    var createGlobePiece02 = function () {
        var vertices = [
            [1.05995178222656, 0.58424377441406],
            [0.91244506835938, 0.70481872558594],
            [0.59162902832031, 0.52122497558594],
            [0.02294921875, 0.25984191894531],
            [-0.19924926757812, 0.19233703613281],
            [-0.88114929199219, -0.07234191894531],
            [-1.05986022949219, -0.17494201660156],
            [-0.90121459960938, -0.33346557617188],
            [-0.14686584472656, -0.64271545410156],
            [0.52386474609375, -0.36085510253906],
            [0.98429870605469, 0.45797729492188]
        ];
        var inTangents = [
            [-0.01829528808594, -0.03195190429688],
            [0.0760498046875, 0.010009765625],
            [0.08320617675781, 0.09750366210938],
            [0.23765563964844, -0.00885009765625],
            [0.04180908203125, 0.050537109375],
            [0.24891662597656, 0.03240966796875],
            [-0.003662109375, 0.12039184570312],
            [-0.07951354980469, 0.00303649902344],
            [-0.25151062011719, 0.10165405273438],
            [-0.14144897460938, -0.33885192871094],
            [-0.28117370605469, -0.20298767089844]
        ];
        var outTangents = [
            [-0.00880432128906, 0.11785888671875],
            [-0.13172912597656, -0.017333984375],
            [-0.1505126953125, -0.17640686035156],
            [-0.07484436035156, 0.00279235839844],
            [-0.181884765625, -0.21980285644531],
            [-0.07205200195312, -0.00938415527344],
            [0.00262451171875, -0.08628845214844],
            [0.29216003417969, -0.01113891601562],
            [0.34579467773438, -0.1397705078125],
            [0.12123107910156, 0.29039001464844],
            [0.04122924804688, 0.02976989746094]
        ];
        createPathGrp(contents, 'Globe_Piece_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [44.1799, -26.6207]);
    };
    var createGlobePiece03 = function () {
        var vertices = [
            [-0.17625427246094, -0.50213623046875],
            [0.56660461425781, 0.37254333496094],
            [0.32060241699219, 0.4178466796875],
            [-0.29501342773438, 0.06813049316406],
            [-0.56607055664062, -0.26649475097656]
        ];
        var inTangents = [
            [-0.15364074707031, 0.01451110839844],
            [0.06886291503906, -0.34303283691406],
            [0.07395935058594, 0.07882690429688],
            [0.232666015625, 0.07106018066406],
            [-0.04486083984375, 0.19728088378906]
        ];
        var outTangents = [
            [0.37968444824219, 0.01202392578125],
            [-0.04119873046875, 0.20524597167969],
            [-0.17192077636719, -0.18324279785156],
            [-0.16030883789062, -0.04896545410156],
            [0.0462646484375, -0.20347595214844]
        ];
        createPathGrp(contents, 'Globe_Piece_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [54.4153, -23.728]);
    };
    var createGlobePiece04 = function () {
        var vertices = [
            [-0.73118591308594, -0.78196716308594],
            [-0.20649719238281, -0.26947021484375],
            [-0.01310729980469, -0.04859924316406],
            [0.72245788574219, 0.48100280761719],
            [0.84718322753906, 0.72491455078125],
            [0.608154296875, 0.65872192382812],
            [-0.47483825683594, -0.02633666992188],
            [-0.85919189453125, -0.67671203613281]
        ];
        var inTangents = [
            [-0.10780334472656, 0.00364685058594],
            [0.05912780761719, -0.4564208984375],
            [-0.08914184570312, -0.02668762207031],
            [-0.26336669921875, -0.14994812011719],
            [0.06620788574219, -0.09648132324219],
            [0.05532836914062, 0.06240844726562],
            [0.35821533203125, 0.23085021972656],
            [0.11540222167969, 0.2210693359375]
        ];
        var outTangents = [
            [-0.00315856933594, 0.33493041992188],
            [-0.01249694824219, 0.09640502929688],
            [0.31013488769531, 0.09288024902344],
            [0.09524536132812, 0.05422973632812],
            [-0.09262084960938, 0.13497924804688],
            [-0.29489135742188, -0.33268737792969],
            [-0.26724243164062, -0.17222595214844],
            [-0.03366088867188, -0.06448364257812]
        ];
        createPathGrp(contents, 'Globe_Piece_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [48.4786, -20.6559]);
    };
    var createGlobePiece05 = function () {
        var vertices = [
            [-0.21432495117188, -1.25784301757812],
            [-0.02456665039062, -0.83769226074219],
            [0.26589965820312, -0.15789794921875],
            [0.30955505371094, -0.10633850097656],
            [0.43624877929688, 1.16142272949219],
            [0.2657470703125, 1.21562194824219],
            [0.15435791015625, 1.0137939453125],
            [-0.07633972167969, 0.25309753417969],
            [-0.38430786132812, -0.53059387207031],
            [-0.35792541503906, -0.92791748046875]
        ];
        var inTangents = [
            [-0.073486328125, 0.11640930175781],
            [-0.02767944335938, -0.1455078125],
            [-0.19473266601562, -0.18472290039062],
            [-0.00201416015625, -0.01860046386719],
            [-0.02967834472656, -0.42349243164062],
            [0.07154846191406, 0.06948852539062],
            [-0.0108642578125, 0.059814453125],
            [0.11085510253906, 0.23924255371094],
            [0.07872009277344, 0.27432250976562],
            [-0.12846374511719, 0.12236022949219]
        ];
        var outTangents = [
            [0.16029357910156, 0.12344360351562],
            [0.04685974121094, 0.24630737304688],
            [0.01651000976562, 0.01565551757812],
            [0.04573059082031, 0.42228698730469],
            [0.00761413574219, 0.10861206054688],
            [-0.05416870117188, -0.0526123046875],
            [0.0540771484375, -0.29769897460938],
            [-0.11872863769531, -0.2562255859375],
            [-0.04495239257812, -0.15664672851562],
            [0.09025573730469, -0.08596801757812]
        ];
        createPathGrp(contents, 'Globe_Piece_05', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [57.371, -11.3203]);
    };
    var createGlobePiece06 = function () {
        var vertices = [
            [0.49745178222656, 0.43489074707031],
            [0.37113952636719, 0.66853332519531],
            [0.132080078125, 0.56254577636719],
            [0.05685424804688, 0.20347595214844],
            [-0.19223022460938, -0.14349365234375],
            [-0.28843688964844, -0.17665100097656],
            [-0.47694396972656, -0.61064147949219],
            [-0.12931823730469, -0.49737548828125]
        ];
        var inTangents = [
            [-0.25112915039062, -0.2576904296875],
            [0.08932495117188, -0.020751953125],
            [0.06303405761719, 0.06686401367188],
            [0.206298828125, 0.02841186523438],
            [0.00169372558594, 0.1236572265625],
            [0.02568054199219, 0.01963806152344],
            [-0.06782531738281, 0.09768676757812],
            [-0.12083435058594, -0.049560546875]
        ];
        var outTangents = [
            [-0.022705078125, 0.12211608886719],
            [-0.09616088867188, 0.02232360839844],
            [-0.09613037109375, -0.10198974609375],
            [-0.00241088867188, -0.17631530761719],
            [-0.03321838378906, -0.00457763671875],
            [-0.14622497558594, -0.11187744140625],
            [0.12045288085938, -0.17350769042969],
            [0.44415283203125, 0.18214416503906]
        ];
        createPathGrp(contents, 'Globe_Piece_06', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [56.5825, -13.5684]);
    };
    var createGlobePiece07 = function () {
        var vertices = [
            [-1.10594177246094, 1.02873229980469],
            [-0.71058654785156, 0.47752380371094],
            [-0.41021728515625, 0.23899841308594],
            [0.40850830078125, -0.81001281738281],
            [0.51545715332031, -1.12324523925781],
            [0.596435546875, -1.41807556152344],
            [0.934326171875, -1.39936828613281],
            [0.91645812988281, -0.71583557128906],
            [0.67070007324219, -0.25459289550781],
            [0.2469482421875, 0.24455261230469],
            [-0.32304382324219, 0.92681884765625],
            [-0.42567443847656, 1.17576599121094],
            [-0.77618408203125, 1.46510314941406]
        ];
        var inTangents = [
            [-0.02702331542969, 0.20645141601562],
            [-0.36091613769531, -0.00714111328125],
            [-0.05876159667969, 0.13768005371094],
            [-0.45372009277344, 0.21543884277344],
            [0.10679626464844, 0.13206481933594],
            [-0.10720825195312, 0.07820129394531],
            [-0.1124267578125, -0.09860229492188],
            [0.25775146484375, -0.1627197265625],
            [0.02597045898438, -0.18295288085938],
            [0.29702758789062, -0.05903625488281],
            [0.16612243652344, -0.24827575683594],
            [0.05894470214844, -0.05717468261719],
            [0.26416015625, 0.07647705078125]
        ];
        var outTangents = [
            [-0.00289916992188, -0.32083129882812],
            [0.1566162109375, 0.00309753417969],
            [0.17961120605469, -0.42082214355469],
            [0.09808349609375, -0.04656982421875],
            [-0.12669372558594, -0.15667724609375],
            [0.12010192871094, -0.08761596679688],
            [0.23451232910156, 0.20565795898438],
            [-0.18182373046875, 0.11479187011719],
            [-0.03623962402344, 0.25541687011719],
            [-0.35124206542969, 0.06980895996094],
            [-0.04920959472656, 0.07353210449219],
            [-0.10723876953125, 0.10403442382812],
            [-0.25032043457031, -0.07247924804688]
        ];
        createPathGrp(contents, 'Globe_Piece_07', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [39.7985, -5.3347]);
    };
    var createGlobePiece08 = function () {
        var vertices = [
            [0.39505004882812, 0.79261779785156],
            [-0.1524658203125, 0.98374938964844],
            [-0.73495483398438, 1.03298950195312],
            [-0.82846069335938, 0.86967468261719],
            [-0.64352416992188, 0.60107421875],
            [-0.39118957519531, -0.21746826171875],
            [-0.33078002929688, -0.46176147460938],
            [-0.07258605957031, -0.78494262695312],
            [0.41160583496094, -1.07896423339844],
            [0.548828125, -0.69337463378906],
            [0.59611511230469, -0.4638671875],
            [0.57025146484375, -0.25007629394531],
            [0.02693176269531, 0.29933166503906],
            [0.11448669433594, 0.48503112792969],
            [0.55825805664062, 0.51618957519531],
            [0.8302001953125, 0.66433715820312],
            [0.56629943847656, 0.79093933105469]
        ];
        var inTangents = [
            [0.05691528320312, -0.0001220703125],
            [0.16078186035156, -0.19973754882812],
            [0.19999694824219, 0.04713439941406],
            [-0.0101318359375, 0.07647705078125],
            [-0.11589050292969, 0.05859375],
            [0.185546875, 0.3262939453125],
            [-0.19747924804688, 0.03385925292969],
            [-0.01728820800781, 0.14645385742188],
            [-0.2010498046875, -0.03076171875],
            [0.072509765625, -0.17506408691406],
            [-0.02377319335938, -0.07487487792969],
            [0.05599975585938, 0.00785827636719],
            [0.31605529785156, -0.07879638671875],
            [-0.08851623535156, -0.01748657226562],
            [-0.1480712890625, -0.01126098632812],
            [-0.00502014160156, -0.1402587890625],
            [0.10163879394531, -0.01589965820312]
        ];
        var outTangents = [
            [-0.206787109375, -0.008056640625],
            [-0.13821411132812, 0.17170715332031],
            [-0.07313537597656, -0.01724243164062],
            [0.01591491699219, -0.1199951171875],
            [0.33897399902344, -0.17137145996094],
            [-0.06259155273438, -0.11007690429688],
            [0.18563842773438, -0.03182983398438],
            [0.03733825683594, -0.31643676757812],
            [0.1854248046875, 0.02836608886719],
            [-0.03433227539062, 0.08285522460938],
            [0.0252685546875, 0.07962036132812],
            [-0.42558288574219, -0.05976867675781],
            [-0.163818359375, 0.04084777832031],
            [0.14431762695312, 0.02850341796875],
            [0.11346435546875, 0.00862121582031],
            [0.00619506835938, 0.1727294921875],
            [-0.05592346191406, 0.00874328613281]
        ];
        createPathGrp(contents, 'Globe_Piece_08', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [53.3894, -12.5704]);
    };
    var createGlobePiece09 = function () {
        var vertices = [
            [0.3721923828125, -0.03582763671875],
            [0.37030029296875, 0.74949645996094],
            [0.25474548339844, 0.98701477050781],
            [0.05972290039062, 0.85426330566406],
            [-0.24600219726562, 0.7113037109375],
            [-0.36189270019531, 0.42205810546875],
            [-0.14614868164062, 0.33837890625],
            [0.08831787109375, 0.18356323242188],
            [-0.02110290527344, -0.84169006347656],
            [-0.04714965820312, -0.96090698242188],
            [0.17536926269531, -0.98556518554688],
            [0.37020874023438, -0.78712463378906]
        ];
        var inTangents = [
            [-0.00042724609375, -0.25044250488281],
            [0.006591796875, -0.26162719726562],
            [0.08282470703125, -0.04435729980469],
            [0.05502319335938, 0.05824279785156],
            [0.10133361816406, 0.04837036132812],
            [-0.02999877929688, 0.12055969238281],
            [-0.0970458984375, -0.03224182128906],
            [0.00172424316406, 0.14154052734375],
            [0.23475646972656, 0.32107543945312],
            [-0.01644897460938, 0.02044677734375],
            [-0.0765380859375, -0.00860595703125],
            [-0.00245666503906, -0.11973571777344]
        ];
        var outTangents = [
            [0.00042724609375, 0.26181030273438],
            [-0.00230407714844, 0.09121704101562],
            [-0.12507629394531, 0.06700134277344],
            [-0.08444213867188, -0.08941650390625],
            [-0.12446594238281, -0.05940246582031],
            [0.03053283691406, -0.12269592285156],
            [0.14208984375, 0.04721069335938],
            [-0.00419616699219, -0.34397888183594],
            [-0.02291870117188, -0.03134155273438],
            [0.059814453125, -0.0743408203125],
            [0.11766052246094, 0.01321411132812],
            [0.005126953125, 0.25033569335938]
        ];
        createPathGrp(contents, 'Globe_Piece_09', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [31.3746, -3.7924]);
    };
    var createGlobePiece10 = function () {
        var vertices = [
            [0.31367492675781, -0.55178833007812],
            [0.26768493652344, 0.10050964355469],
            [0.16197204589844, 0.48544311523438],
            [-0.00102233886719, 0.50611877441406],
            [-0.30142211914062, -0.33551025390625],
            [-0.21516418457031, -0.45475769042969]
        ];
        var inTangents = [
            [-0.20999145507812, 0.01373291015625],
            [-0.1353759765625, -0.22650146484375],
            [0.05986022949219, -0.12335205078125],
            [0.05929565429688, 0.06744384765625],
            [-0.05653381347656, 0.33680725097656],
            [-0.05784606933594, -0.02499389648438]
        ];
        var outTangents = [
            [-0.13389587402344, 0.23048400878906],
            [0.06254577636719, 0.10466003417969],
            [-0.03910827636719, 0.08056640625],
            [-0.21116638183594, -0.24020385742188],
            [0.00968933105469, -0.05772399902344],
            [0.18437194824219, 0.07965087890625]
        ];
        createPathGrp(contents, 'Globe_Piece_10', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [31.5722, -2.1651]);
    };
    var createGlobePiece11 = function () {
        var vertices = [
            [-0.07363891601562, -0.29512023925781],
            [0.47552490234375, -0.17909240722656],
            [0.51679992675781, -0.03927612304688],
            [-0.11976623535156, 0.22807312011719],
            [-0.23291015625, 0.10281372070312],
            [-0.50607299804688, -0.16653442382812]
        ];
        var inTangents = [
            [-0.14271545410156, 0.05912780761719],
            [0.00865173339844, -0.05667114257812],
            [-0.21026611328125, 0.06903076171875],
            [0.22181701660156, 0.16508483886719],
            [0.02822875976562, 0.047607421875],
            [-0.08172607421875, 0.20231628417969]
        ];
        var outTangents = [
            [0.19218444824219, -0.00526428222656],
            [0.04734802246094, -0.01554870605469],
            [-0.04179382324219, 0.27400207519531],
            [-0.04446411132812, -0.03309631347656],
            [-0.07038879394531, -0.11871337890625],
            [0.06370544433594, -0.15773010253906]
        ];
        createPathGrp(contents, 'Globe_Piece_11', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [47.1992, -11.8752]);
    };
    var createGlobePiece12 = function () {
        var vertices = [
            [-0.24751281738281, -0.617431640625],
            [0.56248474121094, -0.51739501953125],
            [0.72251892089844, -0.38739013671875],
            [0.18247985839844, 0.62255859375],
            [-0.23750305175781, 0.62255859375],
            [-0.78749084472656, 0.20257568359375]
        ];
        var inTangents = [
            [-0.3699951171875, 0.050048828125],
            [-0.26995849609375, -0.02001953125],
            [-0.0400390625, -0.05999755859375],
            [0.4100341796875, -0.00994873046875],
            [0, 0],
            [0.02001953125, 0.34002685546875]
        ];
        var outTangents = [
            [0.280029296875, -0.02996826171875],
            [0.05999755859375, 0],
            [0.219970703125, 0.3599853515625],
            [0, 0],
            [-0.45001220703125, -0.00994873046875],
            [-0.030029296875, -0.4599609375]
        ];
        createPathGrp(contents, 'Globe_Piece_12', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [31.8575, -6.6279]);
    };
    var createGlobePiece13 = function () {
        var vertices = [
            [-0.19462585449219, -0.23367309570312],
            [0.42536926269531, -0.13369750976562],
            [0.42536926269531, 0.18630981445312],
            [0.13539123535156, 0.18630981445312],
            [-0.24461364746094, 0.24630737304688],
            [-0.39463806152344, 0.27633666992188],
            [-0.47459411621094, 0.06631469726562]
        ];
        var inTangents = [
            [-0.17999267578125, 0.02001953125],
            [-0.15997314453125, -0.26995849609375],
            [0.09002685546875, -0.0899658203125],
            [0.0999755859375, 0.030029296875],
            [0.0999755859375, -0.25],
            [0.05999755859375, 0.02996826171875],
            [0.00994873046875, 0.08001708984375]
        ];
        var outTangents = [
            [0.22003173828125, -0.02001953125],
            [0.04998779296875, 0.10003662109375],
            [-0.08001708984375, 0.10003662109375],
            [-0.1400146484375, -0.03997802734375],
            [-0.02001953125, 0.050048828125],
            [-0.0799560546875, -0.04998779296875],
            [-0.030029296875, -0.2099609375]
        ];
        createPathGrp(contents, 'Globe_Piece_13', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [42.0646, -10.1216]);
    };
    var createGlobePiece14 = function () {
        var vertices = [
            [-0.69924926757812, -0.35861206054688],
            [-0.54922485351562, -0.51858520507812],
            [-0.41921997070312, -0.36862182617188],
            [-0.34921264648438, -0.19857788085938],
            [0.53073120117188, 0.10140991210938],
            [0.70077514648438, 0.33139038085938],
            [0.48074340820312, 0.51138305664062],
            [-0.60922241210938, -0.03860473632812]
        ];
        var inTangents = [
            [-0.010009765625, 0.1199951171875],
            [-0.08001708984375, 0.010009765625],
            [0, -0.0899658203125],
            [-0.050048828125, 0.01995849609375],
            [-0.3499755859375, 0.04998779296875],
            [-0.02001953125, -0.1099853515625],
            [0.11004638671875, 0.0400390625],
            [0.25, 0.41998291015625]
        ];
        var outTangents = [
            [0.02001953125, -0.08001708984375],
            [0.1099853515625, -0.02001953125],
            [0, 0.07000732421875],
            [0.38995361328125, -0.1700439453125],
            [0.11004638671875, -0.010009765625],
            [0, 0.1400146484375],
            [-0.38995361328125, -0.1199951171875],
            [-0.05999755859375, -0.0999755859375]
        ];
        createPathGrp(contents, 'Globe_Piece_14', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [48.6892, -0.6266]);
    };
    var createGlobePiece15 = function () {
        var vertices = [
            [-0.76585388183594, 0.22221374511719],
            [0.05415344238281, -0.21778869628906],
            [0.44410705566406, -0.32777404785156],
            [0.69410705566406, -0.40779113769531],
            [0.71412658691406, -0.09779357910156],
            [-0.13584899902344, -0.02778625488281],
            [-0.42588806152344, 0.09220886230469],
            [-0.49589538574219, 0.28221130371094],
            [-0.69584655761719, 0.44224548339844]
        ];
        var inTangents = [
            [0.01995849609375, 0.07000732421875],
            [-0.47003173828125, -0.14996337890625],
            [-0.0999755859375, 0.19000244140625],
            [-0.0899658203125, -0.0799560546875],
            [0.08001708984375, -0.1199951171875],
            [0.3599853515625, 0.23004150390625],
            [0.030029296875, -0.199951171875],
            [0.0400390625, -0.04998779296875],
            [0.0999755859375, 0.02001953125]
        ];
        var outTangents = [
            [-0.010009765625, -0.38995361328125],
            [0.16998291015625, 0.050048828125],
            [0.0400390625, -0.0999755859375],
            [0.09002685546875, 0.08001708984375],
            [-0.20001220703125, 0.25],
            [-0.20001220703125, -0.1300048828125],
            [-0.010009765625, 0.07000732421875],
            [-0.03997802734375, 0.08001708984375],
            [-0.12005615234375, -0.030029296875]
        ];
        createPathGrp(contents, 'Globe_Piece_15', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [43.7259, -0.1575]);
    };
    var createGlobePiece16 = function () {
        var vertices = [
            [-0.98583984375, -0.39549255371094],
            [-0.04583740234375, -1.00547790527344],
            [0.72418212890625, -0.56547546386719],
            [1.07421875, 0.49452209472656],
            [0.814208984375, 0.55451965332031],
            [0.4442138671875, 0.74452209472656],
            [0.34417724609375, 1.00453186035156],
            [0.1441650390625, 0.80451965332031],
            [0.23419189453125, -0.00547790527344],
            [0.72418212890625, -0.56547546386719],
            [-0.6058349609375, -0.11546325683594],
            [0.45416259765625, -0.57548522949219],
            [-0.94580078125, -0.02543640136719]
        ];
        var inTangents = [
            [-0.14996337890625, 0.1400146484375],
            [-0.4599609375, 0.010009765625],
            [-0.21002197265625, -0.40997314453125],
            [-0.07000732421875, -0.3599853515625],
            [0.0799560546875, 0.05999755859375],
            [0.00994873046875, -0.27996826171875],
            [0.1400146484375, -0.02001953125],
            [0.02001953125, 0.10003662109375],
            [-0.46002197265625, 0.22003173828125],
            [-0.1400146484375, 0.21002197265625],
            [0.09002685546875, 0.02001953125],
            [0.21002197265625, -0.489990234375],
            [0.14996337890625, 0.1099853515625]
        ];
        var outTangents = [
            [0.280029296875, -0.25],
            [0.4200439453125, -0.010009765625],
            [0.4100341796875, 0.260009765625],
            [0.02996826171875, 0.1400146484375],
            [-0.280029296875, -0.2099609375],
            [0, 0.10003662109375],
            [-0.1199951171875, 0.02001953125],
            [-0.05999755859375, -0.27996826171875],
            [-0.03997802734375, -0.3699951171875],
            [-0.0899658203125, 0],
            [-0.47998046875, -0.13995361328125],
            [-0.0699462890625, 0.1300048828125],
            [-0.1400146484375, -0.10003662109375]
        ];
        createPathGrp(contents, 'Globe_Piece_16', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [49.4558, -10.6698]);
    };
    var createGlobePiece17 = function () {
        var vertices = [
            [1.51422119140625, 0.52630615234375],
            [-0.2757568359375, 0.19635009765625],
            [-0.8857421875, -0.013671875],
            [-1.7957763671875, -0.34368896484375],
            [-1.07574462890625, -0.44366455078125],
            [0.4942626953125, -0.05364990234375],
            [0.80426025390625, 0.07635498046875],
            [1.5042724609375, 0.206298828125],
            [1.79425048828125, 0.32635498046875]
        ];
        var inTangents = [
            [0.1199951171875, -0.02996826171875],
            [0.54998779296875, 0.3599853515625],
            [0.22998046875, 0.010009765625],
            [0.32000732421875, 0.1199951171875],
            [-0.27001953125, -0.07000732421875],
            [-0.59002685546875, 0.13995361328125],
            [-0.10003662109375, -0.06005859375],
            [-0.24005126953125, 0],
            [-0.02001953125, -0.1400146484375]
        ];
        var outTangents = [
            [-0.63995361328125, 0.1700439453125],
            [-0.19000244140625, -0.1300048828125],
            [-0.33001708984375, 0],
            [0.20001220703125, -0.4599609375],
            [0.52996826171875, 0.1199951171875],
            [0.1099853515625, -0.02001953125],
            [0.219970703125, 0.12994384765625],
            [0.1099853515625, 0.010009765625],
            [0.02001953125, 0.17999267578125]
        ];
        createPathGrp(contents, 'Globe_Piece_17', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [49.8358, 3.4784]);
    };
    var createGlobePiece18 = function () {
        var vertices = [
            [2.26535034179688, 0.35092163085938],
            [0.13534545898438, 1.37094116210938],
            [-0.76461791992188, 1.61093139648438],
            [-1.14462280273438, 1.37094116210938],
            [-1.66464233398438, 1.16098022460938],
            [-1.80465698242188, 1.25094604492188],
            [-2.43466186523438, 1.12094116210938],
            [-2.12466430664062, 0.26095581054688],
            [-0.77462768554688, 0.47097778320312],
            [-0.58462524414062, 0.71096801757812],
            [-0.72463989257812, 0.13095092773438],
            [-1.07461547851562, -0.10903930664062],
            [-0.98464965820312, -0.18905639648438],
            [-0.43466186523438, -0.07907104492188],
            [-0.15463256835938, 0.35092163085938],
            [0.95535278320312, 0.90097045898438],
            [1.12533569335938, 0.76095581054688],
            [0.99533081054688, 0.63095092773438],
            [0.43533325195312, 0.17092895507812],
            [0.44534301757812, -0.08901977539062],
            [0.80532836914062, -0.46902465820312],
            [0.79537963867188, -1.03903198242188],
            [0.97537231445312, -1.22903442382812],
            [1.30532836914062, -1.37905883789062],
            [1.72537231445312, -1.56906127929688],
            [2.26535034179688, -1.49905395507812],
            [2.47537231445312, -1.30905151367188],
            [2.34536743164062, -1.07907104492188],
            [1.89535522460938, -0.91903686523438],
            [1.13534545898438, -0.54904174804688],
            [1.09536743164062, 0.23092651367188],
            [1.69534301757812, 0.10092163085938],
            [1.95535278320312, -0.11904907226562],
            [2.42538452148438, -0.08901977539062]
        ];
        var inTangents = [
            [0.16998291015625, -0.1099853515625],
            [0.75, -0.25],
            [0.29998779296875, -0.0799560546875],
            [0.03997802734375, 0.25],
            [0.280029296875, -0.1700439453125],
            [0.04998779296875, -0.02001953125],
            [0.05999755859375, 0.17999267578125],
            [-0.27996826171875, 0.1400146484375],
            [-0.45001220703125, -0.10003662109375],
            [-0.1600341796875, -0.030029296875],
            [0.3599853515625, 0.1400146484375],
            [0.04998779296875, 0.16998291015625],
            [-0.04998779296875, 0],
            [-0.14996337890625, -0.17999267578125],
            [-0.09002685546875, -0.14996337890625],
            [-0.21002197265625, 0.02996826171875],
            [-0.00994873046875, 0.0999755859375],
            [0.07000732421875, 0.010009765625],
            [0.21002197265625, 0.1199951171875],
            [-0.05999755859375, -0.02001953125],
            [-0.1099853515625, 0.1300048828125],
            [0.07000732421875, 0.17999267578125],
            [-0.1099853515625, 0.01995849609375],
            [-0.00994873046875, 0.19000244140625],
            [-0.22003173828125, -0.07000732421875],
            [-0.17999267578125, -0.02001953125],
            [-0.010009765625, -0.1199951171875],
            [0.0899658203125, -0.03997802734375],
            [0.1500244140625, 0.010009765625],
            [0.23004150390625, -0.1600341796875],
            [-0.16998291015625, -0.1099853515625],
            [-0.16998291015625, 0.21002197265625],
            [-0.0999755859375, 0.05999755859375],
            [-0.1400146484375, -0.21002197265625]
        ];
        var outTangents = [
            [-0.66998291015625, 0.44000244140625],
            [-0.29998779296875, 0.09002685546875],
            [-0.05999755859375, -0.32000732421875],
            [-0.22003173828125, 0.05999755859375],
            [-0.04998779296875, 0.02996826171875],
            [-0.260009765625, 0.1099853515625],
            [-0.13995361328125, -0.3800048828125],
            [0.52001953125, -0.280029296875],
            [0.0999755859375, 0.01995849609375],
            [0.1300048828125, -0.239990234375],
            [-0.1300048828125, -0.04998779296875],
            [-0.010009765625, -0.0400390625],
            [0.19000244140625, 0],
            [0.10003662109375, 0.1300048828125],
            [0.1099853515625, 0.19000244140625],
            [0.08001708984375, -0.02001953125],
            [0, -0.09002685546875],
            [-0.28997802734375, -0.03997802734375],
            [-0.0799560546875, -0.04998779296875],
            [0.3800048828125, 0.0899658203125],
            [0.1800537109375, -0.19000244140625],
            [-0.07000732421875, -0.20001220703125],
            [0.1300048828125, -0.010009765625],
            [0.030029296875, -0.3499755859375],
            [0.16998291015625, 0.04998779296875],
            [0.1099853515625, 0.02001953125],
            [0.010009765625, 0.1099853515625],
            [-0.1500244140625, 0.05999755859375],
            [-0.34002685546875, -0.0400390625],
            [-0.16998291015625, 0.1199951171875],
            [0.219970703125, 0.1500244140625],
            [0.07000732421875, -0.0799560546875],
            [0.1600341796875, -0.1199951171875],
            [0.13995361328125, 0.2099609375]
        ];
        createPathGrp(contents, 'Globe_Piece_18', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [45.4147, 1.8938]);
    };
    var createGlobePiece19 = function () {
        var vertices = [
            [-1.15432739257812, 2.51254272460938],
            [-0.92428588867188, 2.18258666992188],
            [-1.12429809570312, 1.53256225585938],
            [-1.12429809570312, 1.14254760742188],
            [-0.36428833007812, 0.30258178710938],
            [-0.51431274414062, -0.35745239257812],
            [-1.49429321289062, -1.16744995117188],
            [-1.51431274414062, -2.05746459960938],
            [-0.39431762695312, -2.03744506835938],
            [-0.05429077148438, -1.69741821289062],
            [-0.02432250976562, -1.35745239257812],
            [-0.03427124023438, -1.12747192382812],
            [0.23568725585938, -1.08743286132812],
            [0.72567749023438, -0.78744506835938],
            [1.01571655273438, 0.01254272460938],
            [1.57571411132812, 0.15255737304688],
            [1.75570678710938, 0.22256469726562]
        ];
        var inTangents = [
            [0, 0],
            [-0.05999755859375, 0.1199951171875],
            [0.27996826171875, 0.1500244140625],
            [-0.239990234375, 0.1400146484375],
            [-0.27001953125, 0.25994873046875],
            [0.33001708984375, 0.27001953125],
            [0.239990234375, 0.17999267578125],
            [-0.33001708984375, 0.300048828125],
            [-0.66998291015625, -0.65997314453125],
            [-0.1099853515625, -0.1199951171875],
            [0.1600341796875, -0.1300048828125],
            [-0.08001708984375, -0.0799560546875],
            [-0.1099853515625, 0.08001708984375],
            [0.030029296875, -0.260009765625],
            [-0.07000732421875, -0.27996826171875],
            [-0.20001220703125, -0.010009765625],
            [-0.030029296875, -0.08001708984375]
        ];
        var outTangents = [
            [0.07000732421875, -0.1099853515625],
            [0.14996337890625, -0.280029296875],
            [-0.22998046875, -0.1400146484375],
            [0.34002685546875, -0.20001220703125],
            [0.17999267578125, -0.1800537109375],
            [-0.33001708984375, -0.260009765625],
            [-0.34002685546875, -0.27996826171875],
            [0.6400146484375, -0.5799560546875],
            [0.11004638671875, 0.1099853515625],
            [0.1099853515625, 0.0999755859375],
            [-0.0899658203125, 0.08001708984375],
            [0.0799560546875, 0.08001708984375],
            [0.21002197265625, -0.1300048828125],
            [-0.02996826171875, 0.32000732421875],
            [0.05999755859375, 0.21002197265625],
            [0.05999755859375, 0.010009765625],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Piece_19', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [54.0643, 7.8721]);
    };
    var createGlobePiece20 = function () {
        var vertices = [
            [-2.70455932617188, 2.53054809570312],
            [-3.38455200195312, 1.13052368164062],
            [-3.37454223632812, 1.00051879882812],
            [-3.14450073242188, 0.90054321289062],
            [-3.44454956054688, 0.34054565429688],
            [-3.79452514648438, -0.46945190429688],
            [-3.73452758789062, -0.75949096679688],
            [-3.49453735351562, -0.67947387695312],
            [-3.36453247070312, -0.35946655273438],
            [-3.42453002929688, -0.02944946289062],
            [-3.10452270507812, 0.07052612304688],
            [-2.59451293945312, -0.07949829101562],
            [-2.32455444335938, -0.33944702148438],
            [-2.13455200195312, -0.66946411132812],
            [-1.84451293945312, -1.11947631835938],
            [-1.56454467773438, -1.69949340820312],
            [-1.38455200195312, -2.11947631835938],
            [-1.80453491210938, -2.10946655273438],
            [-1.94454956054688, -2.13949584960938],
            [-1.45455932617188, -2.86947631835938],
            [-1.17453002929688, -3.02944946289062],
            [-0.04452514648438, -3.54946899414062],
            [0.11544799804688, -4.00949096679688],
            [0.16549682617188, -4.21945190429688],
            [0.37545776367188, -4.17947387695312],
            [0.77548217773438, -3.83944702148438],
            [1.07546997070312, -3.71945190429688],
            [2.30545043945312, -2.48947143554688],
            [2.41549682617188, -3.00949096679688],
            [2.15548706054688, -2.31948852539062],
            [2.49545288085938, -2.27944946289062],
            [2.67544555664062, -2.51943969726562],
            [2.94546508789062, -2.61947631835938],
            [3.07546997070312, -2.33944702148438],
            [3.15548706054688, -1.76943969726562],
            [2.79544067382812, -0.98947143554688],
            [2.33547973632812, -0.72946166992188],
            [2.88546752929688, -0.72946166992188],
            [3.13546752929688, -0.63949584960938],
            [3.42544555664062, 0.40054321289062],
            [3.69546508789062, 0.86050415039062],
            [3.78549194335938, 1.00051879882812],
            [3.66549682617188, 1.60055541992188],
            [2.79544067382812, 2.28054809570312],
            [2.19546508789062, 2.33053588867188],
            [1.64547729492188, 3.27053833007812],
            [1.28549194335938, 4.14053344726562],
            [0.88546752929688, 4.24050903320312],
            [-1.81454467773438, 3.35055541992188]
        ];
        var inTangents = [
            [0, 0],
            [0.0400390625, 0.55999755859375],
            [-0.01995849609375, 0.0400390625],
            [0.03997802734375, 0.25],
            [0.20001220703125, 0.0999755859375],
            [-0.010009765625, 0.32000732421875],
            [-0.0999755859375, 0.07000732421875],
            [-0.07000732421875, -0.05999755859375],
            [0.07000732421875, -0.1500244140625],
            [-0.03997802734375, -0.1199951171875],
            [-0.17999267578125, 0.22003173828125],
            [-0.21002197265625, -0.0799560546875],
            [0.05999755859375, 0.19000244140625],
            [-0.2099609375, 0.04998779296875],
            [0.02996826171875, 0.22998046875],
            [-0.17999267578125, 0.1400146484375],
            [0.11004638671875, 0.17999267578125],
            [0.1400146484375, -0.07000732421875],
            [0.10003662109375, 0.02001953125],
            [-0.12994384765625, 0.25],
            [-0.1099853515625, 0.02996826171875],
            [-0.33001708984375, 0.27001953125],
            [0.1400146484375, 0.22003173828125],
            [-0.050048828125, 0.05999755859375],
            [-0.05999755859375, -0.04998779296875],
            [-0.05999755859375, -0.21002197265625],
            [-0.1099853515625, -0.010009765625],
            [-0.33001708984375, -0.449951171875],
            [0.260009765625, -0.1400146484375],
            [-0.11004638671875, -0.15997314453125],
            [-0.1199951171875, 0.1099853515625],
            [-0.05999755859375, 0.0799560546875],
            [-0.1199951171875, -0.05999755859375],
            [0.04998779296875, -0.1199951171875],
            [-0.1500244140625, -0.19000244140625],
            [0.20001220703125, -0.1099853515625],
            [0.16998291015625, -0.10003662109375],
            [-0.16998291015625, 0.1400146484375],
            [-0.04998779296875, -0.12994384765625],
            [0.030029296875, -0.3900146484375],
            [-0.22998046875, -0.0699462890625],
            [0.04998779296875, -0.08001708984375],
            [0.04998779296875, -0.20001220703125],
            [0.5400390625, 0.01995849609375],
            [0.1500244140625, -0.16998291015625],
            [-0.010009765625, -0.4000244140625],
            [0.07000732421875, -0.30999755859375],
            [0.1400146484375, 0.010009765625],
            [0.79998779296875, 0.5899658203125]
        ];
        var outTangents = [
            [-0.3299560546875, -0.4200439453125],
            [0, -0.03997802734375],
            [0.0400390625, -0.0999755859375],
            [-0.0400390625, -0.21002197265625],
            [-0.3699951171875, -0.17999267578125],
            [0, -0.10003662109375],
            [0.0999755859375, -0.05999755859375],
            [0.10003662109375, 0.08001708984375],
            [-0.05999755859375, 0.0999755859375],
            [0.04998779296875, 0.17999267578125],
            [0.1400146484375, -0.16998291015625],
            [0.26995849609375, 0.09002685546875],
            [-0.0699462890625, -0.22003173828125],
            [0.20001220703125, -0.04998779296875],
            [-0.04998779296875, -0.260009765625],
            [0.1500244140625, -0.1199951171875],
            [-0.0999755859375, -0.17999267578125],
            [-0.02001953125, 0],
            [0.260009765625, -0.219970703125],
            [0.06005859375, -0.1199951171875],
            [0.40997314453125, -0.11004638671875],
            [0.1500244140625, -0.1199951171875],
            [-0.04998779296875, -0.0799560546875],
            [0.0799560546875, -0.08001708984375],
            [0.03997802734375, 0.1199951171875],
            [0.1300048828125, 0.1199951171875],
            [0.55999755859375, 0.02996826171875],
            [0.17999267578125, 0.24005126953125],
            [-0.07000732421875, 0.030029296875],
            [0.07000732421875, 0.09002685546875],
            [0.08001708984375, -0.05999755859375],
            [0.07000732421875, -0.09002685546875],
            [0.1099853515625, 0.05999755859375],
            [-0.1099853515625, 0.219970703125],
            [0.1099853515625, 0.12994384765625],
            [-0.13995361328125, 0.08001708984375],
            [0.2099609375, 0.0899658203125],
            [0.1199951171875, -0.1099853515625],
            [0.1500244140625, 0.33001708984375],
            [-0.01995849609375, 0.20001220703125],
            [0.07000732421875, 0.02001953125],
            [-0.1199951171875, 0.19000244140625],
            [-0.10003662109375, 0.51995849609375],
            [-0.2099609375, -0.010009765625],
            [-0.239990234375, 0.27001953125],
            [0, 0.3599853515625],
            [-0.030029296875, 0.15997314453125],
            [-0.97998046875, -0.03997802734375],
            [0, 0]
        ];
        createPathGrp(contents, 'Globe_Piece_20', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [41.6745, -5.1758]);
    };
    var createGlobePiece21 = function () {
        var vertices = [
            [0.303955078125, -4.02926635742188],
            [0.35394287109375, -3.98922729492188],
            [1.61395263671875, -2.19924926757812],
            [1.56390380859375, -1.88925170898438],
            [1.21392822265625, -1.49923706054688],
            [1.44390869140625, -0.96926879882812],
            [2.58392333984375, 0.05075073242188],
            [3.27392578125, 2.14077758789062],
            [3.1239013671875, 3.10073852539062],
            [3.1539306640625, 3.81076049804688],
            [3.50390625, 3.76077270507812],
            [3.57391357421875, 4.52072143554688],
            [3.36395263671875, 4.76077270507812],
            [0.81390380859375, 4.76077270507812],
            [0.6239013671875, 4.66073608398438],
            [0.74395751953125, 4.48074340820312],
            [0.99395751953125, 3.95077514648438],
            [1.31390380859375, 3.60073852539062],
            [2.033935546875, 3.54074096679688],
            [2.33392333984375, 3.41073608398438],
            [2.9339599609375, 2.71072387695312],
            [3.10394287109375, 2.08078002929688],
            [2.9339599609375, 1.78073120117188],
            [2.58392333984375, 1.97073364257812],
            [2.3839111328125, 2.47073364257812],
            [1.4139404296875, 2.92074584960938],
            [1.31390380859375, 2.68075561523438],
            [1.59393310546875, 2.01077270507812],
            [1.303955078125, 1.16073608398438],
            [0.3739013671875, 1.47073364257812],
            [0.27392578125, 1.64077758789062],
            [-0.02606201171875, 1.76077270507812],
            [-0.0760498046875, 1.49075317382812],
            [-0.3360595703125, 1.09072875976562],
            [-0.74609375, 0.74075317382812],
            [-1.63604736328125, 0.03073120117188],
            [-2.966064453125, -1.00924682617188],
            [-3.4560546875, -1.60922241210938],
            [-3.47607421875, -1.93923950195312],
            [-0.7060546875, -4.70925903320312],
            [-0.01605224609375, -4.39926147460938]
        ];
        var inTangents = [
            [-0.24005126953125, -0.010009765625],
            [-0.010009765625, -0.010009765625],
            [-0.300048828125, -0.67999267578125],
            [0.1800537109375, -0.04998779296875],
            [0.07000732421875, -0.20001220703125],
            [-0.3499755859375, -0.01995849609375],
            [-0.28997802734375, -0.40997314453125],
            [-0.19000244140625, -0.71002197265625],
            [0.1800537109375, -0.32000732421875],
            [-0.08001708984375, -0.22003173828125],
            [-0.15997314453125, -0.02001953125],
            [-0.01995849609375, -0.25],
            [0.14996337890625, 0],
            [0, 0],
            [0.02001953125, 0.10003662109375],
            [-0.07000732421875, 0.030029296875],
            [0.15997314453125, 0.3399658203125],
            [-0.2099609375, 0.030029296875],
            [-0.239990234375, 0.02001953125],
            [-0.03997802734375, 0.1199951171875],
            [-0.25, 0.20001220703125],
            [0.03997802734375, 0.22998046875],
            [0.14996337890625, 0.02001953125],
            [0.07000732421875, -0.1300048828125],
            [0.0400390625, -0.17999267578125],
            [0.3399658203125, 0.16998291015625],
            [-0.0899658203125, 0.08001708984375],
            [-0.1099853515625, 0.219970703125],
            [0.3399658203125, 0.1500244140625],
            [0.1600341796875, -0.27996826171875],
            [0.03997802734375, -0.0400390625],
            [0.1199951171875, 0.05999755859375],
            [-0.030029296875, 0.09002685546875],
            [0.260009765625, 0.030029296875],
            [0.10003662109375, 0.20001220703125],
            [0.469970703125, 0.0400390625],
            [0.27001953125, 0.57000732421875],
            [0.22998046875, 0.14996337890625],
            [-0.1300048828125, 0.1199951171875],
            [-0.92999267578125, 0.91998291015625],
            [-0.07000732421875, -0.260009765625]
        ];
        var outTangents = [
            [0.01995849609375, 0],
            [0.3699951171875, 0.6300048828125],
            [0.04998779296875, 0.1300048828125],
            [-0.22998046875, 0.04998779296875],
            [-0.1300048828125, 0.3599853515625],
            [0.6600341796875, 0.050048828125],
            [0.42999267578125, 0.6099853515625],
            [0.08001708984375, 0.3399658203125],
            [-0.1199951171875, 0.21002197265625],
            [0.07000732421875, 0.19000244140625],
            [0.02001953125, 0.25994873046875],
            [0.010009765625, 0.1600341796875],
            [0, 0],
            [-0.0799560546875, 0],
            [-0.02996826171875, -0.0899658203125],
            [0.25994873046875, -0.0999755859375],
            [-0.08001708984375, -0.1600341796875],
            [0.24005126953125, -0.02996826171875],
            [0.1099853515625, -0.010009765625],
            [0.10003662109375, -0.3299560546875],
            [0.199951171875, -0.14996337890625],
            [-0.02001953125, -0.12005615234375],
            [-0.1400146484375, -0.01995849609375],
            [-0.08001708984375, 0.1600341796875],
            [-0.07000732421875, 0.3699951171875],
            [-0.1099853515625, -0.04998779296875],
            [0.22003173828125, -0.17999267578125],
            [0.17999267578125, -0.3699951171875],
            [-0.280029296875, -0.1300048828125],
            [-0.02996826171875, 0.05999755859375],
            [-0.08001708984375, 0.0799560546875],
            [-0.1199951171875, -0.050048828125],
            [0.0799560546875, -0.25],
            [-0.21002197265625, -0.01995849609375],
            [-0.19000244140625, -0.3499755859375],
            [-0.6500244140625, -0.05999755859375],
            [-0.1099853515625, -0.239990234375],
            [-0.1600341796875, -0.11004638671875],
            [0.91998291015625, -0.92999267578125],
            [0.14996337890625, -0.14996337890625],
            [0.05999755859375, 0.17999267578125]
        ];
        createPathGrp(contents, 'Globe_Piece_21', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [53.5961, -10.7761]);
    };
    var createGlobePiece22 = function () {
        var vertices = [
            [-0.76193237304688, 2.03524780273438],
            [-1.02194213867188, 1.72525024414062],
            [-0.53189086914062, 1.34524536132812],
            [0.14810180664062, 1.20523071289062],
            [0.21810913085938, 1.19522094726562],
            [0.89810180664062, 1.06521606445312],
            [1.25808715820312, 0.37521362304688],
            [1.62808227539062, -0.29476928710938],
            [1.12808227539062, -1.17477416992188],
            [0.80807495117188, -1.53475952148438],
            [0.77810668945312, -1.70480346679688],
            [0.43807983398438, -2.03475952148438],
            [0.06808471679688, -1.70480346679688],
            [-0.46194458007812, -0.28475952148438],
            [-0.55191040039062, -0.15475463867188],
            [-1.39193725585938, 1.13522338867188],
            [-1.50192260742188, 1.33523559570312],
            [-1.65194702148438, 1.21524047851562]
        ];
        var inTangents = [
            [0.79998779296875, 0.5899658203125],
            [-0.0699462890625, 0.14996337890625],
            [-0.22003173828125, 0.01995849609375],
            [-0.20001220703125, 0.17999267578125],
            [-0.02001953125, -0.010009765625],
            [-0.23004150390625, 0.1500244140625],
            [-0.05999755859375, 0.260009765625],
            [-0.04998779296875, 0.27996826171875],
            [0.469970703125, 0.0999755859375],
            [0, 0.219970703125],
            [0, 0.05999755859375],
            [0.19000244140625, 0.010009765625],
            [0.05999755859375, -0.19000244140625],
            [0.1800537109375, -0.48004150390625],
            [0.05999755859375, -0.02001953125],
            [0.10003662109375, -0.54998779296875],
            [0.0999755859375, -0.02001953125],
            [0.0400390625, 0.04998779296875]
        ];
        var outTangents = [
            [-0.1099853515625, -0.08001708984375],
            [0.08001708984375, -0.19000244140625],
            [0.22998046875, -0.02001953125],
            [0.01995849609375, -0.010009765625],
            [0.28997802734375, 0.260009765625],
            [0.26995849609375, -0.17999267578125],
            [0.04998779296875, -0.260009765625],
            [0.08001708984375, -0.489990234375],
            [-0.22998046875, -0.04998779296875],
            [0, -0.04998779296875],
            [-0.02001953125, -0.199951171875],
            [-0.20001220703125, -0.010009765625],
            [-0.16998291015625, 0.48004150390625],
            [-0.01995849609375, 0.04998779296875],
            [-0.60003662109375, 0.219970703125],
            [-0.010009765625, 0.08001708984375],
            [-0.07000732421875, 0.010009765625],
            [-0.3299560546875, -0.4200439453125]
        ];
        createPathGrp(contents, 'Globe_Piece_22', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [40.6219, -3.8605]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [43.3989, 0]);
    };
    createGlobePiece22();
    createGlobePiece21();
    createGlobePiece20();
    createGlobePiece19();
    createGlobePiece18();
    createGlobePiece17();
    createGlobePiece16();
    createGlobePiece15();
    createGlobePiece14();
    createGlobePiece13();
    createGlobePiece12();
    createGlobePiece11();
    createGlobePiece10();
    createGlobePiece09();
    createGlobePiece08();
    createGlobePiece07();
    createGlobePiece06();
    createGlobePiece05();
    createGlobePiece04();
    createGlobePiece03();
    createGlobePiece02();
    createGlobePiece01();
    createLeavesR07();
    createLeavesR06();
    createLeavesR05();
    createLeavesR04();
    createLeavesR03();
    createLeavesR02();
    createLeavesR01();
    createLeavesL07();
    createLeavesL06();
    createLeavesL05();
    createLeavesL04();
    createLeavesL03();
    createLeavesL02();
    createLeavesL01();
    createLeavesBottom();
    createCountries();
    createGlobeRing12();
    createGlobeRing11();
    createGlobeRing10();
    createGlobeRing09();
    createGlobeRing08();
    createGlobeRing07();
    createGlobeRing06();
    createGlobeRing05();
    createGlobeRing04();
    createGlobeRing03();
    createGlobeRing02();
    createGlobeRing01();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createUNBuildingLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מבנה או“ם',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [909.5429, 535.3016],
            textAnchor: [getOS() === 'Win' ? 94.2928 : -94.2928, -23.9483],
            bgSize: [332, 110],
            iconPos: [1063.6489, 539],
            iconAnchor: [43.3989, 0],
            iconScale: 100,
            iconId: 'U.N. Building'
        },
        {
            lang: 'English',
            text: 'U.N. Building',
            fontSize: 77,
            tracking: -29,
            textPos: [1006.127, 547.998],
            textAnchor: [getOS() === 'Win' ? 165.627 : -165.627, -21.252],
            bgSize: [462, 106],
            iconPos: [790.3072, 539.3489],
            iconAnchor: [43.3989, 0],
            iconScale: 97,
            iconId: 'U.N. Building'
        },
        {
            lang: 'Arabic',
            text: 'مبنى تابع للأمم المتحدة',
            fontSize: 64,
            tracking: -19,
            textPos: [918.9665, 538.3125],
            textAnchor: [getOS() === 'Win' ? 352.2164 : -352.2164, -18.4375],
            bgSize: [826, 92],
            iconPos: [1321.6942, 539.8518],
            iconAnchor: [43.3989, 0],
            iconScale: 83,
            iconId: 'U.N. Building'
        }
    ];
    createLocation(args, lang, mitug);
};
var createDiplomaticBuildingIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createBgCircle = function () {
        var vertices = [
            [-33.032958984375, 4.68290710449219],
            [-33.032958984375, -4.50393676757812],
            [-32.7846069335938, -5.62013244628906],
            [4.8055419921875, -32.47412109375],
            [31.6658782958984, -8.67486572265625],
            [20.6464538574219, 25.7608642578125],
            [4.46479797363281, 32.8996276855469],
            [-4.74517822265625, 32.8996276855469],
            [-5.69648742675781, 32.6721649169922],
            [-24.8413238525391, 22.0686492919922]
        ];
        var inTangents = [
            [1.17633056640625, 6.52383422851562],
            [0, 3.06228637695312],
            [-0.07513427734375, 0.37359619140625],
            [-17.9499053955078, -2.83940124511719],
            [-3.69993591308594, -13.43505859375],
            [10.7574005126953, -9.1934814453125],
            [5.96832275390625, -1.08514404296875],
            [3.06999206542969, 0],
            [0.32023620605469, 0.05888366699219],
            [5.17196655273438, 5.71638488769531]
        ];
        var outTangents = [
            [0, -3.06228637695312],
            [0.08311462402344, -0.37199401855469],
            [3.63058471679688, -18.0526275634766],
            [13.8599700927734, 2.19244384765625],
            [3.73477172851562, 13.5615539550781],
            [-4.649169921875, 3.97328186035156],
            [-3.06999206542969, 0],
            [-0.31697082519531, -0.07656860351562],
            [-7.57441711425781, -1.39259338378906],
            [-4.49798583984375, -4.97146606445312]
        ];
        createPathGrp(contents, 'BG_Circle', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createPiece01 = function () {
        var vertices = [
            [0.02409362792969, 6.96293640136719],
            [10.3697204589844, 6.972900390625],
            [12.0300598144531, 5.36869812011719],
            [10.2008056640625, -5.41995239257812],
            [8.10061645507812, -6.97636413574219],
            [-8.15666198730469, -6.97758483886719],
            [-10.2178649902344, -5.38105773925781],
            [-12.0259094238281, 5.24693298339844],
            [-10.3214721679688, 6.97738647460938]
        ];
        var inTangents = [
            [-3.44857788085938, 0.00070190429688],
            [-3.44834899902344, -0.02754211425781],
            [0.14608764648438, 1.26512145996094],
            [1.00404357910156, 3.53511047363281],
            [1.17799377441406, -0.00898742675781],
            [5.4188232421875, 0.04481506347656],
            [0.31831359863281, -1.13790893554688],
            [0.42701721191406, -3.57235717773438],
            [-1.24952697753906, 0.01441955566406]
        ];
        var outTangents = [
            [3.44857788085938, 0],
            [1.13652038574219, 0.00907897949219],
            [-0.41896057128906, -3.62814331054688],
            [-0.32855224609375, -1.15681457519531],
            [-5.41888427734375, 0.04136657714844],
            [-1.20449829101562, -0.00996398925781],
            [-0.97483825683594, 3.48489379882812],
            [-0.15631103515625, 1.30767822265625],
            [3.4481201171875, -0.03976440429688]
        ];
        createPathGrp(contents, 'Piece_01', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-0.1434, -9.2158]);
    };
    var createPiece02 = function () {
        var vertices = [
            [0.05604553222656, -6.96540832519531],
            [-10.4536437988281, -6.97331237792969],
            [-12.0315093994141, -5.45097351074219],
            [-10.1372833251953, 5.65646362304688],
            [-8.19790649414062, 6.96470642089844],
            [8.05911254882812, 6.97698974609375],
            [10.232666015625, 5.293701171875],
            [12.0245971679688, -5.33735656738281],
            [10.4014739990234, -6.97703552246094]
        ];
        var inTangents = [
            [3.44850158691406, -0.0008544921875],
            [3.50311279296875, 0.02104187011719],
            [-0.12445068359375, -1.17166137695312],
            [-1.0516357421875, -3.63548278808594],
            [-0.99079895019531, 0.00410461425781],
            [-5.41856384277344, -0.05345153808594],
            [-0.33097839355469, 1.1956787109375],
            [-0.43229675292969, 3.571044921875],
            [1.16816711425781, -0.01022338867188]
        ];
        var outTangents = [
            [-3.50325012207031, 0],
            [-1.06864929199219, -0.00640869140625],
            [0.39743041992188, 3.74171447753906],
            [0.30867004394531, 1.06707763671875],
            [5.41900634765625, -0.02243041992188],
            [1.27995300292969, 0.01261901855469],
            [0.96525573730469, -3.48716735839844],
            [0.14942932128906, -1.23440551757812],
            [-3.4482421875, 0.03016662597656]
        ];
        createPathGrp(contents, 'Piece_02', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-0.1396, 9.4279]);
    };
    var createPiece03 = function () {
        var vertices = [
            [-1.08424377441406, 6.9622802734375],
            [3.50509643554688, 6.96461486816406],
            [4.98100280761719, 5.64126586914062],
            [6.65052795410156, -5.47801208496094],
            [5.48046875, -6.96376037597656],
            [-0.74774169921875, -6.95693969726562],
            [-2.40890502929688, -6.12004089355469],
            [-6.72976684570312, 5.74696350097656],
            [-5.67356872558594, 6.96237182617188]
        ];
        var inTangents = [
            [-1.52978515625, -0.00144958496094],
            [-1.52973937988281, -0.00846862792969],
            [-0.05532836914062, 0.99322509765625],
            [-0.94287109375, 3.64617919921875],
            [1.12782287597656, -0.02301025390625],
            [2.07598876953125, 0.01910400390625],
            [0.39340209960938, -0.61152648925781],
            [0.48167419433594, -4.30812072753906],
            [-0.83331298828125, 0.0029296875]
        ];
        var outTangents = [
            [1.52978515625, 0],
            [0.90391540527344, 0.0050048828125],
            [0.20927429199219, -3.75650024414062],
            [0.28256225585938, -1.09269714355469],
            [-2.0753173828125, 0.0423583984375],
            [-0.71835327148438, -0.00660705566406],
            [-2.33625793457031, 3.63168334960938],
            [-0.09786987304688, 0.87528991699219],
            [1.52975463867188, -0.00537109375]
        ];
        createPathGrp(contents, 'Piece_03', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-21.6781, -9.221]);
    };
    var createPiece04 = function () {
        var vertices = [
            [-1.00123596191406, -6.95143127441406],
            [-1.00123596191406, -6.96002197265625],
            [-5.42662048339844, -6.96975708007812],
            [-6.71514892578125, -5.50053405761719],
            [-2.55795288085938, 5.92311096191406],
            [-0.67533874511719, 6.970703125],
            [5.55300903320312, 6.96733093261719],
            [6.6580810546875, 5.56979370117188],
            [4.96652221679688, -5.711669921875],
            [3.58816528320312, -6.95237731933594]
        ];
        var inTangents = [
            [1.52980041503906, 0],
            [0, 0.00286865234375],
            [1.47418212890625, 0.03892517089844],
            [-0.13758850097656, -1.11050415039062],
            [-2.17864990234375, -3.52229309082031],
            [-0.86819458007812, 0.01548767089844],
            [-2.07582092285156, -0.02882385253906],
            [0.26203918457031, 1.02719116210938],
            [0.21022033691406, 3.81234741210938],
            [0.83929443359375, -0.00181579589844]
        ];
        var outTangents = [
            [0, -0.00286865234375],
            [-1.4752197265625, 0],
            [-1.07518005371094, -0.02838134765625],
            [0.51214599609375, 4.13362121582031],
            [0.4412841796875, 0.71343994140625],
            [2.0755615234375, -0.03704833984375],
            [1.03471374511719, 0.01437377929688],
            [-0.94427490234375, -3.70161437988281],
            [-0.04983520507812, -0.90376281738281],
            [-1.52978515625, 0.00331115722656]
        ];
        createPathGrp(contents, 'Piece_04', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-21.672, 9.4213]);
    };
    var createPiece05 = function () {
        var vertices = [
            [1.05081176757812, -6.95816040039062],
            [-3.55239868164062, -6.95928955078125],
            [-4.96214294433594, -5.74362182617188],
            [-6.66461181640625, 5.57168579101562],
            [-5.54139709472656, 6.96124267578125],
            [0.70584106445312, 6.95799255371094],
            [2.38859558105469, 6.13920593261719],
            [6.73121643066406, -5.75796508789062],
            [5.654052734375, -6.96153259277344]
        ];
        var inTangents = [
            [1.534423828125, -0.00094604492188],
            [1.53439331054688, 0.00396728515625],
            [0.0521240234375, -0.91970825195312],
            [0.93385314941406, -3.71450805664062],
            [-1.01530456542969, 0.01275634765625],
            [-2.08230590820312, -0.0172119140625],
            [-0.39482116699219, 0.61054992675781],
            [0.82864379882812, -0.00459289550781],
            [-0.47463989257812, 4.32405090332031]
        ];
        var outTangents = [
            [-1.53440856933594, 0],
            [-0.82762145996094, -0.00213623046875],
            [-0.2166748046875, 3.82353210449219],
            [-0.26515197753906, 1.05465698242188],
            [2.08213806152344, -0.02615356445312],
            [0.71487426757812, 0.00590515136719],
            [2.35202026367188, -3.63706970214844],
            [0.09732055664062, -0.88653564453125],
            [-1.53436279296875, 0.00851440429688]
        ];
        createPathGrp(contents, 'Piece_05', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [21.3881, 9.4266]);
    };
    var createPiece06 = function () {
        var vertices = [
            [1.04525756835938, 6.95732116699219],
            [1.04525756835938, 6.9632568359375],
            [5.48316955566406, 6.9708251953125],
            [6.71940612792969, 5.60000610351562],
            [2.49285888671875, -6.00123596191406],
            [0.55062866210938, -6.96440124511719],
            [-5.36631774902344, -6.96987915039062],
            [-6.63737487792969, -5.41203308105469],
            [-4.97764587402344, 5.57586669921875],
            [-3.55706787109375, 6.96026611328125]
        ];
        var inTangents = [
            [-1.53411865234375, 0],
            [0, -0.00198364257812],
            [-1.47879028320312, -0.02902221679688],
            [0.12480163574219, 1.05146789550781],
            [2.24494934082031, 3.56532287597656],
            [0.84048461914062, -0.01290893554688],
            [1.97116088867188, 0.05128479003906],
            [-0.31985473632812, -1.20962524414062],
            [-0.22006225585938, -3.71070861816406],
            [-0.94642639160156, 0.00675964355469]
        ];
        var outTangents = [
            [0, 0.00198364257812],
            [1.47935485839844, 0],
            [0.98280334472656, 0.019287109375],
            [-0.49906921386719, -4.204833984375],
            [-0.45938110351562, -0.72956848144531],
            [-1.97201538085938, 0.03028869628906],
            [-1.18414306640625, -0.03080749511719],
            [0.95170593261719, 3.59925842285156],
            [0.05691528320312, 0.95965576171875],
            [1.53404235839844, -0.01095581054688]
        ];
        createPathGrp(contents, 'Piece_06', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [21.3887, -9.2178]);
    };
    var createPiece07 = function () {
        var vertices = [
            [-0.19526672363281, 3.82560729980469],
            [6.35858154296875, 3.83416748046875],
            [7.21910095214844, 2.35256958007812],
            [3.51799011230469, -2.39201354980469],
            [-3.4595947265625, -2.43656921386719],
            [-7.25851440429688, 2.43476867675781],
            [-6.42146301269531, 3.82991027832031]
        ];
        var inTangents = [
            [-2.07542419433594, -0.00163269042969],
            [-2.18421936035156, -0.0306396484375],
            [0.57258605957031, 1.02717590332031],
            [1.57177734375, 1.31523132324219],
            [2.27836608886719, -1.87942504882812],
            [1.00056457519531, -1.83285522460938],
            [-1.12631225585938, 0.01127624511719]
        ];
        var outTangents = [
            [2.18466186523438, 0],
            [1.2445068359375, 0.0174560546875],
            [-0.98965454101562, -1.77536010742188],
            [-2.28004455566406, -1.90789794921875],
            [-1.62542724609375, 1.3408203125],
            [-0.53134155273438, 0.97332763671875],
            [2.07521057128906, -0.02076721191406]
        ];
        createPathGrp(contents, 'Piece_07', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-0.1459, -24.4983]);
    };
    var createPiece08 = function () {
        var vertices = [
            [0.07049560546875, -3.82182312011719],
            [-6.48185729980469, -3.82553100585938],
            [-7.29389953613281, -2.52151489257812],
            [-3.52781677246094, 2.37400817871094],
            [3.57380676269531, 2.34942626953125],
            [7.17755126953125, -2.26573181152344],
            [6.2950439453125, -3.83531188964844]
        ];
        var inTangents = [
            [2.07492065429688, -0.00257873535156],
            [2.18405151367188, 0.01206970214844],
            [-0.48921203613281, -0.91508483886719],
            [-1.61192321777344, -1.35543823242188],
            [-2.32682800292969, 1.97364807128906],
            [-0.97611999511719, 1.71826171875],
            [1.37051391601562, -0.02763366699219]
        ];
        var outTangents = [
            [-2.18412780761719, 0],
            [-1.01234436035156, -0.00558471679688],
            [0.98399353027344, 1.84063720703125],
            [2.32925415039062, 1.95863342285156],
            [1.51918029785156, -1.28860473632812],
            [0.60646057128906, -1.06753540039062],
            [-2.07408142089844, 0.04182434082031]
        ];
        createPathGrp(contents, 'Piece_08', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-0.1501, 24.7044]);
    };
    var createPiece09 = function () {
        var vertices = [
            [-4.37059020996094, 2.90193176269531],
            [0.77339172363281, 2.89698791503906],
            [1.59904479980469, 2.44161987304688],
            [4.37059020996094, -2.90351867675781]
        ];
        var inTangents = [
            [2.32196044921875, -2.70161437988281],
            [-1.714599609375, 0.01078796386719],
            [-0.15802001953125, 0.29849243164062],
            [-1.05636596679688, 2.04464721679688]
        ];
        var outTangents = [
            [1.71467590332031, 0],
            [0.34165954589844, -0.00215148925781],
            [0.87014770507812, -1.64363098144531],
            [-3.56509399414062, 1.45713806152344]
        ];
        createPathGrp(contents, 'Piece_09', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-14.6003, -23.6093]);
    };
    var createPiece10 = function () {
        var vertices = [
            [-4.61711120605469, -2.89358520507812],
            [-1.90751647949219, 2.35429382324219],
            [-1.13006591796875, 2.86482238769531],
            [4.61711120605469, 2.88822937011719]
        ];
        var inTangents = [
            [3.55148315429688, 1.43663024902344],
            [-0.86360168457031, -1.59765625],
            [-0.26945495605469, -0.0069580078125],
            [-2.22471618652344, 0]
        ];
        var outTangents = [
            [1.03585815429688, 2.0238037109375],
            [0.13285827636719, 0.24578857421875],
            [1.76036071777344, 0.04548645019531],
            [-2.82730102539062, -2.69660949707031]
        ];
        createPathGrp(contents, 'Piece_10', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [14.5631, -23.6093]);
    };
    var createPiece11 = function () {
        var vertices = [
            [4.37260437011719, -2.9071044921875],
            [-0.7823486328125, -2.90168762207031],
            [-1.60345458984375, -2.4371337890625],
            [-4.37260437011719, 2.90882873535156]
        ];
        var inTangents = [
            [-2.30802917480469, 2.70010375976562],
            [1.71824645996094, -0.01179504394531],
            [0.15791320800781, -0.29881286621094],
            [1.06082153320312, -2.05508422851562]
        ];
        var outTangents = [
            [-1.71833801269531, 0],
            [-0.34175109863281, 0.00234985351562],
            [-0.8662109375, 1.63911437988281],
            [3.57144165039062, -1.48870849609375]
        ];
        createPathGrp(contents, 'Piece_11', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [14.3058, 23.8243]);
    };
    var createPiece12 = function () {
        var vertices = [
            [4.36445617675781, 2.89907836914062],
            [1.79263305664062, -2.17149353027344],
            [0.77723693847656, -2.88986206054688],
            [-4.36445617675781, -2.89613342285156]
        ];
        var inTangents = [
            [-3.55291748046875, -1.44802856445312],
            [0.78727722167969, 1.53817749023438],
            [0.47929382324219, 0.00448608398438],
            [1.71391296386719, 0]
        ];
        var outTangents = [
            [-1.00755310058594, -1.98898315429688],
            [-0.20899963378906, -0.40835571289062],
            [-1.71376037597656, -0.01603698730469],
            [2.32896423339844, 2.69029235839844]
        ];
        createPathGrp(contents, 'Piece_12', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-14.6047, 23.8115]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    createPiece12();
    createPiece11();
    createPiece10();
    createPiece09();
    createPiece08();
    createPiece07();
    createPiece06();
    createPiece05();
    createPiece04();
    createPiece03();
    createPiece02();
    createPiece01();
    createBgCircle();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createDiplomaticBuildingLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מבנה דיפלומטי',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [905.2402, 535.3016],
            textAnchor: [getOS() === 'Win' ? 131.4901 : -131.4901, -23.9483],
            bgSize: [400, 110],
            iconPos: [1097.25, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Diplomatic Building'
        },
        {
            lang: 'English',
            text: 'Diplomatic Building',
            fontSize: 77,
            tracking: -29,
            textPos: [1009.4835, 543.498],
            textAnchor: [getOS() === 'Win' ? 252.9835 : -252.9835, -21.252],
            bgSize: [632, 106],
            iconPos: [703.7103, 539.0989],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Diplomatic Building'
        },
        {
            lang: 'Arabic',
            text: 'مبنى دبلوماسي',
            fontSize: 64,
            tracking: -19,
            textPos: [913.9072, 541.0312],
            textAnchor: [getOS() === 'Win' ? 241.6572 : -241.6572, -8.7188],
            bgSize: [605, 90],
            iconPos: [1211.4231, 538.8518],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Diplomatic Building'
        }
    ];
    createLocation(args, lang, mitug);
};
var createGasStationIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createGas = function () {
        var vertices = [
            [19.7266235351562, -18.5678100585938],
            [15.9114990234375, -23.3271484375],
            [15.0817260742188, -20.4783325195312],
            [19.06201171875, -15.2244873046875],
            [19.03466796875, -12.2393798828125],
            [21.7686157226562, -8.37860107421875],
            [21.7686157226562, 7.8604736328125],
            [20.6541137695312, 13.5918579101562],
            [18.3536376953125, 5.63153076171875],
            [12.709716796875, 3.084228515625],
            [12.709716796875, -23.6531372070312],
            [10.152099609375, -26.2107543945312],
            [-15.5855102539062, -26.2107543945312],
            [-18.1431274414062, -23.6531372070312],
            [-18.1431274414062, 16.2989501953125],
            [-22.3543090820312, 16.2989501953125],
            [-23.9976196289062, 17.9422607421875],
            [-23.9976196289062, 26.2107543945312],
            [-15.5855102539062, 26.2107543945312],
            [10.152099609375, 26.2107543945312],
            [19.03466796875, 26.2107543945312],
            [19.03466796875, 17.9422607421875],
            [17.391357421875, 16.2989501953125],
            [12.709716796875, 16.2989501953125],
            [12.709716796875, 6.74603271484375],
            [17.788330078125, 13.9102783203125],
            [23.3389282226562, 14.06494140625],
            [23.9976196289062, -12.2393798828125]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.02734375, -2.985107421875],
            [0, 0],
            [0, 0],
            [0.955322265625, -0.63677978515625],
            [1.50445556640625, 2.86572265625],
            [0, 0],
            [0, 0],
            [1.40667724609375, 0],
            [0, 0],
            [0, -1.40667724609375],
            [0, 0],
            [0, 0],
            [0, -0.90380859375],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.90380859375, 0],
            [0, 0],
            [0, 0],
            [-2.70660400390625, -8.91552734375],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.02740478515625, 2.985107421875],
            [0, 0],
            [0, 0],
            [-0.95526123046875, 0.6368408203125],
            [-1.50445556640625, -2.86566162109375],
            [0, 0],
            [0, -1.40667724609375],
            [0, 0],
            [-1.40667724609375, 0],
            [0, 0],
            [0, 0],
            [-0.90380859375, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -0.90380859375],
            [0, 0],
            [0, 0],
            [0, 0],
            [2.70660400390625, 8.91558837890625],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Gas', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0.1536, -2.8365]);
    };
    var createGasHide = function () {
        var vertices = [
            [9.89009094238281, 8.23963928222656],
            [-9.89009094238281, 8.23963928222656],
            [-10.9564514160156, 7.17327880859375],
            [-10.9564514160156, -7.17327880859375],
            [-9.89009094238281, -8.23963928222656],
            [9.89009094238281, -8.23963928222656],
            [10.9564514160156, -7.17327880859375],
            [10.9564514160156, 7.17327880859375]
        ];
        var inTangents = [
            [0.58650207519531, 0],
            [0, 0],
            [0, 0.58650207519531],
            [0, 0],
            [-0.58650207519531, 0],
            [0, 0],
            [0, -0.58650207519531],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-0.58650207519531, 0],
            [0, 0],
            [0, -0.58650207519531],
            [0, 0],
            [0.58650207519531, 0],
            [0, 0],
            [0, 0.58650207519531]
        ];
        createPathGrp(contents, 'Gas_Hide', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-1.9819, -15.077]);
    };
    createGasHide();
    createGas();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createGasStationLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'תחנת דלק',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [912.9691, 540.1691],
            textAnchor: [getOS() === 'Win' ? 89.969 : -89.969, -19.0808],
            bgSize: [332, 110],
            iconPos: [1064.5, 538.5],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Gas Station'
        },
        {
            lang: 'English',
            text: 'Gas station',
            fontSize: 77,
            tracking: -29,
            textPos: [1006.895, 536.953],
            textAnchor: [getOS() === 'Win' ? 145.145 : -145.145, -27.797],
            bgSize: [428, 106],
            iconPos: [806.7103, 539.0989],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Gas Station'
        },
        {
            lang: 'Arabic',
            text: 'محطة وقود',
            fontSize: 64,
            tracking: -19,
            textPos: [918.4655, 540.125],
            textAnchor: [getOS() === 'Win' ? 175.4655 : -175.4655, -16.625],
            bgSize: [474, 92],
            iconPos: [1145.6731, 540.1018],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Gas Station'
        }
    ];
    createLocation(args, lang, mitug);
};
var createGovernmentBuildingIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createStairs = function () {
        var vertices = [
            [-25.1040191650391, 1.42855834960938],
            [-23.0668029785156, 1.41877746582031],
            [-22.767822265625, 1.111083984375],
            [-22.7725372314453, -1.11479187011719],
            [-22.4613647460938, -1.4345703125],
            [-20.6102905273438, -1.430908203125],
            [-20.3329162597656, -1.71473693847656],
            [-20.3368530273438, -3.94064331054688],
            [-20.0252075195312, -4.25564575195312],
            [-11.8004913330078, -4.25596618652344],
            [19.7861785888672, -4.25596618652344],
            [20.0203094482422, -4.2574462890625],
            [20.3162078857422, -3.96415710449219],
            [20.3091735839844, -1.71484375],
            [20.5934295654297, -1.43124389648438],
            [22.4444580078125, -1.43809509277344],
            [22.7270660400391, -1.154296875],
            [22.7189331054688, 1.165283203125],
            [22.9758911132812, 1.41639709472656],
            [24.8269195556641, 1.40936279296875],
            [25.1039886474609, 1.67463684082031],
            [25.1039581298828, 3.9942626953125],
            [24.8285217285156, 4.25814819335938],
            [24.6411895751953, 4.25709533691406],
            [-24.7071075439453, 4.25643920898438],
            [-25.1040191650391, 4.24078369140625]
        ];
        var inTangents = [
            [0, 0.93740844726562],
            [-0.67881774902344, -0.01177978515625],
            [0.00419616699219, 0.23188781738281],
            [-0.00071716308594, 0.74198913574219],
            [-0.302734375, 0.00065612792969],
            [-0.6168212890625, -0.01197814941406],
            [0.00315856933594, 0.21279907226562],
            [-0.00082397460938, 0.74198913574219],
            [-0.31002807617188, 0.00006103515625],
            [-2.7415771484375, 0],
            [-10.5288848876953, 0],
            [-0.07688903808594, 0.00965881347656],
            [0.00282287597656, -0.22171020507812],
            [0.00926208496094, -0.74967956542969],
            [-0.21501159667969, 0.00381469726562],
            [-0.61691284179688, 0.00907897949219],
            [0.00314331054688, -0.2174072265625],
            [0.00950622558594, -0.77311706542969],
            [-0.61689758300781, 0.00987243652344],
            [-0.19065856933594, 0.0029296875],
            [0.00216674804688, -0.20751953125],
            [-0.00799560546875, -0.77314758300781],
            [0.20179748535156, 0.0240478515625],
            [0.06248474121094, 0],
            [16.4494323730469, 0.00071716308594],
            [0.13230895996094, 0.00544738769531]
        ];
        var outTangents = [
            [0.67910766601562, -0.00523376464844],
            [0.24398803710938, 0.00424194335938],
            [-0.01344299316406, -0.74174499511719],
            [0.00030517578125, -0.31010437011719],
            [0.61705017089844, -0.00132751464844],
            [0.21823120117188, 0.00422668457031],
            [-0.01101684570312, -0.7418212890625],
            [0.00035095214844, -0.31318664550781],
            [2.7415771484375, -0.00048828125],
            [10.5288848876953, 0],
            [0.07810974121094, 0],
            [0.22785949707031, -0.02859497070312],
            [-0.00955200195312, 0.74967956542969],
            [-0.00263977050781, 0.21376037597656],
            [0.61685180664062, -0.01094055175781],
            [0.21115112304688, -0.00311279296875],
            [-0.01115417480469, 0.7730712890625],
            [-0.00244140625, 0.19804382324219],
            [0.61689758300781, -0.00949096679688],
            [0.2000732421875, -0.00320434570312],
            [-0.00808715820312, 0.77314758300781],
            [0.00212097167969, 0.20588684082031],
            [-0.06159973144531, -0.00733947753906],
            [-16.4494323730469, 0],
            [-0.13230895996094, 0],
            [0, -0.93740844726562]
        ];
        createPathGrp(contents, 'Stairs', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 15.9159]);
    };
    var createRoof = function () {
        var vertices = [
            [0.07791137695312, -6.1719970703125],
            [2.86775207519531, -4.841552734375],
            [10.1114501953125, -1.421630859375],
            [20.743896484375, 3.59886169433594],
            [22.2266845703125, 4.29850769042969],
            [22.4416809082031, 4.64295959472656],
            [22.4414520263672, 5.9080810546875],
            [22.1852264404297, 6.16883850097656],
            [-22.0054779052734, 6.16786193847656],
            [22.0213165283203, 6.16813659667969],
            [-22.4367980957031, 5.74058532714844],
            [-22.4413146972656, 4.63954162597656],
            [-22.2136688232422, 4.28323364257812],
            [-17.6801605224609, 2.14474487304688],
            [-11.1775207519531, -0.92532348632812],
            [-0.37557983398438, -6.02647399902344],
            [-0.10957336425781, -6.1719970703125]
        ];
        var inTangents = [
            [-0.0625, 0],
            [-0.93141174316406, -0.44039916992188],
            [-2.41456604003906, -1.13998413085938],
            [-3.5440673828125, -1.67369079589844],
            [-0.49745178222656, -0.2261962890625],
            [0.0030517578125, -0.17007446289062],
            [-0.00736999511719, -0.42161560058594],
            [0.19877624511719, 0.02232360839844],
            [0.05467224121094, 0],
            [14.6755981445312, 0.00035095214844],
            [0.00247192382812, 0.458984375],
            [0.01414489746094, 0.36651611328125],
            [-0.16307067871094, 0.076416015625],
            [-1.5108642578125, 0.71348571777344],
            [-2.16752624511719, 1.02339172363281],
            [-3.60035705566406, 1.70098876953125],
            [-0.08856201171875, 0.04875183105469]
        ];
        var outTangents = [
            [0.92987060546875, 0.44366455078125],
            [2.41390991210938, 1.14137268066406],
            [3.54423522949219, 1.67332458496094],
            [0.49418640136719, 0.23338317871094],
            [0.15907287597656, 0.07232666015625],
            [-0.00758361816406, 0.42160034179688],
            [0.00325012207031, 0.18612670898438],
            [-0.05398559570312, -0.00605773925781],
            [-14.6755981445312, 0.00001525878906],
            [-0.47959899902344, -0.00001525878906],
            [-0.00717163085938, -0.18609619140625],
            [-0.00196838378906, -0.3670654296875],
            [1.51295471191406, -0.70901489257812],
            [2.16744995117188, -1.0235595703125],
            [3.60076904296875, -1.70010375976562],
            [0.09123229980469, -0.04310607910156],
            [0.0625, 0]
        ];
        createPathGrp(contents, 'Roof', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-0.0114, -21.6667]);
    };
    var createPole01 = function () {
        var vertices = [
            [-0.00334167480469, 11.0274505615234],
            [-2.37010192871094, 11.0313415527344],
            [-2.66268920898438, 10.7342376708984],
            [-2.50515747070312, 4.27166748046875],
            [-2.42701721191406, 1.53298950195312],
            [-2.31892395019531, -3.19721984863281],
            [-2.23396301269531, -6.47483825683594],
            [-2.13142395019531, -10.6895446777344],
            [-1.78092956542969, -11.0263671875],
            [1.73406982421875, -11.0313720703125],
            [2.05012512207031, -10.7277679443359],
            [2.15032958984375, -6.51313781738281],
            [2.29461669921875, -1.48005676269531],
            [2.38726806640625, 1.70358276367188],
            [2.52888488769531, 6.71327209472656],
            [2.62020874023438, 9.92037963867188],
            [2.66021728515625, 10.7387084960938],
            [2.36341857910156, 11.0310821533203]
        ];
        var inTangents = [
            [0.7889404296875, 0.00001525878906],
            [0.78880310058594, -0.010009765625],
            [-0.0059814453125, 0.22573852539062],
            [-0.05316162109375, 2.1541748046875],
            [-0.02224731445312, 0.91299438476562],
            [-0.03753662109375, 1.57669067382812],
            [-0.02720642089844, 1.09257507324219],
            [-0.03556823730469, 1.40486145019531],
            [-0.33650207519531, 0.00010681152344],
            [-1.17158508300781, 0.0106201171875],
            [-0.00431823730469, -0.23518371582031],
            [-0.03761291503906, -1.40476989746094],
            [-0.05632019042969, -1.67741394042969],
            [-0.02284240722656, -1.06155395507812],
            [-0.05691528320312, -1.66957092285156],
            [-0.01252746582031, -1.06959533691406],
            [-0.0247802734375, -0.27177429199219],
            [0.21849060058594, 0.00254821777344]
        ];
        var outTangents = [
            [-0.7889404296875, -0.00001525878906],
            [-0.22442626953125, 0.00285339355469],
            [0.05712890625, -2.15406799316406],
            [0.02253723144531, -0.91297912597656],
            [0.03842163085938, -1.57667541503906],
            [0.0260009765625, -1.09259033203125],
            [0.03497314453125, -1.40487670898438],
            [0.00848388671875, -0.33468627929688],
            [1.17169189453125, -0.00039672851562],
            [0.23405456542969, -0.00212097167969],
            [0.02581787109375, 1.40501403808594],
            [0.04493713378906, 1.67778015136719],
            [0.03562927246094, 1.06112670898438],
            [0.03593444824219, 1.67015075683594],
            [0.03643798828125, 1.06892395019531],
            [0.00318908691406, 0.27296447753906],
            [0.02120971679688, 0.23252868652344],
            [-0.78883361816406, -0.00920104980469]
        ];
        createPathGrp(contents, 'Pole_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [14.3382, -0.098]);
    };
    var createPole02 = function () {
        var vertices = [
            [-0.02055358886719, 11.0274505615234],
            [-2.38729858398438, 11.0303497314453],
            [-2.66091918945312, 10.7637329101562],
            [-2.52253723144531, 5.54292297363281],
            [-2.47833251953125, 3.55256652832031],
            [-2.36318969726562, -1.57574462890625],
            [-2.26957702636719, -5.34529113769531],
            [-2.1715087890625, -9.06779479980469],
            [-2.13658142089844, -10.7301788330078],
            [1.742431640625, -11.031494140625],
            [-1.8427734375, -11.0312347412109],
            [2.0455322265625, -10.7340393066406],
            [2.08659362792969, -9.02485656738281],
            [2.20155334472656, -4.5762939453125],
            [2.34587097167969, 0.43325805664062],
            [2.43756103515625, 3.64030456542969],
            [2.57818603515625, 8.62654113769531],
            [2.36959838867188, 11.0314483642578],
            [2.66014099121094, 10.7321472167969]
        ];
        var inTangents = [
            [0.79673767089844, 0.00006103515625],
            [0.78886413574219, -0.00717163085938],
            [-0.00619506835938, 0.21192932128906],
            [-0.04481506347656, 1.74031066894531],
            [-0.02108764648438, 0.66351318359375],
            [-0.03855895996094, 1.70945739746094],
            [-0.03143310546875, 1.25651550292969],
            [-0.04666137695312, 1.24031066894531],
            [-0.00254821777344, 0.55415344238281],
            [-0.234130859375, -0.00204467773438],
            [-1.19500732421875, 0.01100158691406],
            [-0.00639343261719, -0.20793151855469],
            [-0.02067565917969, -0.56977844238281],
            [-0.03941345214844, -1.48284912109375],
            [-0.05792236328125, -1.66950988769531],
            [-0.02528381347656, -1.0692138671875],
            [-0.05006408691406, -1.6619873046875],
            [-0.03561401367188, -0.70146179199219],
            [0.22669982910156, 0.00289916992188]
        ];
        var outTangents = [
            [-0.78892517089844, -0.00006103515625],
            [-0.197021484375, 0.00178527832031],
            [0.05085754394531, -1.74012756347656],
            [0.01708984375, -0.66337585449219],
            [0.05430603027344, -1.70893859863281],
            [0.02835083007812, -1.25657653808594],
            [0.03103637695312, -1.24089050292969],
            [0.02084350585938, -0.55422973632812],
            [0.0009765625, -0.21360778808594],
            [1.19500732421875, 0.01045227050781],
            [0.23194885253906, -0.00213623046875],
            [0.01753234863281, 0.56961059570312],
            [0.05377197265625, 1.48228454589844],
            [0.04438781738281, 1.66995239257812],
            [0.039306640625, 1.66226196289062],
            [0.03709411621094, 1.06890869140625],
            [0.02114868164062, 0.70207214355469],
            [0.01139831542969, 0.22444152832031],
            [-0.79660034179688, -0.01016235351562]
        ];
        createPathGrp(contents, 'Pole_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [4.7721, -0.098]);
    };
    var createPole03 = function () {
        var vertices = [
            [-0.03567504882812, 11.0270385742188],
            [-2.37911987304688, 11.030517578125],
            [-2.658935546875, 10.756103515625],
            [-2.54277038574219, 5.53364562988281],
            [-2.45588684082031, 2.11528015136719],
            [-2.30909729003906, -3.83230590820312],
            [-2.21992492675781, -7.34439086914062],
            [-2.13409423828125, -10.7628021240234],
            [-1.85722351074219, -11.0303649902344],
            [1.75172424316406, -11.0305633544922],
            [2.02784729003906, -10.7657318115234],
            [2.09115600585938, -8.75267028808594],
            [2.20771789550781, -4.30387878417969],
            [2.35163879394531, 0.70603942871094],
            [2.44447326660156, 3.91326904296875],
            [2.59095764160156, 8.87611389160156],
            [2.65602111816406, 10.771484375],
            [2.40155029296875, 11.0295562744141]
        ];
        var inTangents = [
            [0.81240844726562, -0.00007629394531],
            [0.78106689453125, -0.00845336914062],
            [-0.00607299804688, 0.22843933105469],
            [-0.039306640625, 1.74081420898438],
            [-0.02838134765625, 1.13946533203125],
            [-0.04927062988281, 1.98251342773438],
            [-0.03018188476562, 1.17068481445312],
            [-0.02232360839844, 1.13958740234375],
            [-0.20188903808594, -0.00120544433594],
            [-1.20294189453125, 0.0076904296875],
            [-0.01742553710938, -0.20281982421875],
            [-0.02720642089844, -0.67076110839844],
            [-0.03941345214844, -1.48294067382812],
            [-0.05671691894531, -1.669677734375],
            [-0.02339172363281, -1.06939697265625],
            [-0.07009887695312, -1.65339660644531],
            [-0.06814575195312, -0.62980651855469],
            [0.18954467773438, 0.00141906738281]
        ];
        var outTangents = [
            [-0.78115844726562, 0.00007629394531],
            [-0.205322265625, 0.00222778320312],
            [0.04621887207031, -1.74061584472656],
            [0.02572631835938, -1.1395263671875],
            [0.04939270019531, -1.98252868652344],
            [0.02908325195312, -1.17071533203125],
            [0.02938842773438, -1.13945007324219],
            [0.00399780273438, -0.20396423339844],
            [1.20295715332031, 0.00721740722656],
            [0.20213317871094, -0.00129699707031],
            [0.05757141113281, 0.67034912109375],
            [0.06010437011719, 1.48207092285156],
            [0.04438781738281, 1.67007446289062],
            [0.03631591796875, 1.06898498535156],
            [0.03617858886719, 1.65461730957031],
            [0.02679443359375, 0.6318359375],
            [0.02159118652344, 0.1995849609375],
            [-0.81236267089844, -0.006103515625]
        ];
        createPathGrp(contents, 'Pole_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-4.7961, -0.0976]);
    };
    var createPole04 = function () {
        var vertices = [
            [-0.00587463378906, 11.0275268554688],
            [-2.39569091796875, 11.0307922363281],
            [-2.65420532226562, 10.7510833740234],
            [-2.58674621582031, 8.528076171875],
            [-2.470458984375, 3.44746398925781],
            [-2.37637329101562, -0.34492492675781],
            [-2.28323364257812, -4.06704711914062],
            [-2.18766784667969, -7.88285827636719],
            [-2.10993957519531, -10.76171875],
            [-1.83544921875, -11.0298919677734],
            [1.77273559570312, -11.0308074951172],
            [2.19212341308594, -5.57011413574219],
            [2.04981994628906, -10.7429962158203],
            [2.28482055664062, -2.36357116699219],
            [2.42646789550781, 2.62184143066406],
            [2.52037048339844, 5.92208862304688],
            [2.65518188476562, 10.6968078613281],
            [2.33711242675781, 11.0272827148438]
        ];
        var inTangents = [
            [0.78099060058594, 0.00007629394531],
            [0.79652404785156, -0.00831604003906],
            [-0.01885986328125, 0.19902038574219],
            [-0.0267333984375, 0.74101257324219],
            [-0.03828430175781, 1.69358825683594],
            [-0.03160095214844, 1.26412963867188],
            [-0.03099060058594, 1.24070739746094],
            [-0.033447265625, 1.27189636230469],
            [-0.01832580566406, 0.95976257324219],
            [-0.2027587890625, -0.001220703125],
            [-1.20266723632812, 0.00950622558594],
            [-0.00486755371094, -0.20376586914062],
            [-0.05738830566406, -1.72396850585938],
            [-0.02328491210938, -1.06916809082031],
            [-0.05783081054688, -1.66145324707031],
            [-0.02543640136719, -1.10031127929688],
            [-0.04365539550781, -1.59161376953125],
            [0.32058715820312, -0.00041198730469]
        ];
        var outTangents = [
            [-0.79661560058594, -0.00007629394531],
            [-0.21101379394531, 0.002197265625],
            [0.070068359375, -0.73922729492188],
            [0.02857971191406, -1.26419067382812],
            [0.06105041503906, -1.69273376464844],
            [0.031005859375, -1.24070739746094],
            [0.03176879882812, -1.27194213867188],
            [0.02523803710938, -0.95964050292969],
            [0.00389099121094, -0.20413208007812],
            [1.20269775390625, 0.00727844238281],
            [0.22372436523438, -0.00177001953125],
            [0.04121398925781, 1.72444152832031],
            [0.03558349609375, 1.06877136230469],
            [0.03619384765625, 1.66206359863281],
            [0.03828430175781, 1.09996032714844],
            [0.03680419921875, 1.59176635742188],
            [0.00900268554688, 0.32823181152344],
            [-0.78099060058594, 0.00100708007812]
        ];
        createPathGrp(contents, 'Pole_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-14.3859, -0.0981]);
    };
    var createCeiling = function () {
        var vertices = [
            [0.01043701171875, 1.44029235839844],
            [-17.6570281982422, 1.44026184082031],
            [-17.9147033691406, 1.44059753417969],
            [-18.1226196289062, 1.23432922363281],
            [-18.1228332519531, -1.22586059570312],
            [-17.9180297851562, -1.440673828125],
            [-17.6837463378906, -1.44146728515625],
            [17.6746215820312, -1.44151306152344],
            [18.1225280761719, -0.99331665039062],
            [18.1221466064453, 1.11543273925781],
            [17.7950134277344, 1.44015502929688]
        ];
        var inTangents = [
            [5.92819213867188, -0.00001525878906],
            [5.88916015625, 0.00003051757812],
            [0.08554077148438, -0.00550842285156],
            [-0.0006103515625, 0.14964294433594],
            [0.00347900390625, 0.82005310058594],
            [-0.15028381347656, -0.00495910644531],
            [-0.07809448242188, 0],
            [-11.7861175537109, -0.00003051757812],
            [-0.00007629394531, -0.44805908203125],
            [0.00120544433594, -0.70291137695312],
            [0.32478332519531, -0.00001525878906]
        ];
        var outTangents = [
            [-5.88916015625, 0],
            [-0.08592224121094, 0],
            [-0.15040588378906, 0.00968933105469],
            [0.00335693359375, -0.82005310058594],
            [-0.00062561035156, -0.14715576171875],
            [0.0780029296875, 0.00257873535156],
            [11.7861175537109, -0.00006103515625],
            [0.44769287109375, 0],
            [0.00010681152344, 0.70292663574219],
            [-0.00054931640625, 0.32379150390625],
            [-5.92819213867188, 0.00018310546875]
        ];
        createPathGrp(contents, 'Ceiling', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-0.0124, -13.3268]);
    };
    createCeiling();
    createPole04();
    createPole03();
    createPole02();
    createPole01();
    createRoof();
    createStairs();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createGovernmentBuildingLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מבנה ממשל',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [908.4594, 535.3016],
            textAnchor: [getOS() === 'Win' ? 104.9593 : -104.9593, -23.9483],
            bgSize: [356, 110],
            iconPos: [1075, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Government Building'
        },
        {
            lang: 'English',
            text: 'Government\nBuilding',
            fontSize: 70.0703,
            tracking: -19,
            textPos: [1006.895, 536.953],
            textAnchor: [getOS() === 'Win' ? 144.895 : -144.895, -0.197],
            bgSize: [424, 146],
            iconPos: [808.4603, 539.3489],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Government Building',
            leading: 59
        },
        {
            lang: 'Arabic',
            text: 'مبنى حكومي',
            fontSize: 64,
            tracking: -19,
            textPos: [918.2936, 545.4062],
            textAnchor: [getOS() === 'Win' ? 197.2936 : -197.2936, -11.3438],
            bgSize: [512, 91],
            iconPos: [1164.7981, 544.6018],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Government Building'
        }
    ];
    createLocation(args, lang, mitug);
};
var createPumpingStationIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createBigDrop = function () {
        var vertices = [
            [14.536376953125, 23.3396453857422],
            [14.5363616943359, 23.3396759033203],
            [-14.5363616943359, 23.3396759033203],
            [-14.536376953125, 23.3396606445312],
            [-17.3201904296875, -2.27023315429688],
            [0, -29.36083984375],
            [17.3201904296875, -2.27023315429688]
        ];
        var inTangents = [
            [6.82470703125, -6.82470703125],
            [0, 0],
            [8.02821350097656, 8.02821350097656],
            [0, 0],
            [-5.19892883300781, 8.13168334960938],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-8.02821350097656, 8.02821350097656],
            [0, 0],
            [-6.82470703125, -6.82470703125],
            [0, 0],
            [0, 0],
            [5.19892883300781, 8.13168334960938]
        ];
        createPathGrp(contents, 'Big_Drop', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-4.259, 6.6779]);
    };
    var createLittleDrop = function () {
        var vertices = [
            [6.12968444824219, 9.31932067871094],
            [6.12966918945312, 9.31932067871094],
            [-6.12966918945312, 9.3193359375],
            [-6.12966918945312, 9.31932067871094],
            [-7.08578491210938, -1.80409240722656],
            [0, -11.8583221435547],
            [7.08578491210938, -1.80409240722656]
        ];
        var inTangents = [
            [2.98173522949219, -2.98173522949219],
            [0, 0],
            [3.38531494140625, 3.38531494140625],
            [0, 0],
            [-2.42916870117188, 3.44682312011719],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-3.38531494140625, 3.38531494140625],
            [0, 0],
            [-2.98173522949219, -2.98173522949219],
            [0, 0],
            [0, 0],
            [2.42916870117188, 3.44682312011719]
        ];
        createPathGrp(contents, 'Little_Drop', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [18.1802, -19.2982]);
    };
    var createDropHighlight = function () {
        var vertices = [
            [5.55082702636719, 10.1707000732422],
            [5.26551818847656, 10.1485748291016],
            [-3.01443481445312, 5.94314575195312],
            [-6.79644775390625, -8.83953857421875],
            [-4.50321960449219, -10.0962982177734],
            [-3.24647521972656, -7.80308532714844],
            [-0.39981079101562, 3.32850646972656],
            [5.83070373535156, 6.49388122558594],
            [7.37547302246094, 8.60382080078125]
        ];
        var inTangents = [
            [0.89561462402344, 0],
            [0.095703125, 0.014892578125],
            [2.263427734375, 2.263427734375],
            [-1.53302001953125, 5.25318908691406],
            [-0.97958374023438, -0.28575134277344],
            [0.28619384765625, -0.98048400878906],
            [-2.9107666015625, -2.91030883789062],
            [-2.37176513671875, -0.36700439453125],
            [0.15618896484375, -1.00892639160156]
        ];
        var outTangents = [
            [-0.09480285644531, 0],
            [-3.15362548828125, -0.48799133300781],
            [-3.865966796875, -3.86506652832031],
            [0.28619384765625, -0.98004150390625],
            [0.98048400878906, 0.28619384765625],
            [-1.15473937988281, 3.95579528808594],
            [1.70365905761719, 1.70365905761719],
            [1.00938415527344, 0.15618896484375],
            [-0.14173889160156, 0.91368103027344]
        ];
        createPathGrp(contents, 'Drop_Highlight', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-11.8231, 19.2685]);
    };
    createDropHighlight();
    createLittleDrop();
    createBigDrop();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createPumpingStationLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'תחנת שאיבה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [-54.5092 + 960, -1.1351 + 540],
            textAnchor: [getOS() === 'Win' ? 117.1903 : -117.1903, -20.4437],
            bgSize: [372, 110],
            iconPos: [1083, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Pumping Station'
        },
        {
            lang: 'English',
            text: 'Pumping Station',
            fontSize: 74.9495,
            tracking: -20,
            textPos: [1008.1195, 548.5892],
            textAnchor: [getOS() === 'Win' ? 212.3694 : -212.3694, -21.0608],
            bgSize: [556, 106],
            iconPos: [742, 539],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Pumping Station'
        },
        {
            lang: 'Arabic',
            text: 'محطة ضخ',
            fontSize: 64,
            tracking: -19,
            textPos: [915.8832, 542.875],
            textAnchor: [getOS() === 'Win' ? 144.3833 : -144.3833, -13.875],
            bgSize: [404, 91],
            iconPos: [1110.625, 540],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Pumping Station'
        }
    ];
    createLocation(args, lang, mitug);
};
var createPoliceIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createBadgeFrameTop = function () {
        var vertices = [
            [21.9000244140625, -8.67498779296875],
            [17.27001953125, -10.4650268554688],
            [10.260009765625, -10.114990234375],
            [-0.010009765625, -14.1649780273438],
            [-10.260009765625, -10.10498046875],
            [-17.27001953125, -10.4650268554688],
            [-21.9000244140625, -8.66497802734375],
            [-21.0999755859375, 14.1649780273438],
            [-15.6099853515625, 14.1649780273438],
            [-15.489990234375, 13.614990234375],
            [-15.030029296875, -4.9949951171875],
            [-14.530029296875, -4.96502685546875],
            [-10.260009765625, -4.7550048828125],
            [0, -7.29498291015625],
            [10.260009765625, -4.7550048828125],
            [14.5399780273438, -4.96502685546875],
            [15.030029296875, -5.0050048828125],
            [15.5, 13.635009765625],
            [15.6300048828125, 14.1649780273438],
            [21.1099853515625, 14.1649780273438]
        ];
        var inTangents = [
            [-4.35003662109375, 10.2999877929688],
            [2.05999755859375, 0],
            [2.52996826171875, 0],
            [3.010009765625, 3.3499755859375],
            [3.5400390625, 0],
            [2.0400390625, 0],
            [0.9200439453125, -1.44000244140625],
            [1.22998046875, -5.7099609375],
            [0, 0],
            [-0.0400390625, 0.19000244140625],
            [1.99005126953125, 7.92999267578125],
            [-0.16998291015625, -0.00994873046875],
            [-1.52996826171875, 0],
            [-4.260009765625, 2.53997802734375],
            [-1.69000244140625, 0],
            [-1.28997802734375, 0.10003662109375],
            [-0.1600341796875, 0.010009765625],
            [-1.07000732421875, -4.6400146484375],
            [-0.04998779296875, -0.16998291015625],
            [0, 0]
        ];
        var outTangents = [
            [-0.9200439453125, -1.42999267578125],
            [-2.0400390625, 0],
            [-3.5400390625, 0],
            [-3, 3.3599853515625],
            [-2.52996826171875, 0],
            [-2.05999755859375, 0],
            [4.34002685546875, 10.2799682617188],
            [0, 0],
            [0.03997802734375, -0.17999267578125],
            [1.05999755859375, -4.6400146484375],
            [0.1600341796875, 0.010009765625],
            [1.280029296875, 0.10003662109375],
            [1.69000244140625, 0],
            [4.260009765625, 2.53997802734375],
            [1.52996826171875, 0],
            [0.1600341796875, -0.00994873046875],
            [-2, 7.95001220703125],
            [0.03997802734375, 0.17999267578125],
            [0, 0],
            [-1.22998046875, -5.699951171875]
        ];
        createPathGrp(contents, 'Badge_Frame_Top', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, -11.515]);
    };
    var createBadgeFrameBottom = function () {
        var vertices = [
            [19.3804473876953, -17.635009765625],
            [14.0304107666016, -17.635009765625],
            [15.4904327392578, -5.92498779296875],
            [-0.00956726074219, 11.8049926757812],
            [-15.4995574951172, -5.94500732421875],
            [-14.0495452880859, -17.635009765625],
            [-19.4095916748047, -17.635009765625],
            [-0.00956726074219, 17.635009765625]
        ];
        var inTangents = [
            [-0.6300048828125, 15.77001953125],
            [0, 0],
            [-0.72998046875, -3.17999267578125],
            [17.7999877929688, -7.79998779296875],
            [-1.54998779296875, 6.760009765625],
            [0.15997314453125, 4.6600341796875],
            [0, 0],
            [-32.3900146484375, -13.7100219726562]
        ];
        var outTangents = [
            [0, 0],
            [1.55999755859375, 6.72998046875],
            [-0.15997314453125, 4.67999267578125],
            [-17.780029296875, -7.77001953125],
            [0.72998046875, -3.17999267578125],
            [0, 0],
            [0.6500244140625, 15.760009765625],
            [32.4400024414062, -13.77001953125]
        ];
        createPathGrp(contents, 'Badge_Frame_Bottom', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0.0096, 8.045]);
    };
    var createStar = function () {
        var vertices = [
            [0, -10.5857543945312],
            [3.43951416015625, -3.61653137207031],
            [11.1305236816406, -2.49896240234375],
            [5.56526184082031, 2.92582702636719],
            [6.87904357910156, 10.5857543945312],
            [0, 6.96923828125],
            [-6.87904357910156, 10.5857543945312],
            [-5.56526184082031, 2.92582702636719],
            [-11.1305236816406, -2.49896240234375],
            [-3.43951416015625, -3.61653137207031]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Star', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, -1.9946]);
    };
    createStar();
    createBadgeFrameBottom();
    createBadgeFrameTop();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createPoliceLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'משטרה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [914.9214, 538.8649],
            textAnchor: [getOS() === 'Win' ? 69.1209 : -69.1209, -20.4437],
            bgSize: [294, 110],
            iconPos: [1044.5, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Police'
        },
        {
            lang: 'English',
            text: 'Police',
            fontSize: 74.9495,
            tracking: -20,
            textPos: [1013.4949, 542.9679],
            textAnchor: [getOS() === 'Win' ? 81.9948 : -81.9948, -26.682],
            bgSize: [284, 106],
            iconPos: [878, 539],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Police'
        },
        {
            lang: 'Arabic',
            text: 'مبنى شرطة',
            fontSize: 64,
            tracking: -13,
            textPos: [919.7453, 536.4375],
            textAnchor: [getOS() === 'Win' ? 180.4954 : -180.4954, -20.3125],
            bgSize: [486, 91],
            iconPos: [1151.125, 540],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Police'
        }
    ];
    createLocation(args, lang, mitug);
};
var createWaterFacilityIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createDrop = function () {
        var vertices = [
            [0, -28.6298522949219],
            [0, 28.6298522949219]
        ];
        var inTangents = [
            [0, 0],
            [-36.3336029052734, 0]
        ];
        var outTangents = [
            [0, 0],
            [36.3336029052734, 0]
        ];
        createPathGrp(contents, 'Drop', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0.8716]);
    };
    createDrop();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createWaterFacilityLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מתקן מים',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [909.074, 543.7325],
            textAnchor: [getOS() === 'Win' ? 87.0235 : -87.0235, -15.5761],
            bgSize: [318, 110],
            iconPos: [1056, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Water Facility'
        },
        {
            lang: 'English',
            text: 'Water Facility',
            fontSize: 74.9495,
            tracking: -20,
            textPos: [1013.4949, 542.9679],
            textAnchor: [getOS() === 'Win' ? 179.2417 : -179.2417, -20.7235],
            bgSize: [486, 106],
            iconPos: [777, 539],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Water Facility'
        },
        {
            lang: 'Arabic',
            text: 'مجمع مياه',
            fontSize: 64,
            tracking: -19,
            textPos: [918.1465, 541.375],
            textAnchor: [getOS() === 'Win' ? 154.3966 : -154.3966, -13.875],
            bgSize: [424, 91],
            iconPos: [1119.625, 539.25],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Water Facility'
        }
    ];
    createLocation(args, lang, mitug);
};
var createResidentialNeighborhoodIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-1.738, 0]);
    };
    var createMHouse = function () {
        var vertices = [
            [22.9131622314453, -2.52333068847656],
            [18.7977447509766, -2.52333068847656],
            [18.7977447509766, 26.367431640625],
            [13.5069885253906, 26.367431640625],
            [13.5069885253906, 6.00593566894531],
            [-0.95298767089844, 6.00593566894531],
            [-0.95298767089844, 26.367431640625],
            [-18.7977447509766, 26.367431640625],
            [-18.7977447509766, -2.52333068847656],
            [-22.9131622314453, -2.52333068847656],
            [0, -26.367431640625]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Middle_House', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-1.2362, -3.1699]);
    };
    var createLHouse = function () {
        var vertices = [
            [13.7579803466797, -3.09284973144531],
            [11.2869110107422, -3.09284973144531],
            [11.2869110107422, 15.8320617675781],
            [4.34127807617188, 15.8320617675781],
            [4.34127807617188, 3.60621643066406],
            [-4.34107971191406, 3.60621643066406],
            [-4.34107971191406, 15.8320617675781],
            [-11.2869110107422, 15.8320617675781],
            [-11.2869110107422, -3.09284973144531],
            [-13.7579803466797, -3.09284973144531],
            [0, -15.8320617675781]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'L_House', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-36.5779, 7.3654]);
    };
    var createRHouse = function () {
        var vertices = [
            [13.7579803466797, -3.09284973144531],
            [11.2869110107422, -3.09284973144531],
            [11.2869110107422, 15.8320617675781],
            [4.34127807617188, 15.8320617675781],
            [4.34127807617188, 3.60621643066406],
            [-4.34107971191406, 3.60621643066406],
            [-4.34107971191406, 15.8320617675781],
            [-11.2869110107422, 15.8320617675781],
            [-11.2869110107422, -3.09284973144531],
            [-13.7579803466797, -3.09284973144531],
            [0, -15.8320617675781]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'R_House', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [36.5779, 7.3654]);
    };
    var createWindow01 = function () {
        var vertices = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Window_01', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-13.3726, -5.0146]);
    };
    var createWindow02 = function () {
        var vertices = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Window_02', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-7.7292, -5.0146]);
    };
    var createWindow03 = function () {
        var vertices = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Window_03', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-13.3726, 0.8716]);
    };
    var createWindow04 = function () {
        var vertices = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Window_04', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-7.7292, 0.8716]);
    };
    createWindow04();
    createWindow03();
    createWindow02();
    createWindow01();
    createRHouse();
    createLHouse();
    createMHouse();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createResidentialNeighborhoodLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'שכונת מגורים',
            fontSize: 77.3332,
            tracking: -20,
            textPos: [905.9881, 539.4101],
            textAnchor: [getOS() === 'Win' ? 122.4377 : -122.4377, -19.8985],
            bgSize: [380, 110],
            iconPos: [1090, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Residential Neighborhood'
        },
        {
            lang: 'English',
            text: 'Residential\nNeighborhood',
            fontSize: 59,
            tracking: -18,
            leading: 50,
            textPos: [1007.2187, 546.5324],
            textAnchor: [getOS() === 'Win' ? 143.3405 : -143.3405, 8.716],
            bgSize: [422, 136],
            iconPos: [809.6875, 542.4375],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Residential Neighborhood'
        },
        {
            lang: 'Arabic',
            text: 'حي سكني',
            fontSize: 59.991,
            tracking: -19,
            textPos: [918.1465, 541.375],
            textAnchor: [getOS() === 'Win' ? 147.1732 : -147.1732, -10.6332],
            bgSize: [410, 91],
            iconPos: [1114.875, 541.5],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Residential Neighborhood'
        }
    ];
    createLocation(args, lang, mitug);
};
var createAmusementParkIcon = function (iconPos, iconAnchor, iconScale, name, mitug) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, getColorsFromMitug(mitug).pri, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, -2.4971]);
    };
    var createRPole = function () {
        var vertices = [
            [-12.8439178466797, -20.0448608398438],
            [12.8439178466797, 20.0448608398438]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'R_Pole', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 3, vertices, inTangents, outTangents, true, [17.0875, 25.0419]);
    };
    var createLPole = function () {
        var vertices = [
            [-12.7528839111328, 19.9027709960938],
            [12.7528839111328, -19.9027709960938]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'L_Pole', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 3, vertices, inTangents, outTangents, true, [-17.1785, 25.184]);
    };
    var createBigCircle = function () {
        var vertices = [
            [27.192138671875, 0],
            [0, -27.192138671875],
            [-27.192138671875, 0],
            [0, 27.192138671875]
        ];
        var inTangents = [
            [0, 15.0178070068359],
            [15.0178070068359, 0],
            [0, -15.0178070068359],
            [-15.0178070068359, 0]
        ];
        var outTangents = [
            [0, -15.0178070068359],
            [-15.0178070068359, 0],
            [0, 15.0178070068359],
            [15.0178070068359, 0]
        ];
        createPathGrp(contents, 'Big_Circle', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 3, vertices, inTangents, outTangents, true, [0, -1.6255]);
    };
    var createLittleCircle = function () {
        var vertices = [
            [8.24102783203125, 0],
            [0, -8.24102783203125],
            [-8.24102783203125, 0],
            [0, 8.24102783203125]
        ];
        var inTangents = [
            [0, 4.5513916015625],
            [4.5513916015625, 0],
            [0, -4.5513916015625],
            [-4.5513916015625, 0]
        ];
        var outTangents = [
            [0, -4.5513916015625],
            [-4.5513916015625, 0],
            [0, 4.5513916015625],
            [4.5513916015625, 0]
        ];
        createPathGrp(contents, 'Little_Circle', false, true, [0, 0, 0], getColorsFromMitug(mitug).bg, 3, vertices, inTangents, outTangents, true, [0, -1.6255]);
    };
    var createWheel01 = function () {
        var vertices = [
            [-6.78562927246094, 0],
            [0, -6.78562927246094],
            [6.78562927246094, 0],
            [0, 6.78562927246094]
        ];
        var inTangents = [
            [0, 3.74760437011719],
            [-3.74760437011719, 0],
            [0, -3.74760437011719],
            [3.74760437011719, 0]
        ];
        var outTangents = [
            [0, -3.74760437011719],
            [3.74760437011719, 0],
            [0, 3.74760437011719],
            [-3.74760437011719, 0]
        ];
        createPathGrp(contents, 'Wheel_01', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, -27.9795]);
    };
    var createWheel02 = function () {
        var vertices = [
            [-3.392822265625, -5.87652587890625],
            [5.87652587890625, -3.392822265625],
            [3.392822265625, 5.87652587890625],
            [-5.87652587890625, 3.392822265625]
        ];
        var inTangents = [
            [-3.24551391601562, 1.87379455566406],
            [-1.87379455566406, -3.24551391601562],
            [3.24551391601562, -1.87379455566406],
            [1.87379455566406, 3.24551391601562]
        ];
        var outTangents = [
            [3.24551391601562, -1.87379455566406],
            [1.87379455566406, 3.24551391601562],
            [-3.24551391601562, 1.87379455566406],
            [-1.87379455566406, -3.24551391601562]
        ];
        createPathGrp(contents, 'Wheel_02', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [22.8232, -14.8026]);
    };
    var createWheel03 = function () {
        var vertices = [
            [3.392822265625, -5.87652587890625],
            [5.87652587890625, 3.392822265625],
            [-3.392822265625, 5.87652587890625],
            [-5.87652587890625, -3.392822265625]
        ];
        var inTangents = [
            [-3.24551391601562, -1.87379455566406],
            [1.87379455566406, -3.24551391601562],
            [3.24551391601562, 1.87379455566406],
            [-1.87379455566406, 3.24551391601562]
        ];
        var outTangents = [
            [3.24551391601562, 1.87379455566406],
            [-1.87379455566406, 3.24551391601562],
            [-3.24551391601562, -1.87379455566406],
            [1.87379455566406, -3.24551391601562]
        ];
        createPathGrp(contents, 'Wheel_03', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [22.8232, 11.5514]);
    };
    var createWheel04 = function () {
        var vertices = [
            [3.392822265625, -5.87652587890625],
            [-5.87652587890625, -3.392822265625],
            [-3.392822265625, 5.87652587890625],
            [5.87652587890625, 3.392822265625]
        ];
        var inTangents = [
            [3.24551391601562, 1.87379455566406],
            [1.87379455566406, -3.24551391601562],
            [-3.24551391601562, -1.87379455566406],
            [-1.87379455566406, 3.24551391601562]
        ];
        var outTangents = [
            [-3.24551391601562, -1.87379455566406],
            [-1.87379455566406, 3.24551391601562],
            [3.24551391601562, 1.87379455566406],
            [1.87379455566406, -3.24551391601562]
        ];
        createPathGrp(contents, 'Wheel_04', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-22.8232, -14.8026]);
    };
    var createWheel05 = function () {
        var vertices = [
            [-3.392822265625, -5.87652587890625],
            [-5.87652587890625, 3.392822265625],
            [3.392822265625, 5.87652587890625],
            [5.87652587890625, -3.392822265625]
        ];
        var inTangents = [
            [3.24551391601562, -1.87379455566406],
            [-1.87379455566406, -3.24551391601562],
            [-3.24551391601562, 1.87379455566406],
            [1.87379455566406, 3.24551391601562]
        ];
        var outTangents = [
            [-3.24551391601562, 1.87379455566406],
            [1.87379455566406, 3.24551391601562],
            [3.24551391601562, -1.87379455566406],
            [-1.87379455566406, -3.24551391601562]
        ];
        createPathGrp(contents, 'Wheel_05', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [-22.8232, 11.5514]);
    };
    var createWheel06 = function () {
        var vertices = [
            [6.78562927246094, 0],
            [0, 6.78562927246094],
            [-6.78562927246094, 0],
            [0, -6.78562927246094]
        ];
        var inTangents = [
            [0, -3.74760437011719],
            [3.74760437011719, 0],
            [0, 3.74760437011719],
            [-3.74760437011719, 0]
        ];
        var outTangents = [
            [0, 3.74760437011719],
            [-3.74760437011719, 0],
            [0, -3.74760437011719],
            [3.74760437011719, 0]
        ];
        createPathGrp(contents, 'Wheel_06', true, false, getColorsFromMitug(mitug).bg, [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 24.7284]);
    };
    createWheel06();
    createWheel05();
    createWheel04();
    createWheel03();
    createWheel02();
    createWheel01();
    createLittleCircle();
    createBigCircle();
    createLPole();
    createRPole();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createAmusementParkLocation = function (lang, mitug) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'פארק משחקים',
            fontSize: 77.3332,
            tracking: -20,
            textPos: [913.0949, 543.7325],
            textAnchor: [getOS() === 'Win' ? 134.5445 : -134.5445, -15.5761],
            bgSize: [422, 110],
            iconPos: [1108.25, 541.0954],
            iconAnchor: [0, -0.4046],
            iconScale: 100,
            iconId: 'Amusement Park'
        },
        {
            lang: 'English',
            text: 'Amusement Park',
            fontSize: 74.9495,
            tracking: -20,
            leading: 50,
            textPos: [1009.3293, 542.8844],
            textAnchor: [getOS() === 'Win' ? 220.9511 : -220.9511, -26.682],
            bgSize: [570, 106],
            iconPos: [735.1875, 541.0329],
            iconAnchor: [0, -0.4046],
            iconScale: 100,
            iconId: 'Amusement Park'
        },
        {
            lang: 'Arabic',
            text: 'ملعب',
            fontSize: 64.1684,
            tracking: -19,
            textPos: [918.1465, 541.375],
            textAnchor: [getOS() === 'Win' ? 81.5578 : -81.5578, -16.3554],
            bgSize: [282, 91],
            iconPos: [1048.7811, 541.2777],
            iconAnchor: [0, -0.4046],
            iconScale: 83,
            iconId: 'Amusement Park'
        }
    ];
    createLocation(args, lang, mitug);
};
var createLocationFromId = function (id, lang, mitug) {
    app.beginUndoGroup("Caspion: Create Location - ".concat(id));
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    switch (id) {
        case 'Kindergarden':
            createKindergardenLocation(lang, mitug);
            break;
        case 'Medical Clinic':
            createMedicalLocation(lang, mitug);
            break;
        case 'Sports':
            createSportsLocation(lang, mitug);
            break;
        case 'University':
            createUniversityLocation(lang, mitug);
            break;
        case 'Mosque':
            createMosqueLocation(lang, mitug);
            break;
        case 'U.N. Building':
            createUNBuildingLocation(lang, mitug);
            break;
        case 'Diplomatic Building':
            createDiplomaticBuildingLocation(lang, mitug);
            break;
        case 'Gas Station':
            createGasStationLocation(lang, mitug);
            break;
        case 'Government Building':
            createGovernmentBuildingLocation(lang, mitug);
            break;
        case 'Factory':
            alert('...');
            break;
        case 'Pumping Station':
            createPumpingStationLocation(lang, mitug);
            break;
        case 'Police':
            createPoliceLocation(lang, mitug);
            break;
        case 'Water Facility':
            createWaterFacilityLocation(lang, mitug);
            break;
        case 'Residential Neighborhood':
            createResidentialNeighborhoodLocation(lang, mitug);
            break;
        case 'Amusement Park':
            createAmusementParkLocation(lang, mitug);
            break;
    }
    app.endUndoGroup();
};
var importTexture = function (path) {
    var textureItem = app.project.importFile(new ImportOptions(File(path)));
    return textureItem;
};
var loopTexture = function (comp, layer) {
    var posProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    var scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    var rotProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Rotate Z');
    posProp.setValueAtTime(0, [960, 540]);
    scaleProp.setValueAtTime(0, [100, 100]);
    rotProp.setValueAtTime(0, 0);
    posProp.setValueAtTime((1 / comp.frameRate) * 10, [840, 804]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 10, [100, 100]);
    rotProp.setValueAtTime((1 / comp.frameRate) * 10, 50);
    posProp.setValueAtTime((1 / comp.frameRate) * 20, [1284, 913]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 20, [116, 116]);
    rotProp.setValueAtTime((1 / comp.frameRate) * 20, -35);
    posProp.setValueAtTime((1 / comp.frameRate) * 30, [960, 540]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 30, [100, 100]);
    rotProp.setValueAtTime((1 / comp.frameRate) * 30, 0);
    posProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
    posProp.setInterpolationTypeAtKey(2, KeyframeInterpolationType.HOLD);
    posProp.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD);
    posProp.setInterpolationTypeAtKey(4, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(2, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(4, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(2, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(4, KeyframeInterpolationType.HOLD);
    posProp.expression =
        scaleProp.expression =
            rotProp.expression =
                'loopOut()';
};
var getPathFromTextureID = function (id) {
    return "".concat(getAssetsPath(), "/Textures/").concat(id.replace(/ /g, '_'), ".jpg");
};
var getCommandId = function (_a, _b) {
    var compW = _a.width, compH = _a.height;
    var texW = _b.width, texH = _b.height;
    if (texW >= texH && compW >= compH)
        return 2732;
    if (texH >= texW && compW >= compH)
        return 2732;
    if (texW >= texH && compH >= compW)
        return 2733;
    if (texH >= texW && compH >= compW)
        return 2732;
    return 2732;
};
var createTexture = function (id, loop, fit) {
    app.beginUndoGroup("Caspion: Import Texture - ".concat(id));
    var path = getPathFromTextureID(id);
    var textureItem = importTexture(path);
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem))
        return;
    var textureLayer = comp.layers.add(textureItem);
    textureLayer.label = parsePrefs().texLabelRandom
        ? Math.floor(Math.random() * 16) + 1
        : parsePrefs().texLabelIndex + 1;
    if (loop)
        loopTexture(comp, textureLayer);
    if (fit) {
        var commandId = getCommandId(comp, textureItem);
        textureLayer.selected = true;
        app.executeCommand(commandId);
    }
    app.endUndoGroup();
};
var createColoredButton = function (container, color, size) {
    if (color === void 0) { color = [1, 1, 0, 1]; }
    if (size === void 0) { size = [50, 50]; }
    var grp = container.add('group');
    var btn = grp.add('iconbutton', undefined, undefined, {
        style: 'toolbutton'
    });
    btn.size = size;
    btn.fillBrush = btn.graphics.newBrush(btn.graphics.BrushType.SOLID_COLOR, color, 1);
    btn.onDraw = function () {
        this.graphics.drawOSControl();
        this.graphics.rectPath(0, 0, this.size[0], this.size[1]);
        this.graphics.fillPath(this.fillBrush);
    };
    return btn;
};
var createHelpWindow = function () {
    var helpWin = new Window('dialog', 'Help & Info');
    if (helpWin == null) {
        helpWin;
    }
    var tpanel = helpWin.add('tabbedpanel');
    var aboutTab = tpanel.add('tab', undefined, ['About']);
    var banner = aboutTab.add('image', [0, 0, 300, 110], bannerBinary);
    var abtStr = '‹ Caspion - version 1.1.0 - Created By Eyal Cohen ›';
    var aboutEditGrp = aboutTab.add('group');
    aboutEditGrp.add('edittext', [0, 0, 380, 200], abtStr, {
        multiline: true,
        readonly: true,
        scrollable: true
    });
    aboutEditGrp.margins.left = 10;
    var labelNames = getLabelNamesFromPrefs();
    var labelColors = getLabelsFromPrefs().map(function (hex) { return hexToRgb(hex); });
    var settingsTab = tpanel.add('tab', undefined, ['Settings']);
    var labelSettingsGrp = settingsTab.add('group');
    settingsTab.orientation = labelSettingsGrp.orientation = 'column';
    settingsTab.alignChildren = labelSettingsGrp.alignChildren = [
        'left',
        'top'
    ];
    settingsTab.margins = 16;
    labelSettingsGrp.margins.bottom = 20;
    var iconlabelsSettingGrp = labelSettingsGrp.add('group');
    var iconStaticGrp = iconlabelsSettingGrp.add('group');
    iconStaticGrp.add('statictext', undefined, 'Icons Label Color:');
    iconStaticGrp.margins.right = 22;
    var iconlabelsGrp = iconlabelsSettingGrp.add('group');
    var iconLabelsDD = iconlabelsGrp.add('dropdownlist', undefined, labelNames);
    iconLabelsDD.selection = parsePrefs().iconsLabelIndex;
    var iconSelection = iconLabelsDD.selection;
    var iconTheLabel = createColoredButton(iconlabelsGrp, labelColors[iconSelection.index], [20, 20]);
    iconLabelsDD.onChange = function () {
        var selection = iconLabelsDD.selection;
        iconTheLabel.fillBrush = iconTheLabel.graphics.newBrush(iconTheLabel.graphics.BrushType.SOLID_COLOR, labelColors[selection.index], 1);
    };
    var iconRandomCheck = iconlabelsSettingGrp.add('checkbox', undefined, 'Random');
    iconRandomCheck.value = parsePrefs().iconsLabelRandom;
    var updateFromIconCheck = function (val) {
        iconlabelsGrp.enabled = !val;
        iconTheLabel.fillBrush = iconTheLabel.graphics.newBrush(iconTheLabel.graphics.BrushType.SOLID_COLOR, val ? [0.2, 0.2, 0.2, 1] : labelColors[iconSelection.index], 1);
    };
    updateFromIconCheck(iconRandomCheck.value);
    iconRandomCheck.onClick = function () {
        updateFromIconCheck(iconRandomCheck.value);
    };
    var locLabelsSettingGrp = labelSettingsGrp.add('group');
    var locStaticGrp = locLabelsSettingGrp.add('group');
    locStaticGrp.add('statictext', undefined, 'Locations Label Color:');
    var loclabelsGrp = locLabelsSettingGrp.add('group');
    var locLabelsDD = loclabelsGrp.add('dropdownlist', undefined, labelNames);
    locLabelsDD.selection = parsePrefs().locsLabelIndex;
    var locSelection = locLabelsDD.selection;
    var locTheLabel = createColoredButton(loclabelsGrp, labelColors[locSelection.index], [20, 20]);
    locLabelsDD.onChange = function () {
        var selection = locLabelsDD.selection;
        locTheLabel.fillBrush = locTheLabel.graphics.newBrush(locTheLabel.graphics.BrushType.SOLID_COLOR, labelColors[selection.index], 1);
    };
    var locRandomCheck = locLabelsSettingGrp.add('checkbox', undefined, 'Random');
    locRandomCheck.value = parsePrefs().locsLabelRandom;
    var updateFromLocCheck = function (val) {
        loclabelsGrp.enabled = !val;
        locTheLabel.fillBrush = locTheLabel.graphics.newBrush(locTheLabel.graphics.BrushType.SOLID_COLOR, val ? [0.2, 0.2, 0.2, 1] : labelColors[locSelection.index], 1);
    };
    updateFromLocCheck(locRandomCheck.value);
    locRandomCheck.onClick = function () {
        updateFromLocCheck(locRandomCheck.value);
    };
    var texlabelsSettingGrp = labelSettingsGrp.add('group');
    var texStaticGrp = texlabelsSettingGrp.add('group');
    texStaticGrp.add('statictext', undefined, 'Textures Label Color:');
    texStaticGrp.margins.right = 5;
    var texlabelsGrp = texlabelsSettingGrp.add('group');
    var texLabelsDD = texlabelsGrp.add('dropdownlist', undefined, labelNames);
    texLabelsDD.selection = parsePrefs().texLabelIndex;
    var texLabelColors = getLabelsFromPrefs().map(function (hex) { return hexToRgb(hex); });
    var texSelection = texLabelsDD.selection;
    var texTheLabel = createColoredButton(texlabelsGrp, texLabelColors[texSelection.index], [20, 20]);
    texLabelsDD.onChange = function () {
        var selection = texLabelsDD.selection;
        texTheLabel.fillBrush = texTheLabel.graphics.newBrush(texTheLabel.graphics.BrushType.SOLID_COLOR, labelColors[selection.index], 1);
    };
    var texRandomCheck = texlabelsSettingGrp.add('checkbox', undefined, 'Random');
    texRandomCheck.value = parsePrefs().texLabelRandom;
    var updateFromTexCheck = function (val) {
        texlabelsGrp.enabled = !val;
        texTheLabel.fillBrush = texTheLabel.graphics.newBrush(texTheLabel.graphics.BrushType.SOLID_COLOR, val ? [0.2, 0.2, 0.2, 1] : labelColors[texSelection.index], 1);
    };
    updateFromTexCheck(texRandomCheck.value);
    texRandomCheck.onClick = function () {
        updateFromTexCheck(texRandomCheck.value);
    };
    var helpTipSettingGrp = settingsTab.add('group');
    var showHelpTipsCheck = helpTipSettingGrp.add('checkbox', undefined, 'Show Help Tips');
    showHelpTipsCheck.value = parsePrefs().showHelpTips;
    var updateQAHelpTips = function (show) {
        allQABtns.forEach(function (iconData) {
            iconData[0].helpTip = show ? iconData[1] : '';
        });
    };
    var okBtn = helpWin.add('button', undefined, 'Ok', { name: 'Ok' });
    okBtn.onClick = function () {
        writePrefsToMemory({
            iconsLabelIndex: iconLabelsDD.selection.index,
            iconsLabelRandom: iconRandomCheck.value,
            locsLabelIndex: locLabelsDD.selection.index,
            locsLabelRandom: locRandomCheck.value,
            texLabelIndex: texLabelsDD.selection.index,
            texLabelRandom: texRandomCheck.value,
            showHelpTips: showHelpTipsCheck.value
        });
        updateQAHelpTips(showHelpTipsCheck.value);
        helpWin.close();
    };
    helpWin.layout.layout(true);
    if (helpWin != null && helpWin instanceof Window) {
        helpWin.center();
        helpWin.show();
    }
};
var allQABtns = [];
var createQABtn = function (container, binary, helpTip, onClick) {
    var btn = container.add('iconbutton', undefined, binary, {
        style: 'toolbutton'
    });
    btn.helpTip = parsePrefs().showHelpTips ? helpTip : '';
    btn.onClick = onClick;
    allQABtns.push([btn, helpTip]);
    return btn;
};
var createQAUI = function (tpanel) {
    var qaTab = tpanel.add('tab', undefined, ['Quick Actions']);
    qaTab.alignment = qaTab.alignChildren = ['fill', 'fill'];
    var QABtnsGrp = qaTab.add('group');
    QABtnsGrp.orientation = 'column';
    QABtnsGrp.alignChildren = 'left';
    QABtnsGrp.alignment = 'left';
    QABtnsGrp.margins = 4;
    var bigRowOne = QABtnsGrp.add('group');
    var rowOne = bigRowOne.add('group');
    createQABtn(rowOne, bgBinary, 'Background', createBg);
    createQABtn(rowOne, logosBinary, 'Import IDF and Dotz Logos', importLogos);
    createQABtn(rowOne, illusBinary, 'Illustration Text', createIllusText);
    createQABtn(rowOne, popBinary, 'Pop Animation', scaleWithOvershootQA);
    var rowTwo = bigRowOne.add('group');
    createQABtn(rowTwo, israelShapeBinary, 'Israel Map Shape', createIsraelMap);
    createQABtn(rowTwo, gazaShapeBinary, 'Gaza Map Shape', createGazaMap);
    createQABtn(rowTwo, numsBinary, 'Counting Numbers', createCountingText);
    createQABtn(rowTwo, ILMapPhotoBinary, 'Israel Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels', importIsraelGoogleMaps);
    var bigRowTwo = QABtnsGrp.add('group');
    var rowThree = bigRowTwo.add('group');
    createQABtn(rowThree, GAMapPhotoBinary, 'Gaza Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels', importGazaGoogleMaps);
    createQABtn(rowThree, textReverseBinary, 'Reverse Text', textReverse);
    createQABtn(rowThree, formatBinary, 'Format Layer Name', formatLayerName);
    createQABtn(rowThree, tvaiBinary, 'Tunnel Illustration', createTvaiStroke);
    var rowFour = bigRowTwo.add('group');
    createQABtn(rowFour, frameBinary, 'Animated Frame', createAnimatedFrame);
    createQABtn(rowFour, folderBinary, "Open Project Folder in ".concat(getOS() === 'Win' ? 'Explorer' : 'Finder', "\n\nClick: Open Project Folder\nCTRL + CLICK: Choose New Project Folder"), openProjectInFinder);
    createQABtn(rowFour, tatzaBinary, 'Location Mark', createTatzaPath);
    createQABtn(rowFour, recScaleXBinary, 'Rectangle X Scale', recScaleX);
    var bigRowThree = QABtnsGrp.add('group');
    var rowFive = bigRowThree.add('group');
    rowFive.alignment = 'left';
    createQABtn(rowFive, textPopBinary, 'Text On Location', createTextOnLocation);
    createQABtn(rowFive, arrowBinary, 'Arrow', createArrow);
    createQABtn(rowFive, mikraBinary, 'Mikra', createMikra);
    bigRowOne.orientation = bigRowTwo.orientation = 'column';
    return { qaTab: qaTab, QABtnsGrp: QABtnsGrp, bigRowOne: bigRowOne, bigRowTwo: bigRowTwo, bigRowThree: bigRowThree };
};
var createTextUI = function (tpanel) {
    var textTab = tpanel.add('tab', undefined, ['Text']);
    var mainTextGrp = textTab.add('group');
    mainTextGrp.alignChildren = ['fill', 'top'];
    mainTextGrp.alignment = ['fill', 'top'];
    var mainTextEdit = mainTextGrp.add('edittext', undefined, '', {
        multiline: true
    });
    mainTextEdit.preferredSize = [160, 60];
    mainTextEdit.alignment = ['fill', 'top'];
    var optionsGrp = textTab.add('group');
    optionsGrp.margins.top = optionsGrp.margins.bottom = 14;
    optionsGrp.alignment = 'center';
    var textDropdownsGrp = optionsGrp.add('group');
    textDropdownsGrp.alignChildren = ['left', 'center'];
    textDropdownsGrp.spacing = 10;
    textDropdownsGrp.margins = 0;
    var fontDDGrp = textDropdownsGrp.add('group');
    fontDDGrp.alignChildren = ['left', 'center'];
    fontDDGrp.spacing = 10;
    fontDDGrp.margins = 0;
    fontDDGrp.add('statictext', undefined, 'Font:');
    var fontDDList = [
        'Narkis',
        'Almoni',
        'Trade Gothic',
        'Droid',
        'Janna'
    ];
    var fontDD = fontDDGrp.add('dropdownlist', undefined, fontDDList);
    fontDD.selection = 0;
    var animationDDGrp = textDropdownsGrp.add('group');
    animationDDGrp.alignChildren = ['left', 'center'];
    animationDDGrp.spacing = 10;
    animationDDGrp.margins = 0;
    animationDDGrp.add('statictext', undefined, 'Animation:');
    var animationDDList = [
        'Y Position',
        'X Position',
        'Scale',
        'Opacity'
    ];
    var animationDD = animationDDGrp.add('dropdownlist', undefined, animationDDList);
    animationDD.selection = 0;
    var checksGrp = optionsGrp.add('group');
    checksGrp.alignChildren = ['left', 'center'];
    checksGrp.spacing = 10;
    checksGrp.margins = 0;
    var addTextEvoCheck = checksGrp.add('checkbox', undefined, 'Text Evo');
    var maskCheck = checksGrp.add('checkbox', undefined, 'Mask');
    var createBtn = textTab.add('button', undefined, 'Create Text');
    animationDDGrp.enabled = addTextEvoCheck.value;
    addTextEvoCheck.onClick = function () {
        animationDDGrp.enabled = addTextEvoCheck.value;
    };
    createBtn.onClick = function () {
        var text = mainTextEdit.text;
        var font = fontDD.selection.toString();
        var animation = animationDD.selection.toString();
        var addTextEvo = addTextEvoCheck.value;
        var addMask = maskCheck.value;
        createText(text, font, animation, addTextEvo, addMask);
    };
    return { textTab: textTab, optionsGrp: optionsGrp, textDropdownsGrp: textDropdownsGrp };
};
var createIconsUI = function (tpanel) {
    var iconsTab = tpanel.add('tab', undefined, ['Icons']);
    var iconsGrp = iconsTab.add('group');
    iconsGrp.orientation = 'column';
    iconsGrp.alignChildren = 'left';
    iconsGrp.alignment = 'left';
    iconsGrp.margins = 4;
    iconsGrp.margins.left = 10;
    var iconCircleGrp = iconsGrp.add('group');
    var iconDDGrp = iconCircleGrp.add('group');
    iconDDGrp.add('statictext', undefined, 'Icon:');
    var iconsList = [
        'Boom',
        'Tunnel',
        'Terror Tunnel',
        'Target',
        'Sniper Target',
        'House Bombing',
        'Fire',
        'Money',
        'Earth',
        'Kaboom',
        'Medal',
        'Salute With M16',
        'Holding M16',
        'Shooting M16',
        'Rocket',
        'Rocket Launcher',
        'Mask',
        'Shoe',
        'Helmet'
    ];
    var iconDD = iconDDGrp.add('dropdownlist', undefined, iconsList);
    iconDD.preferredSize[0] = 100;
    iconDD.selection = 0;
    var circleColorGrp = iconCircleGrp.add('group');
    circleColorGrp.add('statictext', undefined, 'Circle Color:');
    var circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
        'White',
        'Black',
        'Red'
    ]);
    var colorChecksGrp = iconsGrp.add('group');
    var iconColorGrp = colorChecksGrp.add('group');
    iconColorGrp.add('statictext', undefined, 'Icon Color:');
    var iconColorDD = iconColorGrp.add('dropdownlist', undefined, [
        'Black',
        'White',
        'Red'
    ]);
    iconColorDD.preferredSize[0] = 71;
    circleColorDD.selection = iconColorDD.selection = 0;
    var iconsChecksGrp = colorChecksGrp.add('group');
    iconsChecksGrp.spacing = 20;
    var circleCheck = iconsChecksGrp.add('checkbox', undefined, 'Circle');
    var scaleCheck = iconsChecksGrp.add('checkbox', undefined, 'Scale');
    var iconCreateBtn = iconsGrp.add('button', undefined, 'Create Icon');
    iconCreateBtn.preferredSize[0] = 100;
    circleColorGrp.enabled = false;
    circleCheck.onClick = function () {
        circleColorGrp.enabled = circleCheck.value;
    };
    iconCreateBtn.onClick = function () {
        var id = iconDD.selection.toString();
        createIconFromId(id, circleColorDD.selection.toString(), iconColorDD.selection.toString(), circleCheck.value, scaleCheck.value);
    };
    return { iconsTab: iconsTab, iconCircleGrp: iconCircleGrp, colorChecksGrp: colorChecksGrp };
};
var createLocationsUI = function (tpanel) {
    var locTab = tpanel.add('tab', undefined, ['Locations']);
    var locationsGrp = locTab.add('group');
    locationsGrp.orientation = 'column';
    locationsGrp.alignChildren = 'left';
    locationsGrp.alignment = 'left';
    locationsGrp.margins = 4;
    locationsGrp.margins.left = 10;
    var dropdownsGrp = locationsGrp.add('group');
    dropdownsGrp.alignChildren = 'left';
    dropdownsGrp.alignment = 'left';
    var locationsDDGrp = dropdownsGrp.add('group');
    locationsDDGrp.add('statictext', undefined, 'Location:');
    var locationsList = [
        'Kindergarden',
        'Medical Clinic',
        'Sports',
        'University',
        'Mosque',
        'U.N. Building',
        'Diplomatic Building',
        'Gas Station',
        'Government Building',
        'Factory',
        'Pumping Station',
        'Police',
        'Water Facility',
        'Residential Neighborhood',
        'Amusement Park'
    ];
    var locationsDD = locationsDDGrp.add('dropdownlist', undefined, locationsList);
    locationsDD.preferredSize[0] = 100;
    locationsDD.selection = 0;
    var langDDGrp = dropdownsGrp.add('group');
    langDDGrp.add('statictext', undefined, 'Language:');
    var langs = ['Hebrew', 'English', 'Arabic'];
    var langDD = langDDGrp.add('dropdownlist', undefined, langs);
    langDD.preferredSize[0] = 100;
    langDD.selection = 0;
    var mitugDDGrp = dropdownsGrp.add('group');
    mitugDDGrp.add('statictext', undefined, 'Mitug:');
    var mitugim = ['Gaza', 'Pakmaz', 'Lebanon'];
    var mitugDD = mitugDDGrp.add('dropdownlist', undefined, mitugim);
    mitugDD.preferredSize[0] = 100;
    mitugDD.selection = 0;
    var locationsCreateBtn = locationsGrp.add('button', undefined, 'Create Location');
    locationsCreateBtn.preferredSize[0] = 100;
    locationsCreateBtn.onClick = function () {
        var id = locationsDD.selection.toString();
        var lang = langDD.selection.toString();
        var mitug = mitugDD.selection.toString();
        createLocationFromId(id, lang, mitug);
    };
    return { locTab: locTab, dropdownsGrp: dropdownsGrp };
};
var createTexturesUI = function (tpanel) {
    var texTab = tpanel.add('tab', undefined, ['Textures']);
    var texturesGrp = texTab.add('group');
    texturesGrp.orientation = 'column';
    texturesGrp.alignChildren = 'left';
    texturesGrp.alignment = 'left';
    texturesGrp.margins = 4;
    texturesGrp.margins.left = 10;
    var dropdownChecksGrp = texturesGrp.add('group');
    dropdownChecksGrp.alignChildren = 'left';
    dropdownChecksGrp.alignment = 'left';
    var texturesDDGrp = dropdownChecksGrp.add('group');
    texturesDDGrp.add('statictext', undefined, 'Texture:');
    var texturesList = [
        'Paper Dark',
        'Paper Medium',
        'Paper Light',
        'Smoke',
        'Noise',
        'Dust'
    ];
    var texturesDD = texturesDDGrp.add('dropdownlist', undefined, texturesList);
    texturesDD.preferredSize[0] = 100;
    texturesDD.selection = 0;
    var textureChecksGrp = dropdownChecksGrp.add('group');
    var textureLoopCheck = textureChecksGrp.add('checkbox', undefined, 'Loop');
    var textureFitCheck = textureChecksGrp.add('checkbox', undefined, 'Fit To Comp');
    textureLoopCheck.onClick = function () {
        textureFitCheck.enabled = !textureLoopCheck.value;
        textureFitCheck.value = false;
    };
    var texturesCreateBtn = texturesGrp.add('button', undefined, 'Import Texture');
    texturesCreateBtn.preferredSize[0] = 100;
    texturesCreateBtn.onClick = function () {
        var id = texturesDD.selection.toString();
        var loop = textureLoopCheck.value;
        var fit = textureFitCheck.value;
        createTexture(id, loop, fit);
    };
    return { texTab: texTab, dropdownChecksGrp: dropdownChecksGrp };
};
var createSideBtns = function (qaTab, textTab, iconsTab, locTab, texTab) {
    var createTheBtns = function (container) {
        var helpBtn = createQABtn(container, helpBinary, 'Help', createHelpWindow);
        return helpBtn;
    };
    var extraBtnsQA = qaTab.add('group');
    var extraBtnsText = textTab.add('group');
    var extraBtnsIcons = iconsTab.add('group');
    var extraBtnsLocations = locTab.add('group');
    var extraBtnsTextures = texTab.add('group');
    extraBtnsQA.spacing =
        extraBtnsText.spacing =
            extraBtnsIcons.spacing =
                extraBtnsLocations.spacing =
                    extraBtnsTextures.spacing =
                        2;
    extraBtnsQA.alignment =
        extraBtnsQA.alignChildren =
            extraBtnsText.alignment =
                extraBtnsText.alignChildren =
                    extraBtnsIcons.alignment =
                        extraBtnsIcons.alignChildren =
                            extraBtnsLocations.alignment =
                                extraBtnsLocations.alignChildren =
                                    extraBtnsTextures.alignment =
                                        extraBtnsTextures.alignChildren =
                                            ['fill', 'fill'];
    var helpBtnQA = createTheBtns(extraBtnsQA);
    var helpBtnText = createTheBtns(extraBtnsText);
    var helpBtnIcons = createTheBtns(extraBtnsIcons);
    var helpBtnLocs = createTheBtns(extraBtnsLocations);
    var helpBtnTexs = createTheBtns(extraBtnsTextures);
    helpBtnQA.alignment =
        helpBtnText.alignment =
            helpBtnIcons.alignment =
                helpBtnLocs.alignment =
                    helpBtnTexs.alignment =
                        ['right', 'bottom'];
};
var init = function (thisObj) {
    var w = thisObj instanceof Panel
        ? thisObj
        : new Window('palette', 'Caspion', undefined, {
            resizeable: true
        });
    if (w == null)
        w;
    w = w;
    var tpanel = w.add('tabbedpanel');
    tpanel.alignment = tpanel.alignChildren = ['fill', 'fill'];
    var _a = createQAUI(tpanel), qaTab = _a.qaTab, QABtnsGrp = _a.QABtnsGrp, bigRowOne = _a.bigRowOne, bigRowTwo = _a.bigRowTwo, bigRowThree = _a.bigRowThree;
    var _b = createTextUI(tpanel), textTab = _b.textTab, optionsGrp = _b.optionsGrp, textDropdownsGrp = _b.textDropdownsGrp;
    var _c = createIconsUI(tpanel), iconsTab = _c.iconsTab, iconCircleGrp = _c.iconCircleGrp, colorChecksGrp = _c.colorChecksGrp;
    var _d = createLocationsUI(tpanel), locTab = _d.locTab, dropdownsGrp = _d.dropdownsGrp;
    var _e = createTexturesUI(tpanel), texTab = _e.texTab, dropdownChecksGrp = _e.dropdownChecksGrp;
    createSideBtns(qaTab, textTab, iconsTab, locTab, texTab);
    w.layout.layout(true);
    w.layout.resize();
    w.onResizing = w.onResize = function () {
        w.onResize = function () {
            bigRowOne.orientation =
                bigRowTwo.orientation =
                    bigRowThree.orientation =
                        w.size.width > 400 ? 'row' : 'column';
            QABtnsGrp.orientation =
                w.size.width > 880 ? 'row' : 'column';
            optionsGrp.orientation =
                w.size.width > 450 ? 'row' : 'column';
            textDropdownsGrp.orientation =
                w.size.width > 340 ? 'row' : 'column';
            iconCircleGrp.orientation = colorChecksGrp.orientation =
                w.size.width > 350 ? 'row' : 'column';
            dropdownsGrp.orientation =
                w.size.width > 520 ? 'row' : 'column';
            dropdownChecksGrp.orientation =
                w.size.width > 350 ? 'row' : 'column';
            w.layout.layout(true);
            w.layout.resize();
        };
    };
    if (w != null && w instanceof Window) {
        w.center();
        w.show();
    }
};
(function (thisObj) {
    setUpPrefs();
    init(thisObj);
})(this);