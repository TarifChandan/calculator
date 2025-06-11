// Maintainable code likha lagbe. Mane barbar github e commit korle code er ekta breakdown hoy ar amrao code take valo bujhte pari
// But ami prothom dike ek ekta ongsho complete korar pore git commit korsilam, but erpore ar kora hoy nai. Ekbare onek code likhe
// felsi. Ei karone jhamela hoise. Ekhon nijer code nijei explain korte partesi na.

const numberBtns = document.querySelectorAll(".btn-number");
const operatorBtns = document.querySelectorAll(".btn-operator");
const displayCalc = document.querySelector(".calculator-display");
const equalsBtn = document.querySelector(".btn-equals");
const btnAllClear = document.querySelector(".btn-ac");
const btnClear = document.querySelector(".btn-c");
const btnDecimal = document.querySelector(".btn-decimal");

const calcData = {
  firstNum: "",
  operator: "",
  secondNum: "",
};

let userInput = "";

numberBtns.forEach(function (btn) {
  btn.addEventListener("click", () => {
    userInput += btn.textContent;

    if (userInput.includes(".")) {
      userInput = userInput;
    } else if (userInput.charAt(0) === "0") {
      userInput = removeLeadingZeros(userInput);
    }

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
    // Keu jodi firstNum, operator, secondNum deyar pore aro operation add korte chay, jemon plus ba minus korte chay,
    // Tobe age check korba je firstNum, operator, secondNum ase kina, jodi thake taile ekta temp variable oi operate dhore rakhba
    // Then, existing operation complete korba ebong firstNum e folafol dhukaba ebong operator e oi temp e thaka operator dhukaba

    if (isNaN(calcData.firstNum)) {
      calcData.firstNum = "0";
      updateDisplay();
    } else if (!calcData.firstNum) {
      calcData.firstNum = "0";
      calcData.operator = btn.textContent;
      updateDisplay();
    } else if (!calcData.operator) {
      calcData.operator = btn.textContent;
      userInput = "";
      updateDisplay();
    } else if (calcData.operator && !calcData.secondNum) {
      calcData.operator = btn.textContent;
      updateDisplay();
    } else if (calcData.firstNum && calcData.operator && calcData.secondNum) {
      let temp = btn.textContent;
      let result = operate(calcData.firstNum, calcData.secondNum);
      calcData.firstNum = result;
      calcData.operator = temp;
      calcData.secondNum = "";
      userInput = "";
      updateDisplay();
    }
  });

  // Answers these questions:
  // 1. firstNum na thakle ki hobe?
  // 2. operator na thakle ki hobe?
  // 3. operator ase but secondNum nai tokhon operator btn e chap dile ki hobe?
  // 4. firstNum ase, operator o ase, and secondNum o ase, tokhon operator btn e chap dile ki hobe?
});

equalsBtn.addEventListener("click", () => {
  let result = operate(calcData.firstNum, calcData.secondNum);
  userInput = "";
  calcData.firstNum = result;
  calcData.operator = "";
  calcData.secondNum = "";
  updateDisplay();
  // Amra to chai equal btn ekbar chap deyar pore abar shuru theke shob shuru hobe
  // Orthat abar first number theke shuru hobe.
  // Ei karonei amra operator er jaygata khali kore dicchi, jate first number thekei
  // abar calculation start hoy.
  // Abar amader update display function to firstNum + operator + secondNum, eivabe
  // result dekhay. To, secondNum er jaygata khali na korle dekha jay, display te
  // oita show kore dey. Jemon, notun vabe keu 1 chap dilo, oita ager jei firstNum
  // stored chilo oitake replace kore dey, but secondNum, dhora jak, 5 chilo, oita
  // to ar replaced hoy na. So, result dekhay "15". But ashole to thakar kotha shudhu 1.
});

btnAllClear.addEventListener("click", () => {
  userInput = "";
  calcData.firstNum = "";
  calcData.operator = "";
  calcData.secondNum = "";

  updateDisplay();
});

btnClear.addEventListener("click", () => {
  if (isNaN(calcData.firstNum)) {
    calcData.firstNum = "0";
    updateDisplay();
  } else if (!calcData.operator) {
    calcData.firstNum = calcData.firstNum.slice(0, -1);
    userInput = calcData.firstNum; // Userinput ke firstNum diye update dite hobe. Naile ager userInput eitate store hoye thake. Jemon first e 45 type korlam, tokhon to userInput e 45 roye gelo, then delete korle oita to thaika jaitese ar but display te 4 dekhacche. Tokhon jodi notun value input dei, taile oi 45 thekei abar shuru hoy karon UserInput still 45.
  } else if (!calcData.secondNum) {
    calcData.operator = calcData.operator.slice(0, -1);
    userInput = calcData.firstNum; // Prothom value dhore rakhte hobe naile operator e click kore kaita dile userInpur = "" empty hoye jay
  } else {
    calcData.secondNum = calcData.secondNum.slice(0, -1);
    userInput = calcData.secondNum; // userInput ke secondNum diye update korte hobe karon amader firstNum ase, operator ase, so, jokhon amra notun btn e chap dibo, tokhon amader notun btn.textContent jog hobe secondNum e. plus userInput += btn.textContent hobe. So, amader shekhane userInput e last value rekhei dite hobe.
  }

  updateDisplay();
});

btnDecimal.addEventListener("click", () => {
  // Shudhu firstNum e . na thaklei hobe na, borong amaderke check korte hobe je amra kon state asi, orthat amra firstNum asi naki secondNum e.
  if (calcData.firstNum && !calcData.operator && !userInput) {
    userInput = "0.";
    calcData.firstNum = userInput;
    updateDisplay();
  } else if (!calcData.firstNum || calcData.firstNum === "0") {
    userInput = "0.";
    calcData.firstNum = userInput;
    updateDisplay();
  } else if (
    (calcData.operator && !calcData.secondNum) ||
    calcData.secondNum === "0"
  ) {
    userInput = "0.";
    calcData.secondNum = userInput;
    updateDisplay();
  } else if (!calcData.operator && !calcData.firstNum.includes(".")) {
    userInput += btnDecimal.textContent;
    calcData.firstNum = userInput;
    updateDisplay();
  } else if (calcData.operator && !calcData.secondNum.includes(".")) {
    userInput += btnDecimal.textContent;
    calcData.secondNum = userInput;
    updateDisplay();
  }
});

function updateDisplay() {
  if (!calcData.firstNum && !calcData.operator && !calcData.secondNum) {
    calcData.firstNum = "0";
  }

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

function operate(num1, num2) {
  // Jehetu object data amra function e pass kortesi, so, oi string gulake jodi amra number e porinoto kori, then actual object data number porinoto hobe. Amader khetre etai hocche.
  // Just eta janaya rakhlam. Amra jodi object data ke string ei rakhte chai, she khetre num1 o num2 ke notun variables e store kore, then oi variables calculation e use korai valo.
  let result;

  if (!calcData.firstNum) {
    return (result = 0);
  } else if (!calcData.operator) {
    return (result = calcData.firstNum);
  } else if (!calcData.secondNum) {
    return (result = calcData.firstNum);
  }

  num1 = Number(num1);
  num2 = Number(num2);

  if (calcData.operator === "+") {
    result = add(num1, num2);
  } else if (calcData.operator === "-") {
    result = subtract(num1, num2);
  } else if (calcData.operator === "×") {
    result = multiply(num1, num2);
  } else if (calcData.operator === "÷") {
    result = divide(num1, num2);
  }

  if (String(result).includes(".") && typeof result === "number") {
    result = result.toFixed(2);
  }

  return String(result);
}

// displayCalc.textContent bad dite hobe. Operate function ta execute hoy ekmatro keu equal button e chap dile ar keu
// duita shongkha deyar por keu notun kore operatorBtn chap dile.
// Dhora jak keu 5+2 dilo, then equal btn e chap dilo.
// Tokhon operate function e prothome string ke number nite hobe, then amra ekta notun "RESULT" variable nibo
// Jehetu 'plus', so, add() function execute hobe, ebong folafol "Result" variable e joma hobe. Orthat
// 5+2 = 7, so, 7 joma hobe "Result" variable e.
// Then "Result" variable ta calcData.firstNum e joma hobe as in calcData.firstNum = result
// Then updateResult() call kora hobe. Shekhetre result e

// Ekhon second scenario chinta kori.

function removeLeadingZeros(number) {
  number = number.split("");
  console.log(number);

  for (let i = 0; number[i] === "0"; i++) {
    number.shift();
    i = -1;
  }
  console.log(number);
  if (number.length > 0) {
    number = number.join("");
  } else {
    number = "0";
  }
  console.log(number);
  return number;
}
