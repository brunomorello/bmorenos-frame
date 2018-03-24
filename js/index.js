var campos = [
	document.querySelector("#data"),
	document.querySelector("#quantidade"),
	document.querySelector("#valor")
];


// formulario
var form = document.querySelector(".form");

//tabela de negociacoes
var tabelaNegociacoes = document.querySelector("table tbody");

form.addEventListener("submit", function(event) {

	//previnir default para que os dados não sejam "perdidos"
	event.preventDefault();

	//TR para receber a nova negociacao
	var negociacaoTr = document.createElement("tr");

	//criando as TDs para cada campo do formulario
	campos.forEach(function (campo) {

		var campoTd = document.createElement("td");
		campoTd.textContent = campo.value;

		negociacaoTr.appendChild(campoTd);

	});

	//criando o TD volume e gerando o seu valor
	var volumeTd = document.createElement("td");
	volumeTd.textContent = campos[1].value * campos[2].value;
	
	//adicionando o volume na TR negociacao
	negociacaoTr.appendChild(volumeTd);

	//adicionando a negociacao TR na tabela de negociacoes
	tabelaNegociacoes.appendChild(negociacaoTr);

	//limpando o formulario e colocando o foco na data
	campos[0].value = "";
	campos[1].value = 1;
	campos[2].value = 0.0;

	campos[0].focus();

})