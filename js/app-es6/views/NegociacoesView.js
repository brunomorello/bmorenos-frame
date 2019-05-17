import { View } from "./View";

export class NegociacoesView extends View{

	template(model) {

		// Nesse template é usado a função reduce() [Array.prototype.reduce(function(acumulador, valorAtual, indice, array){ } )]
		// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

		return `
		    <table class="table table-hover table-bordered">
		        <thead>
		            <tr>
		                <th onclick="negociacaoController.ordena('data')">DATA</th>
		                <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
		                <th onclick="negociacaoController.ordena('valor')">VALOR</th>
		                <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
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