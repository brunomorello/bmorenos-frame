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

		let xhr = new XMLHttpRequest();

		xhr.open('GET', 'negociacoes/semana');

		xhr.send();

		xhr.onreadystatechange = () => {

			/*
				1 - Conexao com o servidor estabelecida
				2 - Requisicao recebida
				3 - Processando requisicao
				4 - Requisicao concluida e resposta pronta
			*/

			if(xhr.readyState == 4) {

				if(xhr.status == 200) {

					console.log('Obtendo os dados do servidor');

					JSON.parse(xhr.responseText)
						.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
						.forEach(negociacao => this._listaNegociacoes.adicionar(negociacao));

					this._mensagem.texto = "Negociações importadas com sucesso.";

				} else {

					console.log(`Não foi possível obter as negociações do servidor - error: ${xhr.status}`);
					this._mensagem.texto = "Não foi possível obter as negociações.";

				}

			}

		}


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