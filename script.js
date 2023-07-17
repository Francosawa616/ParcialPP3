const display = document.getElementById("result");
let expression = "";

document.querySelectorAll(".number, .operator").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-number") || button.getAttribute("data-operator");
    if (value === "clear") {
      expression = "";
    } else if (value === "backspace") {
      expression = expression.slice(0, -1);
    } else if (value === "equal") {
      try {
        expression = evaluateExpression(expression);
      } catch (error) {
        expression = "Error";
      }
    } else if (value === "√") {
      expression += "Math.sqrt(";
    } else {
      expression += value;
    }
    updateDisplay();
  });
});

function updateDisplay() {
  display.innerText = expression;
}

function evaluateExpression(expression) {
  // Reemplazar el símbolo x por el operador de multiplicación *
  expression = expression.replace(/x/g, "*");

  // Reemplazar el símbolo ÷ por el operador de división /
  expression = expression.replace(/÷/g, "/");

  // Reemplazar el símbolo √ por la función Math.sqrt()
  expression = expression.replace(/√/g, "Math.sqrt");

  // Evaluar la expresión
  return Function(`'use strict'; return (${expression})`)();
}
