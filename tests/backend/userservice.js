function makeUserService({ userRepo }) {
    return {
        async createUser({ name, email, role = "user" }) {
            if (!name || !email) {
                const err = new Error("Name and email are required");
                err.status = 400;
                throw err;
            }

            const existing = await userRepo.findByEmail(email);
            if (existing) {
                const err = new Error("User already exists");
                err.status = 409;
                throw err;
            }

            const user = await userRepo.create({
                name,
                email,
                role,
                createdAt: new Date(),
            });

            return user;
        },

        async getUserById(id) {
            if (!id) {
                const err = new Error("User ID is required");
                err.status = 400;
                throw err;
            }

            const user = await userRepo.findById(id);
            if (!user) {
                const err = new Error("User not found");
                err.status = 404;
                throw err;
            }

            return user;
        },

        async updateUser(id, updates) {
            if (!id) {
                const err = new Error("User ID is required");
                err.status = 400;
                throw err;
            }

            const allowedFields = ["name", "email", "role"];
            const filteredUpdates = {};

            for (const key of allowedFields) {
                if (updates[key] !== undefined) {
                    filteredUpdates[key] = updates[key];
                }
            }

            if (Object.keys(filteredUpdates).length === 0) {
                const err = new Error("No valid fields to update");
                err.status = 400;
                throw err;
            }

            const user = await userRepo.findById(id);
            if (!user) {
                const err = new Error("User not found");
                err.status = 404;
                throw err;
            }

            const updatedUser = await userRepo.update(id, filteredUpdates);
            return updatedUser;
        },

        async deleteUser(id) {
            if (!id) {
                const err = new Error("User ID is required");
                err.status = 400;
                throw err;
            }

            const user = await userRepo.findById(id);
            if (!user) {
                const err = new Error("User not found");
                err.status = 404;
                throw err;
            }

            await userRepo.delete(id);
            return { success: true, message: "User deleted" };
        },

        async listUsers({ page = 1, limit = 10, role } = {}) {
            const offset = (page - 1) * limit;

            const filters = {};
            if (role) {
                filters.role = role;
            }

            const users = await userRepo.findAll({ offset, limit, filters });
            const total = await userRepo.count(filters);

            return {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            };
        },
    };
}

module.exports = { makeUserService };