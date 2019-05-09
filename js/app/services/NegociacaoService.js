class NegociacaoService {

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

	constructor() {
		this._httpService = new HttpService();
	}

	getNegociacoesSemana() {

		let url = 'negociacoes/semana';

		return new Promise((resolve, reject) => {

			this._httpService
				.get(url)
				.then(negociacoes => {
					//console.log('negociacoes/semana service');
					//console.log(negociacoes);
					
					resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
				})
				.catch(errorMsg => {
					console.log(errorMsg);

					reject('Não foi possível obter as negociações da semana');
				});

		});

	}

	getNegociacoesSemanaAnterior() {

		let url = 'negociacoes/anterior';

		return new Promise((resolve, reject) => {

			this._httpService
				.get(url)
				.then(negociacoes => {
					//console.log('negociacoes/anterior service');
					//console.log(negociacoes)
					
					resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
				})
				.catch(errorMsg => {
					console.log(errorMsg);

					reject('Não foi possível obter as negociações da semana anterior');
				});

		});		

	}

	getNegociacoesSemanaRetrasada() {

		let url = 'negociacoes/retrasada';

		return new Promise((resolve, reject) => {

			this._httpService
				.get(url)
				.then(negociacoes => {
					//console.log('negociacoes/retrasada service');
					//console.log(negociacoes);
					
					resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
				})
				.catch(errorMsg => {
					console.log(errorMsg);

					reject('Não foi possível obter as negociações da semana retrasada');
				});

		});		

	}

	getNegociacoes() {

		return Promise.all(
			[
				this.getNegociacoesSemana(),
				this.getNegociacoesSemanaAnterior(),
				this.getNegociacoesSemanaRetrasada()
			]
		)
		.then(periodos => {

			let negociacoes = periodos.reduce((dados, periodo) => dados.concat(periodo, []))
										.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));

			return negociacoes;

		})
		.catch(error => {
			throw new Error(error);
		})

	}

	adicionar(negociacao) {
		
		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.add(negociacao))
			.then(() => 'Negociação cadastrada com sucesso')
			.catch(error => {
				
				console.log(`Error to create a new trade ${error}`);
				
				throw new Error('Erro para cadastrar uma nova negociação');

			})

	}

	removerTodas() {

		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.deleteAllLocalNegotiations())
			.then(() => 'Foram removidas todas as negociações')
			.catch((error) => {
				console.log(`Error to delete Negotiations ${error}`);
				throw new Error(`Erro para apagar as Negociações ${error}`);
			});		

	}

	listar() {

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

		return ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.getLocalNegotiations())
			.then((negociacoes) => negociacoes)
			.catch(error => {
				console.log(`Error to get Local Negotiations`);
				this._mensagem.texto = `Erro para carregar Negociações Localmente ${error}`;
			});		

	}

}