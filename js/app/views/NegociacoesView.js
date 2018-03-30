class NegociacoesView {
	
	constructor(elemento) {

		this._elemento = elemento;

	}

	update(model) {

		this._elemento.innerHTML = this._template(model);

	}

	_template(model) {

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

		        	${model.negociacoes.map(n => {
		        		return `
		        			<tr>
		        				<td>${DateHelper.dateToText(n.data)}</td>
		        				<td>${n.quantidade}</td>
		        				<td>${n.valor}</td>
		        				<td>${n.volume}</td>
		        			</tr>
		        		`
		        	})}

		        </tbody>
		        
		        <tfoot>
		        	<td colspan="3"></td>
		        	<td>
		        		${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}
		        	</td>
		        </tfoot>
		    </table>
		`;

	}


}