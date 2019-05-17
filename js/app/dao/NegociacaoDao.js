'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
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

            _export('NegociacaoDao', NegociacaoDao = function () {
                function NegociacaoDao(connection) {
                    _classCallCheck(this, NegociacaoDao);

                    this._connection = connection;
                    this._store = 'negotiations';
                }

                _createClass(NegociacaoDao, [{
                    key: 'add',
                    value: function add(negotiation) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negotiation);

                            request.onsuccess = function (e) {
                                //console.log(`success to insert object`); 
                                resolve();
                            };

                            request.onerror = function (e) {
                                reject('Error to Insert Object ' + e.target.error);
                            };
                        });
                    }
                }, {
                    key: 'getLocalNegotiations',
                    value: function getLocalNegotiations() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                            var negotiationsList = [];

                            request.onsuccess = function (e) {

                                var currentPosition = e.target.result;

                                if (currentPosition) {
                                    // storing current negotiation
                                    var negotiation = currentPosition.value;

                                    // pushing it to array
                                    negotiationsList.push(new Negociacao(negotiation._data, negotiation._quantidade, negotiation._valor));

                                    // moving cursor
                                    currentPosition.continue();
                                } else {
                                    // when finishes read list, resolve this Promise
                                    resolve(negotiationsList);
                                }
                            };

                            request.onerror = function (e) {
                                reject('Error to Get Local Negotiations ' + e.target.error);
                            };
                        });
                    }
                }, {
                    key: 'deleteAllLocalNegotiations',
                    value: function deleteAllLocalNegotiations() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                            request.onsuccess = function (e) {
                                return resolve('Success to delete all negotiations stored locally');
                            };

                            request.onerror = function (e) {
                                return reject('Error to delete all negotiations stored locally ' + e.target.error);
                            };
                        });
                    }
                }]);

                return NegociacaoDao;
            }());

            _export('NegociacaoDao', NegociacaoDao);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map