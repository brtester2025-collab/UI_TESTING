function testing(days, isDamaged) {
    let returnAllowed = false
    if (days <= 7) returnAllowed = true;
    if (isDamaged) returnAllowed = true;

    return returnAllowed

}

module.exports = { testing }

