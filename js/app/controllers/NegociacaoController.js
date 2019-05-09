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
		this._ordemAtual = '';

		//Tecnica de data binding (associação de dados)
		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView(selector("#NegociacoesView")),
			'adicionar', 'esvaziar', 'ordena', 'inverteOrdem'
		);

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView(selector("#MensagemView")),
			'texto'
		);

		// API for trades
		this._service = new NegociacaoService();

		this._init();

	}

	_init() {

		// lists all trades stored locally
		this._service.listar()
				.then(negociacoes => 
					negociacoes.forEach(negociacao =>
						this._listaNegociacoes.adicionar(negociacao)
					)
				)
			.catch(error => this._mensagem.texto = error);

		// Set a Time interval to import negotiations
		setInterval(() => {

			this.importaNegociacoes();

		}, 5000);

	}

	adiciona(event) {
		
		event.preventDefault();	

		// new trade created
		let negociacao = this._criarNegociacao();

		// adding trade using API
		this._service.adicionar(negociacao)
			.then((msg) => {
				this._listaNegociacoes.adicionar(negociacao);
				this._mensagem.texto = msg;
				this._limpaFormulario();
			})
			.catch(error => this._mensagem.texto = error);		

	}

	apagar() {

		// clean all trades on list of trades
		this._service.removerTodas()
			.then((msg) => {
				this._listaNegociacoes.esvaziar();
				this._listaNegociacoes.texto = msg;
			})
			.catch(error => this._mensagem.texto = error);

	}

	importaNegociacoes() {

		// o motivo de usar let:
		// usamos var quando queremos que a variável tenha escopo global ou de função
		// usarmos let quando queremos que a variável tenha sempre escopo de bloco. 

		this._service.importarDaAPI(this._listaNegociacoes)
			.then(negociacoes => {
				negociacoes.forEach(negociacao => {
					this._listaNegociacoes.adicionar(negociacao);
				})
			})
			.catch(error => this._mensagem.texto = error);	
	
	}

	ordena(coluna) {

		if(this._ordemAtual == coluna) {
			this._listaNegociacoes.inverteOrdem();
		} else {
			this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
		}

		this._ordemAtual = coluna;

	}

	_criarNegociacao() {

		return new Negociacao (
			DateHelper.textToDate(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value)
		);

	}

	_limpaFormulario() {

		this._inputData.value = "";
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();

	}

}