"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,r){return n&&_defineProperties(e.prototype,n),r&&_defineProperties(e,r),e}var GameElement=function(){function e(){_classCallCheck(this,e),game.gameItems.push(this)}return _createClass(e,[{key:"update",value:function(){}},{key:"render",value:function(){throw new Error("render function must be rewritten.")}},{key:"getRdm",value:function(e,n){return Math.floor(Math.random()*(n-e+1)+e)}}]),e}();