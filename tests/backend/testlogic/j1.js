// api.js
async function fetchUserData(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
        throw new Error('User not found');
    }
    return response.json();
}

module.exports = { fetchUserData }










// pm.test("Contract validation - Daywise Discount API", function () {

//     const schema = {
//         type: "object",
//         properties: {
//             meta: {
//                 type: "object",
//                 properties: {
//                     msg: { type: "string" },

//                     data: {
//                         type: "object",
//                         properties: {
//                             daywisediscountId: { type: "string" }, // ✅ FIXED (was wrong earlier)
//                             day: { type: "string" },

//                             status: {
//                                 type: "string",
//                                 enum: ["ACTIVE", "INACTIVE"] // ✅ strong contract
//                             },

//                             discountOnCategory: {
//                                 type: "array",
//                                 items: { type: "number" } // ✅ based on your data
//                             },

//                             discountOnSubCategory: {
//                                 type: "array",
//                                 items: { type: "number" }
//                             },

//                             discountOnCartTotalStatus: { type: "boolean" },
//                             dayWisePromosDiscountIn: { type: "string" },
//                             isFreeProduct: { type: "boolean" },

//                             walletCashback: { type: "number" },
//                             walletCashbackCartLimit: { type: "number" },

//                             militaryIdDiscount: { type: "boolean" },
//                             militaryIdDiscountPercent: { type: ["number", "null"] },

//                             _id: { type: "string" },
//                             daywisediscountDescription: { type: "string" },
//                             daywisediscountName: { type: "string" },

//                             freeProductName: { type: "string" },
//                             cartAmount: { type: "number" },

//                             dayWisePromosCodeDiscount: { type: "number" },
//                             freeProductcartLimit: { type: "number" },

//                             createdAt: {
//                                 type: "number",
//                                 minimum: 0 // ✅ timestamp sanity check
//                             },
//                             updatedAt: {
//                                 type: "number",
//                                 minimum: 0
//                             },

//                             __v: { type: "number" }
//                         },

//                         required: [
//                             "daywisediscountId",
//                             "day",
//                             "status",
//                             "discountOnCategory",
//                             "discountOnSubCategory"
//                         ]
//                     },

//                     status: { type: "boolean" }
//                 },

//                 required: ["msg", "data", "status"]
//             }
//         },

//         required: ["meta"],
//         additionalProperties: true
//     };

//     pm.expect(pm.response.json()).to.have.jsonSchema(schema);
// });