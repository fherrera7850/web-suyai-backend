import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  // Get the token from the headers
  let token = req.headers["x-access-token"] || req.cookies['token'];

  // if does not exists a token
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "No Token Provided" });
  }

  try {
    // Intenta verificar el token
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    // Maneja el error de verificación del token
    return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
  }
}
