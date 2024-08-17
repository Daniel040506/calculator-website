


function add(n1, n2) {
    return n1 + n2;
}
function subtract(n1,n2) {
    return n1 - n2;
}
function multiply(n1,n2) {
    return n1 * n2;
}
function divide(n1,n2) {
    return n1 / n2;
}

function operate(operator,n1,n2) {
    switch (operator) {
        case "add":
            
            return add(Number(n1),Number(n2));
        case "subtract":
            return subtract(Number(n1),Number(n2));
        case "multiply":
            return multiply(Number(n1),Number(n2));
        case "divide":
            return divide(Number(n1),Number(n2));
    }
}




let display = document.querySelector(".display");
display.textContent = "";

let num1 = "";
let num2 = "";
let operator = "";

let carriedOp = false;

let numbers = Array.from(document.querySelectorAll(".number"));


function updateDisplayInput(input) {
    if (carriedOp === true) {
        updateDisplayTotal(input);
        carriedOp=false;
        return;
    }

    if (input === "." && display.textContent.includes(".")) return;
    if (display.textContent.length > 30) {
        alert("inputted number is too large");
        return;
    }
    display.textContent = display.textContent + input;

}

function updateDisplayTotal(input) {

    input = input.toString();

    if (input.includes(".")) {
        if (input.slice(input.indexOf(".")).length > 10) {
            input = Number(input).toFixed(10);
        }
    }

    display.textContent = input;
}


function clearAll() {
    display.textContent = "";
    num1 = "";
    num2 = "";
    operator = "";
    carriedOp = false;

}

function operationParse(input) {
    
    if (display.textContent === "") {
        alert("Please input a number before commencing an operation");
        return;
    }

    if (input === "equal" && (num1 === "" || display.textContent === ""  || operator === "" )) {
        alert("All components of calculation not present yet, please finish the calculation");
        return;
    }

    if (num1 === "") {
        
        num1 = display.textContent;
        console.log(num1);
        
        updateDisplayTotal("");
        operator = input;
        console.log(operator);
        return;

    }

    

    if (num2 === "") {
        if (display.textContent==="0") {
            alert("Please do not divide by 0");
            return;
        }
        num2 = display.textContent;
        console.log(num2);
        updateDisplayTotal("");
        
    }

    if (input !== "equal") {
        updateDisplayTotal(operate(operator,num1,num2));
        num1 = display.textContent;
        operator = input;
        num2 = "";
        carriedOp = true;
        return;
    }

    updateDisplayTotal(operate(operator, num1,num2));
    carriedOp = false;
    num1 = "";
    operator = "";
    num2 = "";


}






numbers.forEach((number) => {number.addEventListener("click",() => updateDisplayInput(number.textContent))});

let addButton = document.querySelector(".add");
let subButton = document.querySelector(".subtract");
let multiplyButton = document.querySelector(".multiply");
let divideButton = document.querySelector(".divide");
let equalButton = document.querySelector(".equal");
let clearButton = document.querySelector(".c");



clearButton.addEventListener("click", () => clearAll());

addButton.addEventListener("click", ()=> operationParse("add"));
subButton.addEventListener("click", ()=> operationParse("subtract"));
multiplyButton.addEventListener("click",()=>operationParse("multiply"));
divideButton.addEventListener("click",()=>operationParse("divide"));
clearButton.addEventListener("click",()=>clearAll());
equalButton.addEventListener("click", ()=> operationParse("equal"));
