function makeRateLimiter({ maxAttempts = 5, windowMs = 60000 }) {
    const attempts = new Map();

    return {
        check(key) {
            const now = Date.now();
            const record = attempts.get(key);

            if (!record) {
                return { allowed: true, remaining: maxAttempts - 1 };
            }

            // Reset if window expired
            if (now - record.firstAttempt > windowMs) {
                attempts.delete(key);
                return { allowed: true, remaining: maxAttempts - 1 };
            }

            if (record.count >= maxAttempts) {
                const retryAfter = Math.ceil(
                    (record.firstAttempt + windowMs - now) / 1000
                );
                return { allowed: false, remaining: 0, retryAfter };
            }

            return { allowed: true, remaining: maxAttempts - record.count - 1 };
        },

        record(key) {
            const now = Date.now();
            const record = attempts.get(key);

            if (!record || now - record.firstAttempt > windowMs) {
                attempts.set(key, { count: 1, firstAttempt: now });
            } else {
                record.count += 1;
            }
        },

        reset(key) {
            attempts.delete(key);
        },

        clear() {
            attempts.clear();
        },

        getAttempts(key) {
            const record = attempts.get(key);
            return record ? record.count : 0;
        },
    };
}

module.exports = { makeRateLimiter };