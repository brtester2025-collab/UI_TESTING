async function test() {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const res = await data.json();
  console.log(res);
}
test();
