"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
	function NegociacaoController() {
		_classCallCheck(this, NegociacaoController);

		// um alias igual existe o $ do JQuery
		var selector = document.querySelector.bind(document);

		this._inputData = selector("#data");
		this._inputQuantidade = selector("#quantidade");
		this._inputValor = selector("#valor");

		//this._listaNegociacoes = new ListaNegociacoes(model => 		
		//	this._negociacoesView.update(model)
		//);
		this._ordemAtual = '';

		//Tecnica de data binding (associação de dados)
		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView(selector("#NegociacoesView")), 'adicionar', 'esvaziar', 'ordena', 'inverteOrdem');

		this._mensagem = new Bind(new Mensagem(), new MensagemView(selector("#MensagemView")), 'texto');

		// API for trades
		this._service = new NegociacaoService();

		this._init();
	}

	_createClass(NegociacaoController, [{
		key: "_init",
		value: function _init() {
			var _this = this;

			// lists all trades stored locally
			this._service.listar().then(function (negociacoes) {
				return negociacoes.forEach(function (negociacao) {
					return _this._listaNegociacoes.adicionar(negociacao);
				});
			}).catch(function (error) {
				return _this._mensagem.texto = error;
			});

			// Set a Time interval to import negotiations
			setInterval(function () {

				_this.importaNegociacoes();
			}, 5000);
		}
	}, {
		key: "adiciona",
		value: function adiciona(event) {
			var _this2 = this;

			event.preventDefault();

			// new trade created
			var negociacao = this._criarNegociacao();

			// adding trade using API
			this._service.adicionar(negociacao).then(function (msg) {
				_this2._listaNegociacoes.adicionar(negociacao);
				_this2._mensagem.texto = msg;
				_this2._limpaFormulario();
			}).catch(function (error) {
				return _this2._mensagem.texto = error;
			});
		}
	}, {
		key: "apagar",
		value: function apagar() {
			var _this3 = this;

			// clean all trades on list of trades
			this._service.removerTodas().then(function (msg) {
				_this3._listaNegociacoes.esvaziar();
				_this3._listaNegociacoes.texto = msg;
			}).catch(function (error) {
				return _this3._mensagem.texto = error;
			});
		}
	}, {
		key: "importaNegociacoes",
		value: function importaNegociacoes() {
			var _this4 = this;

			// o motivo de usar let:
			// usamos var quando queremos que a variável tenha escopo global ou de função
			// usarmos let quando queremos que a variável tenha sempre escopo de bloco. 

			this._service.importarDaAPI(this._listaNegociacoes).then(function (negociacoes) {
				negociacoes.forEach(function (negociacao) {
					_this4._listaNegociacoes.adicionar(negociacao);
				});
			}).catch(function (error) {
				return _this4._mensagem.texto = error;
			});
		}
	}, {
		key: "ordena",
		value: function ordena(coluna) {

			if (this._ordemAtual == coluna) {
				this._listaNegociacoes.inverteOrdem();
			} else {
				this._listaNegociacoes.ordena(function (a, b) {
					return a[coluna] - b[coluna];
				});
			}

			this._ordemAtual = coluna;
		}
	}, {
		key: "_criarNegociacao",
		value: function _criarNegociacao() {

			return new Negociacao(DateHelper.textToDate(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
		}
	}, {
		key: "_limpaFormulario",
		value: function _limpaFormulario() {

			this._inputData.value = "";
			this._inputQuantidade.value = 1;
			this._inputValor.value = 0.0;

			this._inputData.focus();
		}
	}]);

	return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map