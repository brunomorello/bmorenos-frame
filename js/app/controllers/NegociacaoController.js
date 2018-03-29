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

		// convertendo a string data em um objeto data
		// sera usado:
		// spread operator - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
		// arrow function - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions

		let data = new Date(
			...this._inputData.value
				.split("-")
				.map( (item, index) => item - index % 2)
				// item - index % 2 (pois o mes usado na funcao date deve ser mes atual -1)
		);

		// criando uma nova negociacao
		let negociacao = new Negociacao (
			data,
			this._inputQuantidade.value,
			this._inputValor.value
		);

	}

}