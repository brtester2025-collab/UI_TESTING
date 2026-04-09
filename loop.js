const numbers = [10, 20, 30, 40, 50, 60]
console.log(numbers.length);

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] == 50) {
        console.log(numbers[i]);

    }
}


const ids = [1, 2, 3, 5, 6, 7]

for (let i = 0; i < ids.length; i++) {
    if (ids[i] == numbers[i + 1]) {
        console.log(numbers[i]);

    }
    else {
        console.log(ids[i + 1]);

    }
}
