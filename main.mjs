import {Addition, Subtraction, Divide, Multiply} from "./Addition.mjs";


class Main {
    constructor(firstValue, secondValue) {
        this.firstValue = firstValue;
        this.secondValue = secondValue;
        this.clear();
    }

    clear() {
        this.currentValue = '';
        this.prevValue = '';
        this.operator = undefined;
        this.equal = 0;
        this.firstValue.innerHTML = '';
        this.secondValue.innerHTML = '';
    }

    appendOperator(operator) {
        if(this.currentValue != '' && this.prevValue != '') {
            switch (this.operator) {
                case '+' : this.prevValue = JSON.parse(this.currentValue) + JSON.parse(this.prevValue);
                    break;
                case '-' : this.prevValue = JSON.parse(this.prevValue) - JSON.parse(this.currentValue);
                    break;
                case '*' : this.prevValue = JSON.parse(this.currentValue) * JSON.parse(this.prevValue);
                    break;
                case '÷' : this.prevValue = JSON.parse(this.prevValue) / JSON.parse(this.currentValue);
                    break;
                default : return;
            }
            this.firstValue.innerHTML = this.prevValue.toString() + ' ' + this.operator;
            this.secondValue.innerHTML = '';
            this.currentValue = '';
            this.operator = operator.toString();

        }
        else if (this.currentValue === '' && this.prevValue === '') {
            return;
        }
        else {
            this.operator = operator.toString();
            this.firstValue.innerHTML = this.currentValue + ' ' + this.operator;
            this.prevValue = this.currentValue;
            this.secondValue.innerHTML = '';
            this.currentValue = '';

        }
    }

    appendNumber(number) {
        if(number.toString()==='.'&& this.currentValue.includes('.')) return;
        if(this.equal === 1) {
            this.currentValue = '';
            this.secondValue.innerHTML = '';
            this.currentValue =  this.secondValue.innerHTML.toString() + number.toString();
            this.secondValue.innerHTML = this.currentValue;
            this.equal = 0;
        }
        else {
            this.currentValue =  this.secondValue.innerHTML.toString() + number.toString();
            this.secondValue.innerHTML = this.currentValue;
        }
    }

    compute() {
        switch (this.operator) {
            case '+' : this.currentValue = Addition(JSON.parse(this.prevValue), JSON.parse(this.currentValue));
                break;
            case '-' : this.currentValue = Subtraction(JSON.parse(this.prevValue), JSON.parse(this.currentValue));
                break;
            case '*' : this.currentValue = Multiply(JSON.parse(this.prevValue), JSON.parse(this.currentValue));
                break;
            case '÷' : this.currentValue = Divide(JSON.parse(this.prevValue), JSON.parse(this.currentValue));
                break;
            default : return;
        }
    }

    display() {
        this.equal = 1;
        this.compute();
        this.secondValue.innerHTML = this.currentValue.toString();
        this.firstValue.innerHTML = '';
        this.prevValue = '';
    }

    delLastEle() {
        if(this.currentValue === '') return
        this.currentValue = this.currentValue.toString().slice(0,-1);
        this.secondValue.innerHTML = this.currentValue;
    }

}


let firstValue = document.querySelector('[upperDisplay]');
let secondValue = document.querySelector('[lowerDisplay]');
let dataNumberButton = document.querySelectorAll('[dataNumber]');
let dataOperatorButton = document.querySelectorAll('[dataOperator]');
let dataEqualsButton = document.querySelector('[dataEquals]');
let allClear = document.querySelector('[allClear]')
let del = document.querySelector(('[delete]'));

let main = new Main(firstValue, secondValue);
dataNumberButton.forEach(button => {
    button.addEventListener('click', () => {
        let innerValue = button.innerHTML;
        main.appendNumber(innerValue);
    }, false);
});

dataOperatorButton.forEach(button => {
    button.addEventListener('click', () => {
        let innerValue = button.innerHTML;
        main.appendOperator(innerValue);
    }, false);
});

dataEqualsButton.addEventListener('click', () => {
    main.display();
}, false);

allClear.addEventListener('click', () => {
    main.clear();
}, false);

del.addEventListener('click', () => {
    main.delLastEle();
}, false);