
function testing(cartValue, isPremium, coupon) {
    let discount = 0;
    if (cartValue > 1000) { discount = 10 };
    if (isPremium) { discount += 5 };
    if (coupon === "SAVE20") { discount += 20; }

    return discount;

}
module.exports = { testing };

