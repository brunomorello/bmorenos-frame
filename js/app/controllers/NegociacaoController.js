class NegociacaoController {

	constructor() {

		// um alias igual existe o $ do JQuery
		let selector = document.querySelector.bind(document);

		this._inputData = selector("#data");
		this._inputQuantidade = selector("#quantidade");
		this._inputValor = selector("#valor");

		this._listaNegociacoes = new ListaNegociacoes(model => 		
			this._negociacoesView.update(model)
		);

		this._negociacoesView = new NegociacoesView(selector("#NegociacoesView"));
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem = new Mensagem();
		this._mensagemView = new MensagemView(selector("#MensagemView"));

	}


	adiciona(event) {
		
		event.preventDefault();	

		this._listaNegociacoes.adicionar(this._criarNegociacao());

		this._mensagem.texto = "Negociacao Adicionada com Sucesso!";
		this._mensagemView.update(this._mensagem);

		this._limpaFormulario();

	}

	apagar() {

		this._listaNegociacoes.esvaziar();


		this._mensagem.texto = "Negociações apagadas com sucesso!";
		this._mensagemView.update(this._mensagem);

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