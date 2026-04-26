"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/login', authController_1.loginAdmin);
router.post('/setup-test-admin', authController_1.createTestAdmin); // Can be called once to generate an admin
exports.default = router;
//# sourceMappingURL=authRoutes.js.map