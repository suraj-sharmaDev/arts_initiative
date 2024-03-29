const env = {
  databaseUrl: `${process.env.DATABASE_URL}`,
  appUrl: `${process.env.APP_URL}`,
  product: "protoflow-app",
  redirectAfterSignIn: "/",
  redirectOnunAuth: "/auth/login",

  // SMTP configuration for NextAuth
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM,
  },

  // NextAuth configuration
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  //Social login: Github
  github: {
    clientId: `${process.env.GITHUB_CLIENT_ID}`,
    clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
  },

  //Social login: Google
  google: {
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  },

  // cloudinary configuration
  cloudinary: {
    apiKey: `${process.env.CLOUDINARY_API_KEY}`,
    apiSecret: `${process.env.CLOUDINARY_API_SECRET}`,
    cloudName: `${process.env.CLOUDINARY_NAME}`,
    uploadPreset: `${process.env.CLOUDINARY_UPLOAD_PRESET}`,
  },
};

export default env;
