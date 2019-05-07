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

    getLocalNegotiations() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let negotiationsList = [];

            request.onsuccess = e => {

                let currentPosition = e.target.result;

                if(currentPosition) {
                    // storing current negotiation
                    let negotiation = currentPosition.value;

                    // pushing it to array
                    negotiationsList.push(new Negociacao(negotiation._data, negotiation._quantidade, negotiation._valor));

                    // moving cursor
                    currentPosition.continue();

                } else {
                    // when finishes read list, resolve this Promise
                    resolve(negotiationsList);
                }
                
            };
            

            request.onerror = e => {
                reject(`Error to Get Local Negotiations ${e.target.error}`);
            };

        })

    }

}