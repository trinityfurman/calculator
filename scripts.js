
// Initialize variables
let firstNum = 0;
let numberString = "";
let operator = "";
let results = 0;
let allClear = 0;

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

// Operate on two numbers
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator == '+') {
        return(add(a, b));
    } else if (operator == '-') {
        return(subtract(a, b));
    } else if (operator == '*') {
        return(multiply(a, b));
    } else if (operator == '/') {
        return(divide(a, b));
    }
}

// Display value in display text field
const displayNums = document.querySelector("#results");
function displayValues(values) {

    // Ensure value is 13 characters or less
    let newString = values.toString();
    if (newString.length > 13) {
        let numLength = newString.length - 13;
        for (i = 0; i < numLength; i++) {
            newString = newString.slice(0, newString.length - 1);
        }
    }
    displayNums.textContent = newString;
}

// Get total by operating on two numbers, displaying results, and resetting variables afterwards
function getTotal() {
    // Ensure user can press 'equal' repeatedly
    if (operator == 'equals') {
        displayValues(results);
        console.log(results);
    } else {
        results = operate(operator, firstNum, numberString);
        displayValues(results);
        firstNum = results;
        numberString = "";
        operator = "equals"; 
    }
}

// Evaluate function when an operator button is pressed
function getOperator(chosenOperator) {
    // Log user input as the first number and display
    if (operator == "") {
        results = numberString;
        firstNum = numberString;
    // If the previous operator clicked was the equal sign, set appropriate display value
    } else if (operator == "equals") { 
        if (numberString == "") {
            results = firstNum;
        }
        else {
            results = numberString;
            firstNum = numberString;
        }
    // Else, calculate results of previous operation
    } else {
        if (numberString == "") {
            results = firstNum;
        } else {
            results = operate(operator, firstNum, numberString);
            firstNum = results;
        }
    }
    // Display value and lodge chosen operator in variable
    displayValues(results);
    operator = chosenOperator;
    // Reset number string
    numberString = "";
}


// Add event listener to each number button
const buttons = document.querySelectorAll(".number");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Add numbers to string when clicked, ensuring string is less than 14
        if (numberString.length < 13) {
            numberString = numberString.concat(button.id);
        }
        // Display numbers
        displayValues(numberString);
    });
});

// Add keyboard compatibility
document.addEventListener('keydown', function(event) {
    // Run equality function is equal sign or enter is pressed
    if (event.key == 'Enter' || event.key == '=') {
        event.preventDefault();
        getTotal();
    // Run operator function if operator button is pressed
    } else if (event.key == '+' || event.key == '*' || event.key == '-' || event.key == '/') {
        getOperator(event.key);
    // Clear all if 'ac' is pressed
    } else if (event.key == 'a') {
        allClear = 1;
    } else if (event.key == 'c') {
        if (allClear == 1) {
            numberString = "";
            firstNum = 0;
            displayValues(firstNum);
            allClear = 0;
        } else {
            // Clear recent if 'c' is pressed by itself
            numberString = "";
            displayValues(0); 
        }
    } else if (event.key == 'Shift') {
        // Disable the shift key from briefly erasing the input field
        event.preventDefault();
    } else {
        for (i = 0; i < 10; i++) {
            if (event.key == i) {
                // Add number to number string if pressed
                numberString = numberString.concat(i);
            }
        }
        displayValues(numberString);
    } 
  });

// Clear display and reset values when 'clear' button is clicked
const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    numberString = "";
    firstNum = 0;
    displayValues(firstNum);
}); 

// Operate on numbers when an operator button is clicked
const operations = document.querySelectorAll(".operator");
operations.forEach((button) => {
    button.addEventListener('click', () => {
        getOperator(button.id);
    });
});

// Get total when equal button is clicked
const equals = document.querySelector("#equals");
equals.addEventListener('click', () => {
    getTotal();
});

// Add decimal point if decimal button is clicked
const decimal = document.querySelector("#decimal");
decimal.addEventListener('click', () => {
    if (numberString.includes('.') == false) {
        numberString = numberString.concat('.');
    }
});

// Clear most recent value
const backspace = document.querySelector("#backspace");
backspace.addEventListener('click', () => {
    numberString = "";
    displayValues(0);
});

// Change sign of number
const sign = document.querySelector("#sign");
sign.addEventListener('click', () => {
    if (operator == 'equals') {
        firstNum *= -1;
        displayValues(firstNum);
    } else {
        numberString *= -1;
        displayValues(numberString);
    } 
});


