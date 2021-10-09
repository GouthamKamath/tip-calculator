const billAmountEl = document.getElementById('bill');
const tipPercentButtons = document.querySelectorAll('button');
const customTipAmount = document.querySelector('.custom');
const numOfPeople = document.querySelector('.people-count');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const reset = document.querySelector('.reset');

let selectedTip = 0;
let peopleCount = 0;
let billAmount = 0;
let tipAmountPerPerson = 0;
let finalBillAmountPerPerson = 0;

// reset all values
function resetAll() {
    selectedTip = 0;
    peopleCount = 0;
    billAmount = 0;
    tipAmountPerPerson = 0;
    finalBillAmountPerPerson = 0;
    billAmountEl.value = '';
    customTipAmount.value = '';
    numOfPeople.value = '';
    populateDOM();
}

// populate DOM with calculated amounts
function populateDOM() {
    tipAmount.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${finalBillAmountPerPerson.toFixed(2)}`;
}

// calcuate the tip /person

function calculateTip() {
    if (peopleCount && billAmount && selectedTip) {
        tipAmountPerPerson = (billAmount * (selectedTip / 100)) / peopleCount;
        finalBillAmountPerPerson = (billAmount / peopleCount) + tipAmountPerPerson;
    } else {
        return;
    }
    populateDOM();
}

// store tip % selected by user

function storeSelectedTip(option) {
    switch (+(option)) {
        case 5: {
            selectedTip = 5;
            break;
        }
        case 10: {
            selectedTip = 10;
            break;
        }
        case 15: {
            selectedTip = 15;
            break;
        }
        case 20: {
            selectedTip = 20;
            break;
        }
        case 25: {
            selectedTip = 25;
            break;
        }
        case 50: {
            selectedTip = 50;
            break;
        }
        default: {
            return false;
        }
    }
}

// Event listeners for tip % buttons

tipPercentButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        storeSelectedTip(e.target.value);
        calculateTip();
    });
})

// listener to store custom tip on focusout
customTipAmount.addEventListener('focusout', () => {
    selectedTip = +(customTipAmount.value);
    calculateTip();
})

// to store number of people on focusout
numOfPeople.addEventListener('focusout', () => {
    peopleCount = +(numOfPeople.value);
})

// to store bill amount on focusout
billAmountEl.addEventListener('focusout', () => {
    billAmount = +(billAmountEl.value);
})

// reset the values
reset.addEventListener('click', resetAll);