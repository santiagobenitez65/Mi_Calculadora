const loQueEscribe = document.getElementById("text");

function input(idDelBoton) {
    const boton = document.getElementById(idDelBoton);
    let entradaSeparada = loQueEscribe.innerText.split(" ");
    if (isNaN(entradaSeparada[entradaSeparada.length - 1]) && isNaN(boton.innerText) && boton.innerText !== "-") {return;};
    if (entradaSeparada[entradaSeparada.length - 1] === "-" && boton.innerText === "-") {return;}
    let nuevoTexto;
    if (boton.innerText === "+" || boton.innerText === "-" || boton.innerText === "*" || boton.innerText === "/") {
        nuevoTexto = document.createTextNode(" " + boton.innerText + " ");
    } else {
        nuevoTexto = document.createTextNode(boton.innerText);
    }
    
    loQueEscribe.appendChild(nuevoTexto);
}

function remove() {
    let textoViejo = loQueEscribe.innerText;
    let textoNuevo = textoViejo.slice(0, -1);
    loQueEscribe.innerText = textoNuevo;
}

function fixNegativeNumbers(operationString) {
    outputString = ""
    for(indexOfCharacter in operationString) {
        if(operationString[indexOfCharacter] === " " && operationString[indexOfCharacter - 1] === "-" && isNaN(operationString[indexOfCharacter - 3])) {console.log("Skip space first if") ;continue;} // Si se da una situacion de tipo 3 * - 2 se saltea el espacioo entre el menos y el 2
        if(operationString[indexOfCharacter] === " " && indexOfCharacter === 1 && operationString[indexOfCharacter - 1] === "-") {continue;}
        outputString += operationString[indexOfCharacter];
    }
    return outputString;
}

function checkValidOperation (inputOperation) {
    if (inputOperation[0] === "+" || inputOperation[0] === "*" || inputOperation[0] === "/") {
        return false;
    }
    if (inputOperation[inputOperation.length - 1] === "+"|| inputOperation[inputOperation.length - 1] === "-"|| inputOperation[inputOperation.length - 1] === "*"|| inputOperation[inputOperation.length - 1] === "/") {
        return false;
    }
    let anterior;
    for (let index in inputOperation) {
        //Si un operador se repite...
        if (inputOperation[index] === anterior && (inputOperation[index] === "+" || inputOperation[index] === "-" || inputOperation[index] === "*" || inputOperation[index] === "/")) {
            return false;
        }
        if (inputOperation[index] !== " ") { anterior = inputOperation[index] }
    }
    return true;
}

function fixFirstNumber(operation) { //splitted operation
    if(operation[0] === "-") {
        operation[0] = `-${operation[1]}`;
        console.log(operation)
        operation = removeElement(operation, 1)
    }
    console.log(operation)
    return operation;
}

function removeElement(array, index) {
    let newArray = []
    for (let element in array) {
        if (element == index) { continue; }
        newArray.push(array[element]);
    }
    return newArray;
}

function unstringNumbers(inputOperation) {
    let outputOperation = [];
    for (let element in inputOperation) {
        if (inputOperation[element] !== "+" && inputOperation[element] !== "-" && inputOperation[element] !== "*" && inputOperation[element] !== "/") {
            outputOperation.push(parseInt(inputOperation[element]));
        } else {
            outputOperation.push(inputOperation[element]);
        }
    }
    return outputOperation;
}

function checkOperators(operation, operatorOne, operatorTwo) {
    for (let element in operation) {
        if (operation[element] === operatorOne || operation[element] === operatorTwo) {
            return true;
        }
    }
    return false;
}

function calcMultiplicationsOrDivisions(operation){
    for (let element in operation) {
        element = parseInt(element);
        if (operation[element] === "*") {
            operation[element] = operation[element - 1] * operation[element + 1];
            operation = removeElement(operation, parseInt(element) + 1);
            operation = removeElement(operation, parseInt(element) - 1);
        } else if (operation[element] === "/") {
            operation[element] = operation[element - 1] / operation[element + 1];
            operation = removeElement(operation, parseInt(element) + 1);
            operation = removeElement(operation, parseInt(element) - 1);
        }
    }
    return operation;
}

function calcSumsOrSubtractions(operation) {
    for (let element in operation) {
        element = parseInt(element);
        if (operation[element] === "+") {
            operation[element] = operation[element - 1] + operation[element + 1];
            operation = removeElement(operation, parseInt(element) + 1);
            operation = removeElement(operation, parseInt(element) - 1);
        } else if (operation[element] === "-") {
            operation[element] = operation[element - 1] - operation[element + 1];
            operation = removeElement(operation, parseInt(element) + 1);
            operation = removeElement(operation, parseInt(element) - 1);
        }
    }
    return operation;
}

function esIgual() {
    let operacion = loQueEscribe.innerText;
    
    operacion = fixNegativeNumbers(operacion);
    console.log(operacion)
    operacion = operacion.split(" ");
    
    operacion = fixFirstNumber(operacion);
    operacion = unstringNumbers(operacion);

    while (checkOperators(operacion, "*", "/")) {    
        operacion = calcMultiplicationsOrDivisions(operacion)
    }

    while (checkOperators(operacion, "+", "-")) {
        operacion = calcSumsOrSubtractions(operacion)
    }

    loQueEscribe.innerText = operacion[0];
}