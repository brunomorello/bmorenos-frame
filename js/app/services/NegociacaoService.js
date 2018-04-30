class NegociacaoService {
	
	/*
		Recebe uma função callback baseada em Error-First-Callback

		A convenção é que cada callback receba sempre o erro no primeiro parâmetro. 
		Na função callback, basta então verificar esse parâmetro para saber se ocorreu um erro ou não!
	*/
	getNegociacoesSemana() {

		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();

			xhr.open('GET', 'negociacoes/semana');

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

						resolve(JSON.parse(xhr.responseText)
									.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

					} else {

						console.log(`Não foi possível obter as negociações do servidor - error: ${xhr.status}`);
						reject(`Não foi possível obter as negociações do servidor`);

					}

				}

			}
			
			xhr.send();
			
		});

	}

}