// const arr = [1, 2, 3, 4, 6];
// let target = 6

// let l = 0, r = arr.length - 1

// while (l < r) {
//     let sum = arr[l] + arr[r]

//     if (sum === target) {
//         console.log([l, r]);
//         break;
//     }

//     else if (sum < target) {
//         l++;
//     }
//     else {
//         r--;
//     }
// }




// const no = [10, 30, 50, 60, 70]
// let st = 0;
// let ed = no.length - 1
// let tar = 80

// while (st < ed) {
//     let sum = no[st] + no[ed];

//     if (sum === tar) {
//         console.log([st, ed]);
//         break;

//     }

//     else if (sum < tar) {
//         st++;
//     }

//     else {
//         ed--;
//     }


// }

//Remove duplicate

// const arr = [1, 1, 2, 2, 3, 4, 4]
// let i = 0;
// let j = 1
// while (i < j) {
//     if (arr[i] != arr[j]) {
//         console.log([i]);


//     }
//     else {
//         i++;
//         j++;
//     }
// }





// for sorted array 
//Brute force approach
const a1 = [1, 3, 23, 32, 43, 32] //6-1 = 5 
let st = 0;
for (let i = 1; i < a1.length; i++) {
    if (a1[st] !== a1[i]) {
        st++;
        a1[st] = a1[i]
    }
}
console.log('testing ');
console.log(a1.slice(0, st + 1))


// Brute force







// for  the unsorted array data structure (SET) is used
const val = [... new Set(a1)]
console.log(val);


// star pattern

let n = 4

for (let i = 0; i < n; i++) {

    for (let j = 0; j < n; j++) {
        console.log('*');
    }
    console.log(" ");
}







let r = ""

for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
        r += 'A'

    }
}


let result = "";

for (let i = 1; i <= 3; i++) {
    result = "";
    for (let j = 1; j <= i; j++) {
        result += j;
    }
    console.log(result);
}


console.log(" today  are printing");


let resulte = 0;

for (let i = 1; i <= 3; i++) {
    let temp = 0;
    for (let j = 1; j <= i; j++) {
        temp += j;
    }
    resulte += temp;
}

console.log(resulte);




let arr = [1, 2, 3];

for (let i = 0; i < arr.length; i++) {
    let str = "";

    for (let j = 0; j < arr.length; j++) {
        str += arr[i];
    }

    console.log(str);
}
