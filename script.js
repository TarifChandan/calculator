const numberBtns = document.querySelectorAll(".btn-number");
const operatorBtns = document.querySelectorAll(".btn-operator");
const displayCalc = document.querySelector(".calculator-display");
const equalsBtn = document.querySelector(".btn-equals");

const calcData = {
  firstNum: "",
  operator: "",
  secondNum: "",
};

let userInput = "";

numberBtns.forEach(function (btn) {
  btn.addEventListener("click", () => {
    userInput += btn.textContent;

    if (!calcData.operator) {
      calcData.firstNum = userInput;
    } else {
      calcData.secondNum = userInput;
    }

    updateDisplay();
  });
});

operatorBtns.forEach(function (btn) {
  btn.addEventListener("click", () => {
    calcData.operator = btn.textContent;
    userInput = "";

    updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  let firstNum = Number(calcData.firstNum);
  let secondNum = Number(calcData.secondNum);
  if (calcData.operator === "+") {
    displayCalc.textContent = add(firstNum, secondNum);
  } else if (calcData.operator === "-") {
    displayCalc.textContent = subtract(firstNum, secondNum);
  } else if (calcData.operator === "×") {
    displayCalc.textContent = multiply(firstNum, secondNum);
  } else {
    displayCalc.textContent = divide(firstNum, secondNum);
  }

  userInput = "";
  calcData.operator = "";
  calcData.secondNum = "";
});

function updateDisplay() {
  displayCalc.textContent =
    calcData.firstNum + calcData.operator + calcData.secondNum;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Dividing by zero? Nice try.😏";
  } else {
    return num1 / num2;
  }
}
