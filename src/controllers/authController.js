import jwt from "jsonwebtoken";
import User from "../models/User";

export const signupController = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, address, clientIdMs } = req.body;

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already in use.");
    }

    // Creating a new User
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      clientIdMs
    });

    // Encrypt the user's password
    user.password = await user.encryptPassword(password);

    await user.save();

    // Create a Token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    res.json({ auth: true, token });
  } catch (e) {
    console.log(e);
    if (e.code === 11000) { // Código de error de MongoDB para violaciones de índice único
      return res.status(400).send("Email already exists.");
    }
    res.status(500).send("There was a problem registering the user.");
  }
};


export const getProfile = async (req, res) => {
  // res.status(200).send(decoded);
  // Search the Info base on the ID
  // const user = await User.findById(decoded.id, { password: 0});
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).send("No user found.");
  }
  res.status(200).json(user);
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("El email no existe.");
  }

  // Si el usuario se registró usando Google y no tiene contraseña establecida
  if (user.googleId && !user.password) {
    return res.status(401).send({ auth: false, token: null, message: "Please sign in using Google." });
  }

  // Si el usuario tiene contraseña, verificarla
  if (user.password) {
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).send({ auth: false, token: null });
    }

    user.password = null;
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24, // 24 hours
    });

    // Establecer la cookie con el token JWT
    res.cookie('token', token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript en el cliente
      secure: process.env.NODE_ENV === 'PRD', // Solo usa 'secure' en producción
      sameSite: 'strict', // La cookie solo se envía en solicitudes del mismo sitio
      maxAge: 24 * 60 * 60 * 1000 // Duración de la cookie
    });

    res.status(200).send({ auth: true, message: "Login successfull", user: { id: user._id, role: user.role, firstName: user.firstName, lastName: user.lastName } });
  } else {
    // En caso de que el usuario no tenga una contraseña por alguna razón no esperada
    res.status(500).send("Authentication error. Please contact support.");
  }
};


export const logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
