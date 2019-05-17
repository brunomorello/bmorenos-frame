'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var databaseName = 'bmorenos-frame';
var databaseVersion = 1;
var databaseStores = ['negotiations'];

var connection = null;

var closeConnection = null;

var ConnectionFactory = exports.ConnectionFactory = function () {

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
}();

// Applied Module Pattern

/* Removed Module Pattern of old versions of javascript 

var ConnectionFactory = (function () {

    const databaseName = 'bmorenos-frame';
    const databaseVersion = 1;
    const databaseStores = ['negotiations'];
    
    var connection = null;

    var closeConnection = null;

    

        #####################

            Framework for IndexedDB https://dexie.org/
        
        #####################

    
    
    return class ConnectionFactory {
    
        // avoiding developers to create instances of this class
        constructor() {
            throw new Error(`Create Instances of ConnectionFactory is not allowed`);
        }
    
        static getConnection() {
    
            return new Promise((resolve, reject) => {
    
                let openRequest = window.indexedDB.open(databaseName, databaseVersion);
    
                openRequest.onupgradeneeded = data => {
    
                    ConnectionFactory._createStores(data.target.result);
                    
                };
                
                openRequest.onsuccess = data => {
                    
                    if(!connection) {
                        
                        connection = data.target.result;

                        // Create a Bind to Connection and save the function to close a connection
                        closeConnection = connection.close.bind(connection);
        
                        // Monkey Patch to block users to close a connection
                        connection.close = function () {
                            throw new Error(`You cannot close a connection directly`);
                        }
                        
                    }

                    resolve(connection);
    
                };
                
                openRequest.onerror = data => {
    
                    console.log(`error to get connection ${data.target.error}`);
    
                    reject(data.target.error.name);
                    
                };
                
            });
    
        }
        
        static _createStores(connection) {
            
            databaseStores.forEach(store => {
    
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
    
                connection.createObjectStore(store, { autoIncrement: true });
    
            });
    
        }

        static close() {

            if(connection) {
                closeConnection();
                connection = null;
            }

        }
    }

}) ();

*/
//# sourceMappingURL=ConnectionFactory.js.map