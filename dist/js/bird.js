"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Bird=function(e){function t(){var e;return _classCallCheck(this,t),e=_possibleConstructorReturn(this,_getPrototypeOf(t).call(this)),e.bird=e.pickBird(),e.is_picked=!0,e.count=0,e.is_changed=!1,e.deg=0,e.width=e.height=.09375*game.viewHeight,e.gravity=0,e.downSpeed=0,e.x=game.viewHeight/8,e.y=game.viewHeight/3,e.radius=.28*e.width,e}return _inherits(t,e),_createClass(t,[{key:"update",value:function(){var e=this;this.deg>=Math.PI/2?this.deg=Math.PI/2:this.deg=3*this.downSpeed*parseFloat((game._interval/1e3).toFixed(2)),this.downSpeed+=this.gravity,this.y+=this.downSpeed,this.y-this.radius<=0&&(this.y=this.radius),this.is_changed||(this.is_changed=!0,++this.count>3&&(this.count=0),setTimeout(function(){e.is_changed=!1},200))}},{key:"render",value:function(){game.ctx.save(),game.ctx.translate(this.x,this.y),game.ctx.rotate(this.deg),game.ctx.drawImage(game.imgCache[this.bird[this.count]],-this.width/2,-this.height/2,this.width,this.height),game.ctx.restore()}},{key:"jump",value:function(){this.deg=-Math.PI/3,this.downSpeed=game.viewHeight/512*-9}},{key:"start",value:function(){!this.is_picked&&(this.bird=this.pickBird()),this.x=game.viewHeight/8,this.y=game.viewHeight/3,this.downSpeed=0,this.gravity=game.viewHeight/512*34*parseFloat((game._interval/1e3).toFixed(2)),this.jump()}},{key:"pickBird",value:function(){return[["yellow1","yellow2","yellow3","yellow2"],["blue1","blue2","blue3","blue2"],["red1","red2","red3","red2"]][this.getRdm(0,2)]}}]),t}(GameElement);