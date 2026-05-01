function hello() {
  return "hello test";
}

async function hello2() {
  return "hey async";
}

console.log(hello());
console.log(hello2());

let user: { name: string; age: number } = { name: "john", age: 20 };

function testsim(value: number): number {
  return value;
}

//generics

function ok<T>(value: T): T {
  return value;
}
