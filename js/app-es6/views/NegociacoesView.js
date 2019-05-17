import { View } from "./View";
import { DateHelper } from "../helpers/DateHelper";
import { currentInstance } from "../controllers/NegociacaoController";

export class NegociacoesView extends View{

	constructor(elemento) {
		
		super(elemento);

		// added an event listener to click event
		elemento.addEventListener('click', function(event) {

			// checks if the element who receives the event is a th tag <th>
			if(event.target.nodeName == 'TH') {
				
				// sorts the value 
				currentInstance().ordena(event.target.textContent.toLowerCase());

			}

		});

	}

	template(model) {

		// Nesse template é usado a função reduce() [Array.prototype.reduce(function(acumulador, valorAtual, indice, array){ } )]
		// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

		return `
		    <table class="table table-hover table-bordered">
		        <thead>
		            <tr>
		                <th>DATA</th>
		                <th>QUANTIDADE</th>
		                <th>VALOR</th>
		                <th>VOLUME</th>
		            </tr>
		        </thead>
		        
		        <tbody>

		        	${model.negociacoes.map(n => `
		        			<tr>
		        				<td>${DateHelper.dateToText(n.data)}</td>
		        				<td>${n.quantidade}</td>
		        				<td>${n.valor}</td>
		        				<td>${n.volume}</td>
		        			</tr>
		        		`
		        	)}

		        </tbody>
		        
		        <tfoot>
		        	<td colspan="3"></td>
		        	<td>
		        		${model.volumeTotal}
		        	</td>
		        </tfoot>
		    </table>
		`;

	}


}