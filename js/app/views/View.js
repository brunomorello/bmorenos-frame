class View {
	
	constructor(elemento) {

		this._elemento = elemento;

	}

	update(model) {

		this._elemento.innerHTML = this.template(model);

	}	

	template(model) {
		throw new Error("Deve-se implementar o metodo template()");
	}

}