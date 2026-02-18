function makeSessionService({ sessionRepo }) {
    return {
        async createSession({ userId, userAgent, ipAddress }) {
            if (!userId) {
                throw new Error("userId is required");
            }

            const sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

            const session = await sessionRepo.create({
                id: sessionId,
                userId,
                userAgent: userAgent || "unknown",
                ipAddress: ipAddress || "unknown",
                createdAt: new Date(),
                expiresAt,
                isActive: true,
            });

            return session;
        },

        async getSession(sessionId) {
            if (!sessionId) {
                return null;
            }

            const session = await sessionRepo.findById(sessionId);

            if (!session) {
                return null;
            }

            if (!session.isActive || new Date() > session.expiresAt) {
                return null;
            }

            return session;
        },

        async invalidateSession(sessionId) {
            if (!sessionId) {
                throw new Error("sessionId is required");
            }

            await sessionRepo.update(sessionId, { isActive: false });
            return { success: true };
        },

        async invalidateAllUserSessions(userId) {
            if (!userId) {
                throw new Error("userId is required");
            }

            const sessions = await sessionRepo.findByUserId(userId);

            for (const session of sessions) {
                await sessionRepo.update(session.id, { isActive: false });
            }

            return { count: sessions.length };
        },

        async getActiveSessions(userId) {
            if (!userId) {
                throw new Error("userId is required");
            }

            const sessions = await sessionRepo.findByUserId(userId);
            const now = new Date();

            return sessions.filter(
                (session) => session.isActive && session.expiresAt > now
            );
        },
    };
}

module.exports = { makeSessionService };