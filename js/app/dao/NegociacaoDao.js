class NegociacaoDao {

    constructor(connection) {
        
        this._connection = connection;
        this._store = 'negotiations';

    }

    add(negotiation) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negotiation);
            
            request.onsuccess = e => {
                //console.log(`success to insert object`); 
                resolve();
            };

            request.onerror = e => {
                reject(`Error to Insert Object ${e.target.error}`);
            }

        });

    }

}