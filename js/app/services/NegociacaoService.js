"use strict";

System.register(["./HttpService", "./ConnectionFactory", "../dao/NegociacaoDao", "../models/Negociacao"], function (_export, _context) {
	"use strict";

	var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_HttpService) {
			HttpService = _HttpService.HttpService;
		}, function (_ConnectionFactory) {
			ConnectionFactory = _ConnectionFactory.ConnectionFactory;
		}, function (_daoNegociacaoDao) {
			NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
		}, function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export("NegociacaoService", NegociacaoService = function () {

				/*
    	Recebe uma função callback baseada em Error-First-Callback
    
    	A convenção é que cada callback receba sempre o erro no primeiro parâmetro. 
    	Na função callback, basta então verificar esse parâmetro para saber se ocorreu um erro ou não!
    
    	getNegociacoesSemana(cb) {
    
    	    let xhr = new XMLHttpRequest();
    		xhr.open('GET', 'negociacoes/anterior');
    
    		xhr.onreadystatechange = () => {
    			if(xhr.readyState == 4) {
                  if(xhr.status == 200) {
    
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
    	            } else {
    	                console.log(xhr.responseText);
    	                cb('Não foi possível obter as negociações da semana anterior', null);
    	            }
    	        }
    	    }
    
    	    xhr.send();
    	}
    
    	Chamando a função acima
    
    	getNegociacoesSemana((erro, negociacoes) => {
    		if(erro) {
    			console.log('error');
    			return;
    		}
    
    		negociacoes.forEach() {
    			logica inserida aqui
    		}
    
    	});
    
    */

				function NegociacaoService() {
					_classCallCheck(this, NegociacaoService);

					this._httpService = new HttpService();
				}

				_createClass(NegociacaoService, [{
					key: "getNegociacoesSemana",
					value: function getNegociacoesSemana() {
						var _this = this;

						var url = 'negociacoes/semana';

						return new Promise(function (resolve, reject) {

							_this._httpService.get(url).then(function (negociacoes) {
								//console.log('negociacoes/semana service');
								//console.log(negociacoes);

								resolve(negociacoes.map(function (objeto) {
									return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
								}));
							}).catch(function (errorMsg) {
								console.log(errorMsg);

								reject('Não foi possível obter as negociações da semana');
							});
						});
					}
				}, {
					key: "getNegociacoesSemanaAnterior",
					value: function getNegociacoesSemanaAnterior() {
						var _this2 = this;

						var url = 'negociacoes/anterior';

						return new Promise(function (resolve, reject) {

							_this2._httpService.get(url).then(function (negociacoes) {
								//console.log('negociacoes/anterior service');
								//console.log(negociacoes)

								resolve(negociacoes.map(function (objeto) {
									return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
								}));
							}).catch(function (errorMsg) {
								console.log(errorMsg);

								reject('Não foi possível obter as negociações da semana anterior');
							});
						});
					}
				}, {
					key: "getNegociacoesSemanaRetrasada",
					value: function getNegociacoesSemanaRetrasada() {
						var _this3 = this;

						var url = 'negociacoes/retrasada';

						return new Promise(function (resolve, reject) {

							_this3._httpService.get(url).then(function (negociacoes) {
								//console.log('negociacoes/retrasada service');
								//console.log(negociacoes);

								resolve(negociacoes.map(function (objeto) {
									return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
								}));
							}).catch(function (errorMsg) {
								console.log(errorMsg);

								reject('Não foi possível obter as negociações da semana retrasada');
							});
						});
					}
				}, {
					key: "getNegociacoes",
					value: function getNegociacoes() {

						return Promise.all([this.getNegociacoesSemana(), this.getNegociacoesSemanaAnterior(), this.getNegociacoesSemanaRetrasada()]).then(function (periodos) {

							var negociacoes = periodos.reduce(function (dados, periodo) {
								return dados.concat(periodo, []);
							}).map(function (dado) {
								return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
							});

							return negociacoes;
						}).catch(function (error) {
							throw new Error(error);
						});
					}
				}, {
					key: "adicionar",
					value: function adicionar(negociacao) {

						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.add(negociacao);
						}).then(function () {
							return 'Negociação cadastrada com sucesso';
						}).catch(function (error) {

							console.log("Error to create a new trade " + error);

							throw new Error('Erro para cadastrar uma nova negociação');
						});
					}
				}, {
					key: "removerTodas",
					value: function removerTodas() {

						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.deleteAllLocalNegotiations();
						}).then(function () {
							return 'Foram removidas todas as negociações';
						}).catch(function (error) {
							console.log("Error to delete Negotiations " + error);
							throw new Error('Erro para apagar as Negociações');
						});
					}
				}, {
					key: "listar",
					value: function listar() {

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

						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.getLocalNegotiations();
						}).catch(function (error) {
							console.log("Error to get Local Negotiations " + error);
							throw new Error('Erro para carregar Negociações Localmente');
						});
					}
				}, {
					key: "importarDaAPI",
					value: function importarDaAPI(listaNegociacoes) {

						return this.getNegociacoes().then(function (negociacoes) {
							return negociacoes.filter(function (negociacao) {
								return !listaNegociacoes.negociacoes.some(function (negociacaoExistente) {
									return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
								});
							});
						}).catch(function (error) {
							console.log("Error to import trades from API " + error);
							throw new Error('Erro para importar as negociações através da API');
						});
					}
				}]);

				return NegociacaoService;
			}());

			_export("NegociacaoService", NegociacaoService);
		}
	};
});
//# sourceMappingURL=NegociacaoService.js.map