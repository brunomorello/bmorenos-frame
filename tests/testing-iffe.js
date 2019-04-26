var currencyFormater = (function () {

    let currency = 'R$';
    let module = {};

    module.numberToReais = number => {
        return currency + number.toFixed(2).replace('.', ',');
    }

    module.reaisToNumber = text => {
        return text.replace(currency, '').replace(',', '.');
    }

    return module;

}) ();

let valueInReais = 'R$ 150,00';
let valueParsedNumber = currencyFormater.reaisToNumber(valueInReais);
console.log(valueParsedNumber);

let number = 200.15;
let numberReais = currencyFormater.numberToReais(number);
console.log(numberReais);