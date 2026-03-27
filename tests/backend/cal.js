function calculateShippingCost(userType, cartValue, isInternational) {
    // Normalize user type
    const type = userType === 'Premium' ? 'Premium' : 'Regular';

    // 1. Invalid input
    if (cartValue <= 0) return 0;

    // 2. Free shipping (only domestic)
    if (!isInternational && cartValue > 2000) return 0;

    // 3. Domestic Shipping
    if (!isInternational) {
        if (type === 'Regular') {
            if (cartValue <= 500) return 50;
            return 30;
        }

        if (type === 'Premium') {
            if (cartValue <= 1000) return 20;
            return 0;
        }
    }

    // 4. International Shipping
    if (isInternational) {
        let shippingCost = 200;

        if (cartValue > 3000) {
            shippingCost += 100;
        }

        if (type === 'Premium') {
            shippingCost = shippingCost - (shippingCost * 0.1);
        }

        return shippingCost;
    }

    return 0;
}

module.exports = { calculateShippingCost };