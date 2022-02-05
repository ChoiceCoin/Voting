import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
  let isExpired = false;
  const decodedToken = jwt.decode(token);
  const dateNow = new Date();

  if (decodedToken.exp < dateNow / 1000) {
    isExpired = true;
  }
  return isExpired;
};
