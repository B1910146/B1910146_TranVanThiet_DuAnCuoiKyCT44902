const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const dishesRouter = require("./app/routes/dish.route");
const usersRouter = require("./app/routes/user.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Kính chào quý khách. Chào mừng đến với Serpent Restaurant." });
});

app.use("/api/dishes", dishesRouter);

app.use("/api/users", usersRouter);

// Bắt lỗi route
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;