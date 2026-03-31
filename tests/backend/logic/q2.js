
function testing(failedAttempts, isAdmin) {

    let failedAttemptsLimit = 0;

    let lockAccount = false

    if (failedAttempts >= 3) {
        lockAccount = true;
    }

    if (isAdmin) {
        failedAttemptsLimit = 5;
    }

    return failedAttempts

}

module.exports = { testing }


