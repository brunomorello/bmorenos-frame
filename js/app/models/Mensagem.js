class Mensagem {
	
	constructor(texto = "") {

		this._texto = texto;

	}

	get mensagem() {
		return this._texto;
	}

	set mensagem(texto) {
		this._texto = texto;
	} 

}