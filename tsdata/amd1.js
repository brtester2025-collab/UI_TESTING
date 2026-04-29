const user = {
    name: "test",
    greet() {
        console.log(this.name);
    }
}
const fn = user.greet

fn.bind(user)()


const a = {
    testd: {
        x: 1,
        testor: {
            x: 10
        }
    }
};
const b = { ...a };

b.testd.testor.x = 5;
console.log(a.testd.testor.x)

const obj = { a: 1 };
const newObj = Object.create(obj);

console.log(newObj.a); // ?
console.log(newObj.hasOwnProperty("a")); // ?

console.log("a" in newObj) 