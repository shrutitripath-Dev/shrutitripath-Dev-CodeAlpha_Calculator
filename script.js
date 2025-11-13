const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');

let expression = '';

function updateDisplay() {
  screen.value = expression || '0';
}

function calculate() {
  try {
    const safeExpr = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '/100');

    const result = Function('"use strict"; return (' + safeExpr + ')')();
    expression = String(result);
    updateDisplay();
  } catch (e) {
    screen.value = 'Error';
    setTimeout(() => {
      expression = '';
      updateDisplay();
    }, 800);
  }
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === 'clear') {
      expression = '';
    } else if (action === 'equals') {
      calculate();
      return;
    } else if (val) {
      expression += val;
    }
    updateDisplay();
  });
});

window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/^[0-9+\-*/().%]$/.test(key)) {
    expression += key;
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
  } else if (key === 'Escape') {
    expression = '';
  }
  updateDisplay();
});

updateDisplay();
