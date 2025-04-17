const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

// Update display function
function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      handleButtonClick(action);
    });
  });
  
  function handleButtonClick(action) {
    // Distinguish between digits, operators, decimal, equals, and clear
    if (!isNaN(action)) {
      // It's a digit
      handleDigit(action);
    } else {
      // It's an operator or special action
      switch(action) {
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
          handleOperator(action);
          break;
        case 'decimal':
          handleDecimal();
          break;
        case 'equals':
          handleEquals();
          break;
        case 'clear':
          clearAll();
          break;
      }
    }
  }

  function handleDigit(digit) {
    // Append the new digit to the current input
    currentInput += digit;
    updateDisplay(currentInput);
  }
  
  function handleOperator(op) {
    // If there's already a value in currentInput, move it to previousInput
    if (currentInput) {
      previousInput = currentInput;
      currentInput = '';
    }
    operator = op;
  }
  
  function handleDecimal() {
    if (!currentInput.includes('.')) {
      currentInput += currentInput ? '.' : '0.';
      updateDisplay(currentInput);
    }
  }
  
  function handleEquals() {
    if (!previousInput || !currentInput) return; // no calculation if either is missing
  
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result = 0;
  
    switch(operator) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        if (b === 0) {
          updateDisplay('Error');
          return;
        }
        result = a / b;
        break;
    }
    updateDisplay(result);
    previousInput = result.toString();
    currentInput = '';
    operator = null;
  }
  
  function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
  }
  