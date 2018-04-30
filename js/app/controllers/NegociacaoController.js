class NegociacaoController {

	constructor() {

		// um alias igual existe o $ do JQuery
		let selector = document.querySelector.bind(document);

		this._inputData = selector("#data");
		this._inputQuantidade = selector("#quantidade");
		this._inputValor = selector("#valor");

		//this._listaNegociacoes = new ListaNegociacoes(model => 		
		//	this._negociacoesView.update(model)
		//);

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView(selector("#NegociacoesView")),
			'adicionar', 'esvaziar'
		);

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView(selector("#MensagemView")),
			'texto'
		);

	}


	adiciona(event) {
		
		event.preventDefault();	

		this._listaNegociacoes.adicionar(this._criarNegociacao());
		this._mensagem.texto = "Negociacao Adicionada com Sucesso!";
		this._limpaFormulario();

	}

	apagar() {

		this._listaNegociacoes.esvaziar();
		this._mensagem.texto = "Negociações apagadas com sucesso!";

	}

	importaNegociacoes() {

		let negociacoesWS = new NegociacaoService();

		let promise = negociacoesWS.getNegociacoesSemana();

		promise
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao))
			})
			.catch(error => this._mensagem.texto = error);

		/*
		// o método abaixo possui Error-First-Callback
		negociacoesWS.getNegociacoesSemana((erro, negociacoes) => {

			if(erro) {
				this._mensagem.texto = erro;
				return;
			}

			negociacoes.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));
			this._mensagem.texto = "Negociações inseridas com sucesso.";

		});
		*/
	
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