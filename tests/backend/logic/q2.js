

function testing(failedAttempts, isAdmin) {
    let failedAttemptsLimit = 3;

    let lockAccount = false;

    if (isAdmin) {
        failedAttemptsLimit = 5;
    }

    if (failedAttempts >= failedAttemptsLimit) {
        lockAccount = true;
    }

    return lockAccount;
}

module.exports = { testing }


