// BASIC FUNCTIONS FOR THE BASIC OPERATIONS

function add(a, b) {
  return Math.round((a + b) * 100) / 100;
}

function subtract(a, b) {
  return Math.round((a - b) * 100) / 100;
}

function multiply(a, b) {
  return Math.round(a * b * 100) / 100;
}

function divide(a, b) {
  if (b == 0) {
    return "Cannot divide by 0!";
  }
  return Math.round((a / b) * 100) / 100;
}

// THREE VARIABLES REQUIRED FOR THE OPERATION

let firstNumber = 0;
let secondNumber = 1;
let operator = "+";

// OPERATOR FUNCTION

function operate(operator, num1, ...num2) {
  switch (operator) {
    case "+":
      displayResults(add(num1, num2[0]));
      break;
    case "-":
      displayResults(subtract(num1, num2[0]));
      break;
    case "*":
      displayResults(multiply(num1, num2[0]));
      break;
    case "/":
      displayResults(divide(num1, num2[0]));
      break;
  }
}

// SELECTORS

const numButtons = document.querySelectorAll(".buttons button.num");
const display = document.querySelector(".display-header .display");
const operantButtons = document.querySelectorAll("button.operant");
const equalButton = document.querySelector("button.equal");
const percentButton = document.querySelector("button.percent");
const acButton = document.querySelector("button.ac");
const delButton = document.querySelector("button.del");
const dotButton = document.querySelector("button.dot");
const gitButton = document.querySelector("button.button-git");

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

// KEYBOARD SUPPORT

numberArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
numOperator = ["*", "/", "-", "+"];

document.addEventListener("keydown", (e) => {
  if (numberArr.includes(e.key)) {
    if (fired != true) {
      fired = true;
      display.textContent = "";
    }

    if (display.textContent == "0") {
      display.textContent = e.key;
    } else {
      display.textContent += e.key;
    }
    multiBlock = false;
    setValue();
  } else if (numOperator.includes(e.key)) {
    if (firstOperator == false && multiBlock == false) {
      triggerEvent(equalButton, "click");
      multiBlock = true;
    }
    operator = e.key;
    firstNumber = displayValue;
    fired = false;
    firstOperator = false;
    dotPrevent = false;
  } else if (e.key == "Enter") {
    triggerEvent(equalButton, "click");
  } else if (e.key == ".") {
    triggerEvent(dotButton, "click");
  } else if (e.key == "%") {
    triggerEvent(percentButton, "click");
  } else if (e.key == "c") {
    triggerEvent(acButton, "click");
  } else if (e.key == "Backspace") {
    triggerEvent(delButton, "click");
  }
});

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
  dotPrevent = false;
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

percentButton.addEventListener("click", () => {
  displayValue = displayValue / 100;
  display.textContent = displayValue;
  setValue();
  firstNumber = displayValue;
});

acButton.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = 0;
  secondNumber = 1;
  operator = null;
});

delButton.addEventListener("click", () => {
  string = displayValue.toString();
  displayValue = string.slice(0, string.length - 1);
  display.textContent = displayValue;
});

let dotPrevent = false;

dotButton.addEventListener("click", () => {
  if (dotPrevent == false) {
    string = displayValue.toString().concat(".");
    display.textContent = string;
    dotPrevent = true;
  }
});

// REDIRECT FUNCTION

gitButton.addEventListener("click", () => {
  window.location.href = "https://github.com/frostbite69425";
});
