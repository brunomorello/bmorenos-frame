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
}