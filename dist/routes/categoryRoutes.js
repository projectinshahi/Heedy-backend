"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .post(authMiddleware_1.protect, categoryController_1.createCategory)
    .get(categoryController_1.getCategories);
router.route('/:id')
    .put(authMiddleware_1.protect, categoryController_1.updateCategory)
    .delete(authMiddleware_1.protect, categoryController_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map