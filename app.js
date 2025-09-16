let operand1 = "";
let operand2 = "";
let operator = "";
let result = null;

//Screen
const screen = document.querySelector(".screen");

//Formatting
function formatResult(num){
    const numStr = num.toString(); 
    
    if(numStr.includes('.')){
        return parseFloat(num.toFixed(6).toString());
    }

    return numStr;
}

function operate(){
    let value1 = parseFloat(operand1);
    let value2 = parseFloat(operand2);
    // console.log(`${value1} ${value2}`);
    switch(operator){
    case '+':
            result = formatResult(value1 + value2);
            break;
    case '-':
            result = formatResult(value1 - value2);
            break;
    case '*':
            result = formatResult(value1 * value2);
            break;
    case '/':
            if(value2 == 0){
                updateVariables();
                result = "YAMEROO~!!";
                break;
            }

            result = formatResult(value1/value2); 
            break;
    }
}

//Update Variables
function updateVariables(){
    operand1 = "";
    operator = "";
    operand2 = "";
}



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
         screen.innerHTML +=  value;
         // console.log(`${operand1}  ${operator} ${operand2}`);
    })

})

//Operator Buttons
const operatorButtons = document.querySelectorAll(".btn.operator");

operatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        decimalButton.removeAttribute("disabled");
        value = e.target.getAttribute("data-value");

        //when we do a + b and we have a result. Then we press any 
        //operator.
        if(result){
            operand1 = result;
            result = null;
        }

        //when we already have a+b but we press another operator instead 
        //of equal. 
        if(operand2){
            operate();
            operand1 = result;
            operand2 = "";
            result = "";
            screen.innerHTML = operand1;
        }

        operator = value; 
        //Negative value handling for the first operand
        if(!operand1 && (operator == '-')){
            operand1 += operator;
            operator = "";
        }
        // console.log(`${operand1}  ${operator} ${operand2}`);

        screen.textContent = operand1 + operator;
    })
})


//Decimal
const decimalButton = document.querySelector(".btn.decimal");

decimalButton.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");

    //The case where the result is 6.9 and after pressing decimal 
    //again we don't want 6.9.
    if(result){
        result = "";
        screen.textContent = "";
    }
  
    
    if(!operator && !operand2) operand1 += value;
    else operand2 += value;
    decimalButton.setAttribute("disabled", "");
    // console.log(`${operand1}  ${operator} ${operand2}`);

    screen.innerHTML += value;
})


//Equality
const equalityButton = document.querySelector(".btn.equality");

equalityButton.addEventListener("click", () => {
    decimalButton.removeAttribute("disabled");
    
    //when we have "a +" and equal is pressed. 
    if(operand1 && operator && !operand2){
        screen.textContent = "0";
        updateVariables();
        return;
    }

   

    operate();
    screen.innerHTML = "";
    screen.innerHTML = result;
    updateVariables();
    // console.log(`${operand1}  ${operator} ${operand2}`);
});


//Clear
const clearButton = document.querySelector(".btn.clear");

clearButton.addEventListener("click", () => {
    decimalButton.removeAttribute("disabled");
    updateVariables();
    result = "";
    screen.innerHTML = "";
    // console.log(`${operand1}  ${operator} ${operand2}`);
});

//Backspace
const backspaceButton = document.querySelector(".btn.backspace");

backspaceButton.addEventListener("click", () => {
    if(result){
       result = null;
       updateVariables();
       screen.textContent = "";
       return;
    }

    let hadDecimal = false;
    if(operand2){
        hadDecimal = operand2.includes('.');
        operand2 = operand2.slice(0, operand2.length-1);

        if(hadDecimal && !operand2.includes('.'))
            decimalButton.removeAttribute("disabled");
    }
    else if(operator)   operator = "";
    else{
        hadDecimal = operand1.includes('.');
        operand1 = operand1.slice(0, operand1.length-1);
        if(hadDecimal && !operand1.includes('.'))
            decimalButton.removeAttribute("disabled");
    }

    screen.textContent = (operand1 + operator + operand2);
    // console.log(`${operand1}  ${operator} ${operand2}`);
});
