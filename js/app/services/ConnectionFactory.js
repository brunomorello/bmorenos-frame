'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, databaseName, databaseVersion, databaseStores, connection, closeConnection, ConnectionFactory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
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

            databaseName = 'bmorenos-frame';
            databaseVersion = 1;
            databaseStores = ['negotiations'];
            connection = null;
            closeConnection = null;

            _export('ConnectionFactory', ConnectionFactory = function () {

                // avoiding developers to create instances of this class
                function ConnectionFactory() {
                    _classCallCheck(this, ConnectionFactory);

                    throw new Error('Create Instances of ConnectionFactory is not allowed');
                }

                _createClass(ConnectionFactory, null, [{
                    key: 'getConnection',
                    value: function getConnection() {

                        return new Promise(function (resolve, reject) {

                            var openRequest = window.indexedDB.open(databaseName, databaseVersion);

                            openRequest.onupgradeneeded = function (data) {

                                ConnectionFactory._createStores(data.target.result);
                            };

                            openRequest.onsuccess = function (data) {

                                if (!connection) {

                                    connection = data.target.result;

                                    // Create a Bind to Connection and save the function to close a connection
                                    closeConnection = connection.close.bind(connection);

                                    // Monkey Patch to block users to close a connection
                                    connection.close = function () {
                                        throw new Error('You cannot close a connection directly');
                                    };
                                }

                                resolve(connection);
                            };

                            openRequest.onerror = function (data) {

                                console.log('error to get connection ' + data.target.error);

                                reject(data.target.error.name);
                            };
                        });
                    }
                }, {
                    key: '_createStores',
                    value: function _createStores(connection) {

                        databaseStores.forEach(function (store) {

                            if (connection.objectStoreNames.contains(store)) {
                                connection.deleteObjectStore(store);
                            }

                            connection.createObjectStore(store, { autoIncrement: true });
                        });
                    }
                }, {
                    key: 'close',
                    value: function close() {

                        if (connection) {
                            closeConnection();
                            connection = null;
                        }
                    }
                }]);

                return ConnectionFactory;
            }());

            _export('ConnectionFactory', ConnectionFactory);
        }
    };
});
//# sourceMappingURL=ConnectionFactory.js.map