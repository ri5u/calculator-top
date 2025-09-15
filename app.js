let operand1 = "";
let operand2 = "";
let operator = null;

let result = null;
function operate(){
    let value1 = parseFloat(operand1);
    let value2 = parseFloat(operand2);
    console.log(`${value1} ${value2}`);
    switch(operator){
    case '+':
            result = value1 + value2;
            break;
    case '-':
            result = value1 - value2;
            break;
    case '*':
            result = value1 * value2;
            break;
    case '/':
            if(value2 == 0){
                console.log("Babe you can't divide by zero");
                break;
            }

            result = value1 / value2;
            break;
    }
}

//Screen
const screen = document.querySelector(".screen");

//Digit Buttons
const digitButtons = document.querySelectorAll(".btn.digit");

digitButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
         const value = e.target.getAttribute("data-value");
         
        if(result){
            screen.innerHTML = "";
            result = null;
        }
        
         if(operand1 && operator) operand2 += value;
         else operand1 += value;
         // console.log(value);
         console.log(`Operand 1: ${operand1}  Operator: ${operator} Operand2: ${operand2}`);
         screen.innerHTML +=  value;
    })
})

// console.log(operator);
//Operator Buttons
const operatorButtons = document.querySelectorAll(".btn.operator");

operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        decimalButton.removeAttribute("disabled");
        value = e.target.getAttribute("data-value");

        if(result){
            operand1 = result;
            result = null;
        }

         if(operand2){
            operand1 = operate();
            operand2 = "";
        }

       operator = value; 
        if(!operand1 && (operator == '-')){
            operand1 += operator;
            operator = "";
        }

        screen.innerHTML += value;
    })
})


//Decimal
const decimalButton = document.querySelector(".btn.decimal");

decimalButton.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");
    if(!operator && !operand2) operand1 += value;
    else operand2 += value;
    decimalButton.setAttribute("disabled", "");
    screen.innerHTML += value;
})


//Equality
const equalityButton = document.querySelector(".btn.equality");

equalityButton.addEventListener("click", () => {
    decimalButton.removeAttribute("disabled");
    if(operand1 && operator && !operand2){
        screen.textContent = "0";
        operand1 = "";
        operand2 = "";
        operator = null;
        return;
    }
    operate();
    screen.innerHTML = "";
    screen.innerHTML = result;
    operand1 = "";
    operand2 = "";
    operator = null;
});


//Clear
const clearButton = document.querySelector(".btn.clear");

clearButton.addEventListener("click", (e) => {
    operand1 = "";
    operand2 = "";
    operator = null;
    screen.innerHTML = "";
    console.log(`Operand 1: ${operand1}  Operator: ${operator} Operand2: ${operand2}`);
});

//Backspace
const backspaceButton = document.querySelector(".btn.backspace");

backspaceButton.addEventListener("click", (e) => {
    console.log("Backspace")
});

