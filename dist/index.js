"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes")); // Import your user routes
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Define routes
app.use('/api', UserRoutes_1.default); // Use '/api' prefix or adjust as needed
// Basic route for testing
app.get('/', (req, res) => {
    res.send("hello");
});
// Connect to MongoDB and start server
mongoose_1.default.connect(process.env.MONGO_URI || "mongodb://localhost:27017/your_database_name")
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
