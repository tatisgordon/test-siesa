const PREVENT_INPUT_REGEX = /[0-9]/;

class CalculatorController {
	constructor() {
		this.calculator = new Calculator();
		this.value1Input = document.getElementById('value1');
		this.value2Input = document.getElementById('value2');
		this.operatorSelect = document.getElementById('operator');
		this.resultArea = document.getElementById('result-item');
		this.calculateButton = document.getElementById('calculate');
		this.displayTypeRadios = document.getElementsByName('displayType');
		this.searchInput = document.getElementById('search');
		this.historyList = document.getElementById('historyList');

		/*eventos */
		this.calculateButton.addEventListener('click', () => this.handleCalculate());
		this.searchInput.addEventListener('input', () => this.handleSearch());
		this.value1Input.addEventListener('keypress', (e) => this.preventBadInput(e));
		this.value2Input.addEventListener('keypress', (e) => this.preventBadInput(e));
		this.value1Input.addEventListener('paste', (e) => this.handlePaste(e));
		this.value2Input.addEventListener('paste', (e) => this.handlePaste(e));
	}



	preventBadInput(event) {

		if (!(PREVENT_INPUT_REGEX.test(event.key))) {
			event.preventDefault();
		}
	}

	handlePaste(event) {

		let paste = (event.clipboardData || window.clipboardData).getData('text');
		if (!(PREVENT_INPUT_REGEX.test(paste))) {
			event.preventDefault();
		}
	}


	handleCalculate() {
		const value1 = parseInt(this.value1Input.value);
		const value2 = parseInt(this.value2Input.value);
		const operator = this.operatorSelect.value;

		try {

			const result = this.calculator.calculate(value1, value2, operator);
			this.displayResult(result);
			this.updateHistoryDisplay();
		} catch (error) {
			alert(error.message)

		}
	}

	displayResult(result) {
		const displayType = Array.from(this.displayTypeRadios).find(radio => radio.checked).id;
		if (displayType === 'onPage') {
			this.resultArea.textContent = `El resultado es : ${result}`;
			return;
		}
		alert(result);
	}

	updateHistoryDisplay() {
		const history = this.calculator.getHistory();
		this.historyList.innerHTML = '';
		history.forEach((operation, index) => {
			const li = document.createElement('li');
			li.className = 'history-item';

			const p = document.createElement('p');
			p.textContent = operation;

			const deleteBtn = document.createElement('button');
			deleteBtn.textContent = '[Eliminar]';
			deleteBtn.className = 'delete-btn';
			deleteBtn.addEventListener('click', () => this.deleteHistoryItem(index));

			li.appendChild(p);
			li.appendChild(deleteBtn);
			this.historyList.appendChild(li);
		});
	}

	handleSearch() {
		const searchTerm = this.searchInput.value;
		const results = this.calculator.searchHistory(searchTerm);
		this.historyList.innerHTML = '';

		results.forEach(operation => {
			const p = document.createElement('p');

			p.textContent = operation;
			this.historyList.appendChild(p);
		});
	}

	deleteHistoryItem(index) {
		const response = confirm('Desea continuar con la eliminacion?')
		if (!response) { return; }

		this.calculator.deleteHistoryItem(index);
		this.updateHistoryDisplay();
	}
}




var calculatorController = new CalculatorController();
