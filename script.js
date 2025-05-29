const numberBtns = document.querySelectorAll(".btn-number");
const operatorBtns = document.querySelectorAll(".btn-operator");
const displayCalc = document.querySelector(".calculator-display");

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

function updateDisplay() {
  displayCalc.textContent =
    calcData.firstNum + calcData.operator + calcData.secondNum;
}
