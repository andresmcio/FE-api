import { generateUUID } from '../helpers/generate_uuid';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const JWT_KEY = process.env.JWT_KEY;

const loadUsers = () => {
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_KEY, {
    expiresIn: '1h', // El token expirará en 1 hora, ajusta según tus necesidades
  });
};

export const login = ({ usernameOrEmail, password }) => {
  const users = loadUsers();
  const user = users.find(
    (u) =>
      (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
      u.password === password
  );

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken(user);

  return { user: { id: user.id, username: user.username, email: user.email }, token };
};

export const register = ({ id, fullName, username, email, password, confirmPassword }) => {
  const users = loadUsers();

  // Validaciones mínimas
  if (users.some((u) => u.username === username)) {
    throw new Error('El nombre de usuario ya está en uso');
  }

  if (users.some((u) => u.email === email)) {
    throw new Error('El correo electrónico ya está registrado');
  }

  if (password !== confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  // Agregar nuevo usuario
  const newUser = {
    id: generateUUID(),
    fullName,
    username,
    email,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  const token = generateToken(newUser);

  return { user: { id: newUser.id, username: newUser.username, email: newUser.email }, token };
};

export const logout = () => {
  // En una implementación real, podrías invalidar el token o realizar otras acciones necesarias
  return 'Logout exitoso';
};
