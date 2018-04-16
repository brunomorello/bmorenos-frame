class ProxyFactory {
	
	static create(object, props, action) {

		console.log(`Debug: ProxyFactory.create.object: ${object}`);
		console.log(object);

		console.log(`Debug: ProxyFactory.create.props: ${props}`);
		console.log(props);

		console.log(`Debug: ProxyFactory.create.action: ${action}`);
		console.log(action);

		return new Proxy(object, {

			get(target, prop, receiver) {

				if(props.includes(prop) && ProxyFactory._isFunction(target[prop])) {

					return function() {

						console.log(`A propriedade "${prop}" foi interceptada`);
						console.log(prop);

						console.log(`Debug Proxy.get: parametro target = "${target}"`);
						console.log(target);

						console.log(`Debug Proxy.get: parametro prop = "${prop}"`);
						console.log(prop);

						console.log(`Debug Proxy.get: parametro receiver = "${receiver}"`);
						console.log(receiver);

						console.log(`Debug Proxy.get: target[prop] = ${target[prop]}`);
						console.log(target[prop]);

						console.log(`Debug Proxy.get: target = ${target}`);
						console.log(target);

						console.log(`Debug Proxy.get: arguments = ${arguments}`);
						console.log(arguments);


						let retorno = Reflect.apply(target[prop], target, arguments);
						action(target);
						return retorno;

					}

				}

				return Reflect.get(target, prop, receiver);

			},

			set(target, prop, value, receiver) {

				console.log(`Debug Proxy.set: parametro target[${target}]`);
				console.log(target);

				console.log(`Debug Proxy.set: parametro prop[${prop}]`);
				console.log(prop);

				console.log(`Debug Proxy.set: parametro value[${value}]`);
				console.log(value);

				console.log(`Debug Proxy.set: parametro target[${receiver}]`);
				console.log(receiver);
							
				let retorno = Reflect.set(target, prop, value, receiver);

				if(props.includes(prop)) {
					action(target);
				}

				return retorno;

			}

		});

	}

	static _isFunction(func) {
		return typeof(func) == typeof(Function);
	}

}