import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuarios.js';

const register = async (req, res) => {
  const { email, usuario, contraseña } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const newUser = await Usuario.create({
      email,
      usuario,
      contraseña: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
export  {
  register,
  login
}