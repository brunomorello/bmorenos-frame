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


		// Fillout Negotiations List with Local Data
		/* Verbose Mode:
			ConnectionFactory.getConnection()
				.then(connection => {

					new NegociacaoDao(connection)
						.getLocalNegotiations()
						.then((negociacoes) => {

							negociacoes.forEach(negociacao => {

								this._listaNegociacoes.adicionar(negociacao);

							});

						})
						.catch(error => this._mensagem.texto = `Erro para carregar as Negociações Localmente: ${error}`);

				})
		*/

		// Clean way to use Promises
		ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.getLocalNegotiations())
			.then((negociacoes) => 
				negociacoes.forEach(negociacao =>
					this._listaNegociacoes.adicionar(negociacao)))
			.catch(error => {
				console.log(`Error to get Local Negotiations`);
				this._mensagem.texto = `Erro para carregar Negociações Localmente ${error}`;
			});

	}


	adiciona(event) {
		
		event.preventDefault();	

		ConnectionFactory.getConnection()
			.then(connection => {

				let negociacao = this._criarNegociacao();

				new NegociacaoDao(connection)
					.add(negociacao)
					.then(() => {
						this._listaNegociacoes.adicionar(this._criarNegociacao());
						this._mensagem.texto = "Negociacao Adicionada com Sucesso!";
						this._limpaFormulario();
					})
					.catch(error => {
						this._mensagem.texto = `Erro para adicionar a Negociacao ${error}`;
					})
			})
			.catch(error => this._mensagem.texto = error);

	}

	apagar() {

		this._listaNegociacoes.esvaziar();
		this._mensagem.texto = "Negociações apagadas com sucesso!";

	}

	importaNegociacoes() {

		// o motivo de usar let:
		// usamos var quando queremos que a variável tenha escopo global ou de função
		// usarmos let quando queremos que a variável tenha sempre escopo de bloco. 
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