let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '0';
let newNumber = true;

const display = document.getElementById('display');

function updateDisplay() {
    display.value = displayValue;
}

function appendNumber(num) {
    if (newNumber) {
        displayValue = num;
        newNumber = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function setOperator(op) {
    if (operator && secondNumber) {
        calculate();
    }
    firstNumber = displayValue;
    operator = op;
    newNumber = true;
}

function clearDisplay() {
    displayValue = '0';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    newNumber = true;
    updateDisplay();
}

function backspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

function calculate() {
    if (!operator || !firstNumber) return;
    
    try {
        secondNumber = displayValue;
        const result = operate(operator, firstNumber, secondNumber);
        displayValue = Math.round(result * 1000000) / 1000000;
        updateDisplay();
        firstNumber = displayValue;
        secondNumber = '';
        newNumber = true;
    } catch (error) {
        displayValue = "Error: " + error.message;
        updateDisplay();
        setTimeout(clearDisplay, 2000);
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        setOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});

