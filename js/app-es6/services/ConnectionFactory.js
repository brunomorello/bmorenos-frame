// Applied Module Pattern
var ConnectionFactory = (function () {

    const databaseName = 'bmorenos-frame';
    const databaseVersion = 1;
    const databaseStores = ['negotiations'];
    
    var connection = null;

    var closeConnection = null;

    /*

        #####################

            Framework for IndexedDB https://dexie.org/
        
        #####################

    */
    
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