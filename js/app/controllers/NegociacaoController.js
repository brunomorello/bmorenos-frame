class NegociacaoController {

	constructor() {

		// um alias igual existe o $ do JQuery
		let selector = document.querySelector.bind(document);

		this._inputData = selector("#data");
		this._inputQuantidade = selector("#quantidade");
		this._inputValor = selector("#valor");
		this._listaNegociacoes = new ListaNegociacoes();

	}


	adiciona(event) {
		
		event.preventDefault();	

		this._listaNegociacoes.adicionar(this._criarNegociacao());

		console.log(this._listaNegociacoes.negociacoes);
		//console.log('data formatada ' + DateHelper.dateToText(negociacao.data));

		this._limpaFormulario();

	}


	_criarNegociacao() {

		return new Negociacao (
			DateHelper.textToDate(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);

	}

	_limpaFormulario() {

		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();

	}

}