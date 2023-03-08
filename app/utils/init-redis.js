const redisDB = require("redis");

const redisClient = redisDB.createClient();

redisClient.connect();
redisClient.on("connect", () => console.log("connect to redis"));
redisClient.on("error", (err) => console.log(`redis error: ${err.message}`));
redisClient.on("ready", () =>
    console.log("connected to redis and ready to use...")
);
redisClient.on("end", () => console.log("disconnect from"));

module.exports = redisClient;
