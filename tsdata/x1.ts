// async function test() {
//   const data = await fetch(`https://pokeapi.co/api/v2/pokemon`);
//   const res = await data.json();
//   console.log(res);
// }
// test();

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
