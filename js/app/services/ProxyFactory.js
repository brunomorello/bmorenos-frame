"use strict";

System.register([], function (_export, _context) {
				"use strict";

				var _typeof, _createClass, ProxyFactory;

				function _classCallCheck(instance, Constructor) {
								if (!(instance instanceof Constructor)) {
												throw new TypeError("Cannot call a class as a function");
								}
				}

				return {
								setters: [],
								execute: function () {
												_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
																return typeof obj;
												} : function (obj) {
																return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
												};

												_createClass = function () {
																function defineProperties(target, props) {
																				for (var i = 0; i < props.length; i++) {
																								var descriptor = props[i];
																								descriptor.enumerable = descriptor.enumerable || false;
																								descriptor.configurable = true;
																								if ("value" in descriptor) descriptor.writable = true;
																								Object.defineProperty(target, descriptor.key, descriptor);
																				}
																}

																return function (Constructor, protoProps, staticProps) {
																				if (protoProps) defineProperties(Constructor.prototype, protoProps);
																				if (staticProps) defineProperties(Constructor, staticProps);
																				return Constructor;
																};
												}();

												_export("ProxyFactory", ProxyFactory = function () {
																function ProxyFactory() {
																				_classCallCheck(this, ProxyFactory);
																}

																_createClass(ProxyFactory, null, [{
																				key: "create",
																				value: function create(object, props, action) {

																								//console.log(`Debug: ProxyFactory.create.object: ${object}`);
																								//console.log(object);

																								//console.log(`Debug: ProxyFactory.create.props: ${props}`);
																								//console.log(props);

																								// console.log(`Debug: ProxyFactory.create.action: ${action}`);
																								// console.log(action);

																								return new Proxy(object, {
																												get: function get(target, prop, receiver) {

																																if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {

																																				return function () {

																																								// console.log(`A propriedade "${prop}" foi interceptada`);
																																								// console.log(prop);

																																								// console.log(`Debug Proxy.get: parametro target = "${target}"`);
																																								// console.log(target);

																																								// console.log(`Debug Proxy.get: parametro prop = "${prop}"`);
																																								// console.log(prop);

																																								// console.log(`Debug Proxy.get: parametro receiver = "${receiver}"`);
																																								// console.log(receiver);

																																								// console.log(`Debug Proxy.get: target[prop] = ${target[prop]}`);
																																								// console.log(target[prop]);

																																								// console.log(`Debug Proxy.get: target = ${target}`);
																																								// console.log(target);

																																								// console.log(`Debug Proxy.get: arguments = ${arguments}`);
																																								// console.log(arguments);


																																								var retorno = Reflect.apply(target[prop], target, arguments);
																																								action(target);
																																								return retorno;
																																				};
																																}

																																return Reflect.get(target, prop, receiver);
																												},
																												set: function set(target, prop, value, receiver) {

																																// console.log(`Debug Proxy.set: parametro target[${target}]`);
																																// console.log(target);

																																// console.log(`Debug Proxy.set: parametro prop[${prop}]`);
																																// console.log(prop);

																																// console.log(`Debug Proxy.set: parametro value[${value}]`);
																																// console.log(value);

																																// console.log(`Debug Proxy.set: parametro target[${receiver}]`);
																																// console.log(receiver);

																																var retorno = Reflect.set(target, prop, value, receiver);

																																if (props.includes(prop)) {
																																				action(target);
																																}

																																return retorno;
																												}
																								});
																				}
																}, {
																				key: "_isFunction",
																				value: function _isFunction(func) {
																								return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
																				}
																}]);

																return ProxyFactory;
												}());

												_export("ProxyFactory", ProxyFactory);
								}
				};
});
//# sourceMappingURL=ProxyFactory.js.map