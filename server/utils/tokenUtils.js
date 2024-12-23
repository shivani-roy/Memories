import jwt from "jsonwebtoken";

const createJWT = ({ payload }) => {
  const token = jwt.sign(
    { ...payload, provider: "normal" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  return token;
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 24 * 60 * 60 * 1000;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

export { createJWT, verifyJWT, attachCookiesToResponse };
