function validateEmail(email) {
    const errors = [];

    if (!email) {
        return { valid: false, errors: ["Email is required"] };
    }

    if (typeof email !== "string") {
        return { valid: false, errors: ["Email must be a string"] };
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length === 0) {
        errors.push("Email cannot be empty");
    }

    if (trimmedEmail.length > 254) {
        errors.push("Email must be less than 254 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        errors.push("Invalid email format");
    }

    const blockedDomains = ["tempmail.com", "throwaway.com", "fakeemail.com"];
    const domain = trimmedEmail.split("@")[1];
    if (blockedDomains.includes(domain)) {
        errors.push("Disposable email addresses are not allowed");
    }

    return {
        valid: errors.length === 0,
        errors,
        normalized: trimmedEmail,
    };
}

function extractDomain(email) {
    if (!email || typeof email !== "string") {
        return null;
    }

    const parts = email.split("@");
    if (parts.length !== 2) {
        return null;
    }

    return parts[1].toLowerCase();
}

module.exports = { validateEmail, extractDomain };