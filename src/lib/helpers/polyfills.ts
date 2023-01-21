Array.prototype.map||(Array.prototype.map=function(callback){var T,A,k;if(null==this)throw new TypeError("this is null or not defined");var O=Object(this),len=O.length>>>0;if("function"!=typeof callback)throw new TypeError(callback+" is not a function");for(arguments.length>1&&(T=arguments[1]),A=new Array(len),k=0;k<len;){var kValue,mappedValue;k in O&&(kValue=O[k],mappedValue=callback.call(T,kValue,k,O),A[k]=mappedValue),k++}return A});

Array.prototype.forEach||(Array.prototype.forEach=function(callback,thisArg){if(null==this)throw new TypeError("Array.prototype.forEach called on null or undefined");var T,k,O=Object(this),len=O.length>>>0;if("function"!=typeof callback)throw new TypeError(callback+" is not a function");for(arguments.length>1&&(T=thisArg),k=0;k<len;){var kValue;k in O&&(kValue=O[k],callback.call(T,kValue,k,O)),k++}});

Array.prototype.filter||(Array.prototype.filter=function(fun){"use strict";if(null==this)throw new TypeError;var t=Object(this),len=t.length>>>0;if("function"!=typeof fun)throw new TypeError;for(var res=[],thisArg=arguments.length>=2?arguments[1]:void 0,i=0;i<len;i++)if(i in t){var val=t[i];fun.call(thisArg,val,i,t)&&res.push(val)}return res});

Array.prototype.every||(Array.prototype.every=function(callbackfn,thisArg){"use strict";var T,k;if(null==this)throw new TypeError("this is null or not defined");var O=Object(this),len=O.length>>>0;if("function"!=typeof callbackfn&&"[object Function]"!==Object.prototype.toString.call(callbackfn))throw new TypeError;for(arguments.length>1&&(T=thisArg),k=0;k<len;){var kValue,testResult;if(k in O)if(kValue=O[k],!(testResult=T?callbackfn.call(T,kValue,k,O):callbackfn(kValue,k,O)))return!1;k++}return!0});

Array.prototype.some||(Array.prototype.some=function(fun,thisArg){"use strict";if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof fun)throw new TypeError;for(var t=Object(this),len=t.length>>>0,i=0;i<len;i++)if(i in t&&fun.call(thisArg,t[i],i,t))return!0;return!1});

Array.prototype.find=Array.prototype.find||function(callback){if(null===this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof callback)throw new TypeError("callback must be a function");for(var list=Object(this),length=list.length>>>0,thisArg=arguments[1],i=0;i<length;i++){var element=list[i];if(callback.call(thisArg,element,i,list))return element}};

Array.prototype.indexOf||(Array.prototype.indexOf=function(t){"use strict";if(this==null)throw TypeError();var r=Object(this),n=0|r.length;if(0===n)return -1;var e=0;for(arguments.length>1&&(e=Number(arguments[1]),e==e&&isFinite(e)?0!==e&&(e=Math.floor(e))<0&&(e=Math.max(n-Math.abs(e),0)):e=0);e<n;e++)if(e in r&&r[e]===t)return e;return -1});

Array.prototype.includes||(Array.prototype.includes=function(t){return!!~this.indexOf(t)});