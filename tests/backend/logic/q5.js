function testing(otp, currentTime) {
    let enteredOtp = 1234;
    let expiryTime = 30;

    let success = false

    if (otp === enteredOtp && currentTime < expiryTime) {
        success = true;
    }
    return success
}

module.exports = { testing };
