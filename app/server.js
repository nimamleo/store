const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");

module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")));
    }
    createServer() {
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(this.#PORT, () => {
            console.log("run > http://localhost:" + this.#PORT);
        });
    }
    connectToMongoDB() {
        mongoose
            .connect(this.#DB_URI)
            .then(() => console.log("connected to mongoDB"))
            .catch((err) => console.error(err));
    }
    createRoutes() {
        this.#app.use(AllRoutes);
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("page not found"));
        });
        this.#app.use((error, req, res, next) => {
            const statusCode = error.status || 500;
            const message = error.message || "intervall error";
            return res.status(statusCode).json({
                statusCode,
                errors: {
                    message,
                },
            });
        });
    }
};
