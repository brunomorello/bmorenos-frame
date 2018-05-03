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

		//Tecnica de data binding (associação de dados)
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

		let periodosNegociacao = [];

		periodosNegociacao.push(negociacoesWS.getNegociacoesSemana());
		periodosNegociacao.push(negociacoesWS.getNegociacoesSemanaAnterior());
		periodosNegociacao.push(negociacoesWS.getNegociacoesSemanaRetrasada());

		Promise.all(periodosNegociacao)
			.then(negociacoes => {
				//console.log('Promise.all.then = ' + negociacoes);

				negociacoes
					.reduce((arrayAchatado, array) => arrayAchatado.concat(array, []))
					.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));

				this._mensagem.texto = "Negociações adicionadas com sucesso";
			})
			.catch(errorMsg => this._mensagem.texto = errorMsg);
	
	}

	ordena(coluna) {

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