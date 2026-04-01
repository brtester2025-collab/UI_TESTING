function testing(experience, rating) {
    let bonus = 0
    if (experience >= 5) {
        bonus = 10000;

    }
    if (rating === "A") {
        bonus += 5000;
    }

    return bonus



}

module.exports = { testing }