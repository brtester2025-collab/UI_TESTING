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

function test(name, age) {
  this.name = name;
  this.age = age;
}

const data = new test("tester", 40);

console.log(data.name);
console.log(data.age);

class dat {
  constructor(names, ages, emails) {
    this.name = names;
    this.age = ages;
    this.email = emails;
  }
}

const result = new dat("arthur", 30, "test@mail.com");

console.log(result.name);
console.log(result.age);
console.log(result.email);



class testerz {
  constructor(name){
    this zr: name;
  }
}

const result2 = new testerz('Zerif')

console.log(result2.name2);
