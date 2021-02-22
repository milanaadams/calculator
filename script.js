let numbersBtn = document.querySelectorAll('[data-number]');
let operationsBtn = document.querySelectorAll('[data-operation]');
let decimalBtn = document.querySelector('[data-decimal]');
let clearBtn = document.querySelector('[data-clear]');
let delBtn = document.querySelector('[data-del]');
let sqrtBtn = document.querySelector('[data-sqrt]');
let negativeBtn = document.querySelector('[data-negative]');
let resultBtn = document.querySelector('[data-equals]');
let currentOperand = document.querySelector('[data-current-operand]');
let display = document.querySelector('[data-current-operand]');
let hintBtn = document.querySelector('.hint');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';



numbersBtn.forEach(number => {
    number.addEventListener('click', (e) => {
        numberPress(e.target.textContent);
    })
});

operationsBtn.forEach(operation => {
    operation.addEventListener('click', (e) => {
        operationPress(e.target.textContent);
    })
});

clearBtn.addEventListener('click', () => clear());
decimalBtn.addEventListener('click', () => decimal());
sqrtBtn.addEventListener('click', () => sqrt());
negativeBtn.addEventListener('click', () => negative());
resultBtn.addEventListener('click', () => operationPress());
delBtn.addEventListener('click', () => del());
hintBtn.addEventListener('click', () => hint());
    

function numberPress(num){
    if(memoryNewNumber){
        display.value = num;
        memoryNewNumber = false;
    } else {
        if (display.value === '0'){
            display.value = num;
        } else {
            if (display.value.length < 10){
                display.value += num;
            }
            
        } 
    }
    
}

function operationPress(op){
    let localOperationMemory = display.value;
    if (memoryNewNumber && memoryPendingOperation === '='){
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
        if (memoryPendingOperation === '+'){
            memoryCurrentNumber += +localOperationMemory;
            console.log(memoryCurrentNumber);
        } else if (memoryPendingOperation === '-'){
            memoryCurrentNumber -= +localOperationMemory;
        } else if (memoryPendingOperation === '*'){
            memoryCurrentNumber *= +localOperationMemory;
        } else if (memoryPendingOperation === '/'){
            memoryCurrentNumber /= +localOperationMemory;
        } else if (memoryPendingOperation === 'pow'){
            memoryCurrentNumber **= +localOperationMemory;
        } else {
            memoryCurrentNumber = +localOperationMemory;
        }
        memoryCurrentNumber = +memoryCurrentNumber.toFixed(11);
        display.value = memoryCurrentNumber;
        memoryPendingOperation = op;

    }
}


function equals(){

}

function decimal(){
    let localDecimalMemory = display.value;
    if (memoryNewNumber){
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf('.') === -1){
            localDecimalMemory += '.'
        };
    };
    display.value = localDecimalMemory;
}

function sqrt(){
    let localDecimalMemory = display.value;
    if (localDecimalMemory < 0){
        alert('You can\'t use square root on negative numbers, sorry!!!')
    } else {
        let result = parseFloat(localDecimalMemory) ** 0.5;
        display.value = +result.toFixed(7);
    }
    
}

function negative(){
    display.value = display.value * -1;
    
}

function clear(){
    display.value = '0';
    memoryCurrentNumber = 0;
    memoryNewNumber = false;
    memoryPendingOperation = '';
}

function del(){
    let arr = display.value.split('');
    arr.pop();
    display.value = arr.join('');
}

function hint (){
    alert('"pow" - возведение в степень; \n"sqrt" - извлечение квадратного корня;\n"+/-" - делает число отрицательный или, наоборот, положительным;\n"del" - работает как backspace, стирает последнюю цифру.\nЖелаю приятного использования! )))))');
}