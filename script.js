// Math operators
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERR: Don't divide by zero!";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "ERR: Unknown operator";
    }
}

let displayValue = '0';
let firstOperand = null;
let operator = null;
let awaitingSecondOperand = false;

// ── DOM REFERENCES ──
const currentDisplay = document.getElementById('current');
const expressionDisplay = document.getElementById('expression');

// This function is responsible for updating what's on screen.
function updateDisplay(value) {
    // Adjust font size if the number gets long
    currentDisplay.classList.remove('small', 'xsmall');
    if (value.length > 9)  currentDisplay.classList.add('xsmall');
    else if (value.length > 6) currentDisplay.classList.add('small');

    currentDisplay.textContent = value;

    // Keep the aria-label in sync for screen readers
    currentDisplay.setAttribute('aria-label', `Current value: ${value}`);

    updateDecimalButton();
}

// Digit input
function handleDigit(digit) {
    if (awaitingSecondOperand) {
        displayValue = digit;
        awaitingSecondOperand = false;
    } else {
        // Prevent multiple leading zeros e.g "007"
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    updateDisplay(displayValue);
}

const digitButtons = document.querySelectorAll('.btn--digit');

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleDigit(button.dataset.digit);
    });
});

// Operator input
function handleOperator(nextOperator) {

    const currentValue = parseFloat(displayValue);
    if (operator && awaitingSecondOperand) {
        // User pressed two operators in a row — just swap the operator
        operator = nextOperator;
        highlightOperator(nextOperator);
        return;
    }

    if (firstOperand === null) {
        // First time an operator is pressed — just store the number
        firstOperand = currentValue;
    } else if (operator) {
        // We already have everything — evaluate the pair first
        const result = operate(operator, firstOperand, parseFloat(displayValue));

        // Handle divide by zero — it returns a string error message
        if (typeof result === 'string') {
            updateDisplay(result);
            expressionDisplay.textContent = '';
            firstOperand = null;
            operator = null;
            awaitingSecondOperand = false;
            return;
        }

        // Round to avoid long floating decimals 
        const rounded = parseFloat(result.toFixed(10));
        displayValue = String(rounded);
        firstOperand = rounded;
        updateDisplay(displayValue);
    }

    operator = nextOperator;
    awaitingSecondOperand = true;

    // Show the running expression above the display e.g. "12 +"
    expressionDisplay.textContent = `${firstOperand} ${nextOperator}`;
    highlightOperator(nextOperator);
}

// ── HANDLE EQUALS ──
function handleEquals() {
    if (operator === null || awaitingSecondOperand) return;

    const secondOperand = parseFloat(displayValue);
    const result = operate(operator, firstOperand, secondOperand);

    // Handle divide by zero
    if (typeof result === 'string') {
        updateDisplay(result);
        expressionDisplay.textContent = '';
        firstOperand = null;
        operator = null;
        awaitingSecondOperand = false;
        return;
    }

    const rounded = parseFloat(result.toFixed(10));

    // Show the full expression e.g. "12 + 7 ="
    expressionDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;

    displayValue = String(rounded);
    firstOperand = null;
    operator = null;
    awaitingSecondOperand = false;

    updateDisplay(displayValue);
    clearOperatorHighlight();
}

// ── HIGHLIGHT ACTIVE OPERATOR ──
// Adds a visual glow to whichever operator button is currently active
function highlightOperator(activeOperator) {
    clearOperatorHighlight();
    document.querySelectorAll('.btn--operator').forEach(btn => {
        if (btn.dataset.operator === activeOperator) {
            btn.classList.add('active');
        }
    });
}

function clearOperatorHighlight() {
    document.querySelectorAll('.btn--operator').forEach(btn => {
        btn.classList.remove('active');
    });
}

// get operator buttons
document.querySelectorAll('.btn--operator').forEach(button => {
    button.addEventListener('click', () => {
        handleOperator(button.dataset.operator);
    });
});

// get the equals button
document.getElementById('equals').addEventListener('click', handleEquals);


// AC Button
function handleClear() {

    displayValue = '0';
    firstOperand = null;
    operator = null;
    awaitingSecondOperand = false;

    // Clear both display lines
    updateDisplay('0');
    expressionDisplay.textContent = '';

    // Remove any operator highlight
    clearOperatorHighlight();
}

// Using the backspace
function handleBackspace() {
    if (awaitingSecondOperand) return;
    // Chop off the last character
    displayValue = displayValue.slice(0, -1);

    // If nothing is left, default back to '0'
    if (displayValue === '' || displayValue === '-') {
        displayValue = '0';
    }

    updateDisplay(displayValue);
}

// Allow clear button
document.getElementById('clear').addEventListener('click', handleClear);

// Allow the backspace button
document.getElementById('backspace').addEventListener('click', handleBackspace);


// handling the decimal 
function handleDecimal() {
    if (awaitingSecondOperand) {
        displayValue = '0.';
        awaitingSecondOperand = false;
        updateDisplay(displayValue);
        return;
    }

    // If there's already a decimal point, do nothing
    if (displayValue.includes('.')) return;

    // Otherwise append the decimal point
    displayValue += '.';
    updateDisplay(displayValue);
}

// ── DISABLE/ENABLE DECIMAL BUTTON ──
// Called every time the display updates to keep the button state in sync
function updateDecimalButton() {
    const decimalButton = document.getElementById('decimal');
    if (displayValue.includes('.')) {
        decimalButton.disabled = true;
        decimalButton.setAttribute('aria-disabled', 'true');
    } else {
        decimalButton.disabled = false;
        decimalButton.setAttribute('aria-disabled', 'false');
    }
}

// ── WIRE UP DECIMAL BUTTON ──
document.getElementById('decimal').addEventListener('click', handleDecimal);