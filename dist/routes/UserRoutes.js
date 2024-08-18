"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const UserController_1 = require("../controllers/UserController");
// Route for user registration
router.post('/register', UserController_1.register);
// You might add more routes here in the future
// Example: router.post('/login', login);
exports.default = router;
