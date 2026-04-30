// const user = {
//     name: "test",
//     greet() {
//         console.log(this.name);
//     }
// }
// const fn = user.greet

// fn.bind(user)()


// const a = {
//     testd: {
//         x: 1,
//         testor: {
//             x: 10
//         }
//     }
// };
// const b = { ...a };

// b.testd.testor.x = 5;
// console.log(a.testd.testor.x)

// const obj = { a: 1 };
// const newObj = Object.create(obj);

// console.log(newObj.a); // ?
// console.log(newObj.hasOwnProperty("a")); // ?

// console.log("a" in newObj)





// const a = { x: 1 };
// const b = { x: 5 };

// const c = Object.create(a)
//     ;

// console.log(c.hasownPopertey(x)); // 1


function mainFunction(callback) {
    callback();
}
function sayHello() {
    console.log("Hello!");
}
mainFunction(sayHello);





function greet(name) {
    console.log("Hi " + name);
}

function processUser(callback) {
    callback("John");
}

processUser(greet)


setTimeout(() => {
    console.log("Runs after 3 seconds");
}, 3000)

function test(testName, callback) {
    console.log("Starting:", testName);
    callback();
}




