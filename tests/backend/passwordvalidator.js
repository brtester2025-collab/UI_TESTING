function validatePassword(password) {
    const errors = [];

    if (!password) {
        errors.push("Password is required");
        return { valid: false, errors };
    }

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }

    if (password.length > 128) {
        errors.push("Password must be less than 128 characters");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

function checkPasswordStrength(password) {
    let score = 0;

    if (!password) return { score: 0, strength: "none" };

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    let strength;
    if (score <= 2) strength = "weak";
    else if (score <= 4) strength = "medium";
    else if (score <= 6) strength = "strong";
    else strength = "very strong";

    return { score, strength };
}

module.exports = { validatePassword, checkPasswordStrength };