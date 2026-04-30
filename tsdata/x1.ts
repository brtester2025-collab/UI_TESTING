async function test() {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const res = await data.json();
  console.log(res);
}
test();

async function add(a: number, b: number): Promise<number> {
  return a + b;
}

console.log(add(2, 3));

async function sub(a: string, b: string): Promise<{ a: string }> {
  return { a };
}
console.log(sub("tester", "zeta"));

async function fetchProductlist() {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    if (!data.ok) {
      throw new Error("error while fetching the api");
    }
    const response = await data.json();
    console.log(response);
  } catch (error) {
    console.error(`response  status`, error);
    throw error;
  }
}

fetchProductlist();

async function parllelTask() {
  const [data, data1] = await Promise.all([
    fetch("https://reqres.in/api/users"),
    fetch("/bigoData"),
  ]);

  const [responser, responser1] = await Promise.all([
    data.json(),
    data1.json(),
  ]);
  return console.log([responser1, responser]);
}

async function fetch1() {
  // for catching the error
  try {
    const doubledata = await fetch("https://pokeapi.co/api/v2/pokemon/zx");
    const res = await doubledata.json();
    console.log(res);
  } catch (error) {
    console.error("FAULT ERROR", error);
  }
}

fetch1();

async function testingP() {
  const [mockValue1, mockValue2] = await Promise.all([
    fetch("user data"),
    fetch("user data2"),
  ]);
  const [response1, response2] = await Promise.all([
    mockValue1.json(),
    mockValue2.json(),
  ]);
  console.log([response1, response2]);
}

async function demo() {
  try {
    const [d1, d2] = await Promise.all([
      fetch("/req/user1").then((req) => req.json()),
      fetch("./req/user2").then((req) => req.json()),
    ]);

    console.log([d1, d2]);
  } catch (err) {
    console.error("this is message", err);
  }
}
demo();
