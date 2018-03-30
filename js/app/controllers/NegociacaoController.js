class NegociacaoController {

	constructor() {

		// um alias igual existe o $ do JQuery
		let selector = document.querySelector.bind(document);

		this._inputData = selector("#data");
		this._inputQuantidade = selector("#quantidade");
		this._inputValor = selector("#valor");

	}


	adiciona(event) {
		
		event.preventDefault();	

		// criando uma nova negociacao
		let negociacao = new Negociacao (
			DateHelper.textToDate(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value
		);

		console.log(negociacao);
		console.log('data formatada ' + DateHelper.dateToText(negociacao.data));

		this.limpaCampos();

	}


	limpaCampos() {

		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();

	}

}