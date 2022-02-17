import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { googleAuthConfig } from "../util/googleAuthConfig";

const googleClient = new OAuth2Client(
  googleAuthConfig.clientId,
  googleAuthConfig.clientSecret,
  googleAuthConfig.redirectUrl
);

export async function auth(req: Request, res: Response) {
  const authorizeUrl = googleClient.generateAuthUrl({
    access_type: "online",
    prompt: "consent",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
  });

  res.status(200).redirect(authorizeUrl);
}

export async function authCallback(req: Request, res: Response) {
  const { code } = req.query;
  if (!code) {
    return res.status(401).json({ message: "error" });
  }

  // Now that we have the code, use that to acquire tokens.
  const accessToken = await googleClient.getToken(code.toString());
  const tokenInfo = await googleClient.getTokenInfo(
    accessToken.tokens.access_token ?? ""
  );

  googleClient.setCredentials(accessToken.tokens);
  const response = await googleClient.request({
    url: "https://www.googleapis.com/oauth2/v1/userinfo",
  });

  res.status(200).json(response);
}
