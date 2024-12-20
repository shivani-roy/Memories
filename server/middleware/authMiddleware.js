import { UnauthenticatedError } from "../errors/CustomError.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENT_ID);

const authenticateUser = async (req, res, next) => {
  try {
    const token =
      req.signedCookies.token || req.headers.authorization?.split(" ")[1];

    console.log(token);

    if (!token) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    try {
      const decodedToken = jwt.decode(token);

      if (decodedToken?.provider === "normal") {
        const user = verifyJWT(token);
        // console.log(user);
        req.user = user;
      } else {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const userId = payload["sub"];
        console.log(payload, userId);
        req.user = { userId };
      }
    } catch (error) {
      console.log(error);
    }
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default authenticateUser;
