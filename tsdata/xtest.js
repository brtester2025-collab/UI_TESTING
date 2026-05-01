async function getUser() {
    const res = await fetch("https://api.com/user");

    if (!res.ok) throw new Error("Fail");

    return res.json();
}

module.exports = { getUser }