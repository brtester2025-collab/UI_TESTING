function testing(amount) {

    if (amount < 500) {
        shipping = 50;

    }
    else if (amount <= 1000) {
        shipping = 30;
    }
    else {
        shipping = 0;
    }
    return shipping;

}
module.exports = { testing }

