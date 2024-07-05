class Calculator {
	constructor() {
		this.history = [];
	}
	/**
	 * calcular valores
	 * @param {*} value1  
	 * @param {*} value2 
	 * @param {*} operator 
	 * @returns 
	 */
	calculate(value1, value2, operator) {
		if (!value1) {
			throw new Error("ingrese un valor correcto para valor 1 ");
		}
		if (!value2) {
			throw new Error("ingrese un valor correcto para valor 2");
		}
		let result;
		switch (operator) {
			case '+':
				result = value1 + value2;
				break;
			case '-':
				result = value1 - value2;
				break;
			case '*':
				result = value1 * value2;
				break;
			case '/':
				if (value2 !== 0) {
					result = value1 / value2;
				} else {
					throw new Error("Division por cero");
				}
				break;
			default:
				throw new Error("operador invalido");
		}
		
		result = result;

		this.addToHistory(value1, value2, operator, result);
		return result;
	}
	/**
	 * agrega al historial los resultados
	 * @param {*} value1 
	 * @param {*} value2 
	 * @param {*} operator 
	 * @param {*} result 
	 */
	addToHistory(value1, value2, operator, result) {
		const operation = `${value1} ${operator} ${value2} = ${result}`;
		this.history.push(operation);
	}

	getHistory() {
		return this.history;
	}

	searchHistory(term) {
		return this.history.filter(operation => operation.includes(term));
	}

	deleteHistoryItem(index) {
		this.history.splice(index, 1);
	}
}