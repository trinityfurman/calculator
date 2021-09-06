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

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator == 'add') {
        return(add(a, b));
    } else if (operator == 'subtract') {
        return(subtract(a, b));
    } else if (operator == 'multiply') {
        return(multiply(a, b));
    } else if (operator == 'divide') {
        return(divide(a, b));
    }
}


const displayNums = document.querySelector("#numbers");
function displayValues (values) {
    displayNums.textContent = values;
}


let firstNum = 0;
let numberString = " ";
let operator = "";
let results = 0;


const buttons = document.querySelectorAll(".number");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        numberString = numberString.concat(button.id);
        displayValues(numberString);
    });
});


const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    numberString = "";
    firstNum = 0;
    displayValues(firstNum);
}); 


const operations = document.querySelectorAll(".operator");
operations.forEach((button) => {
    button.addEventListener('click', () => {
        if (operator == "") {
            results = numberString;
            firstNum = numberString;
        } else if (operator == "equals") { 
            if (numberString == "") {
                results = firstNum;
            }
            else {
                results = numberString;
                firstNum = numberString;
            }
        } else {
            results = operate(operator, firstNum, numberString);
            firstNum = results;
        }
        displayValues(results);
        operator = button.id;
        numberString = "";
    });
});

const equals = document.querySelector("#equals");
equals.addEventListener('click', () => {
    results = operate(operator, firstNum, numberString);
    displayValues(results);
    firstNum = results;
    numberString = "";
    operator = "equals";
});

const decimal = document.querySelector("#decimal");
decimal.addEventListener('click', () => {
    if (numberString.includes('.') == false) {
        numberString = numberString.concat('.');
    }
});



