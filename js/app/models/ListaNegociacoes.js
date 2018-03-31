class ListaNegociacoes {
	
	constructor (armadilha) {

		this._negociacoes = [];
		this._armadilha = armadilha;
		console.log('this._armadilha = ' + this._armadilha);

	}

	adicionar(negociacao) {

		this._negociacoes.push(negociacao);
		this._armadilha(this);

	}


	get negociacoes() {

		return [].concat(this._negociacoes);

	}

	esvaziar() {

		this._negociacoes = [];
		this._armadilha(this);

	}


}