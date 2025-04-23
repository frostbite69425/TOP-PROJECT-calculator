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
      displayResults(add(num1, num2));
      break;
    case "-":
      displayResults(subtract(num1, num2));
      break;
    case "*":
      displayResults(multiply(num1, num2));
      break;
    case "/":
      displayResults(divide(num1, num2));
      break;
  }
}

// SELECTORS

const numButtons = document.querySelectorAll(".buttons button.num");
const display = document.querySelector(".display-header .display");
const operantButtons = document.querySelectorAll("button.operant");
const equalButton = document.querySelector("button.equal");

// FUNCTIONS USING SELECTORS

let fired = false;
let multiBlock = false;
// FUNCTION FOR DISPLAYING NUMBERS FROM USER INPUT

function displayNumbers() {
  if (fired != true) {
    fired = true;
    display.textContent = "";
  }

  if (display.textContent == "0") {
    display.textContent = this.textContent;
  } else {
    display.textContent += this.textContent;
  }
  multiBlock = false;
  setValue();
  // replacing this with button.textContent makes it work as an anaonymous function inside the event listener
}

let displayValue = 0;

// FUNCTION FOR STORING THE NUMBER ON THE SCREEN

function setValue() {
  displayValue = Number(display.textContent);
}

numButtons.forEach((button) => {
  button.addEventListener("click", displayNumbers);
});

operantButtons.forEach((button) => {
  button.addEventListener("click", registerOperator);
});

let firstOperator = true;

// CUSTOM TRIGGER EVENT
const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

// FUNCTION FOR STORING THE OPERATOR
function registerOperator() {
  if (firstOperator == false && multiBlock == false) {
    triggerEvent(equalButton, "click");
    multiBlock = true;
  }
  operator = this.textContent;
  firstNumber = displayValue;
  fired = false;
  firstOperator = false;
}

equalButton.addEventListener("click", () => {
  fired = false;
  secondNumber = displayValue;
  operate(operator, firstNumber, secondNumber);
  operator = null;
  setValue();
  firstNumber = displayValue;
});

function displayResults(num) {
  display.textContent = num;
  fired = false;
}
