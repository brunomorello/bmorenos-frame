class HttpService {
	
	get(url) {

		return new Promise((resolve, reject) => {

			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);

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

						resolve(JSON.parse(xhr.responseText));
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