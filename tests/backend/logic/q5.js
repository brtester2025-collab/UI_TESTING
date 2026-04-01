function testing(otp, currentTime) {
    let enteredOtp = 12345;
    let expiryTime = 30;

    let success = false

    if (otp === enteredOtp && currentTime < expiryTime) {
        success = true;
    }
    return success
}

module.exports = { testing };
