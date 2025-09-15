const { createClient } = require("redis");
const client = createClient({
  url: "redis://default:HhMRUZqzMWu4O026PGhtarS6RODQzjF4@redis-16854.c323.us-east-1-2.ec2.redns.redis-cloud.com:16854",
});
client.on("error", (err) => console.log("Redis Client Error", err));
const connectionRedis = () => {
  return client.connect()
    .then(() => console.log("Connected to Redis"))
    .catch((err) => console.log("Redis connection error:", err));
};

module.exports = {
  connectionRedis,
  redisClient: client,
}