"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bannerController_1 = require("../controllers/bannerController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .post(authMiddleware_1.protect, bannerController_1.createBanner)
    .get(bannerController_1.getBanners);
router.route('/:id')
    .put(authMiddleware_1.protect, bannerController_1.updateBanner)
    .delete(authMiddleware_1.protect, bannerController_1.deleteBanner);
exports.default = router;
//# sourceMappingURL=bannerRoutes.js.map