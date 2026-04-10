// const numbers = [10, 20, 30, 40, 50, 60]
// console.log(numbers.length);

// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] == 50) {
//         console.log(numbers[i]);

//     }
// }


// const ids = [1, 2, 3, 5, 6, 7]

// for (let i = 0; i < ids.length; i++) {
//     if (ids[i] == numbers[i + 1]) {
//         console.log(numbers[i]);

//     }
//     else {
//         console.log(ids[i + 1]);

//     }
// }


// const users = [1, 2, 3, 4, 2, 5, 6, 3]   ///   2  3

// for (let i = 0; i < users.length; i++) {
//     for (let j = i + 1; j < users.length; j++)
//         if (users[i] === users[j])
//             console.log(users[i]);
// }


// const marks = [10, 80, 45, 99, 67, 100, 34]

// let highest = marks[0]

// for (let i = 0; i < marks.length; i++) {
//     if (marks[i] > highest) {
//         highest = marks[i]
//     }
// }
// console.log(highest);



// const user = [
//     { id: 1, status: "pass" },
//     { id: 2, status: "fail" },
//     { id: 3, status: "pass" },
//     { id: 4, status: "fail" }
// ]

// let cnt = 0;

// for (let i = 0; i < user.length; i++) {
//     if (user[i].status === "fail") {
//         cnt++
//     }

// }
// console.log(cnt);

let n = 4

for (let i = 0; i < n; i++) {
    let data = ""
    for (let j = 0; j < n - i - 1; j++) {
        data += " "
    }
    for (let s = 0; s <= i; s++) {
        data += "*"
    }
    console.log(data);
}


//     *
//    **
//   ***
//  ****
// *****

