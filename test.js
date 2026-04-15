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
    console.log('*');




}
for (let j = i; j < n; j++) {
    console.log('');
}


















