class master {
  constructor(namer, ages) {
    this.name = namer;
    this.age = ages;
  }

  test() {
    console.log(`my name: ${this.name}`);
  }

  test2() {
    console.log(`my name: ${this.name}`);
  }
}

const person = new master("john", 55);
const person2 = new master("john1", 24);

console.log(person.name);
console.log(person2.name);

person.test();

person2.test2("thunder");

call;
