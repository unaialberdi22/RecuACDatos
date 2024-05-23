import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const register = async (req, res) => {
  const { email, usuario, contrasena } = req.body;
  console.log(req.body)


  if (!email || !usuario || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const newUser = await db.usuarios.create({
      email,
      usuario,
      contrasena: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registrando usuario' });
  }
};

const login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const user = await db.usuarios.findOne({ where: { email: email } });
    console.log(user)

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contrasena);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};
export  {
  register,
  login
}