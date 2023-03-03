const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
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
        this.#app.use(morgan("dev"));
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
        mongoose.connect(this.#DB_URI).catch((err) => {
            return console.error(err.message);
        });
        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to DB");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose connected from DB");
        });
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
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
