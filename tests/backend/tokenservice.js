const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function makeTokenService({ jwtSecret, jwtExpiresIn = "1h" }) {
    return {
        generateAccessToken(payload) {
            if (!payload || !payload.userId) {
                throw new Error("userId is required in payload");
            }

            return jwt.sign(payload, jwtSecret,
                { expiresIn: jwtExpiresIn });
        },

        generateRefreshToken() {
            return crypto.randomBytes(64).toString("hex");
        },

        verifyAccessToken(token) {
            if (!token) {
                const err = new Error("Token is required");
                err.code = "TOKEN_REQUIRED";
                throw err;
            }

            try {
                const decoded = jwt.verify(token, jwtSecret);
                return { valid: true, payload: decoded };
            } catch (e) {
                if (e.name === "TokenExpiredError") {
                    return { valid: false, error: "TOKEN_EXPIRED" };
                }
                if (e.name === "JsonWebTokenError") {
                    return { valid: false, error: "TOKEN_INVALID" };
                }
                return { valid: false, error: "TOKEN_ERROR" };
            }
        },

        decodeToken(token) {
            if (!token) return null;

            try {
                // Decode without verification
                return jwt.decode(token);
            } catch (e) {
                return null;
            }
        },

        getTokenExpiry(token) {
            const decoded = this.decodeToken(token);
            if (!decoded || !decoded.exp) return null;

            return new Date(decoded.exp * 1000);
        },

        isTokenExpired(token) {
            const expiry = this.getTokenExpiry(token);
            if (!expiry) return true;

            return expiry < new Date();
        },
    };
}

module.exports = { makeTokenService };