export const googleAuthConfig: any = {
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  redirectUrl:
    process.env.REDIRECT_URL ?? "localhost:4000/api/auth/google-auth-callback",
};
