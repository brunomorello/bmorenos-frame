export class DateHelper {

	constructor() {

		throw new Error("Esta classe não pode ser instanciada");

	}


	static textToDate(text) {


		if (! /^\d{4}-\d{2}-\d{2}$/.test(text)) { 
			throw new Error("Data Incorreta, o padrão é yyyy-mm-dd"); 
		}

		// convertendo a string data em um objeto data
		// sera usado:
		// spread operator - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
		// arrow function - https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions

		return new Date(...text.split("-").map( (item, index) => item - index % 2));

		// item - index % 2 (pois o mes usado na funcao date deve ser mes atual -1)

	}

	static dateToText(date) {

		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

	}

}