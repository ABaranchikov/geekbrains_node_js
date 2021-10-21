const colors = require('colors');
const [from, to] = process.argv.slice(2);

const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

const isNumber = (val) => {
    return /^\d+$/.test(val);
}

const checkNumbers = (from, to) => {
    if (!isNumber(from) || !isNumber(to)) {
        console.log("Один из переданных параметров не является числом");
        return;
    }
    if (from > to) {
        console.log("Ошибка: from > to");
        return;
    }
    let index = 0;
    for (let i = from; i <= to; i++) {
        if (isPrime(i)) {
            if (index%3 === 0) {
                console.log(colors.green(i));
            } else if (index%3 === 1) {
                console.log(colors.yellow(i));
            } else if (index%3 === 2) {
                console.log(colors.red(i));
            } 
            index++;
        };
    }
    if (index === 0) {
        console.log(colors.red("Нет простых чисел!"));
    }
}

checkNumbers(from, to);