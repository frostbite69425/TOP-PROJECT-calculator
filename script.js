// BASIC FUNCTIONS FOR THE BASIC OPERATIONS

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
  return a / b;
}

function invert(a) {
  return -a;
}

function percent(a) {
  return a / 100;
}

// THREE VARIABLES REQUIRED FOR THE OPERATION

let firstNumber = 0;
let secondNumber = 1;
let operator = "+";

// OPERATOR FUNCTION

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
  }
}

// SELECTORS

const numButtons = document.querySelectorAll(".buttons button.num");
const display = document.querySelector(".display-header .display");

// FUNCTIONS USING SELECTORS

let fired = false;

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (fired != true) {
      fired = true;
      display.textContent = "";
    }
    display.textContent += button.textContent;
  });
});
