export default {
  // corsOrigin: process.env.CORS_PATH || "http://localhost:3000",
  corsOrigin: process.env.CORS_PATH || "*",
  port: process.env.PORT || 4003,
  host: "localhost",
  stripeKey: process.env.STRIPE_KEY || "sk_test_26PHem9AhJZvU623DfE1x4sd",
  stripeSecret: process.env.STRIPE_SECRET || "whsec_3d31514c4c28917874cc8809e03f3656c737d216c77f1fcbba0530b7a18509c5",
  jwt: {
    key: process.env.JWT_KEY || "sk_test_26PHem9AhJZvU623DfE1x4sd",
    expireDate: process.env.JWT_EXPIRY_DATE || "1200s",
  }
};
