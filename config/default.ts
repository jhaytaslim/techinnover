export default {
  // corsOrigin: process.env.CORS_PATH || "http://localhost:3000",
  corsOrigin: process.env.CORS_PATH || "*",
  port: process.env.PORT || 4003,
  host: "localhost",
  db: `mongodb+srv://devtee:eMoIJyEBHSsBdXeo@cluster0.g8jl5.mongodb.net/zikiauth?retryWrites=true&w=majority`,
};
